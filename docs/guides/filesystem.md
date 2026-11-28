---
title: Filesystem (Node/Bun)
description: Node-only file and path helpers with Safe Results, loaded through dynamic import and guarded with onIsNode.
---

# Filesystem (Node/Bun)

Node-only helpers that wrap `node:fs/promises` and `node:path` with the Safe
Result contract. Built-ins load through dynamic `import()`, so importing them is
browser-safe; outside Node/Bun every fallible call returns `ERR_FS_UNAVAILABLE`
instead of throwing.

## Quick example

```ts
import {
  onEnsureDir,
  onReadDir,
  onReadJsonFile,
  onReadModuleJson,
  onWriteJsonFile,
} from "katanakit-js";
import { z } from "zod";

const BooksSchema = z.array(z.object({ title: z.string() }));

// Read relative to the current module (the __dirname pattern, without __dirname)
const result = await onReadModuleJson(import.meta.url, "../data/books.json", BooksSchema);

if (result.ok) {
  console.log(result.data);
} else {
  console.error(result.error.code, result.error.message); // ENOENT | ERR_VALIDATION | ...
}

// Or with an explicit path (relative paths resolve against process.cwd())
await onEnsureDir("data/cache");
await onWriteJsonFile("data/cache/books.json", [{ title: "Kata" }]);
const books = await onReadJsonFile("data/cache/books.json", BooksSchema);
const files = await onReadDir("data/cache", { recursive: true });
```

## Helpers

| Group          | Helpers                                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Read           | `onReadFile`, `onReadFileBuffer`, `onReadJsonFile`, `onReadModuleFile`, `onReadModuleJson`                             |
| Write          | `onWriteFile`, `onAppendFile`, `onWriteJsonFile`, `onEnsureDir`                                                         |
| Inspect        | `onFileExists`, `onGetFileStats`, `onReadDir`                                                                            |
| Checksums      | `onHashFile`, `onVerifyFileHash`                                                                                          |
| Move / delete  | `onCopyFile`, `onMoveFile`, `onRemoveFile`, `onRemoveDir`                                                               |
| Paths          | `onGetDirname`, `onResolvePath`, `onJoinPath`, `onGetRelativePath`, `onGetBasename`, `onGetFileExtension`, `onGetCwd`, `onIsNode` |

| Helper | Returns | Notes |
| ------ | ------- | ----- |
| `onReadFile(path, encoding?)` | `FilesystemResult<string>` | UTF-8 by default. |
| `onReadFileBuffer(path)` | `FilesystemResult<Uint8Array>` | Raw bytes. |
| `onHashFile(path, algorithm?)` | `FilesystemResult<string>` | Streaming `md5`/`sha1`/`sha256`/`sha512` digest (lowercase hex; default `sha256`). |
| `onVerifyFileHash(path, expected, algorithm?)` | `FilesystemResult<boolean>` | Case-insensitive checksum comparison (ISO sidecars, release pages). |
| `onReadJsonFile<T>(path, schema?)` | `FilesystemResult<T>` | Optional Zod schema; failures are `ERR_INVALID_JSON` / `ERR_VALIDATION`. |
| `onReadModuleFile(importMetaUrl, relativePath, encoding?)` | `FilesystemResult<string>` | Path resolved from the caller's module. |
| `onReadModuleJson<T>(importMetaUrl, relativePath, schema?)` | `FilesystemResult<T>` | Same, for JSON. |
| `onWriteFile(path, data, options?)` | `FilesystemResult<string>` | Creates or overwrites; returns the path. |
| `onAppendFile(path, data, options?)` | `FilesystemResult<string>` | Creates the file when missing. |
| `onWriteJsonFile(path, data, { pretty? })` | `FilesystemResult<string>` | Pretty-printed by default; set `pretty: false` for compact. |
| `onEnsureDir(path)` | `FilesystemResult<string>` | `mkdir -p` semantics (creates parents). |
| `onFileExists(path)` | `Promise<boolean>` | Never throws; `false` for missing paths and non-Node runtimes. |
| `onGetFileStats(path)` | `FilesystemResult<FileStats>` | `size`, type flags and epoch-ms timestamps. |
| `onReadDir(path, { recursive? })` | `FilesystemResult<ReadDirEntry[]>` | Entries carry `name`, `path`, `isFile`, `isDirectory`. |
| `onCopyFile(src, dest, { overwrite? })` | `FilesystemResult<string>` | `overwrite: false` → `EEXIST` when the target exists. |
| `onMoveFile(src, dest)` | `FilesystemResult<string>` | Rename/move. |
| `onRemoveFile(path)` | `FilesystemResult<string>` | `unlink`. |
| `onRemoveDir(path, { recursive?, force? })` | `FilesystemResult<string>` | Recursive by default; `force` defaults to `false` so `ENOENT` surfaces. |

## Checksums

`onHashFile` streams the file (never loads it fully into memory) and returns a
lowercase hex digest; `onVerifyFileHash` compares a digest case-insensitively,
so a sidecar `.sha256` written by another tool verifies without reformatting.
Both take an optional algorithm typed by `FileHashAlgorithm`:
`"md5" | "sha1" | "sha256" | "sha512"` (default `"sha256"`).

```ts
import { onHashFile, onVerifyFileHash } from "katanakit-js";

const digest = await onHashFile("releases/katanakit-7.3.0.tgz"); // sha256
if (digest.ok) console.log(digest.data);

// Pick an algorithm explicitly (e.g. an md5 checksum file)
const md5 = await onHashFile("releases/katanakit-7.3.0.tgz", "md5");

// Verify against a published checksum (case-insensitive)
const check = await onVerifyFileHash("releases/katanakit-7.3.0.tgz", "e3b0c442…");
if (check.ok && check.data) console.log("checksum matches");
```

## Safe Results and error codes

| Code | Meaning |
| ---- | ------- |
| `ENOENT`, `EACCES`, `EEXIST`, … | Native Node errno codes, preserved as-is. |
| `ERR_INVALID_JSON` | `onReadJsonFile` / `onReadModuleJson` could not parse the file. |
| `ERR_VALIDATION` | Parsed JSON failed the optional Zod schema (`error.details` carries the issues). |
| `ERR_FS_UNAVAILABLE` | The runtime is not Node/Bun (browser, edge). `onFileExists` returns `false`. |

```ts
const result = await onReadJsonFile("data/books.json", BooksSchema);

if (!result.ok) {
  console.error(result.error.code, result.error.path); // "ENOENT", "data/books.json"
}
```

## Module-relative vs cwd-relative

`onReadModuleFile` and `onReadModuleJson` resolve paths **relative to the
module that calls them** — the `import.meta.dirname` + `path.resolve` pattern
without `__dirname`, `fs` or `path`:

```ts
const result = await onReadModuleJson<Book[]>(import.meta.url, "../data/books.json");
```

- `onGetDirname(import.meta.url)` — the caller's module directory.
- `onResolvePath(...segments)` — like `path.resolve`: relative segments resolve
  against `process.cwd()`, unless the first segment is absolute (a dirname).
- `onJoinPath(...segments)` — like `path.join`: concatenates without resolving
  against cwd.
- `onGetCwd()` — the process working directory (or `null` outside Node/Bun).

Because `src/` compiles to `dist/`, prefer module-relative helpers or an explicit
config/env path for assets that live next to source files.

::: note Why async?

`node:fs/promises`, `node:path` and `node:url` load through dynamic `import()`
so the main bundle stays browser-safe. That is why every helper returns a
promise — including the path utilities. `onGetCwd()` is the only synchronous
helper because it needs no Node module.

:::

