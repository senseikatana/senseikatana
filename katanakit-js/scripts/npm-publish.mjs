#!/usr/bin/env node
/**
 * Publishes the current `package.json` version to npm, but only after the
 * whole release is coherent. Preflight, in order:
 *
 *   1. the working tree is clean and the branch has no unpushed commits
 *   2. `v<version>` exists locally and on origin
 *   3. HEAD contains the tagged commit and the shipped paths (src, scss,
 *      package.json, tsconfig) are identical between the tag and HEAD, so the
 *      tarball cannot diverge from the release
 *   4. CHANGELOG.md has a `## [<version>]` section
 *   5. README/docs version refs are synced (`--sync-versions` is a no-op)
 *   6. `dist/` exists and is newer than its sources (npm publishes dist)
 *   7. the version is not already on the registry
 *
 * Then runs `npm publish --access public` with inherited stdio, so npm's web
 * 2FA approval (EOTP: open the printed URL) can complete in a real terminal.
 *
 * Usage:
 *   bun run release                                  # build, notes, preflight, publish
 *   node scripts/npm-publish.mjs --check             # preflight only, never publishes
 *   node scripts/npm-publish.mjs --dry-run           # npm publish --dry-run (no upload)
 *   node scripts/npm-publish.mjs --otp=123456
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PKG = "katanakit-js";
const args = process.argv.slice(2);
const checkOnly = args.includes("--check");
const npmArgs = args.filter((arg) => arg !== "--check");

const run = (cmd, cmdArgs, opts = {}) =>
	execFileSync(cmd, cmdArgs, { cwd: ROOT, encoding: "utf8", ...opts }).trim();

const runOr = (cmd, cmdArgs) => {
	try {
		// Probe: stderr stays quiet (e.g. `npm view` 404s are expected here).
		return execFileSync(cmd, cmdArgs, {
			cwd: ROOT,
			encoding: "utf8",
			stdio: ["ignore", "pipe", "ignore"],
		}).trim();
	} catch {
		return undefined;
	}
};

function fail(message, hint) {
	console.error(`\n✖ ${message}`);
	if (hint) console.error(`  → ${hint}`);
	process.exit(1);
}

/** Newest mtime (ms) under a directory tree. */
function newestMtime(dir) {
	let newest = 0;
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) newest = Math.max(newest, newestMtime(full));
		else if (entry.isFile()) newest = Math.max(newest, statSync(full).mtimeMs);
	}
	return newest;
}

/** Paths whose content ends up in the published tarball. */
const SHIPPED_PATHS = ["src", "packages/ui/src", "scss", "package.json", "tsconfig.json"];

const version = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")).version;
const tag = `v${version}`;
console.log(`\n📦 ${PKG}@${version} (tag ${tag})\n`);

if (run("git", ["status", "--porcelain"])) {
	fail("El árbol de trabajo no está limpio.", "Terminá tu flujo de release (useGit push) antes de publicar.");
}

if (!runOr("git", ["rev-parse", "-q", "--verify", `refs/tags/${tag}`])) {
	fail(`El tag ${tag} no existe localmente.`, "Cortá el release primero (useGit push --release).");
}

if (!runOr("git", ["ls-remote", "--exit-code", "--tags", "origin", `refs/tags/${tag}`])) {
	fail(`El tag ${tag} no está en origin.`, `Subilo con: git push origin ${tag}`);
}

const tagCommit = run("git", ["rev-parse", `${tag}^{}`]);

if (runOr("git", ["merge-base", "--is-ancestor", tagCommit, "HEAD"]) === undefined) {
	fail(
		`HEAD no contiene el commit del tag ${tag}.`,
		"Publicá desde el commit tagueado (o desde commits posteriores que no toquen el build).",
	);
}

if (runOr("git", ["diff", "--quiet", tagCommit, "HEAD", "--", ...SHIPPED_PATHS]) === undefined) {
	fail(
		`Hay cambios sin liberar entre ${tag} y HEAD en rutas que se publican.`,
		"El tarball no coincidiría con el tag: cortá un release nuevo (useGit push --release) o volvé al commit tagueado.",
	);
}

const upstream = runOr("git", ["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{upstream}"]);
if (upstream) {
	const ahead = Number(run("git", ["rev-list", "--count", `${upstream}..HEAD`]));
	if (ahead > 0) {
		fail(
			`Tenés ${ahead} commit(s) sin pushear.`,
			"Pusheá la rama antes de publicar: el tag y el árbol deben estar en origin.",
		);
	}
}

const changelog = readFileSync(join(ROOT, "CHANGELOG.md"), "utf8");
if (!new RegExp(`^## \\[${version.replace(/\./g, "\\.")}\\]`, "m").test(changelog)) {
	fail(
		`CHANGELOG.md no tiene la sección [${version}].`,
		`Generala con: node scripts/generate-release-notes.mjs ${tag} --write`,
	);
}

run("node", [join("scripts", "generate-release-notes.mjs"), "--sync-versions"]);
if (run("git", ["status", "--porcelain"])) {
	fail(
		"Las refs de versión no estaban sincronizadas (package.json, README y docs).",
		"El sync las cambió: commitealas y reintentá.",
	);
}

const distCode = join(ROOT, "dist", "index.js");
if (!existsSync(distCode)) {
	fail("No hay build en dist/.", "Corré: bun run build (o directamente bun run release).");
}

if (newestMtime(join(ROOT, "src")) > statSync(distCode).mtimeMs) {
	fail("dist/ es más viejo que src/.", "El build está desactualizado: corré bun run build (o bun run release).");
}

const distStyles = join(ROOT, "dist", "styles.css");
const styleSources = [join(ROOT, "scss"), join(ROOT, "packages", "ui", "src")].filter(existsSync);
if (!existsSync(distStyles) || Math.max(0, ...styleSources.map(newestMtime)) > statSync(distStyles).mtimeMs) {
	fail(
		"dist/styles.css está ausente o desactualizado.",
		"Corré bun run build (recompila @katanakit/ui y copia styles.css).",
	);
}

if (runOr("npm", ["view", `${PKG}@${version}`, "version"])) {
	fail(`${PKG}@${version} ya está publicado en npm.`, "No hay nada para publicar: bumpeá la versión primero.");
}

console.log("✔ Preflight OK");
if (checkOnly) {
	console.log("(--check: no se publicó nada)\n");
	process.exit(0);
}

if (!runOr("npm", ["whoami"])) {
	console.log("→ npm login");
	execFileSync("npm", ["login"], { cwd: ROOT, stdio: "inherit" });
}

console.log(`→ npm publish --access public${npmArgs.length ? ` ${npmArgs.join(" ")}` : ""}`);
console.log("  (si npm pide 2FA, abrí la URL que imprime y aprobá; el publish sigue solo)\n");
execFileSync("npm", ["publish", "--access", "public", ...npmArgs], { cwd: ROOT, stdio: "inherit" });
console.log(`\n✅ ${PKG}@${version} publicado.\n`);
