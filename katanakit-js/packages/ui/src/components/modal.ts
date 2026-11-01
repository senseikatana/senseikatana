/**
 * Modal dialogs — native `<dialog>` in the top layer, with a focus trap.
 *
 * ## The portal decision
 *
 * The component owns the portal: it appends to `document.body` (or a `container`
 * you pass) and removes itself on close. The alternative — leaving the portal to
 * the consumer — keeps the factory "pure" at the cost of making every call site
 * wire up the portal, the focus restoration and the scroll lock. Getting that
 * wiring wrong is the normal failure mode, and it fails as *inaccessible*
 * rather than as an error: focus lands nowhere and the keyboard user is stranded.
 *
 * `container` is the escape hatch for shadow DOM and for nesting a dialog inside
 * a subtree. It must already be in the document.
 *
 * ## Focus management
 *
 * `showModal()` promotes the dialog to the top layer, renders `::backdrop`, fires
 * `cancel` on <kbd>Escape</kbd>, and makes the rest of the document inert. On top
 * of that the component adds the two things the native behaviour leaves open:
 *
 * - an explicit <kbd>Tab</kbd> cycle, because a browser will still let focus walk
 *   out through its own chrome;
 * - a `focusin` guard that pulls focus back if it escapes for any other reason.
 *
 * The guard listens on the dialog's own root, not on the dialog. That is not a
 * stylistic choice: for a dialog inside a shadow root, focus events retarget to
 * the *host*, so a dialog-scoped listener cannot observe focus inside its own
 * subtree. Measured in Chromium: `focusin` does cross a plain shadow boundary
 * normally, but not for a top-layer dialog in one — the top layer is the blocker,
 * not the shadow root.
 *
 * Focus is restored to whatever was focused before `open()`, unless that element
 * is gone by the time the dialog closes — then it falls back to the topmost
 * dialog still open, and finally to `<body>`.
 *
 * ## SSR
 *
 * {@link modalClass} and {@link modalContainerClass} are pure. The `modal` export
 * is a lazy facade, so importing it during SSR is safe; only calling a method
 * touches the DOM.
 *
 * @module ui/components/modal
 */

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

/** Dialog widths. */
export type ModalSize = "sm" | "md" | "lg" | "full";

/** Options accepted by {@link modalClass} and {@link modal.open}. */
export interface ModalOptions {
	/** Heading line, rendered as `<h2>`. */
	title?: string;
	/**
	 * Accessible name for the dialog. Set this when there is no `title` — a
	 * `role="dialog"` with neither `aria-labelledby` nor `aria-label` is unnamed,
	 * and a screen reader announces nothing when it opens.
	 */
	ariaLabel?: string;
	/** Short body text. Ignored when `content` is given. */
	message?: string;
	/**
	 * Arbitrary body. A string is inserted with `textContent`, never parsed as
	 * HTML, so untrusted text cannot inject markup. A `Node` is appended as-is.
	 */
	content?: string | Node;
	/** Footer row. Same insertion rules as `content`. */
	footer?: string | Node;
	/** Width (default: `"md"`). */
	size?: ModalSize;
	/** Renders the close button (default: `true`). */
	dismissible?: boolean;
	/** Escape key and backdrop click close the dialog (default: `true`). */
	dismissOnEscape?: boolean;
	/** Accessible name for the close button (default: `"Close dialog"`). */
	closeLabel?: string;
	/** Portal target. Must already be attached to the document. */
	container?: HTMLElement | null;
	/** Element to focus on open (default: the first focusable, else the dialog). */
	initialFocus?: HTMLElement | null;
	/** Restore focus to the opener on close (default: `true`). */
	returnFocus?: boolean;
	/**
	 * Called once the dialog has left the DOM.
	 *
	 * Do not synchronously reopen from here: the close bookkeeping is already
	 * resolved before this runs, so it is safe, but a handler that reopens on
	 * every close will grow the stack without bound.
	 */
	onClose?: (id: string) => void;
}

/** Live reference to an open dialog. */
export interface ModalHandle {
	/** Stable id assigned at creation. */
	readonly id: string;
	/** The `<dialog>` element, for content the options could not express. */
	readonly dialog: HTMLDialogElement;
	/** Closes the dialog, playing the exit animation. */
	close(): void;
}

/** Programmatic dialog manager. */
export interface ModalStore {
	/** Opens a dialog and returns its handle. */
	open(options?: ModalOptions): ModalHandle;
	/** Closes one dialog by id, or every open dialog when omitted. */
	close(id?: string): void;
	/** Closes every open dialog. */
	closeAll(): void;
}

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

/** Exit-animation safety net, mirroring the toast. */
export const MODAL_EXIT_FALLBACK_MS = 250;

/**
 * Ceiling on simultaneously open dialogs.
 *
 * Without it, a runaway loop that opens a dialog per record — or per item in an
 * API response — grows the top layer without bound and every dialog adds itself
 * to the focus-trap work.
 */
export const MAX_OPEN_DIALOGS = 5;

/** Valid {@link ModalSize} values, used to validate untyped input at runtime. */
const SIZES: readonly ModalSize[] = ["sm", "md", "lg", "full"];

/**
 * Elements that can hold focus, in Tab order.
 *
 * `tabindex="-1"` is excluded on purpose: such an element is focusable
 * programmatically but the browser skips it in the Tab cycle, so including it
 * would make the wrap points disagree with what the browser actually does.
 *
 * The negation is repeated on every clause on purpose. A bare
 * `[tabindex]:not([tabindex^="-"])` at the end is not enough: `button` matches
 * through `button:not([disabled])` and never reaches that clause.
 */
const FOCUSABLE = [
	'a[href]:not([tabindex^="-"])',
	'area[href]:not([tabindex^="-"])',
	'button:not([disabled]):not([tabindex^="-"])',
	'input:not([disabled]):not([type="hidden"]):not([tabindex^="-"])',
	'select:not([disabled]):not([tabindex^="-"])',
	'textarea:not([disabled]):not([tabindex^="-"])',
	'iframe:not([tabindex^="-"])',
	'audio[controls]:not([tabindex^="-"])',
	'video[controls]:not([tabindex^="-"])',
	'[contenteditable]:not([contenteditable="false"]):not([tabindex^="-"])',
	'[tabindex]:not([tabindex^="-"])',
].join(", ");

/** Inline SVG path for the close affordance. Authored constant, never user input. */
const CLOSE_ICON =
	'<path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.75" ' +
	'stroke-linecap="round" fill="none"/>';

/* -------------------------------------------------------------------------- */
/* Pure surfaces (SSR-safe)                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Pure class list for a dialog — safe to call during SSR or inside a framework
 * template.
 *
 * @param options - Size and dismissibility.
 * @returns The `modal` class list.
 *
 * @example
 * ```ts
 * modalClass({ size: "lg" });
 * // "modal modal--lg"
 * ```
 */
export function modalClass(options: Pick<ModalOptions, "size" | "dismissible"> = {}): string {
	// Validated, not trusted: the union is erased at runtime for JS consumers and
	// for options arriving from JSON.
	const size = SIZES.includes(options.size as ModalSize) ? (options.size as ModalSize) : "md";
	return ["modal", `modal--${size}`].join(" ");
}

/**
 * Pure class list for the page-level wrapper — safe to call during SSR.
 *
 * @returns The `modal-root` class list.
 */
export function modalContainerClass(): string {
	return "modal-root";
}

/* -------------------------------------------------------------------------- */
/* DOM helpers                                                                */
/* -------------------------------------------------------------------------- */

function requireDom(api: string): Document {
	if (typeof document === "undefined") {
		throw new Error(`[KatanaUI] ${api}() needs a DOM; use modalClass() for SSR markup.`);
	}
	return document;
}

/**
 * Resolves the portal target.
 *
 * Accepts an element or a `ShadowRoot` (`nodeType` 1 and 11). Duck-typing on
 * `appendChild` alone would also accept `document` itself, which would put the
 * dialog outside `<html>`.
 *
 * @param container - Caller-supplied target, or `null` for the document body.
 * @returns The element the dialog is appended to.
 * @throws {Error} When the supplied target is neither an element nor a shadow root.
 */
function usePortalTarget(container?: HTMLElement | null): HTMLElement | ShadowRoot {
	if (container === null || container === undefined) {
		if (typeof document === "undefined") {
			throw new Error("[KatanaUI] modal.open() needs a DOM; use modalClass() for SSR markup.");
		}
		return document.body;
	}

	const nodeType = (container as Node).nodeType;
	if (nodeType !== 1 && nodeType !== 11) {
		throw new Error(
			"[KatanaUI] modal container must be an element or a ShadowRoot, and must already be in the document.",
		);
	}

	// A node from another document is refused outright rather than half-supported:
	// `focusin` does not cross a document boundary either, so the focus guard would
	// never fire and the scroll lock would be applied to the wrong body.
	if (typeof document !== "undefined" && container.ownerDocument !== document) {
		throw new Error("[KatanaUI] modal container must belong to the current document.");
	}

	return container;
}

/**
 * Lists the tab-reachable elements inside a container, in document order.
 *
 * Visibility is checked with `getClientRects()` rather than `offsetParent`,
 * because `offsetParent` is `null` for `position: fixed` elements — which
 * includes anything already in a top-layer dialog.
 *
 * @param root - Element to search within.
 * @returns The focusable descendants, filtered to the visible ones.
 */
function useFocusables(root: HTMLElement): HTMLElement[] {
	return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
		(element) => element.getClientRects().length > 0,
	);
}

/**
 * Inserts dialog content, never parsing a string as HTML.
 *
 * @param parent - Element receiving the content.
 * @param value - A `Node` to append, or a string inserted as text.
 */
function useInsert(parent: HTMLElement, value: string | Node): void {
	// `ownerDocument`, not the global: with a `container` in another document the
	// node must be created there, or adoption throws.
	const doc = parent.ownerDocument;
	if (typeof value === "string") {
		const text = doc.createElement("p");
		text.className = "modal__text";
		text.textContent = value;
		parent.append(text);
		return;
	}
	parent.append(value);
}

/* -------------------------------------------------------------------------- */
/* Scroll lock                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Open dialogs holding the scroll lock.
 *
 * Refcounted because closing one dialog must not release the lock while another
 * is still open — the failure being a scrollable page behind an open modal.
 */
let scrollLocks = 0;

/** The value `body.style.overflow` held before the first lock, restored verbatim. */
let previousOverflow: string | null = null;

function lockScroll(): void {
	if (typeof document === "undefined") return;
	if (scrollLocks === 0) {
		previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
	}
	scrollLocks += 1;
}

function unlockScroll(): void {
	if (typeof document === "undefined") return;
	scrollLocks = Math.max(0, scrollLocks - 1);
	if (scrollLocks > 0 || previousOverflow === null) return;
	document.body.style.overflow = previousOverflow;
	previousOverflow = null;
}

/* -------------------------------------------------------------------------- */
/* Store                                                                      */
/* -------------------------------------------------------------------------- */

interface Mounted {
	handle: ModalHandle;
	options: ModalOptions;
	dialog: HTMLDialogElement;
	/** The animated shell; the exit animation is observed here, not on the dialog. */
	shell: HTMLElement;
	/** Element focused before the dialog opened. */
	restoreTarget: HTMLElement | null;
	closing: boolean;
	finished: boolean;
}

/**
 * Open dialogs, keyed by id.
 *
 * A single `Map` rather than a `Map` plus an order array: insertion order *is*
 * the stack order, so the two can never drift apart, and `delete` + re-`set` is
 * the LIFO move.
 */
const open = new Map<string, Mounted>();

let store: ModalStore | null = null;
let sequence = 0;

/**
 * Teardown for the focus guard, keyed by the tree it was installed on.
 *
 * One guard per root, not one per dialog: a per-dialog listener would run
 * `querySelectorAll` plus `getClientRects` — a forced synchronous layout — on
 * every focus event, multiplied by the number of open dialogs.
 */
const guards = new Map<Document | ShadowRoot, () => void>();

/** The topmost dialog — the last one inserted, which is `Map` insertion order. */
function useTopmost(): Mounted | undefined {
	let top: Mounted | undefined;
	for (const entry of open.values()) top = entry;
	return top;
}

/** The tree a dialog lives in. `focusin` does not cross a shadow boundary. */
function useRoot(dialog: HTMLElement): Document | ShadowRoot {
	return dialog.getRootNode() as Document | ShadowRoot;
}

/**
 * Resolves the focused element from the dialog's own tree.
 *
 * `document.activeElement` is shadow-blind: for a dialog inside a shadow root it
 * reports the *host*, which the dialog does not contain. Reading the root's own
 * `activeElement` is correct in both the document and the shadow case.
 *
 * @param dialog - The dialog being examined.
 * @returns The focused element, or `null`.
 */
function useActive(dialog: HTMLElement): HTMLElement | null {
	const root = useRoot(dialog);
	return ((root.activeElement ?? document.activeElement) as HTMLElement | null) ?? null;
}

/**
 * Installs the focus guards on a dialog's tree, if they are not already there.
 *
 * Two guards, because they catch different failures:
 *
 * - `focusin` — focus was *moved* to something outside the dialog, by script or
 *   by a click. Note that on the `showModal()` path this is largely unreachable:
 *   a top-layer dialog makes the rest of the document inert, and `.focus()` on an
 *   inert element does nothing. It earns its keep on the no-`showModal` fallback,
 *   which gets no inertness from the platform.
 * - `focusout` with a `null` `relatedTarget` — focus *left the document* without
 *   going anywhere: a `.blur()`, the focused element being removed from the DOM,
 *   or a re-render replacing it. Those fire no `focusin` at all, so the guard above
 *   never sees them.
 */
function useEnsureGuard(dialog: HTMLElement): void {
	const root = useRoot(dialog);
	if (guards.has(root) || typeof root.addEventListener !== "function") return;

	const pullBack = (dialogElement: HTMLElement) => {
		// Fall back to the dialog itself: without this the trap is a silent no-op
		// whenever the dialog has no focusable children.
		(useFocusables(dialogElement)[0] ?? dialogElement).focus();
	};

	const onFocusIn = (event: Event) => {
		const entry = useTopmost();
		if (!entry) return;
		const target = event.target as Node | null;
		if (!target || entry.dialog.contains(target) || !entry.dialog.isConnected) return;
		pullBack(entry.dialog);
	};

	// `focusout` does not bubble, so this has to be capture-phase to be robust.
	const onFocusOut = (event: Event) => {
		const entry = useTopmost();
		if (!entry || entry.closing) return;
		// A move to a real element is the browser doing its job, not a leak. Only
		// `null` means focus went nowhere — which is exactly what removal,
		// re-render and `.blur()` all produce.
		if ((event as FocusEvent).relatedTarget !== null) return;

		// Deferred on purpose. When the focused element is removed, `focusout`
		// fires *synchronously inside* the removal, while the element is still
		// attached and still first in DOM order. Acting immediately would focus
		// the very element about to disappear, and focus would then fall out of the
		// dialog entirely. A microtask runs once the DOM has settled.
		queueMicrotask(() => {
			// The dialog may have closed in the meantime, and closing restores
			// focus on purpose.
			if (entry.finished || entry.closing) return;
			if (!entry.dialog.isConnected) return;
			pullBack(entry.dialog);
		});
	};

	root.addEventListener("focusin", onFocusIn);
	root.addEventListener("focusout", onFocusOut, true);
	guards.set(root, () => {
		root.removeEventListener("focusin", onFocusIn);
		root.removeEventListener("focusout", onFocusOut, true);
	});
}

function useReleaseGuard(dialog: HTMLElement): void {
	if (open.size > 0) return;
	const root = useRoot(dialog);
	const release = guards.get(root);
	if (!release) return;
	release();
	guards.delete(root);
}

function useRestoreFocus(restore: HTMLElement | null): void {
	if (typeof document === "undefined") return;

	// Prefer a still-open dialog over a detached target: the element that had
	// focus may belong to a dialog that is itself closing, and focusing it would
	// trap focus in a detached subtree.
	const top = useTopmost();
	if (top) {
		(useFocusables(top.dialog)[0] ?? top.dialog).focus();
		return;
	}

	if (restore && restore.isConnected) {
		restore.focus();
		return;
	}
	// Deliberately no `document.body.focus()`: `<body>` is not focusable in every
	// engine, and where it is, focusing it moves the caret to the document root —
	// further away from the user's work, not closer. Removing the dialog already
	// drops focus to the body, which is the outcome we wanted anyway.
}

function useClose(entry: Mounted, id: string): void {
	// Idempotent at both levels: `closing` stops re-entry, `finished` stops the
	// two completion paths from running twice.
	if (entry.closing) return;
	entry.closing = true;

	open.delete(id);

	const finish = () => {
		if (entry.finished) return;
		entry.finished = true;

		// Lift the top layer here, not before the animation. Removing `[open]`
		// triggers the UA rule `dialog:not([open]) { display: none }`, and a
		// `display: none` element runs no animation — so calling `close()` up front
		// suppressed the exit before it played a frame and every close fell through
		// to the fallback timer. The backdrop has to survive it too, which is why
		// this cannot move earlier.
		//
		// Guarded: a platform `close()` that throws must not abort the cleanup
		// below, or the scroll lock, the DOM removal and `onClose` are all skipped.
		try {
			if (typeof entry.dialog.close === "function") {
				if (entry.dialog.open) entry.dialog.close();
			} else {
				entry.dialog.removeAttribute("open");
			}
		} catch {
			entry.dialog.removeAttribute("open");
		}

		unlockScroll();
		entry.dialog.remove();
		useReleaseGuard(entry.dialog);
		entry.options.onClose?.(id);
		if (entry.options.returnFocus !== false) useRestoreFocus(entry.restoreTarget);
	};

	const reduced =
		typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;

	entry.shell.classList.add("modal--leaving");
	if (reduced) finish();
	else {
		// No `once`: it would be consumed by the first `animationend` to arrive,
		// including one from a caller's own animation inside `content`, and the real
		// exit would never be observed. `entry.finished` already makes a repeat
		// harmless, and the listener dies with the node in `finish`.
		entry.shell.addEventListener("animationend", (event) => {
			if ((event as AnimationEvent).animationName !== "katana-modal-out") return;
			finish();
		});
	}

	setTimeout(finish, MODAL_EXIT_FALLBACK_MS);
}

function useBuild(
	options: ModalOptions,
	id: string,
): { dialog: HTMLDialogElement; shell: HTMLElement } {
	const dialog = document.createElement("dialog");
	// Set before the children are built: the heading id is derived from it, and
	// assigning it afterwards left every dialog sharing `modal-title`, so
	// `aria-labelledby` announced the wrong dialog's title.
	dialog.id = id;
	dialog.className = modalClass(options);
	// A dialog with no focusable children still needs to be able to take focus:
	// without this, `showModal()` makes the page behind inert and focus has
	// nowhere legitimate to land.
	dialog.tabIndex = -1;
	dialog.setAttribute("role", "dialog");
	dialog.setAttribute("aria-modal", "true");
	if (options.ariaLabel) dialog.setAttribute("aria-label", options.ariaLabel);

	const shell = document.createElement("div");
	shell.className = "modal__shell";

	if (options.title) {
		const heading = document.createElement("h2");
		heading.className = "modal__title";
		heading.id = `${id}-title`;
		heading.textContent = options.title;
		shell.append(heading);
		dialog.setAttribute("aria-labelledby", heading.id);
	} else if (!options.ariaLabel) {
		// An unnamed `role="dialog"` is announced as nothing. Say so loudly rather
		// than shipping a silently inaccessible overlay.
		dialog.setAttribute("aria-label", "Dialog");
	}

	const body = document.createElement("div");
	body.className = "modal__body";
	if (options.content !== undefined) {
		useInsert(body, options.content);
	} else if (options.message) {
		useInsert(body, options.message);
	}
	shell.append(body);

	if (options.footer !== undefined) {
		const footer = document.createElement("div");
		footer.className = "modal__footer";
		useInsert(footer, options.footer);
		shell.append(footer);
	}

	if (options.dismissible !== false) {
		const close = document.createElement("button");
		close.type = "button";
		close.className = "modal__close";
		close.setAttribute("aria-label", options.closeLabel ?? "Close dialog");
		// Reachable by keyboard on purpose. `aria-hidden` would discard the label
		// and `tabindex="-1"` would remove it from the Tab cycle, which together
		// left a keyboard-only user with no way out whenever `dismissOnEscape`
		// was false.
		close.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${CLOSE_ICON}</svg>`;
		close.dataset.katanaModalClose = "";
		shell.append(close);
	}

	dialog.append(shell);
	return { dialog, shell };
}

function useOpen(options: ModalOptions = {}): ModalHandle {
	requireDom("modal");

	sequence += 1;
	const id = `katana-modal-${sequence}`;

	const { dialog, shell } = useBuild(options, id);

	const restoreTarget =
		typeof document === "undefined" ? null : (document.activeElement as HTMLElement | null);

	const entry: Mounted = {
		dialog,
		shell,
		options,
		restoreTarget,
		closing: false,
		finished: false,
		handle: {
			id,
			dialog,
			close() {
				useClose(entry, id);
			},
		},
	};

	// Escape. `cancel` is the native, cancellable form, so preventing its default
	// is what keeps the dialog open when it must not close.
	dialog.addEventListener("cancel", (event) => {
		event.preventDefault();
		if (options.dismissOnEscape === false) return;
		useClose(entry, id);
	});

	// Backdrop click. `target === dialog` means the click landed on the backdrop
	// rather than on the shell.
	dialog.addEventListener("click", (event) => {
		if (event.target !== dialog) return;
		if (options.dismissOnEscape === false) return;
		useClose(entry, id);
	});

	dialog.addEventListener("click", (event) => {
		const target = event.target as Element | null;
		if (!target?.closest?.("[data-katana-modal-close]")) return;
		useClose(entry, id);
	});

	// Tab cycle. The native dialog traps focus for pointer and programmatic use,
	// but a browser will still let <kbd>Tab</kbd> walk into its own chrome.
	dialog.addEventListener("keydown", (event) => {
		if (event.key !== "Tab") return;

		// Focus is in the browser's own chrome — the URL bar, devtools. No element
		// in this document has it, `document.hasFocus()` is false, and
		// `document.activeElement` still reports the last focused element, which
		// makes the wrap branch below look applicable when it is not.
		//
		// Acting on it here is actively harmful: `preventDefault()` suppresses the
		// browser's own recovery and re-focusing an element it already considers
		// focused is a no-op, which turns a one-press detour into a permanent
		// keyboard trap. Measured in Chromium — with the guard live, Tab kept the
		// focus in chrome forever; with it neutralised, Chromium recovered on the
		// next press.
		if (typeof document !== "undefined" && !document.hasFocus()) return;

		const items = useFocusables(dialog);
		if (items.length === 0) {
			event.preventDefault();
			dialog.focus();
			return;
		}

		const active = useActive(dialog);
		// Focus is inside an iframe. `document.activeElement` reports the frame,
		// and this Tab is already spent moving through the frame's own document, so
		// intervening would double-step it.
		if (active?.tagName === "IFRAME") return;

		const first = items[0];
		const last = items[items.length - 1];
		const inside = active !== null && dialog.contains(active);

		if (event.shiftKey && (active === first || !inside)) {
			event.preventDefault();
			last.focus();
			return;
		}
		if (!event.shiftKey && (active === last || !inside)) {
			event.preventDefault();
			first.focus();
		}
	});

	const target = usePortalTarget(options.container);
	target.append(dialog);

	// A detached target is an easy mistake — `shadowRoot` captured before attach,
	// or a `div` that was never inserted. Without this the dialog is invisible
	// and the scroll lock it engaged stays engaged forever.
	if (!dialog.isConnected) {
		target.removeChild(dialog);
		throw new Error(
			"[KatanaUI] modal container must be attached to the document before opening a dialog.",
		);
	}

	open.set(id, entry);
	lockScroll();
	useEnsureGuard(dialog);

	try {
		// `showModal()` gives the top layer, the backdrop and inertness for the rest
		// of the document. The attribute is the fallback for engines without it;
		// the `focusin` guard still traps focus either way, because it is installed
		// independently of inertness.
		if (typeof dialog.showModal === "function") dialog.showModal();
		else dialog.setAttribute("open", "");
	} catch (error) {
		// Never leave the lock engaged or a registry entry behind on a failed mount.
		open.delete(id);
		unlockScroll();
		dialog.remove();
		useReleaseGuard(dialog);
		throw error;
	}

	// Evict the oldest rather than letting the stack grow without bound.
	while (open.size > MAX_OPEN_DIALOGS) {
		const oldest = open.keys().next();
		if (oldest.done) break;
		const stale = open.get(oldest.value);
		if (!stale) break;
		useClose(stale, oldest.value);
	}

	const first = options.initialFocus ?? useFocusables(dialog)[0] ?? dialog;
	first.focus({ preventScroll: true });

	return entry.handle;
}

/**
 * Closes every open dialog without letting one failure abort the sweep.
 *
 * @returns Nothing; a throwing dialog must not leave the rest of the stack open
 * with the page still locked.
 */
function useCloseAll(): void {
	for (const [id, entry] of [...open]) {
		try {
			useClose(entry, id);
		} catch {
			// `useClose` schedules `finish` before its only throw site, and `finish`
			// owns this lock — claiming it here too would underflow the refcount past
			// zero and unlock the page while a dialog is still open. Claim only what
			// `finish` has not been scheduled to do.
			entry.finished = true;
			entry.dialog.remove();
			open.delete(id);
			entry.options.onClose?.(id);
		}
	}
}

function useStore(): ModalStore {
	store ??= {
		open: useOpen,
		close(id?: string) {
			if (id !== undefined) {
				const entry = open.get(id);
				if (entry) useClose(entry, id);
				return;
			}
			useCloseAll();
		},
		closeAll: useCloseAll,
	};

	return store;
}

/**
 * Modal dialogs — a lazy facade over the per-page singleton.
 *
 * ```ts
 * import { modal } from "@katanakit/ui";
 *
 * modal.open({ title: "Delete project?", message: "This cannot be undone." });
 * ```
 *
 * Prefer this over {@link useModalStore} in application code; both hand back the
 * same singleton.
 */
export const modal: ModalStore = {
	open: (options) => useStore().open(options),
	close: (id) => useStore().close(id),
	closeAll: () => useStore().closeAll(),
};

/**
 * Returns the singleton dialog manager.
 *
 * Same store as the {@link modal} export — kept for the `use*` accessor
 * convention and for dependency-injection call sites.
 *
 * @returns The shared {@link ModalStore}.
 * @throws {Error} Outside a DOM environment.
 */
export function useModalStore(): ModalStore {
	return modal;
}

/**
 * Singleton accessor for the dialog manager — escape hatch for call sites that
 * cannot import the factory (DI containers, framework plugins).
 *
 * @returns The shared {@link ModalStore}.
 */
export const ModalService = {
	/** Returns the shared {@link ModalStore}. */
	getInstance(): ModalStore {
		return modal;
	},
};
