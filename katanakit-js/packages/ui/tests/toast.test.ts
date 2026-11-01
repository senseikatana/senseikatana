// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
	toast,
	TOAST_EXIT_FALLBACK_MS,
	toastClass,
	toastContainerClass,
	useToast,
	useToastContainer,
	useToastStore,
} from "../src/index";

/** Mirrors the component's private default so timing assertions read in real units. */
const DEFAULT_DURATION = 5000;

describe("toastClass", () => {
	it("defaults to info at medium size and dismissible", () => {
		expect(toastClass()).toBe("toast toast--info toast--md toast--dismissible");
	});

	it("composes variant and size", () => {
		expect(toastClass({ type: "success", size: "sm" })).toBe(
			"toast toast--success toast--sm toast--dismissible",
		);
	});

	it("drops the dismissible modifier when opted out", () => {
		expect(toastClass({ type: "error", dismissible: false })).toBe("toast toast--error toast--md");
	});
});

describe("toastContainerClass", () => {
	it("defaults to the top-right anchor", () => {
		expect(toastContainerClass()).toBe("toast-stack toast-stack--top-right");
		expect(toastContainerClass({ position: "bottom-left" })).toBe(
			"toast-stack toast-stack--bottom-left",
		);
	});
});

describe("useToast", () => {
	it("uses an assertive role only for errors", () => {
		expect(useToast({ type: "error" }).getAttribute("role")).toBe("alert");
		expect(useToast({ type: "success" }).getAttribute("role")).toBe("status");
		expect(useToast({ type: "info" }).getAttribute("role")).toBe("status");
	});

	it("hides the decorative icon from assistive tech", () => {
		const icon = useToast({ type: "success" }).querySelector(".toast__icon");

		expect(icon?.getAttribute("aria-hidden")).toBe("true");
		expect(icon?.getAttribute("focusable")).toBe("false");
	});

	it("renders no icon for loading toasts", () => {
		expect(useToast({ type: "loading" }).querySelector(".toast__icon")).toBeNull();
	});

	it("renders title and message", () => {
		const toast = useToast({ title: "Heads up", message: "Quota at 90%" });

		expect(toast.querySelector(".toast__title")?.textContent).toBe("Heads up");
		expect(toast.querySelector(".toast__message")?.textContent).toBe("Quota at 90%");
	});

	it("labels the close button", () => {
		const toast = useToast({ message: "Bye" });
		const close = toast.querySelector(".toast__close");

		expect(close?.getAttribute("aria-label")).toBe("Dismiss notification");
		expect(
			useToast({ message: "Bye", closeLabel: "Cerrar" })
				.querySelector(".toast__close")
				?.getAttribute("aria-label"),
		).toBe("Cerrar");
	});
});

describe("useToastContainer", () => {
	it("is a polite live region with an accessible name", () => {
		const stack = useToastContainer();

		expect(stack.getAttribute("role")).toBe("region");
		expect(stack.getAttribute("aria-live")).toBe("polite");
		expect(stack.getAttribute("aria-label")).toBe("Notifications");
	});
});

describe("useToastStore", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		document.body.innerHTML = "";
	});

	afterEach(() => {
		// Prune module state through the real path — the singleton's `mounted`
		// and `stacks` maps survive a `body.innerHTML` wipe.
		useToastStore().clear();
		vi.runOnlyPendingTimers();
		document.body.innerHTML = "";
		vi.useRealTimers();
	});

	it("mounts into a lazily created stack", () => {
		// Arrange / Act
		useToastStore().success("Saved");

		// Assert
		const stack = document.querySelector(".toast-stack--top-right");
		expect(stack?.querySelectorAll(".toast--success")).toHaveLength(1);
	});

	it("routes each helper to its variant", () => {
		// Arrange
		const toast = useToastStore();

		// Act
		toast.info("i");
		toast.success("s");
		toast.warning("w");
		toast.error("e");
		toast.loading("l");

		// Assert
		expect(document.querySelectorAll(".toast--info")).toHaveLength(1);
		expect(document.querySelectorAll(".toast--success")).toHaveLength(1);
		expect(document.querySelectorAll(".toast--warning")).toHaveLength(1);
		expect(document.querySelectorAll(".toast--error")).toHaveLength(1);
		expect(document.querySelectorAll(".toast--loading")).toHaveLength(1);
	});

	it("auto-dismisses after the default duration", () => {
		// Arrange / Act
		useToastStore().success("Saved");
		expect(document.querySelector(".toast")).not.toBeNull();

		// Assert — the timer fires at 5s, then the exit fallback clears the node
		vi.advanceTimersByTime(5000 + TOAST_EXIT_FALLBACK_MS);
		expect(document.querySelector(".toast")).toBeNull();
	});

	it("keeps loading toasts pinned indefinitely", () => {
		// Arrange / Act
		useToastStore().loading("Uploading");

		// Assert
		vi.advanceTimersByTime(60_000);
		expect(document.querySelector(".toast--loading")).not.toBeNull();
	});

	it("honours a zero duration", () => {
		// Arrange / Act
		useToastStore().error("Fatal", { duration: 0 });

		// Assert
		vi.advanceTimersByTime(60_000);
		expect(document.querySelector(".toast--error")).not.toBeNull();
	});

	it("pauses the countdown on hover and resumes it on leave", () => {
		// Arrange
		const toast = useToastStore().success("Saved");
		const element = document.querySelector(".toast") as HTMLElement;
		expect(element).not.toBeNull();

		// Act — hover at 3s, stay for 10s
		vi.advanceTimersByTime(3000);
		element.dispatchEvent(new MouseEvent("mouseenter"));
		expect(element.classList.contains("toast--paused")).toBe(true);
		vi.advanceTimersByTime(10_000);

		// Assert — still alive, because the timer froze with it
		expect(document.querySelector(".toast")).not.toBeNull();

		// Act — leave; only the remaining 2s are left on the clock
		element.dispatchEvent(new MouseEvent("mouseleave"));
		vi.advanceTimersByTime(1999);
		expect(document.querySelector(".toast")).not.toBeNull();

		// Assert — gone once the resumed countdown runs out
		vi.advanceTimersByTime(1 + TOAST_EXIT_FALLBACK_MS);
		expect(document.querySelector(".toast")).toBeNull();
		expect(toast.id).toMatch(/^toast-\d+$/);
	});

	it("pauses on keyboard focus too", () => {
		// Arrange
		useToastStore().success("Saved");
		const element = document.querySelector(".toast") as HTMLElement;

		// Act
		vi.advanceTimersByTime(4000);
		element.dispatchEvent(new FocusEvent("focusin"));
		vi.advanceTimersByTime(60_000);

		// Assert
		expect(document.querySelector(".toast")).not.toBeNull();
	});

	it("dismisses by id and leaves siblings untouched", () => {
		// Arrange
		const toast = useToastStore();
		const first = toast.info("first");
		toast.info("second");

		// Act
		toast.dismiss(first.id);
		vi.advanceTimersByTime(TOAST_EXIT_FALLBACK_MS);

		// Assert
		expect(document.querySelectorAll(".toast")).toHaveLength(1);
	});

	it("removes every toast on clear", () => {
		// Arrange
		const toast = useToastStore();
		toast.info("a");
		toast.success("b", { position: "bottom-center" });

		// Act
		toast.clear();
		vi.advanceTimersByTime(TOAST_EXIT_FALLBACK_MS);

		// Assert
		expect(document.querySelectorAll(".toast")).toHaveLength(0);
		expect(document.querySelectorAll(".toast-stack")).toHaveLength(0);
	});

	it("updates a toast in place, keeping its id", () => {
		// Arrange
		const handle = useToastStore().loading("Uploading");
		document.body.append(document.querySelector(".toast") as HTMLElement);

		// Act
		handle.update({ type: "success", message: "Upload complete" });

		// Assert
		const updated = document.querySelector(".toast") as HTMLElement;
		expect(updated.dataset.toastId).toBe(handle.id);
		expect(updated.classList.contains("toast--success")).toBe(true);
		expect(updated.querySelector(".toast__message")?.textContent).toBe("Upload complete");
	});

	it("invokes onClose with the toast id", () => {
		// Arrange
		const onClose = vi.fn();

		// Act
		useToastStore().show({ message: "bye", duration: 1000, onClose });
		vi.advanceTimersByTime(1000 + TOAST_EXIT_FALLBACK_MS);

		// Assert
		expect(onClose).toHaveBeenCalledTimes(1);
		expect(onClose.mock.calls[0][0]).toMatch(/^toast-\d+$/);
	});

	it("keeps separate stacks per position", () => {
		// Arrange
		const toast = useToastStore();

		// Act
		toast.info("right", { position: "top-right" });
		toast.info("left", { position: "bottom-left" });

		// Assert
		expect(document.querySelectorAll(".toast-stack")).toHaveLength(2);
		expect(document.querySelector(".toast-stack--bottom-left .toast")?.textContent).toContain("left");
	});

	it("drops the stack from the DOM once empty", () => {
		// Arrange
		const toast = useToastStore();
		toast.info("bye", { duration: 1000 });

		// Act / Assert
		expect(document.querySelectorAll(".toast-stack")).toHaveLength(1);
		vi.advanceTimersByTime(1000 + TOAST_EXIT_FALLBACK_MS);
		expect(document.querySelectorAll(".toast-stack")).toHaveLength(0);
	});

	it("hands back the same store on every call", () => {
		expect(useToastStore()).toBe(useToastStore());
	});

	it("exposes the same store through the toast facade", () => {
		expect(useToastStore()).toBe(toast);
	});

	it("mounts through the toast facade", () => {
		// Arrange / Act
		toast.success("Profile saved.");

		// Assert
		expect(document.querySelectorAll(".toast--success")).toHaveLength(1);
	});

	it("resolves the store lazily, so the facade is safe to import", () => {
		// Arrange — every method is a thin delegate; nothing runs until called
		const methods = ["show", "info", "success", "warning", "error", "loading"] as const;

		// Assert
		for (const method of methods) {
			expect(typeof toast[method]).toBe("function");
		}
		expect(typeof toast.dismiss).toBe("function");
		expect(typeof toast.clear).toBe("function");
	});

	describe("close button", () => {
		it("dismisses through the normal path and reports the real id", () => {
			// Arrange
			const onClose = vi.fn();
			const handle = useToastStore().show({ message: "bye", onClose, duration: 0 });
			const close = document.querySelector<HTMLButtonElement>(".toast__close");

			// Act
			close?.click();
			vi.advanceTimersByTime(TOAST_EXIT_FALLBACK_MS);

			// Assert — a real id, never ""
			expect(onClose).toHaveBeenCalledTimes(1);
			expect(onClose).toHaveBeenCalledWith(handle.id);
			expect(document.querySelectorAll(".toast")).toHaveLength(0);
		});

		it("does not leak the entry: the stack is pruned too", () => {
			// Arrange
			const toast = useToastStore();
			toast.info("pinned", { duration: 0 });

			// Act
			document.querySelector<HTMLButtonElement>(".toast__close")?.click();
			vi.advanceTimersByTime(TOAST_EXIT_FALLBACK_MS);

			// Assert
			expect(document.querySelectorAll(".toast-stack")).toHaveLength(0);
			// A later clear() must find nothing left to remove.
			toast.clear();
			expect(document.querySelectorAll(".toast")).toHaveLength(0);
		});
	});

	it("calls onClose once no matter how often dismiss is called", () => {
		// Arrange
		const onClose = vi.fn();
		const handle = useToastStore().show({ message: "x", onClose, duration: 0 });

		// Act
		handle.dismiss();
		handle.dismiss();
		handle.dismiss();
		vi.advanceTimersByTime(TOAST_EXIT_FALLBACK_MS);

		// Assert
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it("does not re-arm the timer when the pointer leaves during exit", () => {
		// Arrange
		const onClose = vi.fn();
		const handle = useToastStore().show({ message: "x", onClose, duration: 1000 });
		const element = document.querySelector(".toast") as HTMLElement;

		// Act
		handle.dismiss();
		element.dispatchEvent(new MouseEvent("mouseleave"));
		vi.advanceTimersByTime(TOAST_EXIT_FALLBACK_MS);

		// Assert
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it("ignores an update after dismissal", () => {
		// Arrange
		const handle = useToastStore().show({ message: "bye", duration: 0 });

		// Act
		handle.dismiss();
		handle.update({ type: "success", message: "should not appear" });
		vi.advanceTimersByTime(TOAST_EXIT_FALLBACK_MS);

		// Assert
		expect(document.querySelectorAll(".toast")).toHaveLength(0);
		expect(document.querySelector(".toast--success")).toBeNull();
	});

	it("creates the progress bar when a toast becomes timed", () => {
		// Arrange — a pinned toast has no bar
		const handle = useToastStore().show({ message: "x", duration: 0 });
		expect(document.querySelectorAll(".toast__progress")).toHaveLength(0);

		// Act
		handle.update({ duration: 3000 });
		const element = document.querySelector(".toast") as HTMLElement;

		// Assert
		expect(document.querySelectorAll(".toast__progress")).toHaveLength(1);
		expect(element.style.getPropertyValue("--katana-toast-duration")).toBe("3000ms");
	});

	it("keeps a loading toast pinned even after a timed update", () => {
		// Arrange — explicit duration must not resurrect the timer on `loading`
		const handle = useToastStore().info("info", { duration: 3000 });

		// Act
		handle.update({ type: "loading", message: "working" });
		vi.advanceTimersByTime(60_000);

		// Assert
		expect(document.querySelector(".toast--loading")).not.toBeNull();
	});

	it("caps the number of live toasts per stack", () => {
		// Arrange / Act
		const toast = useToastStore();
		for (let i = 0; i < 12; i += 1) toast.info(`m${i}`, { duration: 0 });

		// Assert — a rolling window of the newest 5, oldest evicted
		vi.advanceTimersByTime(TOAST_EXIT_FALLBACK_MS);
		const live = [...document.querySelectorAll(".toast")];
		expect(live).toHaveLength(5);
		expect(live.map((node) => node.textContent)).toEqual(["m7×", "m8×", "m9×", "m10×", "m11×"]);
	});

	it("ignores a null duration instead of pinning the toast forever", () => {
		// Arrange / Act — `null` arrives easily from JSON or a settings blob
		useToastStore().show({ message: "x", duration: null as unknown as number });

		// Assert
		vi.advanceTimersByTime(DEFAULT_DURATION + TOAST_EXIT_FALLBACK_MS);
		expect(document.querySelectorAll(".toast")).toHaveLength(0);
	});

	it("ignores an infinite duration instead of dismissing instantly", () => {
		// Arrange / Act
		useToastStore().show({ message: "x", duration: Number.POSITIVE_INFINITY });

		// Assert
		vi.advanceTimersByTime(DEFAULT_DURATION + TOAST_EXIT_FALLBACK_MS);
		expect(document.querySelectorAll(".toast")).toHaveLength(0);
	});

	it("keeps the paused state across an update", () => {
		// Arrange
		const handle = useToastStore().success("Saved", { duration: 5000 });
		const element = document.querySelector(".toast") as HTMLElement;
		vi.advanceTimersByTime(1000);
		element.dispatchEvent(new MouseEvent("mouseenter"));

		// Act
		handle.update({ message: "Saved (v2)" });
		const updated = document.querySelector(".toast") as HTMLElement;

		// Assert — the pointer never left, so it must stay paused
		expect(updated.classList.contains("toast--paused")).toBe(true);
		vi.advanceTimersByTime(60_000);
		expect(document.querySelector(".toast")).not.toBeNull();
	});

	it("keeps position on update rather than silently ignoring it", () => {
		// Arrange
		const handle = useToastStore().info("a", { position: "top-right" });

		// Act — position anchors the stack, so it cannot move mid-life
		handle.update({ position: "bottom-left" });

		// Assert
		expect(document.querySelectorAll(".toast-stack")).toHaveLength(1);
		expect(document.querySelector(".toast-stack--top-right")).not.toBeNull();
	});
});
