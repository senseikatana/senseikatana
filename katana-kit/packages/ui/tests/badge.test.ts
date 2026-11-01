// @vitest-environment jsdom
import { describe, expect, it } from "vitest";

import { badgeClass, useBadge } from "../src/index";

describe("badgeClass", () => {
	it("defaults to neutral", () => {
		expect(badgeClass()).toBe("badge badge--neutral");
	});

	it("accepts semantic variants", () => {
		expect(badgeClass({ variant: "success" })).toBe("badge badge--success");
	});
});

describe("useBadge", () => {
	it("creates a label pill", () => {
		const badge = useBadge({ label: "Paid", variant: "success" });

		expect(badge.tagName).toBe("SPAN");
		expect(badge.textContent).toBe("Paid");
		expect(badge.classList.contains("badge--success")).toBe(true);
	});
});
