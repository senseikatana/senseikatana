// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
	MAX_OPEN_DIALOGS,
	modal,
	MODAL_EXIT_FALLBACK_MS,
	modalClass,
	modalContainerClass,
	useModalStore,
} from "../src/index";

/** jsdom has no top layer, so `showModal` is stubbed to the attribute form. */
function stubShowModal(): void {
	Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
		configurable: true,
		writable: true,
		value(this: HTMLDialogElement) {
			this.setAttribute("open", "");
		},
	});
	Object.defineProperty(HTMLDialogElement.prototype, "close", {
		configurable: true,
		writable: true,
		value(this: HTMLDialogElement) {
			this.removeAttribute("open");
			this.dispatchEvent(new Event("close"));
		},
	});
}

/**
 * Presses a key on whichever element currently holds focus.
 *
 * Only the *wrap* cases are testable here. jsdom implements no Tab navigation,
 * so a keypress that the browser would answer by moving focus to the next
 * element in document order does nothing in this environment. The pass-through
 * part of the cycle is asserted in `tests/e2e/modal.browser.test.ts`, where Tab
 * really navigates.
 */
function press(key: string, shiftKey = false): void {
	document.activeElement?.dispatchEvent(
		new KeyboardEvent("keydown", { key, shiftKey, bubbles: true, cancelable: true }),
	);
}

describe("modalClass", () => {
	it("defaults to md", () => {
		expect(modalClass()).toBe("modal modal--md");
	});

	it("composes the size", () => {
		expect(modalClass({ size: "full" })).toBe("modal modal--full");
	});
});

describe("modalContainerClass", () => {
	it("returns the stable root class", () => {
		expect(modalContainerClass()).toBe("modal-root");
	});
});

/**
 * jsdom performs no layout, so `getClientRects()` is empty for every element and
 * the component's visibility filter would discard the whole focus list — the
 * focus trap would silently become a no-op here. Stubbing it keeps the unit
 * suite meaningful; the real thing is covered in `tests/e2e/modal.browser.test.ts`,
 * where layout actually exists.
 */
function stubLayout(): void {
	Object.defineProperty(Element.prototype, "getClientRects", {
		configurable: true,
		writable: true,
		value: () => [{ width: 10, height: 10, top: 0, left: 0, right: 10, bottom: 10 }],
	});
}

describe("modal", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		document.body.innerHTML = "";
		stubShowModal();
		stubLayout();
		document.body.style.overflow = "";
	});

	afterEach(() => {
		modal.closeAll();
		vi.runOnlyPendingTimers();
		document.body.innerHTML = "";
		document.body.style.overflow = "";
		vi.useRealTimers();
	});

	it("hands back the same store through both accessors", () => {
		expect(useModalStore()).toBe(modal);
	});

	it("appends to document.body by default", () => {
		modal.open({ title: "Confirm" });
		expect(document.querySelector("dialog.modal")).not.toBeNull();
		expect(document.body.lastElementChild?.tagName).toBe("DIALOG");
	});

	it("honours an explicit portal container", () => {
		// Arrange
		const host = document.createElement("section");
		document.body.append(host);

		// Act
		modal.open({ title: "Nested", container: host });

		// Assert
		expect(host.querySelector("dialog")).not.toBeNull();
	});

	it("rejects a container that is neither an element nor a shadow root", () => {
		// A string would otherwise pass duck-typing on `appendChild` in some hosts.
		expect(() => modal.open({ container: "#host" as unknown as HTMLElement })).toThrow(
			/must be an element or a ShadowRoot/,
		);
	});

	it("rejects a detached container and leaves no scroll lock behind", () => {
		// Arrange — an easy mistake: `shadowRoot` captured before the host attaches
		const detached = document.createElement("div");
		document.body.style.overflow = "auto";

		// Act
		expect(() => modal.open({ container: detached })).toThrow(/attached to the document/);

		// Assert — no invisible dialog, no permanently locked page
		expect(document.querySelector("dialog")).toBeNull();
		expect(document.body.style.overflow).toBe("auto");
	});

	it("labels the dialog with its title", () => {
		modal.open({ title: "Delete project?" });
		const dialog = document.querySelector("dialog") as HTMLDialogElement;
		const heading = dialog.querySelector(".modal__title");

		expect(dialog.getAttribute("aria-labelledby")).toBe(heading?.id);
		expect(heading?.textContent).toBe("Delete project?");
	});

	it("marks itself as a modal dialog", () => {
		modal.open({ title: "x" });
		const dialog = document.querySelector("dialog") as HTMLDialogElement;

		expect(dialog.getAttribute("role")).toBe("dialog");
		expect(dialog.getAttribute("aria-modal")).toBe("true");
	});

	it("inserts string content as text, never as markup", () => {
		modal.open({ message: "<img src=x onerror=alert(1)>" });
		const body = document.querySelector(".modal__body") as HTMLElement;

		expect(body.querySelector("img")).toBeNull();
		expect(body.textContent).toBe("<img src=x onerror=alert(1)>");
	});

	it("appends a Node content as-is", () => {
		// Arrange
		const form = document.createElement("form");

		// Act
		modal.open({ content: form });

		// Assert
		expect(document.querySelector(".modal__body")?.contains(form)).toBe(true);
	});

	it("locks page scroll while open and restores it after", () => {
		document.body.style.overflow = "auto";

		modal.open({ title: "a" });
		expect(document.body.style.overflow).toBe("hidden");

		modal.closeAll();
		vi.advanceTimersByTime(MODAL_EXIT_FALLBACK_MS);
		expect(document.body.style.overflow).toBe("auto");
	});

	it("keeps the scroll lock while a second dialog is still open", () => {
		// Arrange — the classic refcount bug: closing one releases the page
		modal.open({ title: "a" });
		const second = modal.open({ title: "b" });

		// Act
		modal.close(second.id);
		vi.advanceTimersByTime(MODAL_EXIT_FALLBACK_MS);

		// Assert — the first dialog is still open, so the page must stay locked
		expect(document.querySelectorAll("dialog")).toHaveLength(1);
		expect(document.body.style.overflow).toBe("hidden");
	});

	it("closes on Escape", () => {
		modal.open({ title: "a" });
		const dialog = document.querySelector("dialog") as HTMLDialogElement;

		dialog.dispatchEvent(new Event("cancel", { cancelable: true }));
		vi.advanceTimersByTime(MODAL_EXIT_FALLBACK_MS);

		expect(document.querySelector("dialog")).toBeNull();
	});

	it("stays open on Escape when dismissOnEscape is false", () => {
		modal.open({ title: "a", dismissOnEscape: false });
		const dialog = document.querySelector("dialog") as HTMLDialogElement;

		dialog.dispatchEvent(new Event("cancel", { cancelable: true }));
		vi.advanceTimersByTime(MODAL_EXIT_FALLBACK_MS);

		expect(document.querySelector("dialog")).not.toBeNull();
	});

	it("closes on a backdrop click but not on a shell click", () => {
		// Arrange
		modal.open({ title: "a" });
		const dialog = document.querySelector("dialog") as HTMLDialogElement;

		// Act — a click inside the shell must not dismiss
		(dialog.querySelector(".modal__shell") as HTMLElement).click();
		expect(document.querySelector("dialog")).not.toBeNull();

		// Act — a click on the dialog itself is the backdrop
		dialog.click();
		vi.advanceTimersByTime(MODAL_EXIT_FALLBACK_MS);
		expect(document.querySelector("dialog")).toBeNull();
	});

	it("closes through the close button", () => {
		// Arrange
		const onClose = vi.fn();
		modal.open({ title: "a", onClose });
		const close = document.querySelector("[data-katana-modal-close]") as HTMLButtonElement;

		// Act
		close.click();
		vi.advanceTimersByTime(MODAL_EXIT_FALLBACK_MS);

		// Assert
		expect(onClose).toHaveBeenCalledTimes(1);
		expect(document.querySelector("dialog")).toBeNull();
	});

	it("omits the close button when dismissible is false", () => {
		modal.open({ title: "a", dismissible: false });
		expect(document.querySelector("[data-katana-modal-close]")).toBeNull();
	});

	it("keeps the close button reachable by keyboard", () => {
		modal.open({ title: "a", dismissOnEscape: false });
		const close = document.querySelector("[data-katana-modal-close]") as HTMLButtonElement;

		// With `dismissOnEscape: false`, Escape and the backdrop are both disabled.
		// If the close button were `aria-hidden` + `tabindex="-1"` it would be the
		// only dismiss control and a keyboard user would have no way out at all.
		expect(close.getAttribute("tabindex")).toBeNull();
		expect(close.getAttribute("aria-hidden")).toBeNull();
		expect(close.getAttribute("aria-label")).toBe("Close dialog");
	});

	it("omits the close button when dismissible is false", () => {
		modal.open({ title: "a", dismissible: false });
		expect(document.querySelector("[data-katana-modal-close]")).toBeNull();
	});

	it("gives each dialog a unique heading id", () => {
		// Regression: the id was derived from `dialog.id` before that was assigned,
		// so every dialog claimed `modal-title` and `aria-labelledby` announced
		// whichever dialog happened to come first in the document.
		const first = modal.open({ title: "First" });
		const second = modal.open({ title: "Second" });

		const labelledBy = (handle: { dialog: HTMLDialogElement }) =>
			handle.dialog.getAttribute("aria-labelledby");

		expect(labelledBy(first)).not.toBe(labelledBy(second));
		expect(first.dialog.querySelector(`#${labelledBy(first)}`)?.textContent).toBe("First");
		expect(second.dialog.querySelector(`#${labelledBy(second)}`)?.textContent).toBe("Second");
	});

	it("names the dialog when there is no title", () => {
		// An unnamed `role="dialog"` is announced as nothing when it opens.
		modal.open({ message: "body only" });
		const dialog = document.querySelector("dialog") as HTMLDialogElement;
		expect(dialog.getAttribute("aria-label")).toBe("Dialog");
	});

	it("prefers an explicit ariaLabel over the fallback", () => {
		modal.open({ message: "body only", ariaLabel: "Session expired" });
		const dialog = document.querySelector("dialog") as HTMLDialogElement;
		expect(dialog.getAttribute("aria-label")).toBe("Session expired");
	});

	it("evicts the oldest dialog past MAX_OPEN_DIALOGS", () => {
		const handles = Array.from({ length: MAX_OPEN_DIALOGS + 3 }, () => modal.open({ title: "x" }));
		// Eviction starts the exit animation, so the nodes leave the DOM after it.
		vi.advanceTimersByTime(MODAL_EXIT_FALLBACK_MS);

		expect(document.querySelectorAll("dialog")).toHaveLength(MAX_OPEN_DIALOGS);
		// The oldest three went; the newest survived.
		expect(handles.at(-1)?.dialog.isConnected).toBe(true);
		expect(handles[0].dialog.isConnected).toBe(false);
	});

	describe("focus", () => {
		it("focuses the first focusable child on open", () => {
			// Arrange
			const opener = document.createElement("button");
			document.body.append(opener);
			opener.focus();
			const action = document.createElement("button");

			// Act
			modal.open({ title: "a", footer: action });

			// Assert
			expect(document.activeElement).toBe(action);
		});

		it("focuses an explicit initialFocus target", () => {
			// Arrange — the target must live inside the dialog; the focus guard
			// would pull focus straight back out of an outside element.
			const target = document.createElement("button");
			const content = document.createDocumentFragment();
			content.append(target);

			// Act
			modal.open({ title: "a", content, initialFocus: target });

			// Assert
			expect(document.activeElement).toBe(target);
		});

		it("restores focus to the opener on close", () => {
			// Arrange
			const opener = document.createElement("button");
			document.body.append(opener);
			opener.focus();

			// Act
			modal.open({ title: "a" });
			modal.closeAll();
			vi.advanceTimersByTime(MODAL_EXIT_FALLBACK_MS);

			// Assert
			expect(document.activeElement).toBe(opener);
		});

		it("does not restore focus when returnFocus is false", () => {
			// Arrange
			const opener = document.createElement("button");
			document.body.append(opener);
			opener.focus();

			// Act
			modal.open({ title: "a", returnFocus: false });
			modal.closeAll();
			vi.advanceTimersByTime(MODAL_EXIT_FALLBACK_MS);

			// Assert
			expect(document.activeElement).not.toBe(opener);
		});

		it("wraps Tab from the last focusable back to the first", () => {
			// Arrange — the close button is the last tab stop by default
			const first = document.createElement("button");
			const content = document.createDocumentFragment();
			content.append(first);
			modal.open({ title: "a", content });
			const close = document.querySelector("[data-katana-modal-close]") as HTMLButtonElement;
			close.focus();

			// Act
			press("Tab");

			// Assert
			expect(document.activeElement).toBe(first);
		});

		it("wraps Shift+Tab from the first focusable back to the last", () => {
			// Arrange
			const first = document.createElement("button");
			const content = document.createDocumentFragment();
			content.append(first);
			modal.open({ title: "a", content });
			const close = document.querySelector("[data-katana-modal-close]") as HTMLButtonElement;
			first.focus();

			// Act
			press("Tab", true);

			// Assert
			expect(document.activeElement).toBe(close);
		});

		it("pulls focus back when it escapes the dialog", () => {
			// Arrange
			const inside = document.createElement("button");
			const outside = document.createElement("button");
			document.body.append(outside);
			modal.open({ title: "a", content: inside });
			const dialog = document.querySelector("dialog") as HTMLDialogElement;

			// Act — something steals focus, e.g. a rogue script
			outside.focus();
			dialog.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));

			// Assert
			expect(dialog.contains(document.activeElement)).toBe(true);
		});
	});

	describe("lifecycle", () => {
		it("calls onClose once even when closed repeatedly", () => {
			// Arrange
			const onClose = vi.fn();
			const handle = modal.open({ title: "a", onClose });

			// Act
			handle.close();
			handle.close();
			handle.close();
			vi.advanceTimersByTime(MODAL_EXIT_FALLBACK_MS);

			// Assert
			expect(onClose).toHaveBeenCalledTimes(1);
		});

		it("removes the dialog from the DOM on close", () => {
			// Arrange
			const handle = modal.open({ title: "a" });

			// Act
			handle.close();
			vi.advanceTimersByTime(MODAL_EXIT_FALLBACK_MS);

			// Assert
			expect(document.querySelector("dialog")).toBeNull();
		});

		it("gives each dialog a unique id", () => {
			const a = modal.open({ title: "a" });
			const b = modal.open({ title: "b" });

			expect(a.id).not.toBe(b.id);
			expect(a.dialog.id).toBe(a.id);
		});

		it("closes only the requested id", () => {
			// Arrange
			const first = modal.open({ title: "a" });
			modal.open({ title: "b" });

			// Act
			modal.close(first.id);
			vi.advanceTimersByTime(MODAL_EXIT_FALLBACK_MS);

			// Assert
			expect(document.querySelectorAll("dialog")).toHaveLength(1);
		});

		it("completes synchronously under prefers-reduced-motion", () => {
			// Arrange — the branch where a double-completion bug would hide. jsdom
			// does not define `matchMedia` at all, so the component's `typeof`
			// guard short-circuits and this path never ran; the previous revision
			// shipped exactly such a bug. Define it, then remove it.
			const original = window.matchMedia;
			Object.defineProperty(window, "matchMedia", {
				configurable: true,
				writable: true,
				value: (query: string) => ({
					matches: query.includes("prefers-reduced-motion"),
					media: query,
					addEventListener: () => {},
					removeEventListener: () => {},
				}),
			});

			try {
				const onClose = vi.fn();
				// Set before opening: `open` captures whatever overflow the body has
				// at that moment and restores exactly that on close.
				document.body.style.overflow = "auto";
				const handle = modal.open({ title: "a", onClose });

				// Act — the synchronous finish plus the fallback timer must agree
				handle.close();
				vi.advanceTimersByTime(MODAL_EXIT_FALLBACK_MS);

				// Assert
				expect(onClose).toHaveBeenCalledTimes(1);
				expect(document.querySelector("dialog")).toBeNull();
				expect(document.body.style.overflow).toBe("auto");
			} finally {
				Object.defineProperty(window, "matchMedia", {
					configurable: true,
					writable: true,
					value: original,
				});
			}
		});

		it("leaves no orphaned nodes after closeAll", () => {
			// Arrange
			modal.open({ title: "a" });
			modal.open({ title: "b" });

			// Act
			modal.closeAll();
			vi.advanceTimersByTime(MODAL_EXIT_FALLBACK_MS);

			// Assert
			expect(document.querySelectorAll("dialog")).toHaveLength(0);
			expect(document.body.style.overflow).toBe("");
		});

		it("fires onClose once when a descendant animation bubbles through", () => {
			// Regression: the completion listener was bound to the dialog, and both
			// `transitionend` and `animationend` bubble. A button or input inside
			// `content` completing its own transition during the exit window would
			// run `finish`, then the fallback timer would run it again — double
			// `onClose`, and a refcount that released the page while a dialog
			// was still open.
			const onClose = vi.fn();
			const button = document.createElement("button");
			const content = document.createDocumentFragment();
			content.append(button);
			modal.open({ title: "a", content, onClose });

			// Act — an unrelated animation completes while the dialog is leaving
			modal.closeAll();
			document
				.querySelector("dialog")
				?.dispatchEvent(new Event("animationend", { bubbles: true }) as unknown as AnimationEvent);
			vi.advanceTimersByTime(MODAL_EXIT_FALLBACK_MS);

			// Assert
			expect(onClose).toHaveBeenCalledTimes(1);
		});

		it("keeps the page locked while another dialog is still open", () => {
			// Arrange — the refcount invariant the audit found was broken by the
			// double-`finish` path above.
			modal.open({ title: "a" });
			const second = modal.open({ title: "b" });

			// Act
			modal.close(second.id);
			vi.advanceTimersByTime(MODAL_EXIT_FALLBACK_MS);

			// Assert
			expect(document.querySelectorAll("dialog")).toHaveLength(1);
			expect(document.body.style.overflow).toBe("hidden");
		});

		it("completes closeAll even when the platform close() throws", () => {
			// Arrange — the no-`showModal` fallback path has no `close()` at all;
			// assuming it exists there aborted the sweep and left the rest of the
			// stack open with the page locked forever.
			modal.open({ title: "a" });
			modal.open({ title: "b" });
			const dialogs = [...document.querySelectorAll("dialog")] as HTMLDialogElement[];
			Object.defineProperty(dialogs[0], "close", {
				configurable: true,
				value: () => {
					throw new TypeError("close is not available");
				},
			});

			// Act — the throw must not escape, nor abort the other dialog
			expect(() => modal.closeAll()).not.toThrow();
			vi.advanceTimersByTime(MODAL_EXIT_FALLBACK_MS);

			// Assert — cleanup still ran for both
			expect(document.querySelectorAll("dialog")).toHaveLength(0);
			expect(document.body.style.overflow).toBe("");
		});

		it("still removes the dialog and calls onClose when close() throws", () => {
			// Arrange — `finish` runs from a timer, so a throwing platform API would
			// otherwise abort the scroll unlock, the DOM removal and the callback.
			const onClose = vi.fn();
			modal.open({ title: "a", onClose });
			const dialog = document.querySelector("dialog") as HTMLDialogElement;
			Object.defineProperty(dialog, "close", {
				configurable: true,
				value: () => {
					throw new TypeError("close is not available");
				},
			});

			// Act
			modal.closeAll();
			vi.advanceTimersByTime(MODAL_EXIT_FALLBACK_MS);

			// Assert
			expect(document.querySelector("dialog")).toBeNull();
			expect(onClose).toHaveBeenCalledTimes(1);
			expect(document.body.style.overflow).toBe("");
		});
	});
});
