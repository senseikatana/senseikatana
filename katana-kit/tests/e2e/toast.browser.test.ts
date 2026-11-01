import { expect, test } from "@playwright/test";

/**
 * Browser-level behaviour for the toast.
 *
 * Everything here covers something jsdom structurally cannot: the cascade
 * layer, real animations, `animationend` timing, and `prefers-reduced-motion`.
 * The unit suite in `packages/ui/tests/toast.test.ts` runs the same component
 * through the fallback path, so the two suites are complementary, not
 * redundant.
 */

declare global {
	interface Window {
		toast: {
			info: (
				message: string,
				options?: Record<string, unknown>,
			) => { update: (options: Record<string, unknown>) => void };
			success: (message: string, options?: Record<string, unknown>) => unknown;
			error: (message: string, options?: Record<string, unknown>) => unknown;
			loading: (message: string, options?: Record<string, unknown>) => unknown;
			clear: () => void;
		};
		__handle?: { update: (options: Record<string, unknown>) => void };
	}
}

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.evaluate(() => window.toast.clear());
});

test("applies the compiled stylesheet with unprefixed classes", async ({ page }) => {
	await page.click("#spawn-success");

	const toast = page.locator(".toast--success");
	await expect(toast).toBeVisible();
	// The whole point of dropping `kk-`: the root class is the bare name.
	await expect(toast).toHaveClass(/^toast /);
	await expect(page.locator(".kk-toast")).toHaveCount(0);
});

test("puts component CSS inside @layer katana", async ({ page }) => {
	// Assert the layer that actually holds the component rule, not the first
	// layer block in the document: the kit's preflight has its own lower layer
	// (`katana-reset`) and is declared first on purpose.
	const layered = await page.evaluate(() => {
		const find = (rules, layer) => {
			for (const rule of rules) {
				if (rule.constructor.name === "CSSLayerBlockRule") {
					const found = find(rule.cssRules, rule.name);
					if (found) return found;
				} else if (rule.selectorText === ".toast") {
					return layer;
				}
			}
			return null;
		};

		for (const sheet of document.styleSheets) {
			const name = find(sheet.cssRules, null);
			if (name) return name;
		}
		return null;
	});

	expect(layered).toBe("katana");
});

test("unlayered rules beat the kit regardless of import order", async ({ page }) => {
	// A consumer loading daisyUI-style unlayered CSS must win deterministically.
	// That guarantee only holds because the kit is layered, so assert it.
	await page.addStyleTag({ content: ".toast--success { border-left-color: rgb(255, 0, 0); }" });

	await page.click("#spawn-success");
	const border = await page
		.locator(".toast--success")
		.evaluate((node) => getComputedStyle(node).borderLeftColor);

	expect(border).toBe("rgb(255, 0, 0)");
});

test("plays the exit animation instead of blinking out", async ({ page }) => {
	// Structural, not temporal: observe the animation events the browser
	// actually delivers and assert the exit animation is what removed the node.
	// If removal came from the TOAST_EXIT_FALLBACK_MS timer instead — which is
	// the only path jsdom can exercise — `katana-toast-out` never appears here.
	const events = await page.evaluate(() => {
		const start = performance.now();
		window.toast.info("timed", { duration: 300 });
		const node = document.querySelector(".toast--info");
		if (!node) return Promise.resolve([]);

		const seen: { name: string; at: number }[] = [];
		node.addEventListener("animationend", (event) => {
			seen.push({
				name: (event as AnimationEvent).animationName,
				at: Math.round(performance.now() - start),
			});
		});

		return new Promise<typeof seen>((resolve) => {
			const observer = new MutationObserver(() => {
				if (document.body.contains(node)) return;
				observer.disconnect();
				resolve(seen);
			});
			observer.observe(document.body, { childList: true, subtree: true });
		});
	});

	expect(events.map((event) => event.name)).toContain("katana-toast-out");
	// The countdown runs first, so the exit must not start before it.
	const exit = events.find((event) => event.name === "katana-toast-out");
	expect(exit?.at).toBeGreaterThanOrEqual(250);
});

test("ignores the progress bar's own animationend", async ({ page }) => {
	// The regression this suite exists for: `animationend` bubbles, the bar
	// animates for exactly the countdown duration, and an unfiltered listener
	// let the bar's event remove the toast with no exit animation.
	await page.click("#spawn-timed");

	const toast = page.locator(".toast--info").first();
	await expect(toast).toBeVisible();

	const barEvents = await toast.evaluate(async (node) => {
		const seen = [];
		const bar = node.querySelector(".toast__progress");
		if (!bar) return seen;
		node.addEventListener("animationend", (event) => seen.push(event.animationName), true);
		await new Promise((resolve) => setTimeout(resolve, 1400));
		return seen;
	});

	// The bar genuinely does animate — that is why the filter is needed.
	expect(barEvents.some((name) => name === "katana-toast-progress")).toBe(true);
	await expect(toast).toHaveCount(0);
});

test("freezes the progress bar on hover and resumes on leave", async ({ page }) => {
	await page.click("#spawn-timed");
	const toast = page.locator(".toast--info").first();
	await expect(toast).toBeVisible();

	await toast.hover();
	await expect(toast).toHaveClass(/toast--paused/);

	// Ten times the countdown must not remove it while hovered.
	await page.waitForTimeout(2500);
	await expect(toast).toBeVisible();

	await page.mouse.move(5, 5);
	await expect(toast).not.toHaveClass(/toast--paused/);
	await expect(toast).toHaveCount(0, { timeout: 3000 });
});

test("removes immediately under prefers-reduced-motion", async ({ page }) => {
	await page.emulateMedia({ reducedMotion: "reduce" });
	await page.click("#spawn-timed");

	// Reduced motion sets no exit animation, so removal must not wait 400ms.
	await expect(page.locator(".toast--info")).toHaveCount(0, { timeout: 1500 });
});

test("keeps a pinned loading toast until dismissed", async ({ page }) => {
	await page.click("#spawn-loading");
	await expect(page.locator(".toast--loading")).toBeVisible();

	await page.waitForTimeout(3000);
	await expect(page.locator(".toast--loading")).toBeVisible();
});

test("reports errors assertively and others politely", async ({ page }) => {
	await page.click("#spawn-error");
	await page.click("#spawn-success");

	await expect(page.locator(".toast--error")).toHaveAttribute("role", "alert");
	await expect(page.locator(".toast--success")).toHaveAttribute("role", "status");
	await expect(page.locator(".toast-stack").first()).toHaveAttribute("aria-live", "polite");
	await expect(page.locator(".toast-stack").first()).toHaveAttribute("aria-label", "Notifications");
});

test("an update keeps the pinned duration it was created with", async ({ page }) => {
	await page.click("#spawn-update");

	const toast = page.locator(".toast--success");
	await expect(toast).toBeVisible();
	await expect(toast.locator(".toast__message")).toHaveText("Done.");
	// `duration: 0` was explicit at creation and survives the merge, so the
	// toast stays pinned and shows no countdown bar.
	await expect(toast.locator(".toast__progress")).toHaveCount(0);

	await page.waitForTimeout(2500);
	await expect(toast).toBeVisible();
});

test("an update can hand a pinned toast a countdown", async ({ page }) => {
	const hasBar = await page.evaluate(async () => {
		const handle = window.toast.info("queued", { duration: 0 });
		handle.update({ duration: 3000 });
		await new Promise((resolve) => setTimeout(resolve, 60));
		return document.querySelectorAll(".toast__progress").length;
	});

	expect(hasBar).toBe(1);
});

test("caps the stack at five live toasts", async ({ page }) => {
	await page.evaluate(() => {
		for (let i = 0; i < 12; i += 1) window.toast.info(`m${i}`, { duration: 0 });
	});

	await expect(page.locator(".toast:not(.toast--leaving)")).toHaveCount(5);
	await expect(page.locator(".toast").last()).toContainText("m11");
});

test("dismisses through the close button and prunes the stack", async ({ page }) => {
	await page.click("#spawn-pinned");
	await expect(page.locator(".toast--info")).toBeVisible();

	await page.locator(".toast__close").click();

	await expect(page.locator(".toast")).toHaveCount(0);
	await expect(page.locator(".toast-stack")).toHaveCount(0);
});

test("clear() leaves no orphaned nodes behind", async ({ page }) => {
	await page.click("#spawn-pinned");
	await page.click("#spawn-loading");
	await expect(page.locator(".toast")).toHaveCount(2);

	await page.click("#clear");

	await expect(page.locator(".toast")).toHaveCount(0);
	await expect(page.locator(".toast-stack")).toHaveCount(0);
	// Nothing left on the document that the kit owns.
	await expect(page.locator("[data-katana-toast-close]")).toHaveCount(0);
});
