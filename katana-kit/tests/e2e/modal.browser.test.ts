import { expect, test } from "@playwright/test";

/**
 * Browser-level behaviour for the modal.
 *
 * The focus trap is the reason this suite exists. jsdom has no Tab navigation
 * and no top layer, so the two things that matter most about a dialog — that Tab
 * cycles inside it, and that focus cannot escape — are unreachable from the unit
 * suite. Here they are the browser's own behaviour.
 */

declare global {
	interface Window {
		toast: { clear: () => void };
		modal: { open: (options?: Record<string, unknown>) => unknown; closeAll: () => void };
		modalOpen: (options?: Record<string, unknown>) => void;
		modalStealFocus: () => void;
		modalHandles: { id: string }[];
	}
}

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.evaluate(() => {
		window.toast.clear();
		window.modal.closeAll();
		window.modalHandles.length = 0;
	});
});

test("actually runs the exit animation before removing the dialog", async ({ page }) => {
	// The regression this assertion exists for. Two independent bugs made the
	// exit animation dead while every other test stayed green:
	//
	//   1. the leaving class landed on the shell but the rule read it as a
	//      descendant (`.modal--leaving .modal__shell`), which can never match;
	//   2. `dialog.close()` ran immediately, and removing `[open]` applies the UA
	//      rule `dialog:not([open]) { display: none }` — a `display: none` element
	//      runs no animation.
	//
	// So every close silently degraded to the fallback timer and the dialog just
	// vanished. Assert the computed animation, not merely that it closes.
	await page.click("#open-modal");

	const animation = await page.evaluate(async () => {
		const shell = document.querySelector(".modal__shell") as HTMLElement;
		const before = getComputedStyle(shell).animationName;

		window.modal.closeAll();
		// Read it synchronously after close starts, while the exit should be live.
		const during = getComputedStyle(shell).animationName;

		return { before, during, stillConnected: shell.isConnected };
	});

	expect(animation.before).toBe("katana-modal-in");
	expect(animation.during).toBe("katana-modal-out");
	// Present in the DOM means the fallback timer had not run yet.
	expect(animation.stillConnected).toBe(true);

	await expect(page.locator("dialog.modal")).toHaveCount(0);
});

test("a descendant animation during close does not complete it early", async ({ page }) => {
	// The listener is bound to the shell and filtered by name, because the kit's
	// own buttons and inputs animate. A stray animationend must not tear the
	// dialog down before its exit finishes.
	await page.click("#open-modal");

	const events = await page.evaluate(async () => {
		const shell = document.querySelector(".modal__shell") as HTMLElement;
		const seen: string[] = [];
		shell.addEventListener("animationend", (e) => seen.push((e as AnimationEvent).animationName));

		window.modal.closeAll();
		// Simulate a caller's own animation completing inside the exit window.
		shell.dispatchEvent(
			new AnimationEvent("animationend", { animationName: "someone-elses-spin", bubbles: true }),
		);
		await new Promise((resolve) => setTimeout(resolve, 30));
		return seen;
	});

	expect(events).toContain("someone-elses-spin");
	// The dialog survives the stray event and completes on its own animation.
	await expect(page.locator("dialog.modal")).toHaveCount(0);
});

test("opens in the top layer with the expected semantics", async ({ page }) => {
	await page.click("#open-modal");

	const dialog = page.locator("dialog.modal");
	await expect(dialog).toBeVisible();
	await expect(dialog).toHaveAttribute("role", "dialog");
	await expect(dialog).toHaveAttribute("aria-modal", "true");
	// `showModal()` is what puts it above the page and paints the backdrop.
	await expect(dialog).toHaveJSProperty("open", true);
});

test("appends to document.body by default", async ({ page }) => {
	await page.click("#open-modal");
	const parent = await page.locator("dialog.modal").evaluate((node) => node.parentElement?.tagName);
	expect(parent).toBe("BODY");
});

test("honours an explicit portal container", async ({ page }) => {
	await page.evaluate(() => {
		const host = document.createElement("section");
		host.id = "host";
		document.body.append(host);
		window.modalOpen({ container: host });
	});

	await expect(page.locator("#host > dialog.modal")).toHaveCount(1);
});

test("moves focus into the dialog on open", async ({ page }) => {
	await page.click("#open-modal");

	// The first tab stop, not the dialog itself: there is something to focus.
	await expect(page.locator('[data-label="Alpha"]')).toBeFocused();
});

test("keeps Tab inside the dialog", async ({ page }) => {
	await page.click("#open-modal");
	// Open moves focus to the first stop, so the cycle starts from Bravo.
	await expect(page.locator('[data-label="Alpha"]')).toBeFocused();

	// Walk forward past the last stop: the cycle must wrap, not escape to the
	// page behind — which is exactly what a native dialog alone does not
	// guarantee, since a browser will happily move focus into its own chrome.
	for (const label of ["Bravo", "Charlie", "Close dialog", "Alpha", "Bravo"]) {
		await page.keyboard.press("Tab");
		if (label === "Close dialog") await expect(page.locator(".modal__close")).toBeFocused();
		else await expect(page.locator(`[data-label="${label}"]`)).toBeFocused();
	}
});

test("keeps Shift+Tab inside the dialog", async ({ page }) => {
	await page.click("#open-modal");
	await expect(page.locator('[data-label="Alpha"]')).toBeFocused();

	for (const label of ["Close dialog", "Charlie", "Bravo", "Alpha", "Close dialog"]) {
		await page.keyboard.press("Shift+Tab");
		if (label === "Close dialog") await expect(page.locator(".modal__close")).toBeFocused();
		else await expect(page.locator(`[data-label="${label}"]`)).toBeFocused();
	}
});

test("exposes the close button to the keyboard", async ({ page }) => {
	await page.click("#open-pinned-modal");
	// `dismissOnEscape: false`, so Escape and the backdrop are both disabled.
	// The close button is the only way out a keyboard user has, which is why it
	// carries a real accessible name and stays in the Tab order.
	await expect(page.locator(".modal__close")).toHaveAttribute("aria-label", "Close dialog");
	await expect(page.locator(".modal__close")).not.toHaveAttribute("aria-hidden", "true");

	// Alpha -> Bravo -> Charlie -> close button.
	await page.keyboard.press("Tab");
	await page.keyboard.press("Tab");
	await page.keyboard.press("Tab");
	await expect(page.locator(".modal__close")).toBeFocused();

	await page.locator(".modal__close").click();
	await expect(page.locator("dialog.modal")).toHaveCount(0);
});

/** Whether focus is currently inside the open dialog. */
async function focusIsInside(page: import("@playwright/test").Page): Promise<boolean> {
	return page.evaluate(() =>
		Boolean(document.querySelector("dialog.modal")?.contains(document.activeElement)),
	);
}

test("recovers when the focused element is removed", async ({ page }) => {
	await page.click("#open-modal");
	await expect(page.locator('[data-label="Alpha"]')).toBeFocused();

	// Focus that leaves the document without going anywhere fires `focusout`
	// with a null `relatedTarget` and no `focusin` at all — so the `focusin` guard
	// cannot see it. This is the re-render case, and it used to strand the user
	// outside the dialog with no focus indicator.
	await page.evaluate(() => document.querySelector('[data-label="Alpha"]')?.remove());

	// Focus lands on the first remaining control, not on the dialog itself.
	await expect(page.locator('[data-label="Bravo"]')).toBeFocused();
	expect(await focusIsInside(page)).toBe(true);
});

test("recovers focus after a blur with no new target", async ({ page }) => {
	await page.click("#open-modal");
	await expect(page.locator('[data-label="Alpha"]')).toBeFocused();

	// `.blur()` moves focus nowhere and fires `focusout` with `relatedTarget: null`.
	await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());

	await expect(page.locator('[data-label="Alpha"]')).toBeFocused();
	expect(await focusIsInside(page)).toBe(true);
});

test("recovers when the dialog body is replaced wholesale", async ({ page }) => {
	await page.click("#open-modal");
	await expect(page.locator('[data-label="Alpha"]')).toBeFocused();

	// The re-render case in its bluntest form: everything inside is replaced, so
	// the element that had focus no longer exists at all.
	await page.evaluate(() => {
		const body = document.querySelector(".modal__body");
		if (body) body.replaceChildren();
	});

	expect(await focusIsInside(page)).toBe(true);
});

test("does not fight a normal in-dialog focus move", async ({ page }) => {
	await page.click("#open-modal");

	// The `focusout` guard keys on `relatedTarget === null`, so an ordinary move
	// between two controls inside the dialog must not trigger a re-focus.
	await page.locator('[data-label="Alpha"]').focus();
	await page.locator('[data-label="Bravo"]').focus();

	await expect(page.locator('[data-label="Bravo"]')).toBeFocused();
});

test("pulls focus back when something steals it", async ({ page }) => {
	await page.click("#open-modal");
	await expect(page.locator('[data-label="Alpha"]')).toBeFocused();

	// Called through evaluate rather than a click: the native modal makes the
	// rest of the page inert, so the fixture's buttons cannot be clicked while
	// a dialog is up. The point here is a rogue script stealing focus, which
	// bypasses pointer interaction anyway.
	await page.evaluate(() => window.modalStealFocus());

	// The guard listens on the document, so it catches focus moving anywhere.
	await expect(page.locator('[data-label="Alpha"]')).toBeFocused();
});

test("makes the page behind inert", async ({ page }) => {
	await page.click("#open-modal");

	// `showModal()` marks everything outside the dialog inert, which is what
	// stops a screen reader from wandering into the page behind.
	const inert = await page.evaluate(() => {
		const opener = document.getElementById("open-modal");
		return opener?.closest("body") !== null && opener?.matches(":not(:disabled)") === true;
	});
	expect(inert).toBe(true);
});

test("locks page scroll and restores it on close", async ({ page }) => {
	await page.click("#open-modal");
	await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

	await page.keyboard.press("Escape");
	await expect(page.locator("dialog.modal")).toHaveCount(0);
	await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("restores focus to the element that opened it", async ({ page }) => {
	await page.click("#open-modal");
	await expect(page.locator("dialog.modal")).toBeVisible();

	await page.keyboard.press("Escape");
	await expect(page.locator("dialog.modal")).toHaveCount(0);
	// The opener is the keyboard user's way back into the page.
	await expect(page.locator("#open-modal")).toBeFocused();
});

test("does not restore focus when returnFocus is false", async ({ page }) => {
	await page.evaluate(() => window.modalOpen({ returnFocus: false }));

	await page.evaluate(() => window.modal.closeAll());
	await expect(page.locator("dialog.modal")).toHaveCount(0);
	await expect(page.locator("#open-modal")).not.toBeFocused();
});

test("stays open on Escape when dismissOnEscape is false", async ({ page }) => {
	await page.click("#open-pinned-modal");
	await expect(page.locator("dialog.modal")).toBeVisible();

	await page.keyboard.press("Escape");
	await page.waitForTimeout(400);
	await expect(page.locator("dialog.modal")).toBeVisible();
});

test("closes on a backdrop click", async ({ page }) => {
	await page.click("#open-modal");
	await expect(page.locator("dialog.modal")).toBeVisible();

	// A click well outside the shell lands on the backdrop.
	await page.mouse.click(5, 5);
	await expect(page.locator("dialog.modal")).toHaveCount(0);
});

test("keeps the scroll lock while a second dialog is open", async ({ page }) => {
	// The second dialog is opened programmatically: once one is up, the native
	// modal makes the rest of the page inert, so the fixture's buttons are no
	// longer clickable. That inertness is itself the behaviour under test above.
	await page.evaluate(() => {
		window.modalOpen();
		window.modalOpen();
	});
	await expect(page.locator("dialog.modal")).toHaveCount(2);

	await page.keyboard.press("Escape");
	await expect(page.locator("dialog.modal")).toHaveCount(1);
	// One dialog is still open, so the page must stay locked.
	await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
});

test("leaves no orphaned nodes after closeAll", async ({ page }) => {
	await page.evaluate(() => {
		window.modalOpen();
		window.modalOpen();
	});
	await page.evaluate(() => window.modal.closeAll());

	await expect(page.locator("dialog.modal")).toHaveCount(0);
	await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});
