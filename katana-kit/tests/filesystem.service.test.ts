import { mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { z } from "zod";

import {
	useAppendFile,
	useCopyFile,
	useEnsureDir,
	useFileExists,
	useGetFileStats,
	useHashFile,
	useMoveFile,
	useReadDir,
	useReadFile,
	useReadFileBuffer,
	useReadJsonFile,
	useReadModuleFile,
	useReadModuleJson,
	useRemoveDir,
	useRemoveFile,
	useVerifyFileHash,
	useWriteFile,
	useWriteJsonFile,
} from "@/infrastructure/filesystem/filesystem.service";
import {
	useGetBasename,
	useGetCwd,
	useGetDirname,
	useGetFileExtension,
	useGetRelativePath,
	useIsNode,
	useJoinPath,
	useResolvePath,
} from "@/infrastructure/filesystem/path.service";

let workspace: string;

beforeAll(async () => {
	workspace = await mkdtemp(join(tmpdir(), "katanakit-fs-"));
});

afterAll(async () => {
	await rm(workspace, { force: true, recursive: true });
});

/** Creates an isolated directory for a single test. */
async function scopedDir(name: string): Promise<string> {
	const dir = join(workspace, name);
	await rm(dir, { force: true, recursive: true });
	await mkdir(dir, { recursive: true });
	return dir;
}

describe("filesystem.service", () => {
	it("writes and reads a text file", async () => {
		const dir = await scopedDir("text");
		const file = join(dir, "hello.txt");

		const written = await useWriteFile(file, "hola");
		const read = await useReadFile(file);

		expect(written).toMatchObject({ data: file, ok: true });
		expect(read).toMatchObject({ data: "hola", ok: true });
	});

	it("reads a file as raw bytes", async () => {
		const dir = await scopedDir("bytes");
		const file = join(dir, "raw.bin");
		await useWriteFile(file, new Uint8Array([1, 2, 3]));

		const result = await useReadFileBuffer(file);

		expect(result.ok).toBe(true);
		expect(Array.from(result.data as Uint8Array)).toEqual([1, 2, 3]);
	});

	it("appends text to an existing file", async () => {
		const dir = await scopedDir("append");
		const file = join(dir, "log.txt");

		await useWriteFile(file, "line 1\n");
		await useAppendFile(file, "line 2\n");
		const result = await useReadFile(file);

		expect(result).toMatchObject({ data: "line 1\nline 2\n", ok: true });
	});

	it("hashes files and verifies checksums", async () => {
		const dir = await scopedDir("hash");
		const file = join(dir, "hello.txt");
		await useWriteFile(file, "hello");

		const sha256 = await useHashFile(file);
		const md5 = await useHashFile(file, "md5");
		const valid = await useVerifyFileHash(
			file,
			"2CF24DBA5FB0A30E26E83B2AC5B9E29E1B161E5C1FA7425E73043362938B9824",
		);
		const invalid = await useVerifyFileHash(file, "deadbeef");

		expect(sha256).toMatchObject({
			data: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
			ok: true,
		});
		expect(md5.data).toBe("5d41402abc4b2a76b9719d911017c592");
		expect(valid).toMatchObject({ data: true, ok: true });
		expect(invalid).toMatchObject({ data: false, ok: true });
	});

	it("returns an ENOENT Safe Result for a missing file", async () => {
		const result = await useReadFile(join(workspace, "missing", "nope.txt"));

		expect(result).toMatchObject({ error: { code: "ENOENT" }, ok: false });
	});

	it("writes and reads JSON with schema validation", async () => {
		const dir = await scopedDir("json");
		const file = join(dir, "book.json");
		const schema = z.object({ title: z.string() });

		await useWriteJsonFile(file, { title: "Kata" });
		const valid = await useReadJsonFile(file, schema);

		expect(valid).toMatchObject({ data: { title: "Kata" }, ok: true });

		await useWriteJsonFile(file, { title: 42 });
		const invalid = await useReadJsonFile(file, schema);

		expect(invalid).toMatchObject({ error: { code: "ERR_VALIDATION" }, ok: false });
	});

	it("reports invalid JSON with ERR_INVALID_JSON", async () => {
		const dir = await scopedDir("invalid-json");
		const file = join(dir, "broken.json");
		await useWriteFile(file, "{ not json");

		const result = await useReadJsonFile(file);

		expect(result).toMatchObject({ error: { code: "ERR_INVALID_JSON" }, ok: false });
	});

	it("lists directory entries with type flags", async () => {
		const dir = await scopedDir("readdir");
		await useWriteFile(join(dir, "a.txt"), "a");
		await useEnsureDir(join(dir, "sub"));
		await useWriteFile(join(dir, "sub", "b.txt"), "b");

		const flat = await useReadDir(dir);

		expect(flat.ok).toBe(true);
		if (!flat.ok) return;
		expect(flat.data.map((entry) => entry.name).sort()).toEqual(["a.txt", "sub"]);
		expect(flat.data.find((entry) => entry.name === "a.txt")?.isFile).toBe(true);
		expect(flat.data.find((entry) => entry.name === "sub")?.isDirectory).toBe(true);

		const recursive = await useReadDir(dir, { recursive: true });

		expect(recursive.ok).toBe(true);
		if (!recursive.ok) return;
		const nested = recursive.data.find((entry) => entry.name === "b.txt");
		expect(nested?.path).toBe(join(dir, "sub", "b.txt"));
	});

	it("ensures nested directories and checks existence", async () => {
		const dir = await scopedDir("ensure");
		const nested = join(dir, "a", "b", "c");

		const ensured = await useEnsureDir(nested);

		expect(ensured).toMatchObject({ data: nested, ok: true });
		expect(await useFileExists(nested)).toBe(true);
		expect(await useFileExists(join(dir, "a", "missing"))).toBe(false);
	});

	it("copies and moves files", async () => {
		const dir = await scopedDir("copy-move");
		const source = join(dir, "source.txt");
		const copy = join(dir, "copy.txt");
		const moved = join(dir, "moved.txt");
		await useWriteFile(source, "payload");

		const copied = await useCopyFile(source, copy);
		const movedResult = await useMoveFile(copy, moved);

		expect(copied).toMatchObject({ data: copy, ok: true });
		expect(movedResult).toMatchObject({ data: moved, ok: true });
		expect(await useFileExists(source)).toBe(true);
		expect(await useFileExists(copy)).toBe(false);
		expect(await useReadFile(moved)).toMatchObject({ data: "payload", ok: true });
	});

	it("refuses to overwrite when overwrite is false", async () => {
		const dir = await scopedDir("copy-excl");
		const source = join(dir, "source.txt");
		const target = join(dir, "target.txt");
		await useWriteFile(source, "new");
		await useWriteFile(target, "old");

		const result = await useCopyFile(source, target, { overwrite: false });

		expect(result).toMatchObject({ error: { code: "EEXIST" }, ok: false });
		expect(await useReadFile(target)).toMatchObject({ data: "old", ok: true });
	});

	it("returns portable file stats", async () => {
		const dir = await scopedDir("stats");
		const file = join(dir, "stats.txt");
		await useWriteFile(file, "12345");

		const result = await useGetFileStats(file);

		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.data.size).toBe(5);
		expect(result.data.isFile).toBe(true);
		expect(result.data.isDirectory).toBe(false);
		expect(result.data.modifiedAt).toBeGreaterThan(0);
	});

	it("removes files and directories", async () => {
		const dir = await scopedDir("remove");
		const file = join(dir, "bye.txt");
		const tree = join(dir, "tree");
		await useWriteFile(file, "bye");
		await useEnsureDir(join(tree, "deep"));

		const removedFile = await useRemoveFile(file);
		const removedDir = await useRemoveDir(tree);

		expect(removedFile).toMatchObject({ data: file, ok: true });
		expect(removedDir).toMatchObject({ data: tree, ok: true });
		expect(await useFileExists(file)).toBe(false);
		expect(await useFileExists(tree)).toBe(false);
	});

	it("reads module-relative files and JSON", async () => {
		const dir = await scopedDir("module");
		const moduleUrl = pathToFileURL(join(dir, "reader.mjs")).href;
		await useWriteFile(join(dir, "notes.txt"), "module data");
		await useWriteJsonFile(join(dir, "books.json"), [{ title: "Kata" }]);

		const text = await useReadModuleFile(moduleUrl, "./notes.txt");
		const json = await useReadModuleJson<{ title: string }[]>(moduleUrl, "./books.json");

		expect(text).toMatchObject({ data: "module data", ok: true });
		expect(json).toMatchObject({ data: [{ title: "Kata" }], ok: true });
	});

	it("returns ERR_FS_UNAVAILABLE when Node is not the runtime", async () => {
		const versions = process.versions as Record<string, string | undefined>;
		const original = versions.node;
		try {
			delete versions.node;

			const file = await useReadFile("whatever.txt");

			expect(file).toMatchObject({ error: { code: "ERR_FS_UNAVAILABLE" }, ok: false });
			expect(await useFileExists("whatever.txt")).toBe(false);
			expect(useGetCwd()).toBeNull();
			expect(useIsNode()).toBe(false);
		} finally {
			versions.node = original;
		}
	});
});

describe("path.service", () => {
	it("resolves dirnames from import.meta.url", async () => {
		const dir = await scopedDir("path-dirname");
		const moduleUrl = pathToFileURL(join(dir, "module.mjs")).href;

		await expect(useGetDirname(moduleUrl)).resolves.toBe(dir);
	});

	it("resolves, joins and relativizes paths", async () => {
		const base = join(workspace, "path-base");

		await expect(useResolvePath(base, "../data/books.json")).resolves.toBe(
			join(workspace, "data", "books.json"),
		);
		await expect(useJoinPath("data", "books.json")).resolves.toBe(join("data", "books.json"));
		await expect(useGetRelativePath(workspace, join(workspace, "data", "books.json"))).resolves.toBe(
			join("data", "books.json"),
		);
	});

	it("exposes basename and extension helpers", async () => {
		await expect(useGetBasename("/data/books.json")).resolves.toBe("books.json");
		await expect(useGetBasename("/data/books.json", ".json")).resolves.toBe("books");
		await expect(useGetFileExtension("/data/books.json")).resolves.toBe(".json");
	});

	it("reports the current working directory in Node", () => {
		expect(useGetCwd()).toBe(process.cwd());
		expect(useIsNode()).toBe(true);
	});
});
