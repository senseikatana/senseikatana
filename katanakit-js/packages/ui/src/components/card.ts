/** Options for {@link useCard} and {@link cardClass}. */
export interface CardOptions {
	/** Optional header title. */
	title?: string;
	/** Body content (nodes or plain strings). */
	children?: Array<Node | string>;
	/** Optional footer text. */
	footer?: string;
	/** Replaces the border with an elevation shadow. */
	elevated?: boolean;
}

/**
 * Pure class list for a card.
 *
 * @param options - Elevated state.
 * @returns The `card` class list.
 */
export function cardClass(options: Pick<CardOptions, "elevated"> = {}): string {
	return options.elevated ? "card card--elevated" : "card";
}

/**
 * Creates a card container with optional header, body and footer.
 *
 * @param options - Title, children, footer and elevation.
 * @returns The card element.
 * @throws {Error} Outside a DOM environment.
 *
 * @example
 * ```ts
 * document.body.append(useCard({ title: "Revenue", children: ["$12,400"] }));
 * ```
 */
export function useCard(options: CardOptions = {}): HTMLElement {
	if (typeof document === "undefined") {
		throw new Error("[KatanaUI] useCard() needs a DOM; use cardClass() for SSR markup.");
	}

	const card = document.createElement("article");
	card.className = cardClass(options);

	if (options.title) {
		const header = document.createElement("header");
		header.className = "card__header";
		const title = document.createElement("h3");
		title.className = "card__title";
		title.textContent = options.title;
		header.append(title);
		card.append(header);
	}

	const body = document.createElement("div");
	body.className = "card__body";
	for (const child of options.children ?? []) {
		body.append(child);
	}
	card.append(body);

	if (options.footer) {
		const footer = document.createElement("footer");
		footer.className = "card__footer";
		footer.textContent = options.footer;
		card.append(footer);
	}

	return card;
}
