import { expect, test } from "@playwright/test";

/**
 * Browser-level keyboard behaviour for tabs and select.
 *
 * jsdom has no real Tab navigation, no layout and no typeahead timing, so the
 * parts of these two widgets that depend on the browser moving focus are only
 * provable here.
 */

declare global {
	interface Window {
		mountTabs: (mode?: "automatic" | "manual") => void;
		mountSelect: () => void;
	}
}

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.evaluate(() => document.getElementById("widgets")?.replaceChildren());
});

test.describe("tabs", () => {
	test.beforeEach(async ({ page }) => {
		await page.evaluate(() => window.mountTabs());
	});

	test("exposes exactly one tab stop to the page", async ({ page }) => {
		// A tablist is one composite widget. Four `tabindex="0"` tabs would cost the
		// user four Tab presses just to get past the group.
		const stops = await page
			.locator('[role="tab"]')
			.evaluateAll((nodes) => nodes.filter((n) => (n as HTMLElement).tabIndex === 0).length);

		expect(stops).toBe(1);
	});

	test("arrow keys move focus and selection together", async ({ page }) => {
		await page.locator('[role="tab"]').first().focus();

		await page.keyboard.press("ArrowRight");

		await expect(page.locator("#two-tab")).toBeFocused();
		await expect(page.locator("#two-tab")).toHaveAttribute("aria-selected", "true");
		await expect(page.locator("#two-panel")).toBeVisible();
		await expect(page.locator("#one-panel")).toBeHidden();
	});

	test("skips the disabled tab in both directions", async ({ page }) => {
		await page.locator("#one-tab").focus();

		// Enabled tabs are one, two, four — three is disabled. So from `one`, one
		// press lands on `two`; the second skips over `three` to `four`.
		await page.keyboard.press("ArrowRight");
		await expect(page.locator("#two-tab")).toBeFocused();

		await page.keyboard.press("ArrowRight");
		await expect(page.locator("#four-tab")).toBeFocused();
		await expect(page.locator("#three-tab")).not.toBeFocused();

		await page.keyboard.press("ArrowLeft");
		await expect(page.locator("#two-tab")).toBeFocused();
	});

	test("Tab leaves the group instead of walking the tabs", async ({ page }) => {
		await page.locator("#one-tab").focus();

		// The payoff of roving tabindex: one press moves past the whole widget.
		await page.keyboard.press("Tab");

		const inside = await page.evaluate(() =>
			Boolean(document.activeElement?.closest('[role="tablist"]')),
		);
		expect(inside).toBe(false);
	});

	test("the selected panel is keyboard reachable", async ({ page }) => {
		await page.locator("#one-tab").focus();
		await page.keyboard.press("Tab");

		// A panel with no focusable content must still take focus, or the user
		// selects a tab and cannot reach what it revealed.
		await expect(page.locator("#one-panel")).toBeFocused();
	});

	test("wraps around both ends", async ({ page }) => {
		await page.locator("#four-tab").focus();
		await page.keyboard.press("ArrowRight");
		await expect(page.locator("#one-tab")).toBeFocused();

		await page.keyboard.press("ArrowLeft");
		await expect(page.locator("#four-tab")).toBeFocused();
	});
});

test.describe("tabs (manual activation)", () => {
	test.beforeEach(async ({ page }) => {
		await page.evaluate(() => window.mountTabs("manual"));
	});

	test("moves focus without committing", async ({ page }) => {
		await page.locator("#one-tab").focus();

		await page.keyboard.press("ArrowRight");

		await expect(page.locator("#two-tab")).toBeFocused();
		await expect(page.locator("#one-tab")).toHaveAttribute("aria-selected", "true");
		await expect(page.locator("#one-panel")).toBeVisible();
	});

	test("commits on Enter", async ({ page }) => {
		await page.locator("#one-tab").focus();
		await page.keyboard.press("ArrowRight");
		await page.keyboard.press("Enter");

		await expect(page.locator("#two-panel")).toBeVisible();
	});
});

test.describe("select", () => {
	test.beforeEach(async ({ page }) => {
		await page.evaluate(() => window.mountSelect());
	});

	test("keeps DOM focus on the button while the arrows move", async ({ page }) => {
		await page.locator(".select__button").focus();

		// The first ArrowDown only opens the list; the active row starts on the
		// current selection, so a second press is what moves it to Argentina.
		await page.keyboard.press("ArrowDown");
		await expect(page.locator(".select__button")).toHaveAttribute(
			"aria-activedescendant",
			"select-option-0",
		);

		await page.keyboard.press("ArrowDown");

		// `aria-activedescendant`, not roving tabindex: the listbox is virtual, so
		// there is no element for the browser's tab order to visit.
		await expect(page.locator(".select__button")).toBeFocused();
		await expect(page.locator(".select__button")).toHaveAttribute(
			"aria-activedescendant",
			"select-option-1",
		);
	});

	test("is operable entirely from the keyboard", async ({ page }) => {
		await page.locator(".select__button").focus();

		await page.keyboard.press("ArrowDown");
		await page.keyboard.press("ArrowDown");
		await page.keyboard.press("Enter");

		await expect(page.locator(".select__button")).toContainText("Argentina");
		await expect(page.locator('input[name="country"]')).toHaveValue("ar");
		await expect(page.locator(".select__list")).toBeHidden();
	});

	test("Escape closes without committing", async ({ page }) => {
		await page.locator(".select__button").focus();

		await page.keyboard.press("ArrowDown");
		await page.keyboard.press("ArrowDown");
		await page.keyboard.press("Escape");

		await expect(page.locator(".select__button")).toContainText("Spain");
		await expect(page.locator('input[name="country"]')).toHaveValue("es");
	});

	test("Tab closes the list without committing", async ({ page }) => {
		await page.locator(".select__button").focus();
		await page.keyboard.press("ArrowDown");
		await page.keyboard.press("ArrowDown");

		await page.keyboard.press("Tab");

		await expect(page.locator(".select__list")).toBeHidden();
		await expect(page.locator(".select__button")).toContainText("Spain");
	});

	test("skips the disabled option", async ({ page }) => {
		await page.locator(".select__button").focus();
		await page.keyboard.press("ArrowDown");
		await page.keyboard.press("End");
		await page.keyboard.press("ArrowDown");

		// Chile is disabled; the cycle wraps straight past it to Spain.
		await expect(page.locator(".select__button")).toHaveAttribute(
			"aria-activedescendant",
			"select-option-0",
		);
	});

	test("typeahead selects by prefix", async ({ page }) => {
		await page.locator(".select__button").focus();

		await page.keyboard.press("b");

		await expect(page.locator(".select__button")).toContainText("Brazil");
	});

	test("the list closes on an outside click", async ({ page }) => {
		await page.locator(".select__button").click();
		await expect(page.locator(".select__list")).toBeVisible();

		await page.locator("#spawn-success").click();

		await expect(page.locator(".select__list")).toBeHidden();
	});
});
