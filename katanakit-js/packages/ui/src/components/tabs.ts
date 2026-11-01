/**
 * Tabs — a `tablist` with roving `tabindex`, following the WAI-ARIA
 * Authoring Practices tabs pattern.
 *
 * ## Why roving tabindex
 *
 * A tablist is a single composite widget, not a list of independent controls. The
 * user tabs *into* it once and then uses <kbd>Arrow</kbd> keys to move between
 * tabs. Giving every tab `tabindex="0"` would put N stops in the page's tab
 * order for what is conceptually one control, and a keyboard user would have to
 * press Tab N times to leave it.
 *
 * So the selected tab carries `tabindex="0"` and every other tab carries
 * `tabindex="-1"`. Focus still has to be able to land on the whole group from the
 * page above it, which is what the `0` on the selected tab buys.
 *
 * ## Activation
 *
 * `automatic` (the default) selects a tab as soon as it receives focus, which is
 * the behaviour the APG calls "automatic activation" and what most users expect.
 * `manual` requires <kbd>Enter</kbd> or <kbd>Space</kbd>, which is the right
 * choice when selecting a tab is expensive or changes the URL — the arrow keys
 * then only move focus.
 *
 * ## SSR
 *
 * {@link tabsClass} is pure. {@link useTabs} needs a DOM.
 *
 * @module ui/components/tabs
 */

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

/** When a focused tab becomes the selected one. */
export type TabsActivation = "automatic" | "manual";

/** One tab and its panel. */
export interface TabDefinition {
	/** Stable id. Used to wire `aria-controls` and `aria-labelledby`. */
	id: string;
	/** Visible tab label. */
	label: string;
	/**
	 * Panel body. A string is inserted with `textContent`, never parsed as HTML;
	 * a `Node` is appended as-is. Omit it for a tab the consumer renders itself.
	 */
	content?: string | Node;
	/** Disables the tab (default: `false`). */
	disabled?: boolean;
}

/** Options accepted by {@link tabsClass} and {@link useTabs}. */
export interface TabsOptions {
	/** The tabs, in order. */
	tabs: TabDefinition[];
	/** Id of the selected tab (default: the first enabled one). */
	active?: string;
	/** Selection follows focus, or requires Enter/Space (default: `"automatic"`). */
	activation?: TabsActivation;
	/** Accessible name for the tablist, e.g. `"Account settings"`. */
	label?: string;
	/** Called when the selected tab changes. */
	onChange?: (id: string) => void;
}

/** Elements a {@link useTabs} call produces. */
export interface TabsElements {
	/** The wrapper containing the tablist and every panel. */
	root: HTMLElement;
	/** The `role="tablist"` container. */
	list: HTMLElement;
	/** The tab buttons, in order. */
	buttons: HTMLButtonElement[];
	/** The panels, in order. */
	panels: HTMLElement[];
	/** Selects a tab without moving focus. */
	select: (id: string) => void;
}

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Keys that move between tabs.
 *
 * Home and End are included because a long tablist is otherwise tedious to cross.
 */
const NAVIGATION = new Set(["ArrowRight", "ArrowLeft", "Home", "End"]);

/* -------------------------------------------------------------------------- */
/* Pure surface (SSR-safe)                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Pure class list for the tab wrapper — safe to call during SSR or inside a
 * framework template.
 *
 * @returns The `tabs` class list.
 *
 * @example
 * ```ts
 * tabsClass(); // "tabs"
 * ```
 */
export function tabsClass(): string {
	return "tabs";
}

/* -------------------------------------------------------------------------- */
/* DOM construction                                                           */
/* -------------------------------------------------------------------------- */

function requireDom(api: string): Document {
	if (typeof document === "undefined") {
		throw new Error(`[KatanaUI] ${api}() needs a DOM; use tabsClass() for SSR markup.`);
	}
	return document;
}

/**
 * Inserts panel content, never parsing a string as HTML.
 *
 * @param parent - Element receiving the content.
 * @param value - A `Node` to append, or a string inserted as text.
 */
function useInsert(parent: HTMLElement, value: string | Node): void {
	if (typeof value === "string") {
		const text = document.createElement("p");
		text.className = "tabs__text";
		text.textContent = value;
		parent.append(text);
		return;
	}
	parent.append(value);
}

/**
 * Builds the tabs and wires the full keyboard contract.
 *
 * @param options - Tabs, selection and behaviour.
 * @returns The produced elements and a `select` control.
 * @throws {Error} Outside a DOM environment.
 *
 * @example
 * ```ts
 * const tabs = useTabs({
 *   label: "Account settings",
 *   tabs: [
 *     { id: "profile", label: "Profile", content: "…" },
 *     { id: "billing", label: "Billing" },
 *   ],
 * });
 * document.body.append(tabs.root);
 * ```
 */
export function useTabs(options: TabsOptions): TabsElements {
	requireDom("useTabs");

	const root = document.createElement("div");
	root.className = tabsClass();

	const list = document.createElement("div");
	list.className = "tabs__list";
	list.setAttribute("role", "tablist");
	// Without a name a screen reader announces a bare "tab list".
	list.setAttribute("aria-label", options.label ?? "Tabs");

	const buttons: HTMLButtonElement[] = [];
	const panels: HTMLElement[] = [];
	const defs = options.tabs;

	/** Ids of tabs the user can reach — disabled ones are skipped by arrows. */
	const enabledIndexes = defs
		.map((definition, index) => (definition.disabled ? -1 : index))
		.filter((index) => index !== -1);

	let selectedIndex = Math.max(
		0,
		defs.findIndex((definition) => definition.id === options.active),
	);
	if (!defs[selectedIndex] || defs[selectedIndex].disabled) {
		selectedIndex = enabledIndexes[0] ?? 0;
	}

	const select = (id: string): void => {
		const index = defs.findIndex((definition) => definition.id === id);
		if (index === -1 || defs[index].disabled) return;
		if (index === selectedIndex) return;

		selectedIndex = index;
		useApply();
		options.onChange?.(id);
	};

	/** Reflects the selected tab onto `aria-selected`, `tabindex` and panels. */
	function useApply(): void {
		for (const [index, button] of buttons.entries()) {
			const active = index === selectedIndex;
			button.setAttribute("aria-selected", String(active));
			// Roving tabindex: the group is one stop in the page's tab order.
			button.tabIndex = active ? 0 : -1;
			button.classList.toggle("tabs__tab--active", active);
			panels[index].hidden = !active;
		}
	}

	// The tablist must be the first child: the panels are appended during the
	// loop below, so appending the list afterwards would leave it last in the tab
	// order, and <kbd>Tab</kbd> from a tab would skip the panel it just revealed.
	root.append(list);

	defs.forEach((definition) => {
		const button = document.createElement("button");
		button.type = "button";
		button.id = `${definition.id}-tab`;
		button.className = "tabs__tab";
		button.textContent = definition.label;
		button.setAttribute("role", "tab");
		button.setAttribute("aria-controls", `${definition.id}-panel`);
		button.disabled = definition.disabled === true;
		if (definition.disabled === true) button.classList.add("tabs__tab--disabled");
		list.append(button);
		buttons.push(button);

		const panel = document.createElement("div");
		panel.id = `${definition.id}-panel`;
		panel.className = "tabs__panel";
		panel.setAttribute("role", "tabpanel");
		panel.setAttribute("aria-labelledby", button.id);
		// A panel with no focusable content must still be reachable, or a keyboard
		// user tabs into the group and cannot get to the panel they just selected.
		panel.tabIndex = 0;
		if (definition.content !== undefined) useInsert(panel, definition.content);
		root.append(panel);
		panels.push(panel);
	});

	/**
	 * Moves focus to a tab and, in automatic mode, selects it.
	 *
	 * @param index - Tab index to move to.
	 */
	const focus = (index: number) => {
		const target = buttons[index];
		if (!target) return;
		target.focus();
		if (options.activation !== "manual") select(defs[index].id);
	};

	list.addEventListener("click", (event) => {
		const target = (event.target as Element | null)?.closest<HTMLButtonElement>(".tabs__tab");
		if (!target || target.disabled) return;
		const index = buttons.indexOf(target);
		if (index === -1) return;
		selectedIndex = index;
		useApply();
		options.onChange?.(defs[index].id);
	});

	list.addEventListener("keydown", (event) => {
		const target = (event.target as Element | null)?.closest<HTMLButtonElement>(".tabs__tab");
		if (!target) return;
		const from = buttons.indexOf(target);
		if (from === -1) return;

		// Manual activation: the arrow keys move focus only.
		if (options.activation === "manual" && (event.key === "Enter" || event.key === " ")) {
			event.preventDefault();
			if (from !== selectedIndex) {
				selectedIndex = from;
				useApply();
				options.onChange?.(defs[from].id);
			}
			return;
		}

		if (!NAVIGATION.has(event.key)) return;
		event.preventDefault();

		// Wrap around the enabled set rather than the raw index, so a disabled
		// tab is skipped in both directions.
		const at = enabledIndexes.indexOf(from);
		if (at === -1) return;
		const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
		const next =
			event.key === "Home"
				? enabledIndexes[0]
				: event.key === "End"
					? enabledIndexes[enabledIndexes.length - 1]
					: enabledIndexes[(at + step + enabledIndexes.length) % enabledIndexes.length];

		focus(next);
	});

	useApply();

	return { root, list, buttons, panels, select };
}
