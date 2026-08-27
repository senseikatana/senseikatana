import type { Temporal } from "@js-temporal/polyfill";

export type LogLevel = "log" | "warn" | "error" | "info";
export type ObserverTarget = HTMLElement | string;
export type ObserverCallback = (entry: IntersectionObserverEntry) => void;

export interface ObserverConfig {
	callback: ObserverCallback;
	options: IntersectionObserverInit;
	autoUnobserve: boolean;
}

export interface ObserverEntry {
	config: ObserverConfig;
	observer: IntersectionObserver | null;
	targets: Set<HTMLElement>;
}

export type WorkerFunc<TInput, TOutput> = (data: TInput) => TOutput;
export interface WorkerPoolEntry<TInput = unknown, TOutput = unknown> {
	worker: Worker;
	workerUrl: string;
	func: WorkerFunc<TInput, TOutput>;
}

export interface LazyLoaderEntry {
	selector: string;
	observerKey: string;
}
export type Symbol = "€" | "$";
export type Locale = "en-US" | "es-ES" | "ja-JP" | "es-MX";
export type Currency = "EUR" | "USD" | "JPY" | "MXN" | "CAD";
export type TemporalInput =
	| string
	| number
	| Temporal.PlainDate
	| Temporal.ZonedDateTime
	| Temporal.PlainDateTime;
export type DateFormatOptions = {
	year: "numeric";
	month: "long";
	day: "numeric";
};

export type DOMTarget = HTMLElement | string;
export type EventTargetLike = HTMLElement | string | Window | Document;
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

export interface FetchResult<T> {
	data: T;
	url: string;
	status: number;
	ok: boolean;
}

// Tipos de respuesta de DummyJSON
export interface Users {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	age: number;
	username?: string;
}

export interface UsersResponse {
	users: Users[];
	total: number;
	skip: number;
	limit: number;
}
