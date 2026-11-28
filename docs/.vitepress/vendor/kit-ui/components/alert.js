/**
 * Pure class list for an alert.
 *
 * @param options - Variant and dismissible state.
 * @returns The `alert` class list.
 */
export function alertClass(options = {}) {
    const classes = ["alert", `alert--${options.variant ?? "info"}`];
    if (options.dismissible)
        classes.push("alert--dismissible");
    return classes.join(" ");
}
/**
 * Creates an alert box. Uses `role="alert"` for `warning`/`danger` (assertive)
 * and `role="status"` for `info`/`success` (polite).
 *
 * @param options - Variant, content, dismissal and callback.
 * @returns The alert element.
 * @throws {Error} Outside a DOM environment.
 *
 * @example
 * ```ts
 * document.body.append(
 *   onAlert({ variant: "warning", title: "Heads up", message: "Quota at 90%.", dismissible: true }),
 * );
 * ```
 */
export function onAlert(options = {}) {
    if (typeof document === "undefined") {
        throw new Error("[KatanaUI] onAlert() needs a DOM; use alertClass() for SSR markup.");
    }
    const variant = options.variant ?? "info";
    const alert = document.createElement("div");
    alert.className = alertClass(options);
    alert.setAttribute("role", variant === "warning" || variant === "danger" ? "alert" : "status");
    const content = document.createElement("div");
    content.className = "alert__content";
    if (options.title) {
        const title = document.createElement("div");
        title.className = "alert__title";
        title.textContent = options.title;
        content.append(title);
    }
    if (options.message) {
        const message = document.createElement("div");
        message.className = "alert__message";
        message.textContent = options.message;
        content.append(message);
    }
    alert.append(content);
    if (options.dismissible) {
        const close = document.createElement("button");
        close.type = "button";
        close.className = "alert__close";
        close.setAttribute("aria-label", "Dismiss");
        // The multiplication sign is decoration, not content. Left as bare text
        // inside a button that also carries `aria-label`, some screen readers
        // announce both ("times, Dismiss"); hiding the glyph from assistive tech
        // leaves the label as the only name.
        const glyph = document.createElement("span");
        glyph.setAttribute("aria-hidden", "true");
        glyph.textContent = "×";
        close.append(glyph);
        close.addEventListener("click", () => {
            alert.remove();
            options.onDismiss?.();
        });
        alert.append(close);
    }
    return alert;
}
