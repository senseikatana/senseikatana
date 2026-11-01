#!/usr/bin/env node
/**
 * Publishes `docs/.vitepress/dist` to the `gh-pages` branch.
 *
 * A throwaway clone in the OS temp directory keeps the project checkout and its
 * index untouched (the `gh-pages` npm package staged the whole working tree,
 * `node_modules/` included, in the project index).
 *
 * Run via `bun run deploy:gh`, which builds with the GitHub Pages base first.
 */
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "docs", ".vitepress", "dist");
const BRANCH = "gh-pages";

const ENV = { ...process.env, GIT_TERMINAL_PROMPT: "0" };
const git = (args, cwd) => execFileSync("git", args, { cwd, stdio: "inherit", env: ENV });
const output = (args, cwd) => execFileSync("git", args, { cwd, encoding: "utf8", env: ENV }).trim();

if (!existsSync(DIST)) {
	console.error(`docs: ${DIST} does not exist — run the VitePress build before publishing.`);
	process.exit(1);
}

const remote = output(["remote", "get-url", "origin"], ROOT);
if (!/^(https?:\/\/|git@|ssh:\/\/)/.test(remote)) {
	console.error(`docs: refusing to clone from an unexpected origin URL: ${remote}`);
	process.exit(1);
}
const sha = output(["rev-parse", "--short", "HEAD"], ROOT);
const work = mkdtempSync(join(tmpdir(), "katanakit-gh-pages-"));

try {
	// Distinguish "branch does not exist yet" from auth/network failures.
	let hasBranch = true;
	try {
		output(["ls-remote", "--exit-code", "--heads", "origin", BRANCH], ROOT);
	} catch {
		hasBranch = false;
	}

	if (hasBranch) {
		git(["clone", "--branch", BRANCH, "--single-branch", "--depth", "1", remote, work], ROOT);
	} else {
		// First publish: start an orphan branch instead of failing.
		git(["init", "-b", BRANCH], work);
		git(["remote", "add", "origin", remote], work);
	}

	for (const entry of readdirSync(work)) {
		if (entry !== ".git") {
			rmSync(join(work, entry), { recursive: true, force: true });
		}
	}
	for (const entry of readdirSync(DIST)) {
		// `dereference` keeps a symlink from `docs/public` out of the published
		// tree: the gh-pages branch must contain only real files.
		cpSync(join(DIST, entry), join(work, entry), { recursive: true, dereference: true });
	}

	git(["add", "-A"], work);
	git(
		[
			"-c",
			"user.name=docs-publish",
			"-c",
			"user.email=docs-publish@users.noreply.github.com",
			"commit",
			"-m",
			`docs: publish preview ${sha}`,
		],
		work,
	);
	git(["push", "origin", `HEAD:${BRANCH}`], work);
	console.log(`Published docs/.vitepress/dist to ${BRANCH} (${sha}).`);
} finally {
	rmSync(work, { recursive: true, force: true });
}
