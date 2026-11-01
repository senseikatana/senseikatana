// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";

import { inputClass, useInput } from "../src/index";

describe("inputClass", () => {
	it("marks invalid fields", () => {
		expect(inputClass()).toBe("input");
		expect(inputClass({ error: "Required" })).toBe("input input--invalid");
	});
});

describe("useInput", () => {
	it("wires the label to the input", () => {
		const { root, input } = useInput({ label: "Email", name: "email" });

		const label = root.querySelector("label");

		expect(root.className).toBe("field");
		expect(label?.htmlFor).toBe(input.id);
		expect(input.id).toBe("email");
		expect(input.type).toBe("text");
	});

	it("exposes error state through aria attributes", () => {
		const { root, input } = useInput({ label: "Email", error: "Required" });

		const error = root.querySelector(".field__error");

		expect(input.getAttribute("aria-invalid")).toBe("true");
		expect(input.getAttribute("aria-describedby")).toBe(error?.id);
		expect(input.classList.contains("input--invalid")).toBe(true);
	});

	it("links help text without marking the field invalid", () => {
		const { root, input } = useInput({ label: "Email", help: "Work address" });

		const help = root.querySelector(".field__help");

		expect(input.hasAttribute("aria-invalid")).toBe(false);
		expect(input.getAttribute("aria-describedby")).toBe(help?.id);
	});

	it("forwards input events and native state", () => {
		const onInput = vi.fn();
		const { input } = useInput({ label: "Name", required: true, disabled: true, onInput });

		input.value = "Ada";
		input.dispatchEvent(new Event("input"));

		expect(onInput).toHaveBeenCalledWith("Ada");
		expect(input.required).toBe(true);
		expect(input.disabled).toBe(true);
	});
});
