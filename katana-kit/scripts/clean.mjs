#!/usr/bin/env node
/**
 * Removes every build artifact the repo can regenerate.
 *
 * `bun run clean -- --dry` previews the list without touching anything.
 *
 * Why an allowlist and not a glob: the two generated Prisma contract files
 * (`src/prisma/schema.d.ts` and `src/prisma/schema.json`) are emitted by
 * `prisma contract emit` but are **committed to git**. A pattern-based sweep
 * would happily delete tracked sources, so every target is named explicitly
 * and anything outside this list is never considered.
 *
 * `rimraf` backs the removal itself. Node's `fs.rmSync` is available on the
 * floor declared in `engines.node`, but it surfaces Windows' EBUSY/EPERM on
 * files another process still holds — a dev server with the file mapped, an
 * indexer, an antivirus scan — and gives up. `rimraf` retries those and
 * clears the read-only bit before unlinking, so the same command works on a
 * Windows checkout instead of failing halfway with a half-deleted `dist`.
 */
import { existsSync, readdirSync, statSync } from "node:fs";
import { dirname, isAbsolute, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import { rimrafSync } from "rimraf";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Regenerable paths, each paired with the command that brings it back.
 * Anything not listed here is source and must survive a clean.
 */
const TARGETS = [
	["dist", "bun run build"],
	["packages/ui/dist", "bun run build:ui"],
	["docs/api", "bun run deploy"],
	["docs/changelog.md", "bun run deploy"],
	["docs/.vitepress/dist", "bun run deploy"],
	["docs/.vitepress/cache", "bun run deploy"],
	["docs/.vitepress/.temp", "bun run deploy"],
	["docs/.vitepress/theme/signals.json", "bun run deploy"],
	[".vitepress", "bun run deploy"],
	[".cache", "bun run deploy"],
	["node_modules/.vite", "bun run dev"],
];

/**
 * Sums the byte size of every file under a directory.
 *
 * @param {string} directory - Absolute directory path.
 * @returns {number} Total bytes, or `0` when the tree cannot be walked.
 */
function directorySize(directory) {
	let total = 0;
	let entries;
	try {
		entries = readdirSync(directory, { withFileTypes: true });
	} catch {
		return 0;
	}
	for (const entry of entries) {
		const child = join(directory, entry.name);
		// A symlink is not walked into: `statSync` would follow it and double-count
		// (or loop on a cycle). `rimrafSync` unlinks the link itself either way.
		if (entry.isSymbolicLink()) continue;
		// One unreadable entry must never abort the sweep part-way through.
		try {
			total += entry.isDirectory() ? directorySize(child) : statSync(child).size;
		} catch {
			continue;
		}
	}
	return total;
}

/**
 * Reports the byte size of a path, or `0` when it is absent.
 *
 * @param {string} absolute - Absolute path to measure.
 * @returns {number} Size in bytes.
 */
function bytes(absolute) {
	if (!existsSync(absolute)) return 0;
	try {
		const info = statSync(absolute);
		return info.isDirectory() ? directorySize(absolute) : info.size;
	} catch {
		return 0;
	}
}

/**
 * Formats a byte count for terminal output.
 *
 * @param {number} value - Number of bytes.
 * @returns {string} Human-readable size with a unit.
 */
function format(value) {
	const units = ["B", "KB", "MB", "GB"];
	let size = value;
	let unit = 0;
	while (size >= 1024 && unit < units.length - 1) {
		size /= 1024;
		unit += 1;
	}
	return `${size.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`;
}

const dry = process.argv.includes("--dry") || process.argv.includes("-n");
const present = TARGETS.filter(([target]) => existsSync(join(ROOT, target)));

if (present.length === 0) {
	console.log("clean: nothing to remove.");
	process.exit(0);
}

const rows = present.map(([target, restore]) => {
	const absolute = join(ROOT, target);
	// Containment assert: today every target is a literal, but this keeps a
	// future `..` or absolute entry from turning a clean into a data loss.
	const rel = relative(ROOT, absolute);
	if (rel.startsWith("..") || isAbsolute(rel)) {
		throw new Error(`clean: refusing to touch ${rel} — it escapes the repo`);
	}
	return { label: rel, absolute, restore, size: bytes(absolute) };
});

const total = rows.reduce((sum, row) => sum + row.size, 0);
const width = Math.max(...rows.map((row) => row.label.length));

console.log(dry ? "clean (dry run) — would remove:" : "clean: removing");

for (const row of rows) {
	if (!dry) rimrafSync(row.absolute, { maxRetries: 10, retryDelay: 200 });
	console.log(`  ${row.label.padEnd(width)}  ${format(row.size).padStart(9)}  (${row.restore})`);
}

console.log(
	`${dry ? "clean (dry run)" : "clean"}: ${rows.length} path(s), ${format(total)}.`,
);
if (dry) console.log("clean (dry run): nothing was deleted. Re-run without --dry to apply.");