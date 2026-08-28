import type { Temporal } from "@js-temporal/polyfill";

/* -------------------------------------------------------------------------- */
/*                                    Logger                                  */
/* -------------------------------------------------------------------------- */

export type LogLevel = "log" | "info" | "warn" | "error" | "debug";

/* -------------------------------------------------------------------------- */
/*                                  DOM / HTML                                */
/* -------------------------------------------------------------------------- */

/**
 * Tipos nativos de TypeScript/DOM usados aquí:
 *
 * HTMLElement
 * Element
 * Node
 * Window
 * Document
 * EventTarget
 * Event
 * MouseEvent
 * KeyboardEvent
 * IntersectionObserver
 * IntersectionObserverEntry
 * IntersectionObserverInit
 * Worker
 * RequestInfo
 * RequestInit
 * Response
 * BodyInit
 * Storage
 */

export type DOMTarget = HTMLElement | string;

export type EventTargetLike = HTMLElement | Window | Document | string;

/**
 * Alias semántico para observers.
 * Internamente es lo mismo que DOMTarget.
 */
export type ObserverTarget = DOMTarget;

export type ObserverCallback = (entry: IntersectionObserverEntry) => void;

export interface ObserverConfig {
	callback: ObserverCallback;
	options?: IntersectionObserverInit;
	autoUnobserve?: boolean;
}

export interface ObserverEntry {
	config: ObserverConfig;
	observer: IntersectionObserver | null;
	targets: Set<HTMLElement>;
}

export interface LazyLoaderEntry {
	selector: string;
	observerKey: string;
}

/* -------------------------------------------------------------------------- */
/*                                   Workers                                  */
/* -------------------------------------------------------------------------- */

export type WorkerFunc<TInput = unknown, TOutput = unknown> = (
	data: TInput,
) => TOutput | Promise<TOutput>;

export interface WorkerPoolEntry<TInput = unknown, TOutput = unknown> {
	worker: Worker;
	workerUrl: string;
	func: WorkerFunc<TInput, TOutput>;
}

/* -------------------------------------------------------------------------- */
/*                               Locale / Currency                            */
/* -------------------------------------------------------------------------- */

/**
 * Evitamos llamarlo `Symbol` porque `Symbol` ya existe en JavaScript.
 */
export type CurrencySymbol = "€" | "$";

export type Locale = "en-US" | "es-ES" | "ja-JP" | "es-MX";

export type Currency = "EUR" | "USD" | "JPY" | "MXN" | "CAD";

export interface CurrencyFormatOptions {
	amount: number;
	currency?: Currency;
	locale?: Locale;
	taxes?: number;
}

/* -------------------------------------------------------------------------- */
/*                                    Dates                                   */
/* -------------------------------------------------------------------------- */

export type TemporalInput =
	| string
	| number
	| Date
	| Temporal.PlainDate
	| Temporal.PlainDateTime
	| Temporal.ZonedDateTime;

/**
 * Si quieres algo más flexible, también puedes usar directamente:
 *
 * Intl.DateTimeFormatOptions
 */
export interface AppDateFormatOptions {
	year?: "numeric" | "2-digit";
	month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
	day?: "numeric" | "2-digit";
}

/**
 * Alias si prefieres mantener el nombre anterior.
 */
export type DateFormatOptions = AppDateFormatOptions;

/* -------------------------------------------------------------------------- */
/*                                  Fetch API                                 */
/* -------------------------------------------------------------------------- */

export type ApisConfig = Record<string, ApiEntry>;

export interface ApiEntry {
	baseUri: string;
	endpoints?: Record<string, string>;
	defaultQueryParams?: Record<string, Record<string, string | number>>;
}

export interface UrlOptions {
	params?: Record<string, string | number>;
	query?: Record<string, string | number | boolean | null | undefined>;
}

export interface FetchOptions extends Omit<RequestInit, "body"> {
	urlOptions?: UrlOptions;
	body?: BodyInit | null;
}

export interface FetchResult<T = unknown> {
	data: T;
	url: string;
	status: number;
	ok: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                DummyJSON API                               */
/* -------------------------------------------------------------------------- */

export interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	age: number;
	username?: string;
}

export interface UsersResponse {
	users: User[];
	total: number;
	skip: number;
	limit: number;
}