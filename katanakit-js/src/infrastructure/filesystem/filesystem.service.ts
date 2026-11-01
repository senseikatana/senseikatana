import type { ZodType } from "zod";

import type {
	FileEncoding,
	FileHashAlgorithm,
	FileStats,
	FilesystemError,
	FilesystemResult,
	ReadDirEntry,
	ReadDirOptions,
	WriteFileOptions,
} from "@/types/index.js";

import { useGetDirname, useIsNode, useJoinPath, useResolvePath } from "./path.service.js";

// ============================================================
// Filesystem facade — Node/Bun I/O with Safe Results (never throws).
// `node:fs/promises` loads through dynamic `import()` so importing
// this module is browser-safe; outside Node/Bun every helper returns
// an `ERR_FS_UNAVAILABLE` Safe Result instead of crashing.
// ============================================================

type FsPromises = typeof import("node:fs/promises");

/** Internal error carrying `code`/`details` through `runFs`. */
class FilesystemOperationError extends Error {
	readonly code: string;
	readonly details?: unknown;
	readonly path?: string;

	constructor(code: string, message: string, path?: string, details?: unknown) {
		super(message);
		this.name = "FilesystemOperationError";
		this.code = code;
		this.path = path;
		this.details = details;
	}
}

interface NodeErrnoLike {
	code?: unknown;
	message?: unknown;
	path?: unknown;
}

/** Normalizes any thrown value into a serializable {@link FilesystemError}. */
function toFilesystemError(error: unknown, fallbackPath?: string): FilesystemError {
	if (error instanceof FilesystemOperationError) {
		return {
			code: error.code,
			message: error.message,
			path: error.path ?? fallbackPath,
			details: error.details,
		};
	}

	const errno = error as NodeErrnoLike;
	return {
		code: typeof errno?.code === "string" ? errno.code : "ERR_FILESYSTEM",
		message: error instanceof Error ? error.message : "Unknown filesystem error",
		path: typeof errno?.path === "string" ? errno.path : fallbackPath,
	};
}

/** Safe Result used when `node:fs` is not available (browser/edge). */
function createUnavailableError(): FilesystemError {
	return {
		code: "ERR_FS_UNAVAILABLE",
		message: "[Filesystem] A Node.js-compatible runtime is required for filesystem operations.",
	};
}

/**
 * Internal runner: guards the runtime, loads `node:fs/promises` lazily and
 * wraps the operation into a Safe Result (`{ data, error, ok }`).
 */
async function runFs<T>(
	targetPath: string | undefined,
	operation: (fs: FsPromises) => Promise<T>,
): Promise<FilesystemResult<T>> {
	if (!useIsNode()) {
		return { data: null, error: createUnavailableError(), ok: false };
	}

	try {
		const fs = await import("node:fs/promises");
		return { data: await operation(fs), error: null, ok: true };
	} catch (error) {
		return { data: null, error: toFilesystemError(error, targetPath), ok: false };
	}
}

/** Parses JSON text, optionally validating it against a Zod schema. */
function parseJson<T>(raw: string, path: string, schema?: ZodType<T>): T {
	let parsed: unknown;
	try {
		parsed = JSON.parse(raw);
	} catch (error) {
		throw new FilesystemOperationError(
			"ERR_INVALID_JSON",
			`[Filesystem] Invalid JSON in "${path}": ${
				error instanceof Error ? error.message : "parse error"
			}`,
			path,
		);
	}

	if (!schema) return parsed as T;

	const result = schema.safeParse(parsed);
	if (!result.success) {
		throw new FilesystemOperationError(
			"ERR_VALIDATION",
			`[Filesystem] JSON in "${path}" does not match the expected schema.`,
			path,
			result.error.issues,
		);
	}
	return result.data;
}

/**
 * Reads a text file.
 *
 * @param path - File path (relative paths resolve against `process.cwd()`).
 * @param encoding - Text encoding (default: `"utf8"`).
 * @returns Safe Result with the file contents as a string.
 *
 * @example
 * ```ts
 * import { useReadFile } from "katanakit-js";
 *
 * const result = await useReadFile("data/books.json");
 * if (result.ok) console.log(result.data);
 * ```
 */
export async function useReadFile(
	path: string,
	encoding: FileEncoding = "utf8",
): Promise<FilesystemResult<string>> {
	return runFs(path, (fs) => fs.readFile(path, encoding));
}

/**
 * Reads a file as raw bytes (no encoding).
 *
 * @param path - File path.
 * @returns Safe Result with the contents as a `Uint8Array`.
 *
 * @example
 * ```ts
 * const result = await useReadFileBuffer("assets/logo.png");
 * if (result.ok) upload(result.data);
 * ```
 */
export async function useReadFileBuffer(path: string): Promise<FilesystemResult<Uint8Array>> {
	return runFs(path, (fs) => fs.readFile(path));
}

/**
 * Streams a file and returns its checksum as a lowercase hex digest.
 *
 * @param path - File path.
 * @param algorithm - `"md5" | "sha1" | "sha256" | "sha512"` (default: `"sha256"`).
 * @returns Safe Result with the hex digest.
 *
 * @example
 * ```ts
 * const result = await useHashFile("image.iso"); // sha256
 * const md5 = await useHashFile("image.iso", "md5");
 * ```
 */
export async function useHashFile(
	path: string,
	algorithm: FileHashAlgorithm = "sha256",
): Promise<FilesystemResult<string>> {
	return runFs(path, async () => {
		const [{ createHash }, { createReadStream }] = await Promise.all([
			import("node:crypto"),
			import("node:fs"),
		]);
		const hash = createHash(algorithm);
		for await (const chunk of createReadStream(path)) {
			hash.update(chunk as Uint8Array);
		}
		return hash.digest("hex");
	});
}

/**
 * Verifies a file checksum against an expected value (case-insensitive).
 *
 * @param path - File path.
 * @param expected - Expected hex digest (from a `.sha256` sidecar, release page, …).
 * @param algorithm - Algorithm used for both values (default: `"sha256"`).
 * @returns Safe Result with `true` when the digests match.
 *
 * @example
 * ```ts
 * const check = await useVerifyFileHash("image.iso", "e3b0c442…");
 * if (check.ok && !check.data) throw new Error("checksum mismatch");
 * ```
 */
export async function useVerifyFileHash(
	path: string,
	expected: string,
	algorithm: FileHashAlgorithm = "sha256",
): Promise<FilesystemResult<boolean>> {
	const hashed = await useHashFile(path, algorithm);
	if (!hashed.ok) return hashed;
	return {
		data: hashed.data.toLowerCase() === expected.trim().toLowerCase(),
		error: null,
		ok: true,
	};
}

/**
 * Writes (or overwrites) a file, creating it when missing.
 *
 * @param path - Destination file path.
 * @param data - Text or bytes to write.
 * @param options - Encoding, mode and flag overrides.
 * @returns Safe Result with the written path.
 *
 * @example
 * ```ts
 * const result = await useWriteFile("logs/app.log", "started\n");
 * ```
 */
export async function useWriteFile(
	path: string,
	data: string | Uint8Array,
	options?: WriteFileOptions,
): Promise<FilesystemResult<string>> {
	return runFs(path, async (fs) => {
		await fs.writeFile(path, data, options);
		return path;
	});
}

/**
 * Appends text or bytes to a file, creating it when missing.
 *
 * @param path - Destination file path.
 * @param data - Text or bytes to append.
 * @param options - Encoding, mode and flag overrides.
 * @returns Safe Result with the written path.
 *
 * @example
 * ```ts
 * await useAppendFile("logs/app.log", "request handled\n");
 * ```
 */
export async function useAppendFile(
	path: string,
	data: string | Uint8Array,
	options?: WriteFileOptions,
): Promise<FilesystemResult<string>> {
	return runFs(path, async (fs) => {
		await fs.appendFile(path, data, options);
		return path;
	});
}

/**
 * Reads and parses a JSON file, optionally validating it with a Zod schema.
 *
 * @typeParam T - Expected parsed (and validated) shape.
 * @param path - File path.
 * @param schema - Optional Zod schema; invalid shapes fail with `ERR_VALIDATION`.
 * @returns Safe Result with the parsed data, or `ERR_INVALID_JSON` / `ERR_VALIDATION`.
 *
 * @example
 * ```ts
 * import { z } from "zod";
 *
 * const BookSchema = z.object({ title: z.string() });
 * const result = await useReadJsonFile("data/books.json", BookSchema);
 * ```
 */
export async function useReadJsonFile<T = unknown>(
	path: string,
	schema?: ZodType<T>,
): Promise<FilesystemResult<T>> {
	return runFs(path, async (fs) => parseJson<T>(await fs.readFile(path, "utf8"), path, schema));
}

/**
 * Serializes data to JSON and writes it to a file (pretty-printed by default).
 *
 * @param path - Destination file path.
 * @param data - Value to serialize (`JSON.stringify` rules apply).
 * @param options - Set `pretty: false` for compact output.
 * @returns Safe Result with the written path.
 *
 * @example
 * ```ts
 * await useWriteJsonFile("data/books.json", books);
 * ```
 */
export async function useWriteJsonFile(
	path: string,
	data: unknown,
	options?: { pretty?: boolean },
): Promise<FilesystemResult<string>> {
	return runFs(path, async (fs) => {
		const spaces = options?.pretty === false ? undefined : 2;
		await fs.writeFile(path, `${JSON.stringify(data, null, spaces)}\n`, "utf8");
		return path;
	});
}

/**
 * Lists a directory with type flags resolved per entry.
 *
 * @param path - Directory path.
 * @param options - `recursive: true` walks nested directories.
 * @returns Safe Result with `{ name, path, isFile, isDirectory }` entries.
 *
 * @example
 * ```ts
 * const result = await useReadDir("content", { recursive: true });
 * if (result.ok) result.data.filter((entry) => entry.isFile);
 * ```
 */
export async function useReadDir(
	path: string,
	options?: ReadDirOptions,
): Promise<FilesystemResult<ReadDirEntry[]>> {
	return runFs(path, async (fs) => {
		const entries = await fs.readdir(path, {
			recursive: options?.recursive ?? false,
			withFileTypes: true,
		});
		return Promise.all(
			entries.map(async (entry) => ({
				name: entry.name,
				path: await useJoinPath(entry.parentPath ?? path, entry.name),
				isFile: entry.isFile(),
				isDirectory: entry.isDirectory(),
			})),
		);
	});
}

/**
 * Creates a directory (and any missing parents).
 *
 * @param path - Directory path to ensure.
 * @returns Safe Result with the directory path.
 *
 * @example
 * ```ts
 * await useEnsureDir("data/cache/books");
 * ```
 */
export async function useEnsureDir(path: string): Promise<FilesystemResult<string>> {
	return runFs(path, async (fs) => {
		await fs.mkdir(path, { recursive: true });
		return path;
	});
}

/**
 * Checks whether a path exists and is accessible.
 * Never throws: returns `false` for missing paths and non-Node runtimes.
 *
 * @param path - Path to check.
 * @returns `true` when the path exists.
 *
 * @example
 * ```ts
 * if (await useFileExists("data/books.json")) {
 *   // read it
 * }
 * ```
 */
export async function useFileExists(path: string): Promise<boolean> {
	if (!useIsNode()) return false;

	try {
		const fs = await import("node:fs/promises");
		await fs.access(path);
		return true;
	} catch {
		return false;
	}
}

/**
 * Returns a portable stats subset for a file or directory.
 *
 * @param path - Path to inspect (follows symlinks).
 * @returns Safe Result with size, type flags and epoch-ms timestamps.
 *
 * @example
 * ```ts
 * const result = await useGetFileStats("assets/logo.png");
 * if (result.ok) console.log(result.data.size);
 * ```
 */
export async function useGetFileStats(path: string): Promise<FilesystemResult<FileStats>> {
	return runFs(path, async (fs) => {
		const stats = await fs.stat(path);
		return {
			size: stats.size,
			isFile: stats.isFile(),
			isDirectory: stats.isDirectory(),
			isSymbolicLink: stats.isSymbolicLink(),
			createdAt: stats.birthtimeMs,
			modifiedAt: stats.mtimeMs,
			accessedAt: stats.atimeMs,
		};
	});
}

/**
 * Copies a file. Existing destinations are overwritten unless
 * `overwrite: false` is passed (`COPYFILE_EXCL`).
 *
 * @param source - Source file path.
 * @param destination - Destination file path.
 * @param options - Set `overwrite: false` to fail when the target exists.
 * @returns Safe Result with the destination path.
 *
 * @example
 * ```ts
 * await useCopyFile("data/books.json", "backup/books.json");
 * ```
 */
export async function useCopyFile(
	source: string,
	destination: string,
	options?: { overwrite?: boolean },
): Promise<FilesystemResult<string>> {
	return runFs(source, async (fs) => {
		const mode = options?.overwrite === false ? fs.constants.COPYFILE_EXCL : 0;
		await fs.copyFile(source, destination, mode);
		return destination;
	});
}

/**
 * Moves (renames) a file or directory.
 *
 * @param source - Source path.
 * @param destination - Destination path.
 * @returns Safe Result with the destination path.
 *
 * @example
 * ```ts
 * await useMoveFile("data/draft.json", "data/books.json");
 * ```
 */
export async function useMoveFile(
	source: string,
	destination: string,
): Promise<FilesystemResult<string>> {
	return runFs(source, async (fs) => {
		await fs.rename(source, destination);
		return destination;
	});
}

/**
 * Removes a file.
 *
 * @param path - File path to remove.
 * @returns Safe Result with the removed path.
 *
 * @example
 * ```ts
 * await useRemoveFile("data/cache/books.json");
 * ```
 */
export async function useRemoveFile(path: string): Promise<FilesystemResult<string>> {
	return runFs(path, async (fs) => {
		await fs.unlink(path);
		return path;
	});
}

/**
 * Removes a directory tree. Recursive by default; `force: false`
 * surfaces `ENOENT` instead of ignoring missing paths.
 *
 * @param path - Directory path to remove.
 * @param options - `recursive` (default `true`) and `force` (default `false`).
 * @returns Safe Result with the removed path.
 *
 * @example
 * ```ts
 * await useRemoveDir("data/cache");
 * ```
 */
export async function useRemoveDir(
	path: string,
	options?: { force?: boolean; recursive?: boolean },
): Promise<FilesystemResult<string>> {
	return runFs(path, async (fs) => {
		await fs.rm(path, {
			force: options?.force ?? false,
			recursive: options?.recursive ?? true,
		});
		return path;
	});
}

/** Resolves `relativePath` against the directory of `importMetaUrl`. */
async function resolveModulePath(importMetaUrl: string, relativePath: string): Promise<string> {
	const base = await useGetDirname(importMetaUrl);
	return useResolvePath(base, relativePath);
}

/**
 * Reads a file resolved from the caller's module directory — the
 * `__dirname` + relative path pattern, without `__dirname`.
 *
 * @param importMetaUrl - Your module's `import.meta.url`.
 * @param relativePath - Path relative to that module (e.g. `"../data/books.json"`).
 * @param encoding - Text encoding (default: `"utf8"`).
 * @returns Safe Result with the file contents as a string.
 *
 * @example
 * ```ts
 * const css = await useReadModuleFile(import.meta.url, "./theme.css");
 * ```
 */
export async function useReadModuleFile(
	importMetaUrl: string,
	relativePath: string,
	encoding: FileEncoding = "utf8",
): Promise<FilesystemResult<string>> {
	return runFs(relativePath, async (fs) => {
		const absolute = await resolveModulePath(importMetaUrl, relativePath);
		return fs.readFile(absolute, encoding);
	});
}

/**
 * Reads and parses a JSON file resolved from the caller's module directory,
 * optionally validating it with a Zod schema.
 *
 * @typeParam T - Expected parsed (and validated) shape.
 * @param importMetaUrl - Your module's `import.meta.url`.
 * @param relativePath - Path relative to that module.
 * @param schema - Optional Zod schema for runtime validation.
 * @returns Safe Result with the parsed data.
 *
 * @example
 * ```ts
 * const result = await useReadModuleJson<Book[]>(import.meta.url, "../data/books.json");
 * if (result.ok) initBooks(result.data);
 * ```
 */
export async function useReadModuleJson<T = unknown>(
	importMetaUrl: string,
	relativePath: string,
	schema?: ZodType<T>,
): Promise<FilesystemResult<T>> {
	return runFs(relativePath, async (fs) => {
		const absolute = await resolveModulePath(importMetaUrl, relativePath);
		return parseJson<T>(await fs.readFile(absolute, "utf8"), absolute, schema);
	});
}
