import { z } from "zod";

/** Text encodings accepted by the filesystem helpers. */
export const FileEncodingSchema = z.enum([
	"utf8",
	"utf-8",
	"ascii",
	"base64",
	"base64url",
	"hex",
	"latin1",
	"binary",
	"ucs2",
	"ucs-2",
	"utf16le",
	"utf-16le",
]);

/** Hash algorithms supported by `useHashFile` / `useVerifyFileHash`. */
export const FileHashAlgorithmSchema = z.enum(["md5", "sha1", "sha256", "sha512"]);

/** Safe error from a filesystem operation (`NodeJS.ErrnoException`-shaped). */
export const FilesystemErrorSchema = z.object({
	code: z.string(),
	message: z.string(),
	path: z.string().optional(),
	details: z.unknown().optional(),
});

/** Portable stats subset for a file or directory. */
export const FileStatsSchema = z.object({
	size: z.number(),
	isFile: z.boolean(),
	isDirectory: z.boolean(),
	isSymbolicLink: z.boolean(),
	/** Creation time in epoch milliseconds (`birthtimeMs`). */
	createdAt: z.number(),
	/** Last modification time in epoch milliseconds (`mtimeMs`). */
	modifiedAt: z.number(),
	/** Last access time in epoch milliseconds (`atimeMs`). */
	accessedAt: z.number(),
});

/** A single directory entry with pre-resolved type flags. */
export const ReadDirEntrySchema = z.object({
	name: z.string(),
	path: z.string(),
	isFile: z.boolean(),
	isDirectory: z.boolean(),
});

/** Options for directory listing. */
export const ReadDirOptionsSchema = z.object({
	recursive: z.boolean().optional(),
});

/** Options for writing or appending files. */
export const WriteFileOptionsSchema = z.object({
	encoding: FileEncodingSchema.optional(),
	mode: z.number().int().nonnegative().optional(),
	flag: z.string().optional(),
});
