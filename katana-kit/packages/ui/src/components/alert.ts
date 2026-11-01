/** Alert variants. */
export type AlertVariant = "info" | "success" | "warning" | "danger";

/** Options for {@link useAlert} and {@link alertClass}. */
export interface AlertOptions {
	/** Semantic variant (default: `"info"`). */
	variant?: AlertVariant;
	/** Bold title line. */
	title?: string;
	/** Body message. */
	message?: string;
	/** Adds an accessible close button. */
	dismissible?: boolean;
	/** Called after the alert is dismissed. */
	onDismiss?: () => void;
}

/**
 * Pure class list for an alert.
 *
 * @param options - Variant and dismissible state.
 * @returns The `alert` class list.
 */
export function alertClass(options: Pick<AlertOptions, "variant" | "dismissible"> = {}): string {
	const classes = ["alert", `alert--${options.variant ?? "info"}`];
	if (options.dismissible) classes.push("alert--dismissible");
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
 *   useAlert({ variant: "warning", title: "Heads up", message: "Quota at 90%.", dismissible: true }),
 * );
 * ```
 */
export function useAlert(options: AlertOptions = {}): HTMLDivElement {
	if (typeof document === "undefined") {
		throw new Error("[KatanaUI] useAlert() needs a DOM; use alertClass() for SSR markup.");
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
		close.textContent = "×";
		close.addEventListener("click", () => {
			alert.remove();
			options.onDismiss?.();
		});
		alert.append(close);
	}

	return alert;
}
