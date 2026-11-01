#!/usr/bin/env node
/**
 * Serves the e2e fixture over http for the Playwright suite.
 *
 * Deliberately tiny and dependency-free: it only needs to hand two files to a
 * browser over http so the real cascade applies — `@layer` support and animation
 * timing both depend on the browser actually parsing the stylesheet, so a
 * `file://` URL or an inlined `<style>` would not exercise the same path.
 *
 * Runs `bun run build:ui` first, because the assertions run against the compiled
 * `packages/ui/dist/styles.css`, not the SCSS source.
 */
import { execFileSync } from "node:child_process";
import { createReadStream, existsSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.env.FIXTURE_PORT ?? 4178);

const UI_DIST = join(ROOT, "packages/ui/dist");

const ROUTES = {
	"/": { file: join(ROOT, "tests/e2e/fixture/index.html"), type: "text/html; charset=utf-8" },
	"/index.html": {
		file: join(ROOT, "tests/e2e/fixture/index.html"),
		type: "text/html; charset=utf-8",
	},
};

const TYPES = {
	".js": "text/javascript; charset=utf-8",
	".mjs": "text/javascript; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".map": "application/json",
	".json": "application/json",
};

execFileSync("bun", ["run", "build:ui"], { cwd: ROOT, stdio: "inherit" });

for (const { file } of Object.values(ROUTES)) {
	if (!existsSync(file)) {
		console.error(`serve-fixture: missing ${file}`);
		process.exit(1);
	}
}

/**
 * Resolves a request path to a file, or `null` when it is not servable.
 *
 * Anything under the built UI package is served from disk because `index.js` is
 * a barrel: the browser follows its relative `./components/*.js` imports, so
 * serving only the entrypoint 404s on the first re-export.
 *
 * @param {string} pathname - URL path, already split from its query string.
 * @returns {{ file: string, type: string } | null}
 */
function resolve(pathname) {
	if (ROUTES[pathname]) return ROUTES[pathname];

	// The stylesheet and the bundle are exposed at fixed paths; the bundle's own
	// relative imports then resolve under the dist root.
	if (pathname === "/ui.css") {
		return { file: join(UI_DIST, "styles.css"), type: "text/css; charset=utf-8" };
	}
	if (pathname === "/ui.js") {
		return { file: join(UI_DIST, "index.js"), type: "text/javascript; charset=utf-8" };
	}

	const relative = normalize(pathname).replace(/^[/\\]+/, "");
	// Containment: a `..` must never escape the built package.
	if (!relative || relative.startsWith("..")) return null;

	const file = join(UI_DIST, relative);
	if (!file.startsWith(UI_DIST) || !existsSync(file)) return null;

	const type = TYPES[extname(file)] ?? "application/octet-stream";
	return { file, type };
}

const server = createServer((request, response) => {
	const pathname = (request.url ?? "/").split("?")[0];
	const route = resolve(pathname);

	if (!route) {
		response.writeHead(404, { "content-type": "text/plain" });
		response.end("not found");
		return;
	}

	response.writeHead(200, {
		"content-type": route.type,
		// Never let a stale build answer a test run.
		"cache-control": "no-store",
	});
	createReadStream(route.file).pipe(response);
});

server.listen(PORT, "127.0.0.1", () => {
	console.log(`serve-fixture: http://127.0.0.1:${PORT}`);
});