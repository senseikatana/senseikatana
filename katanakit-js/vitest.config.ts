import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

const ROOT_DIR = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
	clearScreen: true,
	resolve: {
		alias: [
			// Resolve Solid's client builds in tests — the default node condition
			// maps `solid-js` / `solid-js/store` to the SSR builds where signals,
			// effects and stores are no-ops. Anchored regexes so the bare package
			// alias does not swallow the `solid-js/store` subpath.
			{
				find: /^solid-js$/,
				replacement: resolve(ROOT_DIR, "node_modules/solid-js/dist/solid.js"),
			},
			{
				find: /^solid-js\/store$/,
				replacement: resolve(ROOT_DIR, "node_modules/solid-js/store/dist/store.js"),
			},
			{ find: "@", replacement: resolve(ROOT_DIR, "src") },
		],
		tsconfigPaths: true,
	},
	base: "/",
	test: {
		environment: "node",
		include: ["tests/**/*.test.ts", "packages/**/tests/**/*.test.ts"],
		// `tests/e2e/` is Playwright's, not Vitest's. It runs against a real
		// browser (`bun run test:e2e`) and Playwright's fixtures make no sense
		// inside Vitest, which reports them as a load error.
		exclude: ["tests/e2e/**", "**/node_modules/**", "**/dist/**"],
		coverage: {
			// V8 is Vitest's default and the only provider that needs no source
			// instrumentation pass. It requires Node's native V8 coverage, so it
			// only works because Vitest forks its pool with Node even when the
			// CLI itself is launched by Bun. Do not switch the CLI to `--bun`.
			provider: "v8",
			reportsDirectory: "./coverage",
			// `text` is the per-file table that names the uncovered files and the
			// uncovered line ranges; `html` is the browsable local report;
			// `lcov` + `json-summary` are the machine-readable pair for tooling.
			reporter: ["text", "html", "lcov", "json-summary"],
			// Without an explicit `include`, the v8 provider only reports the
			// modules it actually saw loaded, which silently hides every file no
			// test touches. Listing the shipped sources makes those files show up
			// at 0% instead. Only code that ships is measured: `tests/`,
			// `examples/`, `scripts/` and `dist/` are not library source.
			include: ["src/**/*.ts", "packages/ui/src/**/*.ts"],
			// Modules that compile to nothing are a zero denominator, not untested
			// code. Verified against `coverage-summary.json`: all 28 `index.ts`
			// barrels and both type-only modules report 0/0 statements, and the v8
			// reporter still prints them as 0%, dragging the totals down without
			// describing anything a test could cover.
			exclude: ["**/index.ts", "**/*.d.ts", "**/*.types.ts"],
			// Ratchet floors, derived from the measured baseline of 62.89 / 55.05 /
			// 55.52 / 65.28 (see CONTRIBUTING.md "Test coverage") minus ~5 points of
			// headroom. They are floors to raise as the 20 uncovered modules get
			// tests, NOT targets to hit. Global only: `perFile` is deliberately off,
			// because measured data shows whole modules at 0% for structural
			// reasons (Worker/Sensors/Viewport/Observer need a real browser, which
			// `bun run test:e2e` covers instead), so a per-file floor would be
			// permanently red and therefore meaningless.
			//
			// These only ever apply to `bunx vitest run --coverage`. `check` and `build`
			// invoke `vitest run` without `--coverage`, so this cannot fail a gate.
			thresholds: {
				statements: 57,
				branches: 50,
				functions: 50,
				lines: 60,
			},
		},
	},
	root: process.cwd(),
});
