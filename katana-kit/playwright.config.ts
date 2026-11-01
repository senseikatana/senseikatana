import { defineConfig, devices } from "@playwright/test";

/**
 * Browser-level tests for `@katanakit/ui`.
 *
 * These exist for the one thing jsdom cannot prove: that the CSS actually runs.
 * jsdom has no animation engine, so `animationend` never fires there and the
 * toast exit path falls back to its `TOAST_EXIT_FALLBACK_MS` timer — which means
 * a bug in the real exit animation is invisible to the unit suite. That is not
 * hypothetical: the exit path shipped with an unfiltered `animationend`
 * listener, the progress bar's own `animationend` won the race, and every
 * auto-dismissed toast vanished with no animation at all. Unit tests passed the
 * whole time.
 *
 * Run with `bun run test:e2e`. It builds the UI package and serves the fixture
 * over http, so the assertions run against the real compiled stylesheet.
 *
 * Browsers are resolved from the local Playwright cache; set
 * `PLAYWRIGHT_CHROMIUM_PATH` to override.
 */
export default defineConfig({
	testDir: "./tests/e2e",
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: 0,
	reporter: process.env.CI ? "line" : [["list"]],
	timeout: 30_000,
	expect: { timeout: 7_000 },

	use: {
		baseURL: "http://127.0.0.1:4178",
		trace: "retain-on-failure",
		// The toast stack pins to the viewport and its countdown is time-driven,
		// so a fixed viewport keeps the geometry assertions stable.
		viewport: { width: 1024, height: 768 },
	},

	projects: [
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
				launchOptions: {
					...(process.env.PLAYWRIGHT_CHROMIUM_PATH
						? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
						: {}),
				},
			},
		},
	],

	// A plain static server: the fixture needs the built stylesheet served over
	// http so the browser applies the real cascade, including @layer.
	webServer: {
		command: "node scripts/serve-fixture.mjs",
		url: "http://127.0.0.1:4178",
		reuseExistingServer: !process.env.CI,
		stdout: "ignore",
		stderr: "pipe",
	},
});
