#!/usr/bin/env node
/**
 * Docs task runner: `node scripts/docs.mjs <dev|build|preview|deploy|gh|clean>`.
 *
 * VitePress shares `docs/.vitepress/.temp` between the dev server and the
 * build, so running both concurrently corrupts it and the build dies with
 * `Cannot find module '…/.vitepress/.temp/…'`. This runner:
 *
 *   1. takes a lock in `.cache/docs.lock.json` (dev and build are exclusive),
 *   2. removes stale locks from dead processes,
 *   3. purges `.temp`/`cache` before a build (never during a live dev server),
 *   4. fails with actionable guidance instead of a cryptic VitePress error.
 *
 * `preview` builds first and then serves that build, so the previewed site is
 * always the complete, current one (UI CSS, TypeDoc reference, changelog).
 *
 * `deploy` does the same and then publishes the build to Cloudflare Pages, so
 * the production site can never be an artifact of a stale or half-finished
 * build.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOCK_FILE = join(ROOT, ".cache", "docs.lock.json");
const VITEPRESS_DIR = join(ROOT, "docs", ".vitepress");
const DIST_DIR = join(VITEPRESS_DIR, "dist");
const TEMP_DIR = join(VITEPRESS_DIR, ".temp");
const CACHE_DIR = join(VITEPRESS_DIR, "cache");
const ROOT_VITEPRESS_DIR = join(ROOT, ".vitepress");

const CLOUDFLARE_PROJECT = "katanakit-docs";
const CLOUDFLARE_BRANCH = "main";

const MODES = new Set(["dev", "build", "preview", "deploy", "gh"]);
const mode = (process.argv[2] ?? "").toLowerCase();

const run = (command, args, opts = {}) =>
	execFileSync(command, args, { cwd: ROOT, stdio: "inherit", ...opts });

/**
 * Removes a tree. `maxRetries` covers the window where another task is still
 * writing into it (ENOTEMPTY/EBUSY), which is exactly the race the lock above
 * exists to prevent in the first place.
 */
const remove = (target) =>
	rmSync(target, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 });

/** Removes the VitePress temp/cache dirs and the stray root `.vitepress/`. */
function clean() {
	remove(TEMP_DIR);
	remove(CACHE_DIR);
	remove(ROOT_VITEPRESS_DIR);
	console.log("docs: cleaned .vitepress/.temp, .vitepress/cache and ./ .vitepress");
}

function readLock() {
	if (!existsSync(LOCK_FILE)) return null;
	try {
		return JSON.parse(readFileSync(LOCK_FILE, "utf8"));
	} catch {
		// A truncated lock (process killed between create and write) must not
		// deadlock the pipeline forever: an unreadable lock is a stale lock.
		remove(LOCK_FILE);
		return null;
	}
}

function processAlive(pid) {
	if (!pid || pid === process.pid) return false;
	try {
		process.kill(pid, 0);
		return true;
	} catch {
		return false;
	}
}

/** Acquires the exclusive docs lock, clearing stale entries. */
function acquire() {
	mkdirSync(join(ROOT, ".cache"), { recursive: true });

	const existing = readLock();
	if (existing && processAlive(existing.pid)) {
		const started = existing.started ?? "unknown";
		if (existing.mode === "dev" && mode !== "dev") {
			console.error(
				[
					`docs: blocked — "bun run dev" is already running (pid ${existing.pid}, started ${started}).`,
					"VitePress shares docs/.vitepress/.temp between dev and build; running both fails with:",
					"  Cannot find module '.../.vitepress/.temp/...'",
					"Stop the dev server (Ctrl+C), then retry — the lock is released automatically.",
				].join("\n"),
			);
		} else {
			console.error(`docs: blocked — another docs task is running (${existing.mode}, pid ${existing.pid}).`);
		}
		process.exit(1);
	}
	if (existing) {
		console.log(`docs: removed stale lock from pid ${existing.pid} (process is gone).`);
		remove(LOCK_FILE);
	}

	// `wx` makes the lock atomic: two tasks starting at the same instant cannot
	// both observe "no lock" and both proceed, which is what corrupts
	// docs/.vitepress/.temp (ENOTEMPTY / missing module).
	try {
		writeFileSync(
			LOCK_FILE,
			JSON.stringify({ pid: process.pid, mode, started: new Date().toISOString() }),
			{ flag: "wx" },
		);
	} catch (error) {
		if (error?.code !== "EEXIST") throw error;
		const holder = readLock();
		console.error(
			`docs: blocked — another docs task grabbed the lock (${holder?.mode ?? "unknown"}, pid ${holder?.pid ?? "unknown"}).`,
		);
		process.exit(1);
	}
}

/**
 * Drops the lock, but only when this process owns it: `clean` and a
 * foreign task must never delete the lock of a live run.
 */
function release() {
	const lock = readLock();
	if (lock && lock.pid !== process.pid) return;
	remove(LOCK_FILE);
}

/**
 * Cloudflare credentials for the deploy: an API token from the environment or
 * from `.env` (gitignored, never committed), otherwise wrangler's OAuth login.
 * Returns the env additions for the child process, or `null` when no token is
 * present — the OAuth session is then used as-is.
 */
function cloudflareEnv() {
	if (process.env.CLOUDFLARE_API_TOKEN?.trim()) return {};

	const envFile = join(ROOT, ".env");
	if (existsSync(envFile)) {
		for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
			const match = /^\s*CLOUDFLARE_API_TOKEN\s*=\s*(.+?)\s*$/.exec(line);
			const value = match?.[1]?.replace(/^["']|["']$/g, "");
			if (value) return { CLOUDFLARE_API_TOKEN: value };
		}
	}
	return null;
}

/** True when wrangler has an OAuth session to fall back on (no API token). */
function hasWranglerSession() {
	return (
		existsSync(join(homedir(), ".config", ".wrangler", "config")) ||
		existsSync(join(homedir(), ".wrangler", "config"))
	);
}

/** Uploads the built site to the Cloudflare Pages project behind the docs domain. */
function deployToCloudflare() {
	if (!existsSync(join(DIST_DIR, "index.html"))) {
		console.error("docs: no build to deploy — expected docs/.vitepress/dist/index.html");
		process.exit(1);
	}

	const env = cloudflareEnv();
	if (!env && !hasWranglerSession()) {
		console.error(
			[
				"docs: no Cloudflare credentials found.",
				"  → set CLOUDFLARE_API_TOKEN in .env (see .env.example)",
				"  → or authenticate with `bunx wrangler login`",
			].join("\n"),
		);
		process.exit(1);
	}

	console.log(`docs: deploying to Cloudflare Pages (${CLOUDFLARE_PROJECT}/${CLOUDFLARE_BRANCH})`);
	run(
		join(ROOT, "node_modules", ".bin", "wrangler"),
		[
			"pages",
			"deploy",
			DIST_DIR,
			"--project-name",
			CLOUDFLARE_PROJECT,
			"--branch",
			CLOUDFLARE_BRANCH,
		],
		{ env: { ...process.env, ...env } },
	);
}

function chain() {
	// `bun run build` already produces packages/ui/dist/styles.css and the npm
	// package copies it. Rebuilding it here is pure duplication when the docs build
	// was chained after one — so the caller can opt out with `--skip-ui`.
	if (!process.argv.includes("--skip-ui")) {
		run("bun", ["run", "build:ui"]);
	}
	run("node", [join(ROOT, "scripts", "docs-prepare.mjs")]);

	if (mode === "dev") {
		// `--host` is not optional in practice: Vite defaults to binding loopback
		// on IPv6 only, so `http://localhost:5173` resolves to 127.0.0.1 first in
		// most browsers and gets connection-refused while the server is healthy.
		// Binding both stacks makes `localhost` work everywhere.
		console.log("docs: dev server starting — do not run docs/docs:gh meanwhile.");
		run("node_modules/.bin/vitepress", ["dev", "docs", "--host"]);
		return;
	}

	// Build/preview/gh: purge shared temp state so a killed process can't poison us.
	remove(TEMP_DIR);
	remove(CACHE_DIR);

	const args = ["build", "docs"];
	if (mode === "gh") args.push("--base", "/katanakit-js/");
	try {
		run("node_modules/.bin/vitepress", args);
	} catch (error) {
		// Two writers in `docs/.vitepress/.temp` (a manual `vitepress build`, a
		// hand-deleted lock) produce two cryptic failures with no page in sight:
		// `Cannot read properties of undefined (reading 'title')` and
		// `Cannot find module '…/.temp/….js'`. Name the real cause once.
		if (error?.status) {
			console.error(
				[
					"docs: vitepress build failed — if the error above mentions `.temp/` or `createTitle`,",
					"another process was writing docs/.vitepress/.temp while this build ran:",
					"  → let the other session/build finish, then re-run `bun run deploy`",
					"  → never delete .cache/docs.lock.json by hand; the runner clears stale locks itself",
				].join("\n"),
			);
		}
		throw error;
	}

	if (mode === "preview") {
		// Serves the build that just ran, so the preview is the complete site
		// (UI CSS, TypeDoc reference and changelog included), never a stale one.
		// `--strictPort` keeps it non-interactive: without it a busy port makes
		// VitePress prompt for another one while we hold the lock, and a
		// non-TTY run (CI) would hang there forever.
		console.log("docs: preview server starting on http://localhost:4173/");
		run("node_modules/.bin/vitepress", [
			"preview",
			"docs",
			"--port",
			"4173",
			"--strictPort",
			"--host",
		]);
		return;
	}

	if (mode === "deploy") {
		deployToCloudflare();
		return;
	}

	if (mode === "gh") {
		run("node", [join(ROOT, "scripts", "docs-publish.mjs")]);
	}
}

if (mode === "clean") {
	// Take the lock first: purging `.temp` while a dev server is live is the
	// corruption this runner exists to prevent.
	acquire();
	try {
		clean();
	} finally {
		release();
	}
} else if (MODES.has(mode)) {
	acquire();
	const onSignal = () => {
		release();
		process.exit(130);
	};
	process.on("SIGINT", onSignal);
	process.on("SIGTERM", onSignal);
	try {
		chain();
	} catch (error) {
		// `chain()` blocks in `execFileSync`, so a Ctrl+C reaches the child
		// first and surfaces here as a signal error instead of the handler
		// above. Translate it into a quiet exit; anything else is a real
		// failure and keeps its stack. The lock is dropped by `finally` on
		// every path (a second `release()` here could delete a lock another
		// task took in the meantime).
		if (error?.signal === "SIGINT" || error?.signal === "SIGTERM") {
			console.log("\ndocs: stopped");
			process.exit(130);
		}
		throw error;
	} finally {
		release();
	}
} else {
	console.error("Usage: node scripts/docs.mjs <dev|build|preview|deploy|gh|clean>");
	process.exit(1);
}
