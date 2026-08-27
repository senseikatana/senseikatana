import { LOGGER } from "@/logger";
import type { DOMTarget, EventTargetLike } from "../types/index";

/**
 * Singleton class that wraps the native DOM API with SSR-safe utilities.
 * Provides a fluent, type-safe interface for querying, manipulating and
 * listening to DOM elements without coupling to a specific framework.
 *
 * @example
 * const dom = DOMAPI.getInstance();
 * const btn = dom.QUERY<HTMLButtonElement>('#submit');
 * dom.ADD_CLASS(btn, 'is-loading');
 */
export default class DOMAPI {
	private static instance: DOMAPI;

	private constructor() {
		// Private constructor to enforce Singleton pattern
	}

	/**
	 * Returns the single shared instance of the DOM API.
	 *
	 * @returns The DOMAPI singleton.
	 *
	 * @example
	 * const dom = DOMAPI.getInstance();
	 *
	 * 💡 Uso real: punto de entrada único en toda la aplicación.
	 * Se suele inyectar vía `LAMBDA.DOM()` en tu fachada principal.
	 */
	static getInstance(): DOMAPI {
		if (!DOMAPI.instance) {
			DOMAPI.instance = new DOMAPI();
		}
		return DOMAPI.instance;
	}

	/**
	 * Checks whether the current runtime has a DOM (browser) environment.
	 * Used internally to guard every method against SSR crashes (Astro, Next.js).
	 *
	 * @returns `true` if `window` and `document` are available.
	 *
	 * 💡 Uso real: Astro renderiza en servidor durante el build; sin este check,
	 * `document.querySelector` lanzaría `ReferenceError` y tumbaría todo el build.
	 */
	IS_BROWSER(): boolean {
		return typeof window !== "undefined" && typeof document !== "undefined";
	}

	// ─── Selectors ──────────────────────────────────────────────────────

	/**
	 * Retrieves an element by its `id` attribute.
	 *
	 * @param id - The element's id (without the `#` prefix).
	 * @returns The element cast to `T`, or `null` if not found or not in browser.
	 *
	 * @example
	 * const header = dom.GET_BY_ID<HTMLDivElement>('main-header');
	 *
	 * 💡 Uso real: acceso rápido al elemento raíz de un componente, formularios
	 * identificados por backend, o anclas de navegación por id.
	 */
	GET_ELEM_BYID<T extends HTMLElement = HTMLElement>(id: string): T | null {
		if (!this.IS_BROWSER()) return null;
		return document.getElementById(id) as T | null;
	}

	/**
	 * Returns the first element matching a CSS selector.
	 *
	 * @param selector - Any valid CSS selector.
	 * @returns The matched element cast to `T`, or `null`.
	 *
	 * @example
	 * const btn = dom.QUERY<HTMLButtonElement>('.btn-favorite');
	 * const card = dom.QUERY<HTMLElement>('[data-pokemon-id="25"]');
	 *
	 * 💡 Uso real: seleccionar el primer botón, modal activo, input con error,
	 * o cualquier elemento identificado por clase, atributo o pseudo-clase.
	 */
	QUERY_SELECTOR<T extends HTMLElement = HTMLElement>(
		selector: string,
	): T | null {
		if (!this.IS_BROWSER()) return null;
		return document.querySelector<T>(selector);
	}

	/**
	 * Returns every element matching a CSS selector as a real `Array`
	 * (the native `querySelectorAll` returns a `NodeList`).
	 *
	 * @param selector - Any valid CSS selector.
	 * @returns An array of matched elements (empty array if not in browser).
	 *
	 * @example
	 * const cards = dom.QUERY_ALL<HTMLElement>('.pokemon-card');
	 * cards.forEach(card => card.classList.add('loaded'));
	 *
	 * 💡 Uso real: iterar sobre listas de items, aplicar transformaciones
	 * con `.map()`, filtrar con `.filter()`, o contar elementos visibles.
	 */
	QUERY_SELECTOR_ALL<T extends HTMLElement = HTMLElement>(
		selector: string,
	): T[] {
		if (!this.IS_BROWSER()) return [];
		return Array.from(document.querySelectorAll<T>(selector));
	}

	// ─── Class manipulation ─────────────────────────────────────────────

	/**
	 * Adds one or more CSS classes to an element.
	 * Accepts either an HTMLElement reference or a CSS selector string.
	 *
	 * @param element - Target element or CSS selector.
	 * @param className - Class name(s) to add (space-separated allowed by native API).
	 *
	 * @example
	 * dom.ADD_CLASS('#hero', 'is-visible');
	 * dom.ADD_CLASS(someElement, 'fade-in active');
	 *
	 * 💡 Uso real: activar animaciones al entrar en viewport, estados de loading,
	 * resaltar elementos seleccionados, o aplicar clases dinámicas según lógica.
	 */
	ADD_ELEM_CLASS(element: DOMTarget, className: string): void {
		const el = this.RESOLVE(element);
		el?.classList.add(className);
	}

	/**
	 * Removes one or more CSS classes from an element.
	 *
	 * @param element - Target element or CSS selector.
	 * @param className - Class name(s) to remove.
	 *
	 * @example
	 * dom.REMOVE_CLASS('#modal', 'is-open');
	 *
	 * 💡 Uso real: cerrar modales, quitar estados de error, desactivar loaders.
	 */
	REMOVE_ELEM_CLASS(element: DOMTarget, className: string): void {
		const el = this.RESOLVE(element);
		el?.classList.remove(className);
	}

	/**
	 * Toggles a CSS class on an element, optionally forcing a specific state.
	 *
	 * @param element - Target element or CSS selector.
	 * @param className - Class name to toggle.
	 * @param force - If provided, adds (true) or removes (false) the class deterministically.
	 * @returns `true` if the class is now present, `false` otherwise.
	 *
	 * @example
	 * dom.TOGGLE_CLASS('#menu', 'is-open');
	 * dom.TOGGLE_CLASS(btn, 'is-active', user.isAdmin);
	 *
	 * 💡 Uso real: menús hamburguesa, paneles colapsables, estados de favorito
	 * (como tu caso de Pokémon), o forzar una clase según una condición booleana.
	 */
	TOGGLE_ELEM_CLASS(
		element: DOMTarget,
		className: string,
		force?: boolean,
	): boolean | undefined {
		const el = this.RESOLVE(element);
		return el?.classList.toggle(className, force);
	}

	/**
	 * Checks whether an element has a specific CSS class.
	 *
	 * @param element - Target element or CSS selector.
	 * @param className - Class name to check.
	 * @returns `true` if the class is present, `false` otherwise (also `false` on SSR).
	 *
	 * @example
	 * if (dom.HAS_CLASS('#modal', 'is-open')) dom.CLOSE_MODAL();
	 *
	 * 💡 Uso real: validar estado antes de ejecutar acciones, prevenir dobles
	 * clics, o condicionar lógica de renderizado según clases aplicadas.
	 */
	HAS_ELEM_CLASS(element: DOMTarget, className: string): boolean {
		const el: any | unknown = this.RESOLVE(element);
		return el?.classList.contains(className) ?? false;
	}

	// ─── Attributes & Dataset ───────────────────────────────────────────

	/**
	 * Reads the value of an HTML attribute.
	 *
	 * @param element - Target element or CSS selector.
	 * @param attr - Attribute name (e.g. `href`, `src`, `aria-label`).
	 * @returns The attribute value, or `null` if missing.
	 *
	 * @example
	 * const href = dom.GET_ATTR<HTMLAnchorElement>('#cta', 'href');
	 *
	 * 💡 Uso real: leer hrefs dinámicos, aria-labels para accesibilidad,
	 * o atributos custom (`data-tracking-id`) que el backend inyecta en el HTML.
	 */
	GET_ATTR<HTMLAnchorElement>(element: DOMTarget, attr: string): string | null {
		const el = this.RESOLVE(element);
		return el?.getAttribute(attr) ?? null;
	}

	/**
	 * Sets or updates an HTML attribute on an element.
	 *
	 * @param element - Target element or CSS selector.
	 * @param attr - Attribute name.
	 * @param value - Attribute value.
	 *
	 * @example
	 * dom.SET_ATTR('#avatar', 'src', user.avatarUrl);
	 * dom.SET_ATTR(btn, 'aria-pressed', 'true');
	 *
	 * 💡 Uso real: actualizar imágenes dinámicamente, estados ARIA para lectores
	 * de pantalla, o atributos de tracking (GA4, Meta Pixel).
	 */
	SET_ATTR(element: DOMTarget, attr: string, value: string): void {
		const el = this.RESOLVE(element);
		el?.setAttribute(attr, value);
	}

	/**
	 * Reads a value from an element's `dataset` (its `data-*` attributes).
	 * Accepts camelCase keys and resolves them to the kebab-case stored form
	 * (e.g. `pokemonId` → `data-pokemon-id`).
	 *
	 * @param element - Target element or CSS selector.
	 * @param key - The dataset key in camelCase or kebab-case.
	 * @returns The stored string value, or `undefined` if absent.
	 *
	 * @example
	 * // <button data-pokemon-id="25" data-pokemon-name="pikachu">
	 * dom.GET_DATA('button', 'pokemonId');    // "25"
	 * dom.GET_DATA('button', 'pokemonName');  // "pikachu"
	 *
	 * 💡 Uso real: tu caso exacto de Astro con Pokémon. El HTML semántico lleva
	 * los ids y nombres en `data-*` y esta función los extrae tipados y sin magia.
	 */
	DATASET_ATTR(element: DOMTarget, key: string): string | undefined {
		const el = this.RESOLVE(element);
		if (!el) return undefined;
		const camelKey: string = key.replace(/-([a-z])/g, (_, c) =>
			c.toUpperCase(),
		);
		return el.dataset[camelKey];
	}

	// ─── Events ─────────────────────────────────────────────────────────

	/**
	 * Attaches an event listener to an element and returns a cleanup function
	 * that removes it. Designed to prevent memory leaks in SPAs and Astro
	 * View Transitions.
	 *
	 * @param element - Target element, selector, or `window`/`document`.
	 * @param event - Event name (`click`, `keydown`, `scroll`, etc.).
	 * @param callback - Handler invoked when the event fires.
	 * @param options - Native `addEventListener` options (capture, once, passive...).
	 * @returns A teardown function, or `null` if the target couldn't be resolved.
	 *
	 * @example
	 * const off = dom.ON_EVENT('#btn', 'click', () => LOGGER('clicked'));
	 * // later, on component unmount:
	 * off?.();
	 *
	 * 💡 Uso real: el patrón esencial de cleanup moderno. En Astro con View
	 * Transitions o en componentes SPA, llamar a `off()` al destruir el
	 * componente previene listeners duplicados y memory leaks.
	 */
	EVENT<K extends keyof HTMLElementEventMap>(
		element: EventTargetLike,
		event: K | string,
		callback: EventListenerOrEventListenerObject,
		options?: boolean | AddEventListenerOptions,
	): (() => void) | null {
		if (!this.IS_BROWSER()) return null;

		const el =
			typeof element === "string" ? this.QUERY<HTMLElement>(element) : element;
		if (!el) return null;

		el.addEventListener(event, callback, options);
		return () => el.removeEventListener(event, callback, options);
	}

	/**
	 * Creates a new HTML element of the given tag, with full type inference.
	 *
	 * @param tagName - A valid HTML tag name (`div`, `button`, `canvas`...).
	 * @returns The freshly created element, typed according to the tag.
	 *
	 * @example
	 * const canvas = dom.CREATE_ELEM('canvas');
	 * canvas.width = 800; // TypeScript knows this property exists
	 *
	 * 💡 Uso real: construir listas dinámicas, inyectar nodos de tracking,
	 * crear elementos de canvas para juegos, o renderizar componentes vanilla.
	 */
	CREATE_DOM_ELEM<T extends keyof HTMLElementTagNameMap>(
		tagName: T,
	): HTMLElementTagNameMap[T] {
		return document.createElement(tagName);
	}

	/**
	 * Replaces an element's inner HTML. Use with caution: destroys existing
	 * child nodes and any listeners attached to them.
	 *
	 * @param element - Target element or CSS selector.
	 * @param html - Raw HTML string.
	 *
	 * @example
	 * dom.SET_HTML('#feed', '<li>New item</li>');
	 *
	 * 💡 Uso real: renderizar contenido que viene de un CMS, Markdown ya
	 * convertido a HTML, o plantillas string. Nunca con input sin sanitizar.
	 */
	SET_HTML(element: DOMTarget, html: string): void {
		const el = this.RESOLVE(element);
		if (el) el.innerHTML = html;
	}

	/**
	 * Replaces an element's text content. Safe against XSS since it does
	 * not parse HTML.
	 *
	 * @param element - Target element or CSS selector.
	 * @param text - Plain text to set.
	 *
	 * @example
	 * dom.SET_TEXT('#counter', `Score: ${score}`);
	 *
	 * 💡 Uso real: actualizar contadores, labels, mensajes de estado.
	 * Preferible a SET_HTML cuando el contenido es texto puro (más seguro y rápido).
	 */
	SET_TEXT(element: DOMTarget, text: string): void {
		const el = this.RESOLVE(element);
		if (el) el.textContent = text;
	}

	// ─── Internal helpers ───────────────────────────────────────────────

	/**
	 * Resolves a DOM target (element or selector string) into an HTMLElement.
	 *
	 * @param element - Either an HTMLElement or a CSS selector.
	 * @returns The resolved element, or `null` if not found.
	 *
	 * @internal
	 */
	private RESOLVE(element: DOMTarget): HTMLElement | null {
		return typeof element === "string"
			? this.QUERY<HTMLElement>(element)
			: element;
	}
}

// ============================================================
// TODO: Demo usage:
// ============================================================
const { QUERY_SELECTOR, IS_BROWSER }: DOMAPI = DOMAPI.getInstance();

LOGGER("QUERY result:", QUERY_SELECTOR(".div"));
LOGGER("IS_BROWSER:", IS_BROWSER());
