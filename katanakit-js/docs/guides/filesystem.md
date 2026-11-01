---
title: Filesystem (Node/Bun)
description: Node-only file and path helpers with Safe Results, loaded through dynamic import and guarded with useIsNode.
---

# Filesystem (Node/Bun)

Node-only helpers that wrap `node:fs/promises` and `node:path` with the Safe
Result contract. Built-ins load through dynamic `import()`, so importing them is
browser-safe; outside Node/Bun every fallible call returns `ERR_FS_UNAVAILABLE`
instead of throwing.

## Quick example

```ts
import {
  useEnsureDir,
  useReadDir,
  useReadJsonFile,
  useReadModuleJson,
  useWriteJsonFile,
} from "katanakit-js";
import { z } from "zod";

const BooksSchema = z.array(z.object({ title: z.string() }));

// Read relative to the current module (the __dirname pattern, without __dirname)
const result = await useReadModuleJson(import.meta.url, "../data/books.json", BooksSchema);

if (result.ok) {
  console.log(result.data);
} else {
  console.error(result.error.code, result.error.message); // ENOENT | ERR_VALIDATION | ...
}

// Or with an explicit path (relative paths resolve against process.cwd())
await useEnsureDir("data/cache");
await useWriteJsonFile("data/cache/books.json", [{ title: "Kata" }]);
const books = await useReadJsonFile("data/cache/books.json", BooksSchema);
const files = await useReadDir("data/cache", { recursive: true });
```

## Helpers

| Group          | Helpers                                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Read           | `useReadFile`, `useReadFileBuffer`, `useReadJsonFile`, `useReadModuleFile`, `useReadModuleJson`                             |
| Write          | `useWriteFile`, `useAppendFile`, `useWriteJsonFile`, `useEnsureDir`                                                         |
| Inspect        | `useFileExists`, `useGetFileStats`, `useReadDir`                                                                            |
| Checksums      | `useHashFile`, `useVerifyFileHash`                                                                                          |
| Move / delete  | `useCopyFile`, `useMoveFile`, `useRemoveFile`, `useRemoveDir`                                                               |
| Paths          | `useGetDirname`, `useResolvePath`, `useJoinPath`, `useGetRelativePath`, `useGetBasename`, `useGetFileExtension`, `useGetCwd`, `useIsNode` |

| Helper | Returns | Notes |
| ------ | ------- | ----- |
| `useReadFile(path, encoding?)` | `FilesystemResult<string>` | UTF-8 by default. |
| `useReadFileBuffer(path)` | `FilesystemResult<Uint8Array>` | Raw bytes. |
| `useHashFile(path, algorithm?)` | `FilesystemResult<string>` | Streaming `md5`/`sha1`/`sha256`/`sha512` digest (lowercase hex; default `sha256`). |
| `useVerifyFileHash(path, expected, algorithm?)` | `FilesystemResult<boolean>` | Case-insensitive checksum comparison (ISO sidecars, release pages). |
| `useReadJsonFile<T>(path, schema?)` | `FilesystemResult<T>` | Optional Zod schema; failures are `ERR_INVALID_JSON` / `ERR_VALIDATION`. |
| `useReadModuleFile(importMetaUrl, relativePath, encoding?)` | `FilesystemResult<string>` | Path resolved from the caller's module. |
| `useReadModuleJson<T>(importMetaUrl, relativePath, schema?)` | `FilesystemResult<T>` | Same, for JSON. |
| `useWriteFile(path, data, options?)` | `FilesystemResult<string>` | Creates or overwrites; returns the path. |
| `useAppendFile(path, data, options?)` | `FilesystemResult<string>` | Creates the file when missing. |
| `useWriteJsonFile(path, data, { pretty? })` | `FilesystemResult<string>` | Pretty-printed by default; set `pretty: false` for compact. |
| `useEnsureDir(path)` | `FilesystemResult<string>` | `mkdir -p` semantics (creates parents). |
| `useFileExists(path)` | `Promise<boolean>` | Never throws; `false` for missing paths and non-Node runtimes. |
| `useGetFileStats(path)` | `FilesystemResult<FileStats>` | `size`, type flags and epoch-ms timestamps. |
| `useReadDir(path, { recursive? })` | `FilesystemResult<ReadDirEntry[]>` | Entries carry `name`, `path`, `isFile`, `isDirectory`. |
| `useCopyFile(src, dest, { overwrite? })` | `FilesystemResult<string>` | `overwrite: false` → `EEXIST` when the target exists. |
| `useMoveFile(src, dest)` | `FilesystemResult<string>` | Rename/move. |
| `useRemoveFile(path)` | `FilesystemResult<string>` | `unlink`. |
| `useRemoveDir(path, { recursive?, force? })` | `FilesystemResult<string>` | Recursive by default; `force` defaults to `false` so `ENOENT` surfaces. |

## Checksums

`useHashFile` streams the file (never loads it fully into memory) and returns a
lowercase hex digest; `useVerifyFileHash` compares a digest case-insensitively,
so a sidecar `.sha256` written by another tool verifies without reformatting.
Both take an optional algorithm typed by `FileHashAlgorithm`:
`"md5" | "sha1" | "sha256" | "sha512"` (default `"sha256"`).

```ts
import { useHashFile, useVerifyFileHash } from "katanakit-js";

const digest = await useHashFile("releases/katanakit-7.1.4.tgz"); // sha256
if (digest.ok) console.log(digest.data);

// Pick an algorithm explicitly (e.g. an md5 checksum file)
const md5 = await useHashFile("releases/katanakit-7.1.4.tgz", "md5");

// Verify against a published checksum (case-insensitive)
const check = await useVerifyFileHash("releases/katanakit-7.1.4.tgz", "e3b0c442…");
if (check.ok && check.data) console.log("checksum matches");
```

## Safe Results and error codes

| Code | Meaning |
| ---- | ------- |
| `ENOENT`, `EACCES`, `EEXIST`, … | Native Node errno codes, preserved as-is. |
| `ERR_INVALID_JSON` | `useReadJsonFile` / `useReadModuleJson` could not parse the file. |
| `ERR_VALIDATION` | Parsed JSON failed the optional Zod schema (`error.details` carries the issues). |
| `ERR_FS_UNAVAILABLE` | The runtime is not Node/Bun (browser, edge). `useFileExists` returns `false`. |

```ts
const result = await useReadJsonFile("data/books.json", BooksSchema);

if (!result.ok) {
  console.error(result.error.code, result.error.path); // "ENOENT", "data/books.json"
}
```

## Module-relative vs cwd-relative

`useReadModuleFile` and `useReadModuleJson` resolve paths **relative to the
module that calls them** — the `import.meta.dirname` + `path.resolve` pattern
without `__dirname`, `fs` or `path`:

```ts
const result = await useReadModuleJson<Book[]>(import.meta.url, "../data/books.json");
```

- `useGetDirname(import.meta.url)` — the caller's module directory.
- `useResolvePath(...segments)` — like `path.resolve`: relative segments resolve
  against `process.cwd()`, unless the first segment is absolute (a dirname).
- `useJoinPath(...segments)` — like `path.join`: concatenates without resolving
  against cwd.
- `useGetCwd()` — the process working directory (or `null` outside Node/Bun).

Because `src/` compiles to `dist/`, prefer module-relative helpers or an explicit
config/env path for assets that live next to source files.

::: note Why async?

`node:fs/promises`, `node:path` and `node:url` load through dynamic `import()`
so the main bundle stays browser-safe. That is why every helper returns a
promise — including the path utilities. `useGetCwd()` is the only synchronous
helper because it needs no Node module.

:::

