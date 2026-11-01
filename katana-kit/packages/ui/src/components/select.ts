/**
 * Select — a `listbox` combobox, following the WAI-ARIA Authoring Practices
 * select-only combobox pattern.
 *
 * ## Why `aria-activedescendant`, not roving `tabindex`
 *
 * The listbox is virtual: it only exists while open, so there is no stable
 * element for the browser's tab order to visit. The pattern is therefore to keep
 * DOM focus on the button at all times and point at the active option with
 * `aria-activedescendant`. Focus never leaves the button, the screen reader
 * still announces each option as the arrows move, and closing the list does not
 * have to move focus back from somewhere it never left.
 *
 * Contrast {@link useTabs}, where the tabs are permanently in the DOM, so
 * roving `tabindex` is the right tool there. The distinction is lifetime, not
 * preference.
 *
 * ## Progressive enhancement
 *
 * When `name` is given the component also renders a hidden `<input>`, so the
 * value participates in a normal form submission. Without it, the component is
 * presentational and the caller owns the value.
 *
 * ## SSR
 *
 * {@link selectClass} is pure. {@link useSelect} needs a DOM.
 *
 * @module ui/components/select
 */

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

/** One choice. */
export interface SelectOption {
	/** Submitted and reported value. */
	value: string;
	/** Visible label. */
	label: string;
	/** Disables the option (default: `false`). */
	disabled?: boolean;
}

/** Options accepted by {@link selectClass} and {@link useSelect}. */
export interface SelectOptions {
	/** The choices, in order. */
	options: SelectOption[];
	/**
	 * Accessible name. Required in practice: a combobox with no name is announced
	 * as just "combo box" and the user has no idea what they are choosing.
	 */
	label: string;
	/** Initially selected value. Falls back to the first enabled option. */
	value?: string;
	/** Shown when nothing is selected. */
	placeholder?: string;
	/** Disables the whole control (default: `false`). */
	disabled?: boolean;
	/** Hidden input name, so the value joins a form submission. */
	name?: string;
	/** Called with the newly selected value. */
	onChange?: (value: string) => void;
}

/** Elements a {@link useSelect} call produces. */
export interface SelectElements {
	/** The wrapper. */
	root: HTMLElement;
	/** The button that opens the list. */
	button: HTMLButtonElement;
	/** The listbox, always in the DOM and hidden when closed. */
	list: HTMLElement;
	/** The option elements, in order. */
	options: HTMLElement[];
	/** The hidden input, when `name` was given. */
	input: HTMLInputElement | null;
	/** Reads the current value, or `undefined` when nothing is selected. */
	getValue: () => string | undefined;
	/** Opens or closes the listbox. */
	setOpen: (open: boolean) => void;
}

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

/** Milliseconds a multi-character typeahead stays active. */
const TYPEAHEAD_RESET_MS = 500;

/* -------------------------------------------------------------------------- */
/* Pure surface (SSR-safe)                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Pure class list for the select wrapper — safe to call during SSR or inside a
 * framework template.
 *
 * @returns The `select` class list.
 *
 * @example
 * ```ts
 * selectClass(); // "select"
 * ```
 */
export function selectClass(): string {
	return "select";
}

/* -------------------------------------------------------------------------- */
/* DOM construction                                                           */
/* -------------------------------------------------------------------------- */

function requireDom(api: string): Document {
	if (typeof document === "undefined") {
		throw new Error(`[KatanaUI] ${api}() needs a DOM; use selectClass() for SSR markup.`);
	}
	return document;
}

/**
 * Builds the select and wires the full keyboard contract.
 *
 * @param options - Choices, label, value and behaviour.
 * @returns The produced elements and controls.
 * @throws {Error} Outside a DOM environment.
 *
 * @example
 * ```ts
 * const select = useSelect({
 *   label: "Country",
 *   name: "country",
 *   options: [
 *     { value: "es", label: "Spain" },
 *     { value: "ar", label: "Argentina" },
 *   ],
 * });
 * document.body.append(select.root);
 * ```
 */
export function useSelect(options: SelectOptions): SelectElements {
	requireDom("useSelect");

	const defs = options.options;
	const root = document.createElement("div");
	root.className = selectClass();

	const disabled = options.disabled === true;
	let open = false;
	let selected = defs.findIndex((definition) => definition.value === options.value);
	if (selected === -1 || defs[selected]?.disabled) {
		selected = defs.findIndex((definition) => definition.disabled !== true);
		if (selected === -1) selected = -1;
	}

	/** Index the arrows currently point at, which is not necessarily the selection. */
	let activeIndex = selected;

	const button = document.createElement("button");
	button.type = "button";
	button.className = "select__button";
	button.disabled = disabled;
	button.setAttribute("role", "combobox");
	button.setAttribute("aria-haspopup", "listbox");
	button.setAttribute("aria-expanded", "false");
	button.setAttribute("aria-label", options.label);
	button.setAttribute("aria-controls", "select-listbox");

	const value = document.createElement("span");
	value.className = "select__value";
	button.append(value);

	const arrow = document.createElement("span");
	arrow.className = "select__arrow";
	// Decorative: the button's own name and value are what a screen reader reads.
	arrow.setAttribute("aria-hidden", "true");
	arrow.textContent = "▾";
	button.append(arrow);

	const list = document.createElement("div");
	list.className = "select__list";
	list.id = "select-listbox";
	list.setAttribute("role", "listbox");
	list.setAttribute("aria-label", options.label);
	list.hidden = true;

	const optionElements: HTMLElement[] = defs.map((definition, index) => {
		const element = document.createElement("div");
		element.className = "select__option";
		element.id = `select-option-${index}`;
		element.setAttribute("role", "option");
		element.setAttribute("aria-selected", String(index === selected));
		element.textContent = definition.label;
		if (definition.disabled === true) {
			element.setAttribute("aria-disabled", "true");
			element.classList.add("select__option--disabled");
		}
		list.append(element);
		return element;
	});

	/** Indices the arrows may land on — disabled options are skipped. */
	const enabledIndexes = defs
		.map((definition, index) => (definition.disabled ? -1 : index))
		.filter((index) => index !== -1);

	/** Reflects selection and active state onto the DOM. */
	const useApply = () => {
		const chosen = defs[selected];
		value.textContent = chosen ? chosen.label : (options.placeholder ?? "Select…");
		value.classList.toggle("select__value--placeholder", !chosen);

		for (const [index, element] of optionElements.entries()) {
			element.setAttribute("aria-selected", String(index === selected));
			element.classList.toggle("select__option--active", index === activeIndex);
		}

		// Only meaningful while open; pointing at a hidden option is worse than
		// pointing at nothing.
		button.setAttribute(
			"aria-activedescendant",
			open && activeIndex !== -1 ? optionElements[activeIndex].id : "",
		);
		if (input) input.value = chosen ? chosen.value : "";
	};

	const setOpen = (next: boolean) => {
		if (disabled || next === open) return;
		open = next;
		list.hidden = !open;
		button.setAttribute("aria-expanded", String(open));
		button.classList.toggle("select__button--open", open);
		// Opening always starts the active row on the current selection, so the
		// arrows do not appear to start somewhere unrelated.
		if (open) activeIndex = selected;
		useApply();
	};

	const choose = (index: number) => {
		if (index === -1 || defs[index]?.disabled) return;
		selected = index;
		activeIndex = index;
		setOpen(false);
		// Focus is on the button throughout, so nothing has to move.
		useApply();
		options.onChange?.(defs[index].value);
	};

	/** Moves the active row, wrapping around the enabled set. */
	const move = (step: number) => {
		if (enabledIndexes.length === 0) return;
		const at = enabledIndexes.indexOf(activeIndex);
		const from = at === -1 ? 0 : at;
		activeIndex = enabledIndexes[(from + step + enabledIndexes.length) % enabledIndexes.length];
		useApply();
	};

	let typeahead = "";
	let typeaheadTimer: ReturnType<typeof setTimeout> | null = null;

	const useTypeahead = (character: string) => {
		if (typeaheadTimer) clearTimeout(typeaheadTimer);
		typeahead += character.toLowerCase();
		typeaheadTimer = setTimeout(() => {
			typeahead = "";
			typeaheadTimer = null;
		}, TYPEAHEAD_RESET_MS);

		const match = enabledIndexes.find((index) =>
			(defs[index].label ?? "").toLowerCase().startsWith(typeahead),
		);
		// No match leaves the active row where it is rather than resetting, so a
		// mistyped prefix does not lose the user's place.
		if (match === undefined) return;
		activeIndex = match;
		if (!open) {
			selected = match;
			options.onChange?.(defs[match].value);
		}
		useApply();
	};

	button.addEventListener("click", () => setOpen(!open));

	button.addEventListener("keydown", (event) => {
		if (disabled) return;

		switch (event.key) {
			case "ArrowDown":
				event.preventDefault();
				if (!open) setOpen(true);
				else move(1);
				return;
			case "ArrowUp":
				event.preventDefault();
				if (!open) setOpen(true);
				else move(-1);
				return;
			case "Home":
				if (!open) return;
				event.preventDefault();
				activeIndex = enabledIndexes[0] ?? -1;
				useApply();
				return;
			case "End":
				if (!open) return;
				event.preventDefault();
				activeIndex = enabledIndexes[enabledIndexes.length - 1] ?? -1;
				useApply();
				return;
			case "Enter":
			case " ":
				event.preventDefault();
				// Enter on a closed select opens it; on an open one it commits.
				if (!open) setOpen(true);
				else choose(activeIndex);
				return;
			case "Escape":
				if (!open) return;
				event.preventDefault();
				// Closing without choosing restores the selection.
				activeIndex = selected;
				setOpen(false);
				useApply();
				return;
			case "Tab":
				// Tabbing away closes without committing the active row.
				if (open) {
					activeIndex = selected;
					setOpen(false);
				}
				return;
			default:
				break;
		}

		// Typeahead only applies to printable, single-character keys.
		if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
			event.preventDefault();
			useTypeahead(event.key);
		}
	});

	list.addEventListener("click", (event) => {
		const target = (event.target as Element | null)?.closest<HTMLElement>(".select__option");
		if (!target) return;
		choose(optionElements.indexOf(target));
	});

	// A pointer outside the control dismisses it, as a select should.
	const onDocumentPointerDown = (event: Event) => {
		if (!open) return;
		if (root.contains(event.target as Node | null)) return;
		activeIndex = selected;
		setOpen(false);
		useApply();
	};
	document.addEventListener("pointerdown", onDocumentPointerDown);

	button.addEventListener("blur", () => {
		if (!open) return;
		activeIndex = selected;
		setOpen(false);
		useApply();
	});

	const input = options.name
		? Object.assign(document.createElement("input"), {
				type: "hidden",
				name: options.name,
			})
		: null;

	root.append(button, list);
	if (input) root.append(input);
	useApply();

	return {
		root,
		button,
		list,
		options: optionElements,
		input,
		getValue: () => (selected === -1 ? undefined : defs[selected].value),
		setOpen,
	};
}
