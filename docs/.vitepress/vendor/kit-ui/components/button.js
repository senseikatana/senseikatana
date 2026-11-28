/**
 * Pure class list for a button — safe to use for SSR markup or framework
 * templates (`<button class={buttonClass({ variant: "ghost" })}>`).
 *
 * @param options - Variant, size and loading state.
 * @returns The `btn` class list.
 *
 * @example
 * ```ts
 * buttonClass({ variant: "danger", size: "sm" });
 * // "btn btn--danger btn--sm"
 * ```
 */
export function buttonClass(options = {}) {
    const classes = ["btn", `btn--${options.variant ?? "primary"}`, `btn--${options.size ?? "md"}`];
    if (options.loading)
        classes.push("btn--loading");
    return classes.join(" ");
}
/**
 * Creates a styled `<button>` element.
 *
 * @param options - Label, variant, size, state and click handler.
 * @returns The configured button.
 * @throws {Error} Outside a DOM environment (use {@link buttonClass} for SSR).
 *
 * @example
 * ```ts
 * document.body.append(onButton({ label: "Save", onClick: () => save() }));
 * ```
 */
export function onButton(options = {}) {
    if (typeof document === "undefined") {
        throw new Error("[KatanaUI] onButton() needs a DOM; use buttonClass() for SSR markup.");
    }
    const button = document.createElement("button");
    button.type = options.type ?? "button";
    button.className = buttonClass(options);
    // An icon-only button has no visible text, so a screen reader has nothing
    // to announce unless we give it a name. `ariaLabel` is that name. When a
    // visible `label` exists it already names the button, and an `aria-label`
    // on top of it would only override the visible wording for assistive tech.
    if (options.ariaLabel && !options.label) {
        button.setAttribute("aria-label", options.ariaLabel);
    }
    else {
        button.textContent = options.label ?? "";
    }
    if (options.loading) {
        button.setAttribute("aria-busy", "true");
    }
    if (options.disabled || options.loading) {
        button.disabled = true;
    }
    if (options.onClick) {
        button.addEventListener("click", options.onClick);
    }
    return button;
}
