let inputCounter = 0;
/**
 * Pure class list for the input control.
 *
 * @param options - Error state.
 * @returns The `input` class list.
 */
export function inputClass(options = {}) {
    return options.error ? "input input--invalid" : "input";
}
/**
 * Creates an accessible text field: label, input and help/error message wired
 * through `for`, `aria-invalid` and `aria-describedby`.
 *
 * @param options - Label, type, state and callbacks.
 * @returns The wrapper and the native input.
 * @throws {Error} Outside a DOM environment.
 *
 * @example
 * ```ts
 * const { root, input } = useInput({ label: "Email", type: "email", error: "Required" });
 * form.append(root);
 * ```
 */
export function useInput(options = {}) {
    if (typeof document === "undefined") {
        throw new Error("[KatanaUI] useInput() needs a DOM; use inputClass() for SSR markup.");
    }
    inputCounter += 1;
    const id = options.name ? `${options.name}` : `input-${inputCounter}`;
    const messageId = `${id}-message`;
    const root = document.createElement("div");
    root.className = "field";
    if (options.label) {
        const label = document.createElement("label");
        label.className = "field__label";
        label.htmlFor = id;
        label.textContent = options.label;
        if (options.required) {
            const marker = document.createElement("span");
            marker.className = "field__required";
            marker.setAttribute("aria-hidden", "true");
            marker.textContent = " *";
            label.append(marker);
        }
        root.append(label);
    }
    const input = document.createElement("input");
    input.className = inputClass(options);
    input.type = options.type ?? "text";
    input.id = id;
    if (options.name)
        input.name = options.name;
    if (options.value !== undefined)
        input.value = options.value;
    if (options.placeholder)
        input.placeholder = options.placeholder;
    if (options.disabled)
        input.disabled = true;
    if (options.required)
        input.required = true;
    if (options.error) {
        input.setAttribute("aria-invalid", "true");
        input.setAttribute("aria-describedby", messageId);
    }
    else if (options.help) {
        input.setAttribute("aria-describedby", messageId);
    }
    if (options.onInput) {
        input.addEventListener("input", () => options.onInput?.(input.value));
    }
    root.append(input);
    const message = options.error ?? options.help;
    if (message) {
        const hint = document.createElement("p");
        hint.className = options.error ? "field__error" : "field__help";
        hint.id = messageId;
        hint.textContent = message;
        root.append(hint);
    }
    return { root, input };
}
