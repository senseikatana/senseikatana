// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { selectClass, tabsClass, useSelect, useTabs } from "../src/index";

const TABS = [
	{ id: "one", label: "One", content: "First panel" },
	{ id: "two", label: "Two", content: "Second panel" },
	{ id: "three", label: "Three", content: "Third panel" },
];

function press(key: string, init: KeyboardEventInit = {}): void {
	document.activeElement?.dispatchEvent(
		new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true, ...init }),
	);
}

describe("tabsClass", () => {
	it("returns the stable root class", () => {
		expect(tabsClass()).toBe("tabs");
	});
});

describe("useTabs", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
	});

	afterEach(() => {
		document.body.innerHTML = "";
	});

	it("builds a tablist with matching panels", () => {
		// Arrange / Act
		const tabs = useTabs({ label: "Sections", tabs: TABS });
		document.body.append(tabs.root);

		// Assert
		expect(tabs.root.querySelector('[role="tablist"]')).not.toBeNull();
		expect(tabs.buttons).toHaveLength(3);
		expect(tabs.panels).toHaveLength(3);
		for (const [index, button] of tabs.buttons.entries()) {
			expect(button.getAttribute("role")).toBe("tab");
			expect(button.getAttribute("aria-controls")).toBe(`${TABS[index].id}-panel`);
			expect(tabs.panels[index].getAttribute("aria-labelledby")).toBe(button.id);
			expect(tabs.panels[index].getAttribute("role")).toBe("tabpanel");
		}
	});

	it("names the tablist", () => {
		expect(useTabs({ label: "Account settings", tabs: TABS }).list.getAttribute("aria-label")).toBe(
			"Account settings",
		);
	});

	it("selects the first tab and shows only its panel", () => {
		const tabs = useTabs({ tabs: TABS });
		document.body.append(tabs.root);

		expect(tabs.buttons[0].getAttribute("aria-selected")).toBe("true");
		expect(tabs.panels[0].hidden).toBe(false);
		expect(tabs.panels[1].hidden).toBe(true);
	});

	it("honours an explicit active id", () => {
		const tabs = useTabs({ tabs: TABS, active: "two" });
		expect(tabs.buttons[1].getAttribute("aria-selected")).toBe("true");
	});

	it("skips a disabled tab when no active id is given", () => {
		const tabs = useTabs({ tabs: [{ ...TABS[0], disabled: true }, TABS[1]] });
		expect(tabs.buttons[1].getAttribute("aria-selected")).toBe("true");
	});

	describe("roving tabindex", () => {
		it("keeps exactly one tab stop in the page tab order", () => {
			// Arrange — a tablist is one composite widget, so it must not cost the
			// user N Tab presses to traverse.
			const tabs = useTabs({ tabs: TABS });
			document.body.append(tabs.root);

			// Assert
			const stops = tabs.buttons.filter((button) => button.tabIndex === 0);
			expect(stops).toHaveLength(1);
			expect(stops[0]).toBe(tabs.buttons[0]);
			expect(tabs.buttons[1].tabIndex).toBe(-1);
		});

		it("moves the single stop with the selection", () => {
			const tabs = useTabs({ tabs: TABS });
			document.body.append(tabs.root);
			tabs.select("three");

			expect(tabs.buttons[2].tabIndex).toBe(0);
			expect(tabs.buttons[0].tabIndex).toBe(-1);
		});
	});

	describe("automatic activation", () => {
		it("selects on arrow focus and wraps", () => {
			// Arrange
			const tabs = useTabs({ tabs: TABS });
			document.body.append(tabs.root);
			tabs.buttons[0].focus();

			// Act
			press("ArrowRight");

			// Assert — focus and selection move together
			expect(document.activeElement).toBe(tabs.buttons[1]);
			expect(tabs.buttons[1].getAttribute("aria-selected")).toBe("true");
		});

		it("wraps from the last tab to the first", () => {
			const tabs = useTabs({ tabs: TABS });
			document.body.append(tabs.root);
			tabs.buttons[2].focus();

			press("ArrowRight");

			expect(tabs.buttons[0].getAttribute("aria-selected")).toBe("true");
		});

		it("wraps backwards from the first tab", () => {
			const tabs = useTabs({ tabs: TABS });
			document.body.append(tabs.root);
			tabs.buttons[0].focus();

			press("ArrowLeft");

			expect(tabs.buttons[2].getAttribute("aria-selected")).toBe("true");
		});

		it("jumps with Home and End", () => {
			const tabs = useTabs({ tabs: TABS });
			document.body.append(tabs.root);
			tabs.buttons[0].focus();

			press("End");
			expect(tabs.buttons[2].getAttribute("aria-selected")).toBe("true");

			press("Home");
			expect(tabs.buttons[0].getAttribute("aria-selected")).toBe("true");
		});

		it("reports the change", () => {
			const onChange = vi.fn();
			const tabs = useTabs({ tabs: TABS, onChange });
			document.body.append(tabs.root);
			tabs.buttons[0].focus();

			press("ArrowRight");

			expect(onChange).toHaveBeenCalledWith("two");
		});
	});

	describe("manual activation", () => {
		it("moves focus without selecting", () => {
			const tabs = useTabs({ tabs: TABS, activation: "manual" });
			document.body.append(tabs.root);
			tabs.buttons[0].focus();

			press("ArrowRight");

			// Focus moved, but nothing is committed until Enter.
			expect(document.activeElement).toBe(tabs.buttons[1]);
			expect(tabs.buttons[0].getAttribute("aria-selected")).toBe("true");
		});

		it("commits on Enter", () => {
			const onChange = vi.fn();
			const tabs = useTabs({ tabs: TABS, activation: "manual", onChange });
			document.body.append(tabs.root);
			tabs.buttons[0].focus();
			press("ArrowRight");

			press("Enter");

			expect(tabs.buttons[1].getAttribute("aria-selected")).toBe("true");
			expect(onChange).toHaveBeenCalledWith("two");
		});

		it("commits on Space", () => {
			const tabs = useTabs({ tabs: TABS, activation: "manual" });
			document.body.append(tabs.root);
			tabs.buttons[0].focus();
			press("ArrowRight");

			press(" ");

			expect(tabs.buttons[1].getAttribute("aria-selected")).toBe("true");
		});
	});

	describe("disabled tabs", () => {
		it("are skipped by the arrows in both directions", () => {
			const tabs = useTabs({
				tabs: [TABS[0], { ...TABS[1], disabled: true }, TABS[2]],
			});
			document.body.append(tabs.root);
			tabs.buttons[0].focus();

			press("ArrowRight");
			expect(tabs.buttons[2]).toBe(document.activeElement);
			expect(tabs.buttons[1].getAttribute("aria-selected")).toBe("false");

			press("ArrowLeft");
			expect(tabs.buttons[0]).toBe(document.activeElement);
		});

		it("ignore a click", () => {
			const onChange = vi.fn();
			const tabs = useTabs({
				tabs: [TABS[0], { ...TABS[1], disabled: true }],
				onChange,
			});
			document.body.append(tabs.root);

			tabs.buttons[1].click();

			expect(onChange).not.toHaveBeenCalled();
			expect(tabs.buttons[0].getAttribute("aria-selected")).toBe("true");
		});
	});

	it("selects on click", () => {
		const onChange = vi.fn();
		const tabs = useTabs({ tabs: TABS, onChange });
		document.body.append(tabs.root);

		tabs.buttons[2].click();

		expect(tabs.buttons[2].getAttribute("aria-selected")).toBe("true");
		expect(tabs.panels[2].hidden).toBe(false);
		expect(onChange).toHaveBeenCalledWith("three");
	});

	it("keeps panels keyboard reachable", () => {
		// A panel with no focusable content must still be reachable, or the user
		// tabs into the group and cannot get to the panel they just selected.
		const tabs = useTabs({ tabs: TABS });
		expect(tabs.panels.every((panel) => panel.tabIndex === 0)).toBe(true);
	});

	it("inserts string content as text, never as markup", () => {
		const tabs = useTabs({
			tabs: [{ id: "x", label: "X", content: "<img src=x onerror=alert(1)>" }],
		});
		expect(tabs.panels[0].querySelector("img")).toBeNull();
		expect(tabs.panels[0].textContent).toContain("<img src=x onerror=alert(1)>");
	});
});

const CHOICES = [
	{ value: "es", label: "Spain" },
	{ value: "ar", label: "Argentina" },
	{ value: "br", label: "Brazil" },
	{ value: "cl", label: "Chile", disabled: true },
];

describe("selectClass", () => {
	it("returns the stable root class", () => {
		expect(selectClass()).toBe("select");
	});
});

describe("useSelect", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		document.body.innerHTML = "";
	});

	afterEach(() => {
		document.body.innerHTML = "";
		vi.useRealTimers();
	});

	it("builds a combobox button and a listbox", () => {
		// Arrange / Act
		const select = useSelect({ label: "Country", options: CHOICES });
		document.body.append(select.root);

		// Assert
		expect(select.button.getAttribute("role")).toBe("combobox");
		expect(select.button.getAttribute("aria-haspopup")).toBe("listbox");
		expect(select.button.getAttribute("aria-label")).toBe("Country");
		expect(select.list.getAttribute("role")).toBe("listbox");
		expect(select.options).toHaveLength(4);
	});

	it("starts closed and reports the selection", () => {
		const select = useSelect({ label: "Country", options: CHOICES });
		document.body.append(select.root);

		expect(select.list.hidden).toBe(true);
		expect(select.button.getAttribute("aria-expanded")).toBe("false");
		expect(select.getValue()).toBe("es");
		expect(select.button.textContent).toContain("Spain");
	});

	it("honours an explicit value", () => {
		const select = useSelect({ label: "Country", options: CHOICES, value: "ar" });
		expect(select.getValue()).toBe("ar");
	});

	it("falls back to the first enabled option", () => {
		const select = useSelect({
			label: "Country",
			options: [{ value: "x", label: "X", disabled: true }, CHOICES[1]],
		});
		expect(select.getValue()).toBe("ar");
	});

	it("renders a hidden input only when name is given", () => {
		const named = useSelect({ label: "Country", options: CHOICES, name: "country" });
		const unnamed = useSelect({ label: "Country", options: CHOICES });
		document.body.append(named.root, unnamed.root);

		expect(named.input?.name).toBe("country");
		expect(named.input?.value).toBe("es");
		expect(unnamed.input).toBeNull();
	});

	it("opens and closes on click", () => {
		const select = useSelect({ label: "Country", options: CHOICES });
		document.body.append(select.root);

		select.button.click();
		expect(select.list.hidden).toBe(false);
		expect(select.button.getAttribute("aria-expanded")).toBe("true");

		select.button.click();
		expect(select.list.hidden).toBe(true);
	});

	it("opens with ArrowDown without moving the selection", () => {
		const select = useSelect({ label: "Country", options: CHOICES });
		document.body.append(select.root);
		select.button.focus();

		press("ArrowDown");

		expect(select.list.hidden).toBe(false);
		expect(select.getValue()).toBe("es");
	});

	describe("aria-activedescendant", () => {
		it("points at the active option while open and at nothing while closed", () => {
			// The listbox is virtual, so DOM focus stays on the button and the
			// active option is addressed by id.
			const select = useSelect({ label: "Country", options: CHOICES });
			document.body.append(select.root);

			expect(select.button.getAttribute("aria-activedescendant")).toBe("");

			select.setOpen(true);
			expect(select.button.getAttribute("aria-activedescendant")).toBe(select.options[0].id);

			select.setOpen(false);
			expect(select.button.getAttribute("aria-activedescendant")).toBe("");
		});

		it("keeps DOM focus on the button while arrows move", () => {
			const select = useSelect({ label: "Country", options: CHOICES });
			document.body.append(select.root);
			select.button.focus();

			press("ArrowDown");
			press("ArrowDown");

			expect(document.activeElement).toBe(select.button);
		});
	});

	it("commits with Enter and reports the change", () => {
		const onChange = vi.fn();
		const select = useSelect({ label: "Country", options: CHOICES, onChange });
		document.body.append(select.root);
		select.button.focus();

		press("ArrowDown");
		press("ArrowDown");
		press("Enter");

		expect(select.getValue()).toBe("ar");
		expect(select.list.hidden).toBe(true);
		expect(onChange).toHaveBeenCalledWith("ar");
	});

	it("closes on Escape without committing", () => {
		// Arrange
		const onChange = vi.fn();
		const select = useSelect({ label: "Country", options: CHOICES, onChange });
		document.body.append(select.root);
		select.button.focus();

		// Act — browse to Brazil, then bail out
		press("ArrowDown");
		press("ArrowDown");
		press("ArrowDown");
		press("Escape");

		// Assert
		expect(select.list.hidden).toBe(true);
		expect(select.getValue()).toBe("es");
		expect(onChange).not.toHaveBeenCalled();
	});

	it("closes on Tab without committing", () => {
		const select = useSelect({ label: "Country", options: CHOICES });
		document.body.append(select.root);
		select.button.focus();

		press("ArrowDown");
		press("Tab");

		expect(select.list.hidden).toBe(true);
		expect(select.getValue()).toBe("es");
	});

	it("wraps the active row at both ends", () => {
		const select = useSelect({ label: "Country", options: CHOICES });
		document.body.append(select.root);
		select.button.focus();
		select.setOpen(true);

		press("ArrowUp");

		expect(select.button.getAttribute("aria-activedescendant")).toBe(select.options[2].id);
	});

	it("jumps with Home and End", () => {
		const select = useSelect({ label: "Country", options: CHOICES });
		document.body.append(select.root);
		select.button.focus();
		select.setOpen(true);

		press("End");
		expect(select.button.getAttribute("aria-activedescendant")).toBe(select.options[2].id);

		press("Home");
		expect(select.button.getAttribute("aria-activedescendant")).toBe(select.options[0].id);
	});

	it("skips a disabled option with the arrows", () => {
		const select = useSelect({ label: "Country", options: CHOICES });
		document.body.append(select.root);
		select.button.focus();
		select.setOpen(true);

		press("End");
		press("ArrowDown");

		// Wraps past Chile, which is disabled, straight to Spain.
		expect(select.button.getAttribute("aria-activedescendant")).toBe(select.options[0].id);
	});

	it("selects on click", () => {
		const onChange = vi.fn();
		const select = useSelect({ label: "Country", options: CHOICES, onChange });
		document.body.append(select.root);
		select.setOpen(true);

		select.options[1].click();

		expect(select.getValue()).toBe("ar");
		expect(onChange).toHaveBeenCalledWith("ar");
	});

	it("closes on an outside pointerdown", () => {
		const select = useSelect({ label: "Country", options: CHOICES });
		document.body.append(select.root);
		select.setOpen(true);

		document.body.dispatchEvent(new Event("pointerdown", { bubbles: true }));

		expect(select.list.hidden).toBe(true);
	});

	it("supports typeahead", () => {
		const onChange = vi.fn();
		const select = useSelect({ label: "Country", options: CHOICES, onChange });
		document.body.append(select.root);
		select.button.focus();

		press("b");

		expect(select.getValue()).toBe("br");
		expect(onChange).toHaveBeenCalledWith("br");
	});

	it("buffers a multi-character typeahead", () => {
		const select = useSelect({ label: "Country", options: CHOICES });
		document.body.append(select.root);
		select.button.focus();

		press("a");
		press("r");

		expect(select.getValue()).toBe("ar");
	});

	it("keeps the active row when a typeahead has no match", () => {
		// A mistyped prefix must not lose the user's place.
		const select = useSelect({ label: "Country", options: CHOICES });
		document.body.append(select.root);
		select.button.focus();
		select.setOpen(true);
		press("ArrowDown");
		const before = select.button.getAttribute("aria-activedescendant");

		press("z");

		expect(select.button.getAttribute("aria-activedescendant")).toBe(before);
	});

	it("does nothing when disabled", () => {
		const onChange = vi.fn();
		const select = useSelect({ label: "Country", options: CHOICES, disabled: true, onChange });
		document.body.append(select.root);
		select.button.focus();

		expect(select.button.disabled).toBe(true);
		press("ArrowDown");
		press("Enter");

		expect(select.list.hidden).toBe(true);
		expect(onChange).not.toHaveBeenCalled();
	});
});
