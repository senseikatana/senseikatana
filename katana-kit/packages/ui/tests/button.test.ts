// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";

import { buttonClass, useButton } from "../src/index";

describe("buttonClass", () => {
	it("defaults to primary/md", () => {
		expect(buttonClass()).toBe("btn btn--primary btn--md");
	});

	it("composes variant, size and loading", () => {
		expect(buttonClass({ variant: "danger", size: "sm", loading: true })).toBe(
			"btn btn--danger btn--sm btn--loading",
		);
	});
});

describe("useButton", () => {
	it("creates a button with label and classes", () => {
		const button = useButton({ label: "Save", variant: "secondary" });

		expect(button.tagName).toBe("BUTTON");
		expect(button.textContent).toBe("Save");
		expect(button.type).toBe("button");
		expect(button.classList.contains("btn--secondary")).toBe(true);
	});

	it("disables and marks busy while loading", () => {
		const button = useButton({ label: "Saving", loading: true });

		expect(button.disabled).toBe(true);
		expect(button.getAttribute("aria-busy")).toBe("true");
	});

	it("wires the click handler", () => {
		const onClick = vi.fn();
		const button = useButton({ label: "Go", onClick });

		button.click();

		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
