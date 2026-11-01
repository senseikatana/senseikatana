// ============================================================
// Path facade — Node-only helpers with runtime guards.
// `node:path` and `node:url` load through dynamic `import()` so
// importing this module never pulls Node built-ins into a browser
// bundle. Outside Node/Bun the helpers throw; the filesystem
// service catches that surface and returns a Safe Result instead.
// ============================================================

type PathModule = typeof import("node:path");
type UrlModule = typeof import("node:url");

/**
 * Checks whether the code runs in a Node.js-compatible runtime
 * (Node, Bun or Deno). Returns `false` in browsers and edge runtimes.
 *
 * @returns `true` when `process.versions.node` is available.
 *
 * @example
 * ```ts
 * import { useIsNode } from "katanakit-js";
 *
 * if (useIsNode()) {
 *   // safe to use node:fs / node:path
 * }
 * ```
 */
export const useIsNode = (): boolean =>
	typeof process !== "undefined" && typeof process.versions?.node === "string";

/** Throws when a path helper is called outside a Node-compatible runtime. */
function assertNodeRuntime(): void {
	if (!useIsNode()) {
		throw new Error(
			"[Filesystem] A Node.js-compatible runtime is required to use filesystem helpers.",
		);
	}
}

/** Lazily loads `node:path` and `node:url` (the ESM loader caches both). */
async function loadModules(): Promise<{ path: PathModule; url: UrlModule }> {
	assertNodeRuntime();
	const [path, url] = await Promise.all([import("node:path"), import("node:url")]);
	return { path, url };
}

/**
 * Resolves the directory of a module from its `import.meta.url`.
 *
 * Unlike `import.meta.dirname`, this works for any module you pass in,
 * so a consumer's app resolves its own paths — never KatanaKit's `dist/`.
 *
 * @param importMetaUrl - Your module's `import.meta.url`.
 * @returns The absolute directory that contains the module.
 *
 * @example
 * ```ts
 * import { useGetDirname } from "katanakit-js";
 *
 * const dir = await useGetDirname(import.meta.url);
 * // "<project>/src/features/books"
 * ```
 */
export async function useGetDirname(importMetaUrl: string): Promise<string> {
	const { path, url } = await loadModules();
	return path.dirname(url.fileURLToPath(importMetaUrl));
}

/**
 * Resolves a sequence of path segments into an absolute path.
 * Relative segments resolve against `process.cwd()`; if the first
 * segment is absolute (like a `useGetDirname` result), cwd is ignored.
 *
 * @param segments - Path segments to resolve.
 * @returns The resolved absolute path.
 *
 * @example
 * ```ts
 * const base = await useGetDirname(import.meta.url);
 * const file = await useResolvePath(base, "../data/books.json");
 * ```
 */
export async function useResolvePath(...segments: string[]): Promise<string> {
	const { path } = await loadModules();
	return path.resolve(...segments);
}

/**
 * Joins path segments without resolving against `process.cwd()`.
 *
 * @param segments - Path segments to join.
 * @returns The joined (possibly relative) path.
 *
 * @example
 * ```ts
 * await useJoinPath("data", "books.json"); // "data/books.json"
 * ```
 */
export async function useJoinPath(...segments: string[]): Promise<string> {
	const { path } = await loadModules();
	return path.join(...segments);
}

/**
 * Computes the relative path from `from` to `to`.
 *
 * @param from - Origin path.
 * @param to - Destination path.
 * @returns The relative path between both.
 *
 * @example
 * ```ts
 * await useGetRelativePath("/app/src", "/app/data/books.json"); // "../data/books.json"
 * ```
 */
export async function useGetRelativePath(from: string, to: string): Promise<string> {
	const { path } = await loadModules();
	return path.relative(from, to);
}

/**
 * Returns the last portion of a path (file name).
 *
 * @param filePath - The path to inspect.
 * @param suffix - Optional suffix to strip (e.g. `".json"`).
 * @returns The base name.
 *
 * @example
 * ```ts
 * await useGetBasename("/data/books.json");        // "books.json"
 * await useGetBasename("/data/books.json", ".json"); // "books"
 * ```
 */
export async function useGetBasename(filePath: string, suffix?: string): Promise<string> {
	const { path } = await loadModules();
	return path.basename(filePath, suffix);
}

/**
 * Returns the extension of a path, including the leading dot.
 *
 * @param filePath - The path to inspect.
 * @returns The extension (`""` when there is none).
 *
 * @example
 * ```ts
 * await useGetFileExtension("/data/books.json"); // ".json"
 * ```
 */
export async function useGetFileExtension(filePath: string): Promise<string> {
	const { path } = await loadModules();
	return path.extname(filePath);
}

/**
 * Returns the current working directory of the process (where the
 * command was launched), or `null` outside a Node-compatible runtime.
 * Use it for project-relative paths; use {@link useGetDirname} for
 * file-relative paths.
 *
 * @returns The cwd, or `null` in browsers/edge runtimes.
 *
 * @example
 * ```ts
 * const cwd = useGetCwd(); // "/app" when launched from the project root
 * ```
 */
export function useGetCwd(): string | null {
	return useIsNode() ? process.cwd() : null;
}
