import type { Temporal } from '@js-temporal/polyfill';
import type { AxiosRequestConfig } from 'axios';
import type { TemporalInput } from '@/classes/dates';
import type { Locale, Currency } from '@/classes/convert';

// Imports funcionales en UPPER_SNAKE_CASE
import { PI, ABS, AVERAGE, CEIL, FLOOR, MAX, MIN, POW, SQRT, SUM, SUM_PRODUCT, RANDOM_INT, ROUND } from '@/math';
import { STORAGE_SET, STORAGE_GET, STORAGE_REMOVE, STORAGE_CLEAR, STORAGE_TOGGLE_ARRAY } from '@/storage';
import { UNIQUE, FLATTEN, CHUNK, PICK, OMIT, SLEEP, RETRY, COPY_TO_CLIPBOARD, PARSE_URL, GET_URL_PARAMS } from '@/native';
import { CAPITALIZE, SLUGIFY, TRIM, IS_VALID_EMAIL } from '@/string';
import { DATE_DIFF, DATE_FORMAT, NOW } from '@/classes/dates';
import { DEEP_CLONE, DEEP_MERGE, HAS_PROPERTIES, IS_OBJECT, GROUP_BY, TO_JSON, FROM_JSON } from '@/objects';
import { BYTES_TO_SIZE, CELSIUS_TO_FAHRENHEIT, CELSIUS_TO_KELVIN, CURRENCY_FORMAT, KG_TO_LBS, KM_TO_MILES } from '@/classes/convert';
import { AXIOS_FETCH, FETCH_REQUEST, POST, STRINGIFY_QUERY } from '@/http';
import { LOGGER as LOG } from '@/logger';
import { IS_ONLINE, GET_CONNECTION_TYPE, GET_LANGUAGE, GET_CORES, IS_MOBILE, VIBRATE, NATIVE_SHARE } from '@/navigator';
import { GET_SCROLL_Y, SCROLL_TO_TOP, GET_VIEWPORT_SIZE, DEBOUNCE, THROTTLE, PRINT_PAGE, FOCUS_ELEMENT } from '@/window';
import { GET_MEDIA_STREAM, STOP_MEDIA_STREAM, GET_GEOLOCATION, REQUEST_MOTION_PERMISSION, ON_DEVICE_ORIENTATION, VIBRATE } from '@/permissions';
import { DELAY, TIMEOUT, INTERVAL, DEBOUNCE, THROTTLE } from '@/time';
import { ON_VISIBLE, LAZY_LOAD_IMAGES } from '@/observer';
import { RUN_IN_WORKER, CREATE_POOL } from '@/worker';
import { 
  GET_BY_ID, QUERY, QUERY_ALL, 
  ADD_CLASS, REMOVE_CLASS, TOGGLE_CLASS, HAS_CLASS, 
  GET_ATTR, SET_ATTR, GET_DATA, 
  ON_EVENT, CREATE_ELEM, SET_HTML, SET_TEXT 
} from '@/dom';

import { CREATE_SIGNAL, CREATE_EFFECT, CREATE_MEMO, CREATE_TOGGLE, CREATE_STORAGE_SIGNAL } from '@/state';
import { PATHS_FROM, GET_STATIC_PATHS, FIND_ENTRY, GENERATE_PAGINATION, type PATHS_OPTIONS } from '@/astro';
/**
 * Utility Class: Agrupa todas las funciones bajo un namespace estático.
 * No requiere instanciación (new). Uso directo: LAMBDA.METHOD()
 */
export class LAMBDA {
  // Evitar instanciación accidental (Opcional pero recomendado para clases puramente estáticas)
  constructor() {}

  /** Mathematical constant PI. */
  static readonly PI = Math.PI || PI;

  /** Logs to the console with an optional level ('log' | 'warn' | 'error' | 'info'). */
  static LOGGER(...args: any[]): void { LOG(...args); }

    // ─── Astro (Static Paths Genéricos) ───────────────────────────────
  static PATHS_FROM<T, TParam extends string = 'slug', TProps = T>(
    items: T[],
    options?: PATHS_OPTIONS<T, TParam, TProps>
  ): Array<{ params: Record<TParam, string>; props: TProps }> { 
    return PATHS_FROM(items, options); 
  }

  static async GET_STATIC_PATHS(
    getCollectionFn: any,
    collectionName: string,
    options?: PATHS_OPTIONS<any, any, any>
  ): Promise<any[]> { 
    return GET_STATIC_PATHS(getCollectionFn, collectionName, options); 
  }

  static FIND_ENTRY<T>(items: T[], value: string, keyFrom?: (item: T) => string | number): T | null { 
    return FIND_ENTRY(items, value, keyFrom); 
  }

  static GENERATE_PAGINATION<T>(items: T[], pageSize?: number, param?: string): any[] { 
    return GENERATE_PAGINATION(items, pageSize, param as any); 
  }
  
    // ─── State & Reactivity (Hooks Genéricos) ─────────────────────────
  static CREATE_SIGNAL<T>(initialValue: T): [() => T, (newValue: T | ((prev: T) => T)) => void] { 
    return CREATE_SIGNAL(initialValue); 
  }

  static CREATE_EFFECT(
    callback: () => void | (() => void),
    signals: Array<{ subscribe?: (fn: (n: any, o: any) => void) => () => void }>
  ): () => void { 
    return CREATE_EFFECT(callback, signals); 
  }

  static CREATE_MEMO<T>(
    computation: () => T,
    signals: Array<{ subscribe?: (fn: (n: any, o: any) => void) => () => void }>
  ): () => T { 
    return CREATE_MEMO(computation, signals); 
  }

  static CREATE_TOGGLE(initialValue?: boolean): [() => boolean, { set: (v: boolean) => void; toggle: () => void }] { 
    return CREATE_TOGGLE(initialValue); 
  }

  static CREATE_STORAGE_SIGNAL<T>(key: string, initialValue: T, type?: 'local' | 'session'): [() => T, (newValue: T | ((prev: T) => T)) => void] { 
    return CREATE_STORAGE_SIGNAL(key, initialValue, type); 
  }
  
    // ─── DOM & HTML Elements ──────────────────────────────────────────
  static GET_BY_ID<T extends HTMLElement = HTMLElement>(id: string): T | null { return GET_BY_ID<T>(id); }
  static QUERY<T extends HTMLElement = HTMLElement>(selector: string): T | null { return QUERY<T>(selector); }
  static QUERY_ALL<T extends HTMLElement = HTMLElement>(selector: string): T[] { return QUERY_ALL<T>(selector); }
  
  static ADD_CLASS(element: HTMLElement | string, className: string): void { return ADD_CLASS(element, className); }
  static REMOVE_CLASS(element: HTMLElement | string, className: string): void { return REMOVE_CLASS(element, className); }
  static TOGGLE_CLASS(element: HTMLElement | string, className: string, force?: boolean): boolean | undefined { return TOGGLE_CLASS(element, className, force); }
  static HAS_CLASS(element: HTMLElement | string, className: string): boolean { return HAS_CLASS(element, className); }
  
  static GET_ATTR(element: HTMLElement | string, attr: string): string | null { return GET_ATTR(element, attr); }
  static SET_ATTR(element: HTMLElement | string, attr: string, value: string): void { return SET_ATTR(element, attr, value); }
  static GET_DATA(element: HTMLElement | string, key: string): string | undefined { return GET_DATA(element, key); }
  
  static ON_EVENT<K extends keyof HTMLElementEventMap>(
    element: HTMLElement | string | Window | Document,
    event: K | string,
    callback: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): (() => void) | null { return ON_EVENT(element, event, callback, options); }

  static CREATE_ELEM<T extends keyof HTMLElementTagNameMap>(tagName: T): HTMLElementTagNameMap[T] { return CREATE_ELEM(tagName); }
  static SET_HTML(element: HTMLElement | string, html: string): void { return SET_HTML(element, html); }
  static SET_TEXT(element: HTMLElement | string, text: string): void { return SET_TEXT(element, text); }
  
  
  
    // ─── Intersection Observer (UI / Scroll) ──────────────────────────
  static ON_VISIBLE(
    element: HTMLElement | string,
    callback: (entry: IntersectionObserverEntry) => void,
    options?: IntersectionObserverInit
  ): (() => void) | null { 
    return ON_VISIBLE(element, callback, options); 
  }

  static LAZY_LOAD_IMAGES(selector?: string): (() => void) | null { 
    return LAZY_LOAD_IMAGES(selector); 
  }

  // ─── Web Workers (Performance / Heavy Math) ───────────────────────
  static async RUN_IN_WORKER<TInput, TOutput>(
    workerFunc: (data: TInput) => TOutput,
    data: TInput
  ): Promise<TOutput> { 
    return RUN_IN_WORKER(workerFunc, data); 
  }

  static CREATE_POOL<TInput, TOutput>(
    workerFunc: (data: TInput) => TOutput
  ): { run: (data: TInput) => Promise<TOutput>; terminate: () => void } { 
    return CREATE_POOL(workerFunc); 
  }
  
  // ─── Time Management ──────────────────────────────────────────────
  static DELAY(ms: number): Promise<void> { return DELAY(ms); }
  
  static TIMEOUT<T>(callback: () => T | Promise<T>, ms: number): { promise: Promise<T>; cancel: () => void } { 
    return TIMEOUT(callback, ms); 
  }
  
  static INTERVAL(
    callback: () => void | Promise<void>, 
    ms: number, 
    immediate?: boolean
  ): { pause: () => void; resume: () => void; stop: () => void } { 
    return INTERVAL(callback, ms, immediate); 
  }

  static DEBOUNCE<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void { 
    return DEBOUNCE(func, delay); 
  }

  static THROTTLE<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void { 
    return THROTTLE(func, limit); 
  }
  
  
  
  
    // ─── Permissions & Mobile Sensors ─────────────────────────────────
  static async GET_MEDIA_STREAM(constraints?: MediaStreamConstraints): Promise<MediaStream | null> { 
    return GET_MEDIA_STREAM(constraints); 
  }
  
  static STOP_MEDIA_STREAM(stream: MediaStream | null): void { 
    return STOP_MEDIA_STREAM(stream); 
  }
  
  static async GET_GEOLOCATION(options?: PositionOptions): Promise<{ lat: number; lng: number; accuracy: number } | null> { 
    return GET_GEOLOCATION(options); 
  }
  
  static async REQUEST_MOTION_PERMISSION(): Promise<boolean> { 
    return REQUEST_MOTION_PERMISSION(); 
  }
  
  static ON_DEVICE_ORIENTATION(callback: (event: DeviceOrientationEvent) => void): (() => void) | null { 
    return ON_DEVICE_ORIENTATION(callback); 
  }

  static VIBRATE(pattern: number | number[]): boolean { 
    return VIBRATE(pattern); 
  }
  
    // ─── Navigator API ────────────────────────────────────────────────
  static IS_ONLINE(): boolean { return IS_ONLINE(); }
  static GET_CONNECTION_TYPE(): string | null { return GET_CONNECTION_TYPE(); }
  static GET_LANGUAGE(): string { return GET_LANGUAGE(); }
  static GET_CORES(): number { return GET_CORES(); }
  static IS_MOBILE(): boolean { return IS_MOBILE(); }
  static VIBRATE(pattern: number | number[]): boolean { return VIBRATE(pattern); }
  static NATIVE_SHARE(data: { title?: string; text?: string; url?: string }): Promise<boolean> { return NATIVE_SHARE(data); }

  // ─── Window API ───────────────────────────────────────────────────
  static GET_SCROLL_Y(): number { return GET_SCROLL_Y(); }
  static SCROLL_TO_TOP(smooth?: boolean): void { return SCROLL_TO_TOP(smooth); }
  static GET_VIEWPORT_SIZE(): { width: number; height: number } { return GET_VIEWPORT_SIZE(); }
  static DEBOUNCE<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void { return DEBOUNCE(func, delay); }
  static THROTTLE<T extends (...args: any[]) => void>(func: T, limit: number): (...args: Parameters<T>) => void { return THROTTLE(func, limit); }
  static PRINT_PAGE(): void { return PRINT_PAGE(); }
  static FOCUS_ELEMENT(selector: string): boolean { return FOCUS_ELEMENT(selector); }
  
  // ─── Math ────────────────────────────────────────────────────────
  static ABS(value: number): number { return ABS(value); }
  static AVERAGE(numbers: number[]): number { return AVERAGE(numbers); }
  static CEIL(value: number): number { return CEIL(value); }
  static FLOOR(value: number): number { return FLOOR(value); }
  static MAX(numbers: number[]): number { return MAX(numbers); }
  static MIN(numbers: number[]): number { return MIN(numbers); }
  static POW(base: number, exponent: number): number { return POW(base, exponent); }
  static SQRT(value: number): number { return SQRT(value); }
  static SUM(values: number[]): number { return SUM(values); }
  static SUM_PRODUCT(arr1: number[], arr2: number[]): number { return SUM_PRODUCT(arr1, arr2); }
  static RANDOM_INT(min: number, max: number): number { return RANDOM_INT(min, max); }
  static ROUND(value: string | number, decimals?: number): number { return ROUND(value, decimals); }

  // ─── String ───────────────────────────────────────────────────────
  static CAPITALIZE(text?: string): string { return CAPITALIZE(text); }
  static SLUGIFY(text: string): string { return SLUGIFY(text); }
  static TRIM(text: string): string { return TRIM(text); }
  static IS_VALID_EMAIL(email: string): boolean { return IS_VALID_EMAIL(email); }

  // ─── Dates ────────────────────────────────────────────────────────
  static DATE_DIFF(start: string | Temporal.PlainDate, end: string | Temporal.PlainDate): string {
    return DATE_DIFF(start, end);
  }
  static DATE_FORMAT(dateInput: TemporalInput, locale?: string, options?: Intl.DateTimeFormatOptions): string {
    return DATE_FORMAT(dateInput, locale, options);
  }
  static NOW(): string { return NOW(); }

  // ─── Objects ──────────────────────────────────────────────────────
  static DEEP_CLONE<T>(value: T): T { return DEEP_CLONE(value); }
  static DEEP_MERGE<T extends Record<string, unknown>>(target: T, source: Record<string, unknown>): T {
    return DEEP_MERGE(target, source);
  }
  static HAS_PROPERTIES<T extends object, K extends keyof T>(obj: T, ...keys: K[]): obj is T & Record<K, NonNullable<T[K]>> {
    return HAS_PROPERTIES(obj, ...keys);
  }
  static IS_OBJECT(item: unknown): item is Record<string, unknown> { return IS_OBJECT(item); }
  static GROUP_BY<T extends Record<string, unknown>>(array: T[], key: keyof T): Record<string, T[]> {
    return GROUP_BY(array, key);
  }
  static TO_JSON(data: unknown, indent?: number): string { return TO_JSON(data, indent); }
  static FROM_JSON<T>(jsonString: string): T | null { return FROM_JSON<T>(jsonString); }

  // ─── Convert ─────────────────────────────────────────────────────
  static BYTES_TO_SIZE(bytes: number, decimals?: number): string { return BYTES_TO_SIZE(bytes, decimals); }
  static CELSIUS_TO_FAHRENHEIT(value: number, reverse?: boolean): number { return CELSIUS_TO_FAHRENHEIT(value, reverse); }
  static CELSIUS_TO_KELVIN(value: number, reverse?: boolean): number { return CELSIUS_TO_KELVIN(value, reverse); }
  static CURRENCY_FORMAT(value: string | number, locale?: Locale, currency?: Currency, isCents?: boolean): string {
    return CURRENCY_FORMAT(value, locale, currency, isCents);
  }
  static KG_TO_LBS(value: number, reverse?: boolean, decimals?: number): number { return KG_TO_LBS(value, reverse, decimals); }
  static KM_TO_MILES(value: number, reverse?: boolean, decimals?: number): number { return KM_TO_MILES(value, reverse, decimals); }

  // ─── HTTP ─────────────────────────────────────────────────────────
  static AXIOS_FETCH<T>(url: string, config?: AxiosRequestConfig): Promise<T | null> { return AXIOS_FETCH<T>(url, config); }
  static FETCH_REQUEST<T>(url: string, options?: RequestInit): Promise<T | null> { return FETCH_REQUEST<T>(url, options); }
  static POST<TResponse, TBody>(url: string, body: TBody): Promise<TResponse | null> { return POST<TResponse, TBody>(url, body); }
  static STRINGIFY_QUERY(params: Record<string, string | number | boolean>): string { return STRINGIFY_QUERY(params); }

  // ─── Storage ──────────────────────────────────────────────────────
  static STORAGE_SET<T>(key: string, value: T, type?: 'local' | 'session'): boolean { return STORAGE_SET(key, value, type); }
  static STORAGE_GET<T>(key: string, type?: 'local' | 'session'): T | null { return STORAGE_GET<T>(key, type); }
  static STORAGE_REMOVE(key: string, type?: 'local' | 'session'): void { return STORAGE_REMOVE(key, type); }
  static STORAGE_CLEAR(type?: 'local' | 'session'): void { return STORAGE_CLEAR(type); }
  static STORAGE_TOGGLE_ARRAY<T extends { id: string | number }>(key: string, item: T, type?: 'local' | 'session'): T[] {
    return STORAGE_TOGGLE_ARRAY(key, item, type);
  }

  // ─── Native Utils ─────────────────────────────────────────────────
  static UNIQUE<T>(array: T[]): T[] { return UNIQUE(array); }
  static FLATTEN<T>(array: T[][]): T[] { return FLATTEN(array); }
  static CHUNK<T>(array: T[], size: number): T[][] { return CHUNK(array, size); }
  static PICK<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> { return PICK(obj, keys); }
  static OMIT<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> { return OMIT(obj, keys); }
  static SLEEP(ms: number): Promise<void> { return SLEEP(ms); }
  static RETRY<T>(fn: () => Promise<T>, retries?: number, delayMs?: number): Promise<T> { return RETRY(fn, retries, delayMs); }
  static COPY_TO_CLIPBOARD(text: string): Promise<boolean> { return COPY_TO_CLIPBOARD(text); }
  static PARSE_URL(urlString: string): URL | null { return PARSE_URL(urlString); }
  static GET_URL_PARAMS(urlString: string): Record<string, string> { return GET_URL_PARAMS(urlString); }
}

export default LAMBDA;

