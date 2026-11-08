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
 * document.body.append(useButton({ label: "Save", onClick: () => save() }));
 * ```
 */
export function useButton(options = {}) {
    if (typeof document === "undefined") {
        throw new Error("[KatanaUI] useButton() needs a DOM; use buttonClass() for SSR markup.");
    }
    const button = document.createElement("button");
    button.type = options.type ?? "button";
    button.className = buttonClass(options);
    button.textContent = options.label ?? "";
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
