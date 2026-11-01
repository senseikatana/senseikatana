// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";

import { useModalClose, useRemove } from "@/infrastructure/dom/dom.service";

describe("DOM service", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
	});

	it("useRemove removes an element by selector and by Element", () => {
		document.body.innerHTML = '<div id="by-selector"></div><div id="by-element"></div>';

		useRemove("#by-selector");
		expect(document.querySelector("#by-selector")).toBeNull();

		const byElement = document.querySelector("#by-element");
		expect(byElement).not.toBeNull();
		useRemove(byElement as Element);
		expect(document.querySelector("#by-element")).toBeNull();
	});

	it("useRemove is a no-op when the target does not exist", () => {
		expect(() => useRemove("#missing")).not.toThrow();
	});

	it("useModalClose adds hidden and can remove the modal from the DOM", () => {
		document.body.innerHTML = '<div class="modal"></div>';

		useModalClose(".modal");
		expect(document.querySelector(".modal")?.classList.contains("hidden")).toBe(true);

		useModalClose(".modal", true);
		expect(document.querySelector(".modal")).toBeNull();
	});
});
