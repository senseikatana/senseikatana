import { LOGGER } from "@/logger";


export default class DOMAPI {

  private constructor() {
  }

  protected static IS_BROWSER(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  /* Obtiene un elemento por su ID.*/

  protected static GET_ELEM_BYID<T extends HTMLElement = HTMLElement>(id: string): T | null {
    if (!this.IS_BROWSER()) return null;
    return document.getElementById(id) as T | null;
  }

  /**
   * Obtiene el primer elemento que coincida con un selector CSS.
   * Uso: LAMBDA.QUERY<HTMLButtonElement>('.btn-favorito')
   */
  static QUERY<T extends HTMLElement = HTMLElement>(selector: string): T | null {
    if (!this.IS_BROWSER()) return null;
    return document.querySelector<T>(selector);
  }

  /**
   * Obtiene TODOS los elementos que coincidan con un selector CSS como un Array real.
   * (El nativo devuelve un NodeList, esto lo convierte a Array para poder usar .map, .filter, etc.)
   */
  static QUERY_ALL<T extends HTMLElement = HTMLElement>(selector: string): T[] {
    if (!this.IS_BROWSER()) return [];
    return Array.from(document.querySelectorAll<T>(selector));
  }

  static ADD_CLASS(element: HTMLElement | string, className: string): void {
    const el = typeof element === 'string' ? QUERY<HTMLElement>(element) : element;
    el?.classList.add(className);
  }

  static REMOVE_CLASS(element: HTMLElement | string, className: string): void {
    const el = typeof element === 'string' ? QUERY<HTMLElement>(element) : element;
    el?.classList.remove(className);
  }

  static TOGGLE_CLASS(element: HTMLElement | string, className: string, force?: boolean): boolean | undefined {
    const el = typeof element === 'string' ? QUERY<HTMLElement>(element) : element;
    return el?.classList.toggle(className, force);
  }
  static HAS_CLASS(element: HTMLElement | string, className: string): boolean {
    const el = typeof element === 'string' ? QUERY<HTMLElement>(element) : element;
    return el?.classList.contains(className) ?? false;
  }
  // ─── Atributos y Dataset ───────────────────────────────────────────

  static GET_ATTR(element: HTMLElement | string, attr: string): string | null {
    const el = typeof element === 'string' ? QUERY<HTMLElement>(element) : element;
    return el?.getAttribute(attr) ?? null;
  }

  static SET_ATTR(element: HTMLElement | string, attr: string, value: string): void {
    const el = typeof element === 'string' ? QUERY<HTMLElement>(element) : element;
    el?.setAttribute(attr, value);
  }
  /**
   * Obtiene un valor del data-* attribute.
   * Ej: <div data-id="4"> -> LAMBDA.GET_DATA(el, 'id') retorna "4"
   */
  static GET_DATA(element: HTMLElement | string, key: string): string | undefined {
    const el = typeof element === 'string' ? QUERY<HTMLElement>(element) : element;
    // Convertimos camelCase a kebab-case para el dataset (ej: pokemonId -> pokemon-id)
    const datasetKey = key.replace(/[A-Z]/g, m => "-" + m.toLowerCase()).replace(/^-/, "");
    return el?.dataset[datasetKey.replace(/-([a-z])/g, (_, c) => c.toUpperCase())];
  }




  /**
   * Añade un Event Listener de forma segura.
   * Retorna una función para eliminar el evento (ideal para cleanup).
   */
  static ON_EVENT<K extends keyof HTMLElementEventMap>(
    element: HTMLElement | string | Window | Document,
    event: K | string,
    callback: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): (() => void) | null {
    if (!IS_BROWSER()) return null;

    const el = typeof element === 'string' ? QUERY<HTMLElement>(element) : element;
    if (!el) return null;

    el.addEventListener(event, callback, options);

    // Retornamos función de limpieza (removeEventListener)
    return () => el.removeEventListener(event, callback, options);
  }


  // ─── Creación e Inserción ──────────────────────────────────────────

  static CREATE_ELEM<T extends keyof HTMLElementTagNameMap>(tagName: T): HTMLElementTagNameMap[T] {
    return document.createElement(tagName);
  }

  static SET_HTML(element: HTMLElement | string, html: string): void {
    const el = typeof element === 'string' ? QUERY<HTMLElement>(element) : element;
    if (el) el.innerHTML = html;
  }

  static SET_TEXT(element: HTMLElement | string, text: string): void {
    const el = typeof element === 'string' ? QUERY<HTMLElement>(element) : element;
    if (el) el.textContent = text;
  }
}

export const { GET_BY_ID, QUERY, QUERY_ALL } = DOMAPI


LOGGER(QUERY('.div'))