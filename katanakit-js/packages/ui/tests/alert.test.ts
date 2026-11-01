// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";

import { alertClass, useAlert } from "../src/index";

describe("alertClass", () => {
	it("defaults to info and composes dismissal", () => {
		expect(alertClass()).toBe("alert alert--info");
		expect(alertClass({ variant: "danger", dismissible: true })).toBe(
			"alert alert--danger alert--dismissible",
		);
	});
});

describe("useAlert", () => {
	it("uses assertive roles for warning and danger", () => {
		expect(useAlert({ variant: "warning" }).getAttribute("role")).toBe("alert");
		expect(useAlert({ variant: "danger" }).getAttribute("role")).toBe("alert");
	});

	it("uses polite roles for info and success", () => {
		expect(useAlert({ variant: "info" }).getAttribute("role")).toBe("status");
		expect(useAlert({ variant: "success" }).getAttribute("role")).toBe("status");
	});

	it("renders title and message", () => {
		const alert = useAlert({ title: "Heads up", message: "Quota at 90%" });

		expect(alert.querySelector(".alert__title")?.textContent).toBe("Heads up");
		expect(alert.querySelector(".alert__message")?.textContent).toBe("Quota at 90%");
	});

	it("dismisses accessibly and calls back", () => {
		const onDismiss = vi.fn();
		const alert = useAlert({ message: "Bye", dismissible: true, onDismiss });
		document.body.append(alert);

		const close = alert.querySelector<HTMLButtonElement>(".alert__close");

		expect(close?.getAttribute("aria-label")).toBe("Dismiss");
		close?.click();

		expect(document.body.contains(alert)).toBe(false);
		expect(onDismiss).toHaveBeenCalledTimes(1);
	});
});
