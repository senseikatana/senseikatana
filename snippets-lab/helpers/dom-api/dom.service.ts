// services/dom.service.ts
import { LOGGER } from "../../logger.service";

export class DomService {
	private static instance: DomService;

	private constructor() {}

	static getInstance(): DomService {
		if (!DomService.instance) {
			DomService.instance = new DomService();
		}
		return DomService.instance;
	}

	// Verifica si estamos en un entorno browser
	isBrowser(): boolean {
		return typeof window !== "undefined" && typeof document !== "undefined";
	}

	// ─── Selectors ──────────────────────────────────────────────────────

	getElementById<T extends HTMLElement = HTMLElement>(id: string): T | null {
		if (!this.isBrowser()) return null;
		return document.getElementById(id) as T | null;
	}

	querySelector<T extends Element = HTMLElement>(selector: string): T | null {
		if (!this.isBrowser()) return null;
		return document.querySelector<T>(selector);
	}

	querySelectorAll<T extends Element = HTMLElement>(selector: string): T[] {
		if (!this.isBrowser()) return [];
		return Array.from(document.querySelectorAll<T>(selector));
	}

	// ─── Class manipulation ─────────────────────────────────────────────

	addClass(target: Element | string, className: string): void {
		const el = this.resolve(target);
		el?.classList.add(className);
	}

	removeClass(target: Element | string, className: string): void {
		const el = this.resolve(target);
		el?.classList.remove(className);
	}

	toggleClass(target: Element | string, className: string, force?: boolean): boolean | undefined {
		const el = this.resolve(target);
		return el?.classList.toggle(className, force);
	}

	hasClass(target: Element | string, className: string): boolean {
		const el = this.resolve(target);
		return el?.classList.contains(className) ?? false;
	}

	// ─── Attributes & Dataset ───────────────────────────────────────────

	getAttribute<T extends Element = HTMLElement>(
		target: T | string,
		attr: string,
	): string | null {
		const el = this.resolve(target);
		return el?.getAttribute(attr) ?? null;
	}

	setAttribute(target: Element | string, attr: string, value: string): void {
		const el = this.resolve(target);
		el?.setAttribute(attr, value);
	}

	getDataAttribute(target: HTMLElement | string, key: string): string | undefined {
		const el = this.resolve(target);
		if (!el) return undefined;
		return el.dataset[key];
	}

	setDataAttribute(target: HTMLElement | string, key: string, value: string): void {
		const el = this.resolve(target);
		if (el) el.dataset[key] = value;
	}

	// ─── Events ─────────────────────────────────────────────────────────

	on<K extends keyof HTMLElementEventMap>(
		target: EventTarget | string,
		event: K,
		callback: (event: HTMLElementEventMap[K]) => void,
		options?: boolean | AddEventListenerOptions,
	): (() => void) | null {
		if (!this.isBrowser()) return null;

		const el = typeof target === "string" ? this.querySelector(target) : target;
		if (!el) return null;

		const handler = callback as EventListener;
		el.addEventListener(event, handler, options);
		
		return () => el.removeEventListener(event, handler, options);
	}

	// Versión genérica para eventos no tipados
	onEvent(
		target: EventTarget | string,
		event: string,
		callback: EventListener,
		options?: boolean | AddEventListenerOptions,
	): (() => void) | null {
		if (!this.isBrowser()) return null;

		const el = typeof target === "string" ? this.querySelector(target) : target;
		if (!el) return null;

		el.addEventListener(event, callback, options);
		return () => el.removeEventListener(event, callback, options);
	}

	// ─── Element creation & manipulation ─────────────────────────────────

	createElement<T extends keyof HTMLElementTagNameMap>(
		tagName: T,
	): HTMLElementTagNameMap[T] {
		if (!this.isBrowser()) {
			throw new Error("Cannot create elements in non-browser environment");
		}
		return document.createElement(tagName);
	}

	setHTML(target: Element | string, html: string): void {
		const el = this.resolve(target);
		if (el) el.innerHTML = html;
	}

	setText(target: Element | string, text: string): void {
		const el = this.resolve(target);
		if (el) el.textContent = text;
	}

	append(target: Element | string, child: Element | string): void {
		const parent = this.resolve(target);
		const childEl = this.resolve(child);
		if (parent && childEl) parent.appendChild(childEl);
	}

	remove(target: Element | string): void {
		const el = this.resolve(target);
		el?.remove();
	}

	// ─── Internal helpers ───────────────────────────────────────────────

	private resolve<T extends Element = HTMLElement>(target: T | string): T | null {
		return typeof target === "string" ? this.querySelector<T>(target) : target;
	}
}

// Instancia exportada para uso directo
export const dom = DomService.getInstance();


// ============================================================
// TODO: Demo usage
// ============================================================

export const {getElementById: GETELEMENT_BYID, querySelector: QUERY_SELECTOR}: DomService = DomService.getInstance()





export function runDomDemo(): void {
	// Verificar entorno
	LOGGER("Is Browser:", dom.isBrowser(), "info");

	// Selectors
	const button = dom.querySelector<HTMLButtonElement>(".btn-primary");
	const items = dom.querySelectorAll<HTMLLIElement>(".list-item");
	LOGGER("Button found:", button !== null);
	LOGGER("Items count:", items.length);

	// Class manipulation
	if (button) {
		dom.addClass(button, "is-loading");
		dom.toggleClass(button, "is-active");
		LOGGER("Has loading class:", dom.hasClass(button, "is-loading"));
	}

	// Attributes
	dom.setAttribute(".card", "data-id", "123");
	const cardId = dom.getAttribute(".card", "data-id");
	LOGGER("Card ID:", cardId);

	// Dataset
	dom.setDataAttribute(".product", "productId", "456");
	const productId = dom.getDataAttribute(".product", "productId");
	LOGGER("Product ID:", productId);

	// Events
	const cleanup = dom.on("#submit-btn", "click", (event) => {
		LOGGER("Button clicked!", event, "info");
	});

	// Cleanup después
	setTimeout(() => cleanup?.(), 5000);

	// Element creation
	const newDiv = dom.createElement("div");
	newDiv.className = "dynamic-element";
	dom.setText(newDiv, "Hello World");
	dom.append("#container", newDiv);

	// HTML content (usar con precaución)
	dom.setHTML("#feed", "<p>New content</p>");

	// Remove element
	dom.remove(".old-element");
}
