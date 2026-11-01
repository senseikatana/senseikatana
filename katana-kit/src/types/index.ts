import type { Temporal } from "@js-temporal/polyfill";
import type {
	WatchCallback as VueWatchCallback,
	WatchOptions as VueWatchOptions,
	WatchSource as VueWatchSource,
	WatchStopHandle as VueWatchStopHandle,
} from "vue";
import type { z } from "zod";

import {
	AccessCapabilitySchema,
	AccessRoleDefinitionSchema,
	AccessRoleSchema,
	AccessSubjectSchema,
	BUILT_IN_CAPABILITIES,
	BUILT_IN_ROLE_SLUGS,
} from "@/schemas/access.schema.js";
import {
	AiFunctionCallSchema,
	AiMessageSchema,
	AiProviderConfigSchema,
	AiRoleSchema,
	AiToolCallSchema,
} from "@/schemas/ai.schema.js";
import {
	ApiErrorSchema,
	HttpMethodSchema,
	LocaleSchema,
	LogLevelSchema,
	SerializedErrorSchema,
	StorageTargetSchema,
	ThemeModeSchema,
} from "@/schemas/common.schema.js";
import {
	AgentDataSchema,
	AgentStepSchema,
	AiErrorSchema,
	AppDateFormatOptionsSchema,
	AssistantReplySchema,
	AstroServiceErrorSchema,
	CurrencyConversionSchema,
	CurrencyConvertOptionsSchema,
	CurrencyFormatOptionsSchema,
	CurrencyRateSnapshotSchema,
	CurrencySchema,
	DateOrderSchema,
	DateUnitSchema,
	FieldErrorsSchema,
	GeometryFormatOptionsSchema,
	GeoPositionSchema,
	LazyLoaderEntrySchema,
	NumberFormatOptionsSchema,
	ProductTypeSchema,
	SalePriceOptionsSchema,
	ScrollPositionSchema,
	ValidationIssueSchema,
	ViewportSizeSchema,
} from "@/schemas/core.schema.js";
import { FakeVehicleSchema } from "@/schemas/faker.schema.js";
import {
	FileEncodingSchema,
	FileHashAlgorithmSchema,
	FileStatsSchema,
	FilesystemErrorSchema,
	ReadDirEntrySchema,
	ReadDirOptionsSchema,
	WriteFileOptionsSchema,
} from "@/schemas/filesystem.schema.js";
import {
	IfConfigSchema,
	IfInsertRowsSchema,
	IfInvokeOptionsSchema,
	IfListOptionsSchema,
	IfOrderSchema,
	IfRpcCallSchema,
	IfStorageRefSchema,
	IfTableQuerySchema,
	IfUpdatePatchSchema,
	IfWriteQuerySchema,
} from "@/schemas/insforge.schema.js";
import {
	EncryptedVaultSchema,
	KeyRecordSchema,
	KeyStatusSchema,
	McpServerSchema,
	VaultDataSchema,
} from "@/schemas/keyvault.schema.js";
import {
	MediaProviderSchema,
	MediaSourceSchema,
	SmartVideoOptionsSchema,
	YoutubeEmbedOptionsSchema,
	YoutubeThumbnailQualitySchema,
} from "@/schemas/media.schema.js";
import {
	NotionBlockListSchema,
	NotionBlockSchema,
	NotionConfigSchema,
	NotionCoverSchema,
	NotionDatabaseQuerySchema,
	NotionDatabaseSchema,
	NotionIconSchema,
	NotionPageListSchema,
	NotionPageSchema,
	NotionParentSchema,
	NotionPropertySchemaSchema,
	NotionPropertyValueSchema,
	NotionRichTextSchema,
	NotionSearchQuerySchema,
	NotionSearchResultSchema,
	NotionSortSchema,
	NotionUserListSchema,
	NotionUserSchema,
} from "@/schemas/notion.schema.js";
import { RssConfigSchema, RssItemSchema } from "@/schemas/rss.schema.js";
import {
	WordPressAuthSchema,
	WordPressConfigSchema,
	WpAcfFieldsSchema,
	WpBaseEntitySchema,
	WpBatchOperationSchema,
	WpBatchResultSchema,
	WpCapabilityMapSchema,
	WpCapabilitySchema,
	WpCategoryCreateSchema,
	WpCategorySchema,
	WpCategoryUpdateSchema,
	WpCommentCreateSchema,
	WpCommentSchema,
	WpCommentUpdateSchema,
	WpEmbeddedSchema,
	WpMediaMetaSchema,
	WpMediaSchema,
	WpMediaUpdateSchema,
	WpPageCreateSchema,
	WpPageSchema,
	WpPageUpdateSchema,
	WpPostCreateSchema,
	WpPostSchema,
	WpPostUpdateSchema,
	WpQueryParamsSchema,
	WpRoleAuditSchema,
	WpRoleAuditStatusSchema,
	WpRoleDefinitionSchema,
	WpRoleRegistrySchema,
	WpTagCreateSchema,
	WpTagSchema,
	WpTagUpdateSchema,
	WpUserCreateSchema,
	WpUserSchema,
	WpUserUpdateSchema,
} from "@/schemas/wordpress.schema.js";
import {
	YoutubeApiConfigSchema,
	YoutubeChannelsResponseSchema,
	YoutubeListParamsSchema,
	YoutubePlaylistItemsResponseSchema,
	YoutubeVideoNormalizedSchema,
	YoutubeVideoPageSchema,
	YoutubeVideosResponseSchema,
	YoutubeVideoThumbnailsSchema,
} from "@/schemas/youtube.schema.js";

/* -------------------------------------------------------------------------- */
/* Logging                                                                    */
/* -------------------------------------------------------------------------- */

/** Native console methods used as log levels. */
export type LogLevel = z.infer<typeof LogLevelSchema>;

/* -------------------------------------------------------------------------- */
/* DOM / Observers                                                            */
/* -------------------------------------------------------------------------- */

/** Target can be either an HTMLElement reference or a CSS selector string. */
export type ObserverTarget = HTMLElement | string;

/** Callback invoked when an observed element enters the viewport. */
export type ObserverCallback = (entry: IntersectionObserverEntry) => void;

/** Configuration for a registered IntersectionObserver. */
export interface ObserverConfig {
	callback: ObserverCallback;
	options: IntersectionObserverInit;
	autoUnobserve: boolean;
}

/** Internal registry entry storing an observer instance and its tracked targets. */
export interface ObserverEntry {
	config: ObserverConfig;
	observer: IntersectionObserver | null;
	targets: Set<HTMLElement>;
}

/** Internal registry entry for lazy loading configurations. */
export type LazyLoaderEntry = z.infer<typeof LazyLoaderEntrySchema>;

/** Contract of the DOM facade. */
export interface IDomService {
	useIsBrowser(): boolean;
	useGetRoot(): HTMLElement | null;
	useGetBody(): HTMLBodyElement | null;
	useGetElementById<T extends HTMLElement = HTMLElement>(id: string): T | null;
	useGetElementByClass<T extends HTMLElement = HTMLElement>(className: string): T | null;
	useQuerySelector<K extends keyof HTMLElementTagNameMap>(
		selector: K,
	): HTMLElementTagNameMap[K] | null;
	useQuerySelector<E extends Element = HTMLElement>(selector: string): E | null;
	useQuerySelectorAll<K extends keyof HTMLElementTagNameMap>(
		selector: K,
	): HTMLElementTagNameMap[K][];
	useQuerySelectorAll<E extends Element = HTMLElement>(selector: string): E[];
	useAddClass(target: Element | string, className: string): void;
	useRemoveClass(target: Element | string, className: string | string[]): void;
	useToggleClass(target: Element | string, className: string, force?: boolean): boolean | undefined;
	useHasClass(target: Element | string, className: string): boolean;
	useGetAttribute(target: Element | string, attr: string): string | null;
	useSetAttribute(target: Element | string, attr: string, value: string): void;
	useRemoveAttribute(target: Element | string, attr: string): void;
	useGetDataAttribute(target: HTMLElement | string, key: string): string | undefined;
	useSetDataAttribute(target: HTMLElement | string, key: string, value: string): void;
	useOn<K extends keyof HTMLElementEventMap>(
		target: EventTarget | string,
		event: K,
		callback: (event: HTMLElementEventMap[K]) => void,
		options?: boolean | AddEventListenerOptions,
	): (() => void) | null;
	useCreateElement<T extends keyof HTMLElementTagNameMap>(
		tagName: T,
		options?: ElementCreationOptions,
	): HTMLElementTagNameMap[T];
	useSetHtml(target: Element | string, html: string): void;
	useSetText(target: Element | string, text: string): void;
	useAppend(target: Element | string, child: Element | string): void;
	useRemove(target: Element | string): void;
}

/* -------------------------------------------------------------------------- */
/* Sensors                                                                    */
/* -------------------------------------------------------------------------- */

/** Represents a geographic position with latitude, longitude and accuracy. */
export type GeoPosition = z.infer<typeof GeoPositionSchema>;

/** Type for the experimental Battery API. */
export interface BatteryManager extends EventTarget {
	charging: boolean;
	chargingTime: number;
	dischargingTime: number;
	level: number;
}

/* -------------------------------------------------------------------------- */
/* Workers                                                                    */
/* -------------------------------------------------------------------------- */

export type WorkerFunc<TInput = unknown, TOutput = unknown> = (
	data: TInput,
) => TOutput | Promise<TOutput>;

export interface WorkerPoolEntry<TInput = unknown, TOutput = unknown> {
	worker: Worker;
	workerUrl: string;
	func: WorkerFunc<TInput, TOutput>;
	pending: Map<string, { reject: (reason: Error) => void; cleanup: () => void }>;
}

/* -------------------------------------------------------------------------- */
/* Storage                                                                    */
/* -------------------------------------------------------------------------- */

export type StorageTarget = z.infer<typeof StorageTargetSchema>;

/** Strategy contract: homogeneous storage without `any`. */
export interface StorageStrategy {
	useGetItem<T = unknown>(key: string): T | null;
	useSetItem(key: string, value: unknown): void;
	useRemoveItem(key: string): void;
	useClear(): void;
}

/* -------------------------------------------------------------------------- */
/* Filesystem                                                                 */
/* -------------------------------------------------------------------------- */

/** Text encodings accepted by the filesystem helpers. */
export type FileEncoding = z.infer<typeof FileEncodingSchema>;

/** Hash algorithms supported by `useHashFile` / `useVerifyFileHash`. */
export type FileHashAlgorithm = z.infer<typeof FileHashAlgorithmSchema>;

/** Safe error from a filesystem operation (`NodeJS.ErrnoException`-shaped). */
export type FilesystemError = z.infer<typeof FilesystemErrorSchema>;

/** Safe Result for filesystem operations: `{ data, error, ok }`, never throws. */
export type FilesystemResult<T> = SafeResult<T, FilesystemError>;

/** Portable stats subset returned by `useGetFileStats`. */
export type FileStats = z.infer<typeof FileStatsSchema>;

/** A single directory entry returned by `useReadDir`. */
export type ReadDirEntry = z.infer<typeof ReadDirEntrySchema>;

/** Options for `useReadDir`. */
export type ReadDirOptions = z.infer<typeof ReadDirOptionsSchema>;

/** Options for `useWriteFile` / `useAppendFile`. */
export type WriteFileOptions = z.infer<typeof WriteFileOptionsSchema>;

/* -------------------------------------------------------------------------- */
/* Locale / Currency                                                          */
/* -------------------------------------------------------------------------- */

export type Locale = z.infer<typeof LocaleSchema>;

export type Currency = z.infer<typeof CurrencySchema>;

export type CurrencyFormatOptions = z.infer<typeof CurrencyFormatOptionsSchema>;

export type NumberFormatOptions = z.infer<typeof NumberFormatOptionsSchema>;

export type SalePriceOptions = z.infer<typeof SalePriceOptionsSchema>;

/** Input for a currency conversion between two ISO currencies. */
export type CurrencyConvertOptions = z.infer<typeof CurrencyConvertOptionsSchema>;

/** A dated snapshot of exchange rates quoted against one base currency. */
export type CurrencyRateSnapshot = z.infer<typeof CurrencyRateSnapshotSchema>;

/** Result of a currency conversion: the math plus the rate and date it came from. */
export type CurrencyConversion = z.infer<typeof CurrencyConversionSchema>;

/** Result of {@link useSalePrice}: the regular price, the discounted price and the rounded percentage taken off. */
export interface SalePrice {
	/** Regular price, echoed back for display. */
	price: number;
	/** Price after the discount, unrounded — let the currency formatter own the digits. */
	salePrice: number;
	/** Percentage taken off, rounded to two decimals (e.g. `40`, `12.5`). */
	percentOff: number;
}

/* -------------------------------------------------------------------------- */
/* Dates                                                                      */
/* -------------------------------------------------------------------------- */

export type TemporalInput =
	| string
	| number
	| Date
	| Temporal.PlainDate
	| Temporal.PlainDateTime
	| Temporal.ZonedDateTime
	| Temporal.Instant;

/** Granularity accepted by the calendar arithmetic helpers. */
export type DateUnit = z.infer<typeof DateUnitSchema>;

/** Relative ordering of two dates. */
export type DateOrder = z.infer<typeof DateOrderSchema>;

export type AppDateFormatOptions = z.infer<typeof AppDateFormatOptionsSchema>;

/** Backwards-compatible alias for {@link AppDateFormatOptions}. */
export type DateFormatOptions = AppDateFormatOptions;

/**
 * Contract of the dates facade.
 *
 * `useDateBetween`, `useDateAdd`, `useDateSubtract` and `useDateOrder` are the
 * arithmetic primitives; `useDurationBetween` is the structured breakdown.
 */
export interface DatesServiceTypes {
	useDateBetween(start: TemporalInput, end: TemporalInput, unit?: DateUnit): number;
	useDurationBetween(start: TemporalInput, end: TemporalInput): Temporal.Duration;
	useDateAdd(date: TemporalInput, amount: number, unit: DateUnit): string;
	useDateSubtract(date: TemporalInput, amount: number, unit: DateUnit): string;
	useDateOrder(date1: TemporalInput, date2: TemporalInput): DateOrder;
	useFormat(dateInput: TemporalInput, locale?: Locale, options?: Intl.DateTimeFormatOptions): string;
	useNow(): string;
	useNowDateTime(): string;
	useAddDays(date: string | Temporal.PlainDate, days: number): string;
	useSubtractDays(date: string | Temporal.PlainDate, days: number): string;
	useIsEqual(date1: string | Temporal.PlainDate, date2: string | Temporal.PlainDate): boolean;
	useIsBefore(date1: string | Temporal.PlainDate, date2: string | Temporal.PlainDate): boolean;
	useIsAfter(date1: string | Temporal.PlainDate, date2: string | Temporal.PlainDate): boolean;
	useFirstDayOfMonth(date?: string | Temporal.PlainDate): string;
	useLastDayOfMonth(date?: string | Temporal.PlainDate): string;
}

/* -------------------------------------------------------------------------- */
/* HTTP / Fetch                                                               */
/* -------------------------------------------------------------------------- */

export type HttpMethod = z.infer<typeof HttpMethodSchema>;

export type QueryParams = Record<string, string | number | boolean | undefined | null>;

export type PathParams = Record<string, string | number>;

export interface UrlOptions {
	params?: PathParams;
	query?: QueryParams;
	ignoreDefaultQuery?: boolean;
}

export interface ApiEntry {
	baseUri: string | URL;
	endpoints: Record<string, string>;
	defaultQueryParams?: Record<string, QueryParams>;
}

export type ApisConfig = Record<string, ApiEntry>;

/**
 * Options passed when executing a fetch request.
 *
 * URL building lives **at the top level** — the same shape as `useGet`,
 * `useRequest` and Nuxt's `useFetch` — so nothing has to be nested:
 *
 * ```ts
 * useFetch("api", "byId", { method: "GET", params: { id: 25 }, query: { limit: 2 } });
 * ```
 *
 * @typeParam T - The type {@link FetchOptions.transform} resolves to. Defaults
 *   to `any` on purpose: with `unknown` a bare `FetchOptions` (or one stored in
 *   a variable / passed through a wrapper) would no longer be assignable to
 *   `FetchOptions<T>`, which is a type-level break for existing callers.
 */
export interface FetchOptions<T = any> extends RequestInit {
	/** Path params substituted into `:name` placeholders of the endpoint. */
	params?: PathParams;
	/** Query-string params appended to the URL. */
	query?: QueryParams;
	/** Skip the endpoint's `defaultQueryParams` instead of merging them. */
	ignoreDefaultQuery?: boolean;
	/** Maps the parsed response body to `T` before it is returned. */
	transform?: (input: unknown) => T | Promise<T>;
}

/** Structure of the safe error returned on non-2xx or network failures. */
export type ApiError = z.infer<typeof ApiErrorSchema>;

/**
 * Generic Safe Result discriminated union (Astro Actions style): the `ok` flag
 * narrows between the success and error branches and nothing is thrown.
 *
 * Domain results below are aliases of this shape with a specific error type.
 */
export type SafeResult<T, E = ApiError> =
	{ data: T; error: null; ok: true } | { data: null; error: E; ok: false };

/**
 * Safe result, discriminated union (Astro Actions style) without throwing.
 * The `ok` flag narrows the union between the success and error branches.
 */
export type FetchResult<T = unknown> =
	| {
			data: T;
			error: null;
			url: string;
			status: number;
			ok: true;
	  }
	| {
			data: null;
			error: ApiError;
			url: string;
			status: number;
			ok: false;
	  };

/** Mutable request inputs passed through registered HTTP request interceptors. */
export interface FetchRequest {
	url: string;
	init: RequestInit;
}

/** Inspects or modifies a request before fetch; interceptors run in registration order. */
export type RequestInterceptor = (request: FetchRequest) => void | Promise<void>;

/** Contract of the fetch facade. */
export interface IFetchApiManager {
	useGetApis(): ApisConfig;
	useGetApisConfig(): ApisConfig;
	useBuildUrl(apiName: string, endpointName: string, options?: UrlOptions): string;
	useAddRequestInterceptor(interceptor: RequestInterceptor): () => void;
	useFetch<T = unknown>(
		apiName: string,
		endpointName: string,
		options?: FetchOptions<T>,
	): Promise<FetchResult<T>>;
	useFetchApi<T = unknown>(
		apiName: string,
		endpointName: string,
		options?: FetchOptions<T>,
	): Promise<FetchResult<T>>;
	useGet<T = unknown>(
		apiName: string,
		endpointName: string,
		urlOptions?: UrlOptions,
	): Promise<FetchResult<T>>;
	useGetApi<T = unknown>(
		apiName: string,
		endpointName: string,
		urlOptions?: UrlOptions,
	): Promise<FetchResult<T>>;
	usePost<T = unknown>(
		apiName: string,
		endpointName: string,
		body?: unknown,
		urlOptions?: UrlOptions,
	): Promise<FetchResult<T>>;
	usePut<T = unknown>(
		apiName: string,
		endpointName: string,
		body?: unknown,
		urlOptions?: UrlOptions,
	): Promise<FetchResult<T>>;
	usePatch<T = unknown>(
		apiName: string,
		endpointName: string,
		body?: unknown,
		urlOptions?: UrlOptions,
	): Promise<FetchResult<T>>;
	useDelete<T = unknown>(
		apiName: string,
		endpointName: string,
		urlOptions?: UrlOptions,
	): Promise<FetchResult<T>>;
}

/* -------------------------------------------------------------------------- */
/* Errors                                                                     */
/* -------------------------------------------------------------------------- */

/** Serialized error shape. */
export type ISerializedError = z.infer<typeof SerializedErrorSchema>;

/* -------------------------------------------------------------------------- */
/* Formatter / Converter                                                      */
/* -------------------------------------------------------------------------- */

/** Contract of the formatter facade. */
export interface IFormatterService {
	useCapitalize(text: string, locale?: Locale): string;
	useFormatCurrency(options: CurrencyFormatOptions): string;
	useFormatNumber(value: number, locale?: Locale, digits?: number): string;
	useSalePrice(options: SalePriceOptions): SalePrice;
	useJsonParse<T = unknown>(json: string): T;
	useJsonStringify(data: unknown): string;
	useLowerCase(text: string, locale?: Locale): string;
	useUpperCase(text: string, locale?: Locale): string;
}

/** Contract of the unit converter facade. */
export interface IConverterService {
	useToCelsius(fahrenheit: number, locale?: Locale, digits?: number): string;
	useToFahrenheit(celsius: number, locale?: Locale, digits?: number): string;
	useToKilometers(miles: number, locale?: Locale, digits?: number): string;
	useToMiles(km: number, locale?: Locale, digits?: number): string;
	useToInches(cm: number, locale?: Locale, digits?: number): string;
	useToCm(inches: number, locale?: Locale, digits?: number): string;
	useToKilos(pounds: number, locale?: Locale, digits?: number): string;
	useToPounds(kilos: number, locale?: Locale, digits?: number): string;
}

/* -------------------------------------------------------------------------- */
/* Currency conversion (external rates)                                        */
/* -------------------------------------------------------------------------- */

/**
 * Port for fetching exchange rates from an external source.
 *
 * Lives at the hexagonal boundary: implementations perform the runtime I/O
 * (`src/infrastructure/`), while the core only depends on this contract.
 * Implementations **never throw** — every failure comes back as a
 * {@link SafeResult}, so the facade keeps its no-throw promise whatever
 * provider is plugged in.
 */
export interface ICurrencyRateProvider {
	/**
	 * Returns a dated rate snapshot quoted against `base`.
	 *
	 * @param base - Currency the rates are quoted against.
	 * @param quotes - Optional subset of quote currencies. Omit for every rate the source knows.
	 * @returns `{ data, error, ok }` with the snapshot or the source failure.
	 */
	useFetchRates(base: Currency, quotes?: Currency[]): Promise<SafeResult<CurrencyRateSnapshot>>;
}

/**
 * Observer callbacks fired by {@link ICurrencyConverterService}.
 *
 * Event handlers are the one surface allowed outside the `use*` convention:
 * `on*` marks a **callback invoked by the service**, never a method you call
 * imperatively. Every handler is optional.
 */
export interface CurrencyRateEvents {
	/** Fired after a rate snapshot has been stored in cache. */
	onRatesUpdate?(snapshot: CurrencyRateSnapshot): void;
	/** Fired when a rate fetch fails. */
	onRatesError?(error: ApiError): void;
}

/** Wiring options for {@link CurrencyConverterService} (dependency injection). */
export interface CurrencyConverterServiceOptions {
	/** Rate source. Defaults to the service's own provider. */
	provider?: ICurrencyRateProvider;
	/** Cache time-to-live in milliseconds. Defaults to 10 minutes. */
	ttlMs?: number;
	/**
	 * Currency every rate is quoted against before a pair is resolved by
	 * division. Defaults to `"USD"`.
	 *
	 * Sources round their quotes (Frankfurter keeps 5 decimal places), so a
	 * small quote such as `KRW → USD` is starved of significant digits. Quoting
	 * everything against one pivot and dividing keeps the precision on the side
	 * of the pair that is well conditioned.
	 */
	pivot?: Currency;
}

/** Contract of the currency conversion facade. */
export interface ICurrencyConverterService {
	useConvert(options: CurrencyConvertOptions): Promise<SafeResult<CurrencyConversion>>;
	useGetRate(from: Currency, to: Currency): Promise<SafeResult<number>>;
	useRefreshRates(): Promise<SafeResult<CurrencyRateSnapshot>>;
	useGetSnapshot(): CurrencyRateSnapshot | null;
	useSubscribe(events: CurrencyRateEvents): () => void;
}

/* -------------------------------------------------------------------------- */
/* Generator                                                                  */
/* -------------------------------------------------------------------------- */

/** Contract for a crypto strategy. */
export interface ICryptoStrategy {
	useHash(plainText: string, salt?: string): Promise<string>;
}

/** Contract for a UUID strategy. */
export interface IUuidStrategy {
	useGenerate(): string;
}

/* -------------------------------------------------------------------------- */
/* Faker (optional peer: @faker-js/faker)                                     */
/* -------------------------------------------------------------------------- */

/** Generic fake vehicle returned by `useFakeVehicle`. */
export type FakeVehicle = z.infer<typeof FakeVehicleSchema>;

/* -------------------------------------------------------------------------- */
/* Geometry                                                                   */
/* -------------------------------------------------------------------------- */

/** Options for number formatting in geometry calculations. */
export type GeometryFormatOptions = z.infer<typeof GeometryFormatOptionsSchema>;

/* -------------------------------------------------------------------------- */
/* Reactive                                                                   */
/* -------------------------------------------------------------------------- */

export type SignalListener<T> = (newValue: T, oldValue: T) => void;

export interface Subscribable<T> {
	useSubscribe: (listener: SignalListener<T>) => () => void;
}

export interface SignalGetter<T> extends Subscribable<T> {
	(): T;
}

export type SignalSetter<T> = (newValue: T | ((prev: T) => T)) => void;

export interface ToggleSignalSetter {
	useSet: (value: boolean) => void;
	useToggle: () => void;
}

/** Contract of the reactive facade. */
export interface IReactiveService {
	useCreateSignal<T>(initialValue: T): [SignalGetter<T>, SignalSetter<T>];
	useCreateEffect(
		callback: () => void | (() => void),
		signals?: Subscribable<unknown>[],
	): () => void;
	useCreateMemo<T>(computation: () => T, signals?: Subscribable<unknown>[]): SignalGetter<T>;
	useCreateToggle(initialValue?: boolean): [SignalGetter<boolean>, ToggleSignalSetter];
	useCreateDebouncedSignal<T>(
		initialValue: T,
		delayMs?: number,
	): [SignalGetter<T>, SignalSetter<T> & { useCancel: () => void }];
	useCreateBatch(): (callback: () => void) => void;
}

/* -------------------------------------------------------------------------- */
/* Timing                                                                     */
/* -------------------------------------------------------------------------- */

/** Control object returned by timeout operations. */
export interface TimeoutControl<T> {
	promise: Promise<T>;
	cancel: () => void;
}

/** Control object returned by interval operations. */
export interface IntervalControl {
	pause: () => void;
	resume: () => void;
	stop: () => void;
	isRunning: () => boolean;
}

/* -------------------------------------------------------------------------- */
/* Utils                                                                      */
/* -------------------------------------------------------------------------- */

/** Contract of the data utilities. */
export interface IDataUtils {
	useUnique<T>(array: T[]): T[];
	useChunk<T>(array: T[], size: number): T[][];
	useGroupBy<T>(array: T[], key: keyof T | ((item: T) => string)): Record<string, T[]>;
	useIsObject(item: unknown): item is Record<string, unknown>;
	useDeepClone<T>(value: T): T;
	useDeepMerge<T extends Record<string, unknown>>(target: T, source: Record<string, unknown>): T;
	usePick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
	useOmit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;
}

/** Contract of the system utilities. */
export interface ISystemUtils {
	useSleep(ms: number): Promise<void>;
	useRetry<T>(fn: () => Promise<T>, retries?: number, delayMs?: number): Promise<T>;
	useCopyToClipboard(text: string): Promise<boolean>;
	useGetUrlParams(urlString: string): Record<string, string>;
	useRound(value: string | number, decimals?: number): number;
	useAverage(numbers: number[]): number;
}

/** Contract of the app utilities facade. */
export interface IAppUtils {
	readonly data: IDataUtils;
	readonly system: ISystemUtils;
}

/* -------------------------------------------------------------------------- */
/* Viewport                                                                   */
/* -------------------------------------------------------------------------- */

/** Represents viewport dimensions. */
export type ViewportSize = z.infer<typeof ViewportSizeSchema>;

/** Represents scroll position. */
export type ScrollPosition = z.infer<typeof ScrollPositionSchema>;

/** Options for scrolling operations. */
export interface ScrollOptions {
	behavior?: ScrollBehavior;
	block?: ScrollLogicalPosition;
	inline?: ScrollLogicalPosition;
}

/* -------------------------------------------------------------------------- */
/* Theme                                                                      */
/* -------------------------------------------------------------------------- */

export type ThemeMode = z.infer<typeof ThemeModeSchema>;

export interface ThemeOptions {
	defaultMode?: ThemeMode;
	storageKey?: string;
	attribute?: string;
	target?: HTMLElement;
	onChange?: (mode: ThemeMode, resolved: "light" | "dark") => void;
}

/** Contract of the theme facade. */
export interface IThemeService {
	useInitTheme(options?: ThemeOptions): void;
	useSetThemeMode(mode: ThemeMode): void;
	useGetThemeMode(): ThemeMode;
	useGetResolved(): "light" | "dark";
	usePrefersColorScheme(): boolean;
	useToggleTheme(): void;
	useResetTheme(): void;
	useDestroyTheme(): void;
}

/* -------------------------------------------------------------------------- */
/* Astro                                                                      */
/* -------------------------------------------------------------------------- */

/** Minimal shape of an Astro content collection entry. */
export interface CollectionEntryLike<TData = unknown> {
	id: string;
	slug?: string;
	data?: TData;
	[key: string]: unknown;
}

export interface PathsOptions<T, TParam extends string = string, TProps = T> {
	param?: TParam;
	valueFrom?: (item: T) => string | number;
	propsFrom?: (item: T) => TProps;
	paramsFrom?: (item: T) => Record<string, string>;
}

export interface AstroPath<TParam extends string = string, TProps = unknown> {
	params: Record<TParam, string | undefined>;
	props: TProps;
}

export interface PaginationProps<T> {
	items: T[];
	currentPage: number;
	totalPages: number;
}

export type AstroServiceError = z.infer<typeof AstroServiceErrorSchema>;

/** Safe Result (discriminated union without throwing). */
export type AstroServiceResult<T> = SafeResult<T, AstroServiceError>;

/** Contract of the Astro facade. */
export interface IAstroService {
	usePathsFrom<T, TParam extends string = "slug", TProps = T>(
		items: T[],
		options?: PathsOptions<T, TParam, TProps>,
	): AstroPath<TParam, TProps>[];
	useGetStaticPaths<
		TData = unknown,
		TParam extends string = "slug",
		TProps = CollectionEntryLike<TData>,
	>(
		getCollectionFn: (collection: string) => Promise<CollectionEntryLike<TData>[]>,
		collectionName: string,
		options?: PathsOptions<CollectionEntryLike<TData>, TParam, TProps>,
	): Promise<AstroServiceResult<AstroPath<TParam, TProps>[]>>;
	useFindEntry<T>(items: T[], value: string, keyFrom?: (item: T) => string | number): T | null;
	useGeneratePagination<T, TParam extends string = "page">(
		items: T[],
		pageSize?: number,
		param?: TParam,
	): AstroPath<TParam, PaginationProps<T>>[];
	usePathsFromValues<TParam extends string = "slug">(
		values: (string | number)[],
		param?: TParam,
	): AstroPath<TParam, string | number>[];
	useExtractUniqueValues<T, V>(items: T[], keyFrom: (item: T) => V | V[]): V[];
}

/* -------------------------------------------------------------------------- */
/* RSS                                                                        */
/* -------------------------------------------------------------------------- */

/** A single item in an RSS feed. */
export type RssItem = z.infer<typeof RssItemSchema>;

/** Configuration for generating an RSS feed. */
export type RssConfig = z.infer<typeof RssConfigSchema>;

/** Result of an RSS generation attempt. */
export type RssResult = SafeResult<string, { message: string; details?: unknown }>;

/** Contract of the RSS facade. */
export interface IRssService {
	/** Generates the RSS XML string from a config. */
	useGenerateRss(config: RssConfig): RssResult;
	/** Generates an HTML `<link>` tag for the RSS feed. */
	useRssLinkTag(config: Pick<RssConfig, "title" | "xmlPath">): string;
	/** Generates an Astro GET endpoint handler for the RSS feed. */
	useCreateRssEndpoint(
		config: Omit<RssConfig, "items"> & { items: RssItem[] | (() => RssItem[] | Promise<RssItem[]>) },
	): (context: { site?: URL | string }) => Promise<Response>;
	/** Convenience: creates an RSS endpoint from a SiteConfig. */
	useCreateRssEndpointFromConfig(
		siteConfig: import("../config/site.config.js").SiteConfig,
		items: RssItem[] | (() => RssItem[] | Promise<RssItem[]>),
	): (context: { site?: URL | string }) => Promise<Response>;
}

/* -------------------------------------------------------------------------- */
/* AI / Agent                                                                  */
/* -------------------------------------------------------------------------- */

/** Role of a chat message in the OpenAI-compatible protocol. */
export type AiRole = z.infer<typeof AiRoleSchema>;

/** Function invocation requested by the model when using tools. */
export type AiFunctionCall = z.infer<typeof AiFunctionCallSchema>;

/** A single tool call emitted by the model (OpenAI-compatible wire shape). */
export type AiToolCall = z.infer<typeof AiToolCallSchema>;

/**
 * A chat message. `tool_calls` and `tool_call_id` use snake_case on purpose:
 * they mirror the OpenAI-compatible protocol so messages pass through unchanged.
 */
export type AiMessage = z.infer<typeof AiMessageSchema>;

/** Provider configuration for an OpenAI-compatible chat/agent endpoint. */
export type AiProviderConfig = z.infer<typeof AiProviderConfigSchema>;

/** Options for a single chat completion. */
export interface AiChatOptions {
	temperature?: number;
	maxTokens?: number;
	topP?: number;
	signal?: AbortSignal;
	/** Overrides the provider `systemPrompt` for this request. */
	systemPrompt?: string;
}

/** Safe error returned on non-2xx or network failures. */
export type AiError = z.infer<typeof AiErrorSchema>;

/** Safe result (discriminated union) without throwing. */
export type AiResult<T = string> = SafeResult<T, AiError>;

/**
 * A tool the agent can invoke. `parameters` is a JSON Schema object
 * describing the expected input.
 */
export interface AiTool {
	name: string;
	description: string;
	parameters: Record<string, unknown>;
	execute(input: unknown): unknown | Promise<unknown>;
}

/** One round of tool execution inside the agent loop. */
export type AgentStep = z.infer<typeof AgentStepSchema>;

/** Payload returned by a successful {@link useRunAgent} call. */
export type AgentData = z.infer<typeof AgentDataSchema>;

/** Safe result of an agent run. */
export type AgentResult = AiResult<AgentData>;

/** Options for running the tool-calling agent loop. */
export interface AgentRunOptions extends AiChatOptions {
	tools?: AiTool[];
	maxSteps?: number;
	/** Prior conversation (system messages are ignored; a system prompt is prepended). */
	history?: AiMessage[];
}

/** Contract of the AI/agent facade. */
export interface IAiService {
	useInitAgent(config: Partial<AiProviderConfig>): void;
	useChat(messages: AiMessage[], options?: AiChatOptions): Promise<AiResult<string>>;
	useRunAgent(goal: string, options?: AgentRunOptions): Promise<AgentResult>;
}

/** Persistence contract for assistant conversations. */
export interface ConversationStore {
	useCreate(channel?: string): Promise<string>;
	useExists(sessionId: string): Promise<boolean>;
	useAppend(sessionId: string, message: AiMessage): Promise<void>;
	useGetHistory(sessionId: string): Promise<AiMessage[]>;
	useReset(sessionId: string): Promise<void>;
}

/** Configuration for the assistant facade. */
export interface AssistantInitConfig extends Partial<AiProviderConfig> {
	store?: ConversationStore;
	tools?: AiTool[];
	maxSteps?: number;
}

/** Options for a single assistant reply. */
export interface AssistantReplyOptions extends AiChatOptions {
	tools?: AiTool[];
	maxSteps?: number;
}

/** Payload returned by a successful assistant reply. */
export type AssistantReply = z.infer<typeof AssistantReplySchema>;

/** Safe result of an assistant reply. */
export type AssistantResult = AiResult<AssistantReply>;

/** Contract of the assistant facade. */
export interface IAssistantService {
	useInitAssistant(config?: AssistantInitConfig): void;
	useReply(
		sessionId: string | undefined,
		text: string,
		options?: AssistantReplyOptions,
	): Promise<AssistantResult>;
	useCreateSession(channel?: string): Promise<string>;
	useSessionExists(sessionId: string): Promise<boolean>;
	useGetHistory(sessionId: string): Promise<AiMessage[]>;
	useResetSession(sessionId: string): Promise<void>;
}

/* -------------------------------------------------------------------------- */
/* Access control (roles & capabilities)                                       */
/* -------------------------------------------------------------------------- */

/**
 * Role slugs the kit ships with. A convenience alias for autocomplete — the
 * schema itself accepts any slug, and deployments register their own.
 */
export type BuiltInRole = (typeof BUILT_IN_ROLE_SLUGS)[number];

/**
 * Capabilities the kit ships with. A convenience alias for autocomplete — the
 * schema itself accepts any `<domain>:<action>[:<scope>]` string.
 */
export type BuiltInCapability = (typeof BUILT_IN_CAPABILITIES)[number];

/**
 * A role slug. Closed vocabulary by convention (`BuiltInRole`), open by
 * schema: `useRegisterRole` takes any slug matching the pattern.
 *
 * - `owner` — the site owner; the only role that can manage roles and perform
 *   system-level operations. There should be exactly one owner.
 * - `admin` — day-to-day administration: manage members and moderate anything.
 * - `editor` — act on anyone's resource.
 * - `author` — create and act on their own, including publishing.
 * - `contributor` — act on their own but not publish.
 * - `member` — registered account; can use the assistant and read content.
 * - `guest` — anonymous default; read-only, never persisted.
 */
export type AccessRole = z.infer<typeof AccessRoleSchema>;

/**
 * A namespaced capability, `<domain>:<action>[:<scope>]`.
 *
 * Independent of how the subject authenticated: a role never reveals whether
 * the session came from a password, an OAuth provider or a passkey.
 */
export type AccessCapability = z.infer<typeof AccessCapabilitySchema>;

/** A role definition: slug, label, hierarchy rank and the capabilities it grants. */
export type AccessRoleDefinition = z.infer<typeof AccessRoleDefinitionSchema>;

/**
 * Structural subject for access checks. Decoupled from the persistence layer:
 * any object with an id and a role list can be checked (e.g. a Prisma
 * `Account` row, a JWT payload, or a test fixture). Extra keys are preserved,
 * so a subject can also carry the principal it was resolved from.
 */
export type AccessSubject = z.infer<typeof AccessSubjectSchema>;

/** Contract of the access-control facade. Pure, no I/O. */
export interface IAccessService {
	useCan(subject: AccessSubject, capability: AccessCapability): boolean;
	useHasRole(subject: AccessSubject, role: AccessRole): boolean;
	useCapabilitiesFor(role: AccessRole): AccessCapability[];
	useRegisterRole(definition: AccessRoleDefinition): void;
	useRoles(): AccessRoleDefinition[];
}

/* -------------------------------------------------------------------------- */
/* Watch (generic reactive watcher — native Vue props)                         */
/* -------------------------------------------------------------------------- */

/**
 * Watch source taken from the native Vue `watch` (`ref`, reactive object,
 * getter function or array of those).
 */
export type WatchSource<T = unknown> = VueWatchSource<T>;

/**
 * Watch callback taken from the native Vue `watch`. Any internal function
 * is accepted: sync or async, with `(newValue, oldValue)` args or with no
 * args at all (e.g. `() => checkValidations()`).
 */
export type WatchCallback<V = unknown, OV = unknown> = VueWatchCallback<V, OV>;

/**
 * Watch options taken from the native Vue `watch`. `deep` defaults to
 * `true` in `useKatanaWatch`.
 */
export type WatchOptions = VueWatchOptions;

/** Stop function taken from the native Vue `watch`. */
export type WatchStopHandle = VueWatchStopHandle;

/* -------------------------------------------------------------------------- */
/* Validation (schema-agnostic)                                                */
/* -------------------------------------------------------------------------- */

/** A single field-level validation message keyed by field name. */
export type FieldErrors = z.infer<typeof FieldErrorsSchema>;

/** Minimal issue shape (`error.issues` entries). */
export type ValidationIssue = z.infer<typeof ValidationIssueSchema>;

/** Minimal Zod-like success/failure result (`schema.safeParse`). */
export type ValidationParseResult<T> =
	{ success: true; data: T } | { success: false; error: { issues: ValidationIssue[] } };

/**
 * Schema-agnostic contract. Accepts Zod (`safeParse`), Valibot
 * (`safeParse`), Standard Schema (`~standard.validate`), Yup
 * (`validateSync`) or any object exposing one of those members.
 */
export interface ValidationSchema<T = unknown> {
	safeParse?: (data: unknown) => ValidationParseResult<T>;
	"~standard"?: {
		validate: (
			data: unknown,
		) => { issues?: ValidationIssue[] } | Promise<{ issues?: ValidationIssue[] }>;
	};
	validateSync?: (data: unknown) => unknown;
	validate?: (data: unknown) => unknown | Promise<unknown>;
}

/* -------------------------------------------------------------------------- */
/* Express                                                                     */
/* -------------------------------------------------------------------------- */

export type ProductType = z.infer<typeof ProductTypeSchema>;

/* -------------------------------------------------------------------------- */
/* Notion API                                                                 */
/* -------------------------------------------------------------------------- */

/** Configuration for the Notion API integration. */
export type NotionConfig = z.infer<typeof NotionConfigSchema>;

/** Rich text object used in Notion blocks and properties. */
export type NotionRichText = z.infer<typeof NotionRichTextSchema>;

/** A Notion page object. */
export type NotionPage = z.infer<typeof NotionPageSchema>;

/** Parent reference for pages and databases. */
export type NotionParent = z.infer<typeof NotionParentSchema>;

/** Property value on a Notion page. */
export type NotionProperty = z.infer<typeof NotionPropertyValueSchema>;

/** Icon on a page or database (emoji or file). */
export type NotionIcon = z.infer<typeof NotionIconSchema>;

/** Cover image on a page. */
export type NotionCover = z.infer<typeof NotionCoverSchema>;

/** A Notion block object. */
export type NotionBlock = z.infer<typeof NotionBlockSchema>;

/** Result of listing block children (paginated). */
export type NotionBlockList = z.infer<typeof NotionBlockListSchema>;

/** A Notion database object. */
export type NotionDatabase = z.infer<typeof NotionDatabaseSchema>;

/** Schema definition for a database property. */
export type NotionPropertySchema = z.infer<typeof NotionPropertySchemaSchema>;

/** Filter for querying a Notion database. */
export interface NotionFilter {
	and?: NotionFilter[];
	or?: NotionFilter[];
	property?: string;
	[key: string]: unknown;
}

/** Sort option for querying a Notion database. */
export type NotionSort = z.infer<typeof NotionSortSchema>;

/** Query options for a Notion database. */
export type NotionDatabaseQuery = z.infer<typeof NotionDatabaseQuerySchema>;

/** Result of querying a Notion database (paginated). */
export type NotionPageList = z.infer<typeof NotionPageListSchema>;

/** A Notion user object. */
export type NotionUser = z.infer<typeof NotionUserSchema>;

/** Paginated list of Notion users. */
export type NotionUserList = z.infer<typeof NotionUserListSchema>;

/** Search query options for the Notion API. */
export type NotionSearchQuery = z.infer<typeof NotionSearchQuerySchema>;

/** Result of a Notion search (paginated). */
export type NotionSearchResult = z.infer<typeof NotionSearchResultSchema>;

/** Contract of the Notion adapter facade. */
export interface INotionService {
	useNotionGetPage(pageId: string): Promise<FetchResult<NotionPage>>;
	useNotionCreatePage(
		parent: NotionParent,
		properties: Record<string, unknown>,
		children?: unknown[],
	): Promise<FetchResult<NotionPage>>;
	useNotionUpdatePage(
		pageId: string,
		properties: Record<string, unknown>,
	): Promise<FetchResult<NotionPage>>;
	useNotionArchivePage(pageId: string): Promise<FetchResult<NotionPage>>;
	useNotionGetBlock(blockId: string): Promise<FetchResult<NotionBlock>>;
	useNotionGetBlockChildren(
		blockId: string,
		options?: { start_cursor?: string; page_size?: number },
	): Promise<FetchResult<NotionBlockList>>;
	useNotionAppendBlocks(blockId: string, children: unknown[]): Promise<FetchResult<NotionBlock>>;
	useNotionUpdateBlock(
		blockId: string,
		content: Record<string, unknown>,
	): Promise<FetchResult<NotionBlock>>;
	useNotionDeleteBlock(blockId: string): Promise<FetchResult<NotionBlock>>;
	useNotionGetDatabase(databaseId: string): Promise<FetchResult<NotionDatabase>>;
	useNotionQueryDatabase(
		databaseId: string,
		query?: NotionDatabaseQuery,
	): Promise<FetchResult<NotionPageList>>;
	useNotionCreateDatabase(
		parent: NotionParent,
		title: NotionRichText[],
		properties: Record<string, NotionPropertySchema>,
	): Promise<FetchResult<NotionDatabase>>;
	useNotionUpdateDatabase(
		databaseId: string,
		title: NotionRichText[],
		properties?: Record<string, NotionPropertySchema>,
	): Promise<FetchResult<NotionDatabase>>;
	useNotionGetUser(userId: string): Promise<FetchResult<NotionUser>>;
	useNotionListUsers(options?: {
		start_cursor?: string;
		page_size?: number;
	}): Promise<FetchResult<NotionUserList>>;
	useNotionSearchContent(query: NotionSearchQuery): Promise<FetchResult<NotionSearchResult>>;
	useNotionListAllBlockChildren(blockId: string): Promise<FetchResult<NotionBlock[]>>;
	useNotionListAllDatabasePages(
		databaseId: string,
		filter?: NotionFilter,
		sorts?: NotionSort[],
	): Promise<FetchResult<NotionPage[]>>;
}

/* -------------------------------------------------------------------------- */
/* WordPress REST API                                                         */
/* -------------------------------------------------------------------------- */

/** Configuration for the WordPress REST API integration. */
export type WordPressConfig = z.infer<typeof WordPressConfigSchema>;

/** Authentication methods for WordPress. */
export type WordPressAuth = z.infer<typeof WordPressAuthSchema>;

/** Base fields shared by all WordPress entities. */
export type WpBaseEntity = z.infer<typeof WpBaseEntitySchema>;

/** A WordPress post. */
export type WpPost = z.infer<typeof WpPostSchema>;

/** Payload for creating a WordPress post. */
export type WpPostCreate = z.infer<typeof WpPostCreateSchema>;

/** Payload for updating a WordPress post. */
export type WpPostUpdate = z.infer<typeof WpPostUpdateSchema>;

/** A WordPress page. */
export type WpPage = z.infer<typeof WpPageSchema>;

/** Payload for creating a WordPress page. */
export type WpPageCreate = z.infer<typeof WpPageCreateSchema>;

/** Payload for updating a WordPress page. */
export type WpPageUpdate = z.infer<typeof WpPageUpdateSchema>;

/** A WordPress media item (attachment). */
export type WpMedia = z.infer<typeof WpMediaSchema>;

/** Metadata for a media upload. */
export type WpMediaMeta = z.infer<typeof WpMediaMetaSchema>;

/** Payload for updating a WordPress media item. */
export type WpMediaUpdate = z.infer<typeof WpMediaUpdateSchema>;

/** A WordPress category. */
export type WpCategory = z.infer<typeof WpCategorySchema>;

/** Payload for creating a WordPress category. */
export type WpCategoryCreate = z.infer<typeof WpCategoryCreateSchema>;

/** Payload for updating a WordPress category. */
export type WpCategoryUpdate = z.infer<typeof WpCategoryUpdateSchema>;

/** A WordPress tag. */
export type WpTag = z.infer<typeof WpTagSchema>;

/** Payload for creating a WordPress tag. */
export type WpTagCreate = z.infer<typeof WpTagCreateSchema>;

/** Payload for updating a WordPress tag. */
export type WpTagUpdate = z.infer<typeof WpTagUpdateSchema>;

/** A WordPress comment. */
export type WpComment = z.infer<typeof WpCommentSchema>;

/** Payload for creating a WordPress comment. */
export type WpCommentCreate = z.infer<typeof WpCommentCreateSchema>;

/** Payload for updating a WordPress comment. */
export type WpCommentUpdate = z.infer<typeof WpCommentUpdateSchema>;

/** A WordPress user. */
export type WpUser = z.infer<typeof WpUserSchema>;

/** Capability map as WordPress reports it (`{ manage_options: true }`). */
export type WpCapabilityMap = z.infer<typeof WpCapabilityMapSchema>;

/** A WordPress capability name (`edit_orders`). */
export type WpCapability = z.infer<typeof WpCapabilitySchema>;

/**
 * A role declaration: the PHP-free replacement for `add_role()`.
 *
 * Holds both capability vocabularies — the toolkit's namespaced capabilities
 * (used by `useCan()` and the framework guards) and WordPress' own snake_case
 * names (declared for the site, verified with `useWpAuditRole`).
 */
export type WpRoleDefinition = z.infer<typeof WpRoleDefinitionSchema>;

/** A declared role registry. */
export type WpRoleRegistry = z.infer<typeof WpRoleRegistrySchema>;

/** Verification outcome of a declared role: `verified`, `partial`, `unverifiable`. */
export type WpRoleAuditStatus = z.infer<typeof WpRoleAuditStatusSchema>;

/** A declared role compared against what the live site reports. */
export type WpRoleAudit = z.infer<typeof WpRoleAuditSchema>;

/** Payload for creating a WordPress user. */
export type WpUserCreate = z.infer<typeof WpUserCreateSchema>;

/** Payload for updating a WordPress user. */
export type WpUserUpdate = z.infer<typeof WpUserUpdateSchema>;

/**
 * Common query parameters for WordPress REST API list endpoints.
 *
 * Includes field limiting (`_fields: "id,title,link"`) and resource
 * embedding (`_embed: true | "author,wp:featuredmedia"`).
 */
export type WpQueryParams = z.infer<typeof WpQueryParamsSchema>;

/**
 * Container for ACF (Advanced Custom Fields) fields on a WordPress entity.
 *
 * ACF fields appear on posts, pages, media, taxonomies, users, and options.
 * Field names and types are defined by the site's ACF configuration.
 *
 * @example
 * ```ts
 * const post = await useWpGetPost(42, { _fields: "id,title,acf" });
 * if (post.ok && post.data.acf) {
 *   console.log(post.data.acf.hero_image);     // image field
 *   console.log(post.data.acf.subtitle);        // text field
 *   console.log(post.data.acf.gallery);         // gallery field (array)
 * }
 * ```
 */
export type WpAcfFields = z.infer<typeof WpAcfFieldsSchema>;

/**
 * Embedded resources returned by WordPress when `_embed` is used.
 *
 * Contains related entities: author, featured media, terms, replies.
 * Access with `post._embedded?.["wp:featuredmedia"]?.[0]`.
 *
 * @example
 * ```ts
 * const result = await useWpGetPosts({ _embed: "author,wp:featuredmedia" });
 * if (result.ok) {
 *   for (const post of result.data) {
 *     const author = post._embedded?.author?.[0]?.name;
 *     const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
 *   }
 * }
 * ```
 */
export type WpEmbedded = z.infer<typeof WpEmbeddedSchema>;

/** A batch operation for the WordPress REST API. */
export type WpBatchOperation = z.infer<typeof WpBatchOperationSchema>;

/** Result of a WordPress batch operation. */
export type WpBatchResult = z.infer<typeof WpBatchResultSchema>;

/** Contract of the WordPress adapter facade. */
export interface IWordPressService {
	useWpGetPosts(options?: WpQueryParams): Promise<FetchResult<WpPost[]>>;
	useWpGetPost(id: number, options?: WpQueryParams): Promise<FetchResult<WpPost>>;
	useWpCreatePost(data: WpPostCreate): Promise<FetchResult<WpPost>>;
	useWpUpdatePost(id: number, data: WpPostUpdate): Promise<FetchResult<WpPost>>;
	useWpDeletePost(id: number, force?: boolean): Promise<FetchResult<WpPost>>;
	useWpGetPages(options?: WpQueryParams): Promise<FetchResult<WpPage[]>>;
	useWpGetPage(id: number, options?: WpQueryParams): Promise<FetchResult<WpPage>>;
	useWpCreatePage(data: WpPageCreate): Promise<FetchResult<WpPage>>;
	useWpUpdatePage(id: number, data: WpPageUpdate): Promise<FetchResult<WpPage>>;
	useWpDeletePage(id: number, force?: boolean): Promise<FetchResult<WpPage>>;
	useWpGetMedia(options?: WpQueryParams): Promise<FetchResult<WpMedia[]>>;
	useWpGetMediaItem(id: number): Promise<FetchResult<WpMedia>>;
	useWpUploadMedia(file: File | Blob | Buffer, meta?: WpMediaMeta): Promise<FetchResult<WpMedia>>;
	useWpUpdateMedia(id: number, data: WpMediaUpdate): Promise<FetchResult<WpMedia>>;
	useWpDeleteMedia(id: number, force?: boolean): Promise<FetchResult<WpMedia>>;
	useWpGetCategories(options?: WpQueryParams): Promise<FetchResult<WpCategory[]>>;
	useWpGetCategory(id: number): Promise<FetchResult<WpCategory>>;
	useWpCreateCategory(data: WpCategoryCreate): Promise<FetchResult<WpCategory>>;
	useWpUpdateCategory(id: number, data: WpCategoryUpdate): Promise<FetchResult<WpCategory>>;
	useWpDeleteCategory(id: number, force?: boolean): Promise<FetchResult<WpCategory>>;
	useWpGetTags(options?: WpQueryParams): Promise<FetchResult<WpTag[]>>;
	useWpGetTag(id: number): Promise<FetchResult<WpTag>>;
	useWpCreateTag(data: WpTagCreate): Promise<FetchResult<WpTag>>;
	useWpUpdateTag(id: number, data: WpTagUpdate): Promise<FetchResult<WpTag>>;
	useWpDeleteTag(id: number, force?: boolean): Promise<FetchResult<WpTag>>;
	useWpGetComments(options?: WpQueryParams): Promise<FetchResult<WpComment[]>>;
	useWpGetComment(id: number): Promise<FetchResult<WpComment>>;
	useWpCreateComment(data: WpCommentCreate): Promise<FetchResult<WpComment>>;
	useWpUpdateComment(id: number, data: WpCommentUpdate): Promise<FetchResult<WpComment>>;
	useWpDeleteComment(id: number, force?: boolean): Promise<FetchResult<WpComment>>;
	useWpGetUsers(options?: WpQueryParams): Promise<FetchResult<WpUser[]>>;
	useWpGetUser(id: number): Promise<FetchResult<WpUser>>;
	useWpGetCurrentUser(): Promise<FetchResult<WpUser>>;
	useWpCreateUser(data: WpUserCreate): Promise<FetchResult<WpUser>>;
	useWpUpdateUser(id: number, data: WpUserUpdate): Promise<FetchResult<WpUser>>;
	useWpDeleteUser(id: number, reassign?: number): Promise<FetchResult<WpUser>>;
	useWpDefineRoles(definitions: WpRoleDefinition[]): void;
	useWpRegisterRole(definition: WpRoleDefinition): void;
	useWpRoles(): WpRoleDefinition[];
	useWpGetRole(slug: AccessRole): WpRoleDefinition | undefined;
	useWpResetRoles(): void;
	useWpSyncRoles(): void;
	useWpAsSubject(user: WpUser): AccessSubject;
	useWpAssignRole(userId: number, role: string): Promise<FetchResult<WpUser>>;
	useWpUnassignRole(userId: number, role: string): Promise<FetchResult<WpUser>>;
	useWpGetUsersByRole(role: string, options?: WpQueryParams): Promise<FetchResult<WpUser[]>>;
	useWpAuditRole(slug: string, maxHolders?: number): Promise<FetchResult<WpRoleAudit>>;
	useWpGetCustomPosts(postType: string, options?: WpQueryParams): Promise<FetchResult<unknown[]>>;
	useWpGetCustomPost(
		postType: string,
		id: number,
		options?: WpQueryParams,
	): Promise<FetchResult<unknown>>;
	useWpCreateCustomPost(
		postType: string,
		data: Record<string, unknown>,
	): Promise<FetchResult<unknown>>;
	useWpUpdateCustomPost(
		postType: string,
		id: number,
		data: Record<string, unknown>,
	): Promise<FetchResult<unknown>>;
	useWpDeleteCustomPost(
		postType: string,
		id: number,
		force?: boolean,
	): Promise<FetchResult<unknown>>;
	useWpBatch(operations: WpBatchOperation[]): Promise<FetchResult<WpBatchResult>>;
	useWpListAllPosts(options?: WpQueryParams): Promise<FetchResult<WpPost[]>>;
	useWpSearchAllPosts(query: string, options?: WpQueryParams): Promise<FetchResult<WpPost[]>>;
	useWpFindPostBySlug(slug: string): Promise<FetchResult<WpPost | null>>;
}

/* -------------------------------------------------------------------------- */
/* InsForge (database fallback / storage / edge functions)                    */
/* -------------------------------------------------------------------------- */

/**
 * Config for the InsForge adapter. InsForge is the database fallback
 * (primary data layer is Cloudflare); storage and edge functions
 * are also available through the same client.
 */
export type IfConfig = z.infer<typeof IfConfigSchema>;

/** Sort clause for table queries. */
export type IfOrder = z.infer<typeof IfOrderSchema>;

/** Options for a table read. Filters map to equality clauses. */
export type IfTableQuery = z.infer<typeof IfTableQuerySchema>;

/** Rows for insert (one or many). */
export type IfInsertRows = z.infer<typeof IfInsertRowsSchema>;

/** Patch for update (must be paired with filters — mass updates are refused). */
export type IfUpdatePatch = z.infer<typeof IfUpdatePatchSchema>;

/** Options for an update or delete. Filters are REQUIRED (no mass writes). */
export type IfWriteQuery = z.infer<typeof IfWriteQuerySchema>;

/** Postgres function (RPC) call. */
export type IfRpcCall = z.infer<typeof IfRpcCallSchema>;

/** Bucket + object key reference for storage operations. */
export type IfStorageRef = z.infer<typeof IfStorageRefSchema>;

/** Options for listing bucket objects. */
export type IfListOptions = z.infer<typeof IfListOptionsSchema>;

/** Edge function invocation. */
export type IfInvokeOptions = z.infer<typeof IfInvokeOptionsSchema>;

/* -------------------------------------------------------------------------- */
/* Media / SmartVideo                                                         */
/* -------------------------------------------------------------------------- */

/** Where a media source comes from. `file` = direct mp4/webm (native `<video>`). */
export type MediaProvider = z.infer<typeof MediaProviderSchema>;

/** Normalized media source: provider + stable id or direct src. */
export type MediaSource = z.infer<typeof MediaSourceSchema>;

/** Options for the YouTube nocookie embed URL. */
export type YoutubeEmbedOptions = z.infer<typeof YoutubeEmbedOptionsSchema>;

/** Thumbnail quality for `i.ytimg.com`. */
export type YoutubeThumbnailQuality = z.infer<typeof YoutubeThumbnailQualitySchema>;

/** Input for {@link useBuildVideoEmbed} (core) — one `src`, unified output. */
export type SmartVideoOptions = z.infer<typeof SmartVideoOptionsSchema>;

/* -------------------------------------------------------------------------- */
/* YouTube Data API / channel listing                                         */
/* -------------------------------------------------------------------------- */

/** Config for the YouTube service. One GCP project serves all repos. */
export type YoutubeApiConfig = z.infer<typeof YoutubeApiConfigSchema>;

/** Params for {@link useGetChannelVideos}. */
export type YoutubeListParams = z.infer<typeof YoutubeListParamsSchema>;

/** Resolution-keyed thumbnails (all derivable without an API key). */
export type YoutubeVideoThumbnails = z.infer<typeof YoutubeVideoThumbnailsSchema>;

/** Normalized video, enriched with player-ready URLs. */
export type YoutubeVideoNormalized = z.infer<typeof YoutubeVideoNormalizedSchema>;

/** Paginated channel listing result. */
export type YoutubeVideoPage = z.infer<typeof YoutubeVideoPageSchema>;

/** Minimal `channels.list` shape (only what the service reads). */
export type YoutubeChannelsResponse = z.infer<typeof YoutubeChannelsResponseSchema>;

/** Minimal `playlistItems.list` shape (only what the service reads). */
export type YoutubePlaylistItemsResponse = z.infer<typeof YoutubePlaylistItemsResponseSchema>;

/** Minimal `videos.list` shape (only what the service reads). */
export type YoutubeVideosResponse = z.infer<typeof YoutubeVideosResponseSchema>;

/* -------------------------------------------------------------------------- */
/* define*Config pattern                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Any method a consumer declares inline in a `define*Config` literal.
 * Written with `function` (never an arrow) so `this` resolves to the facade.
 */
export type ConfigMethod = (...args: never[]) => unknown;

/**
 * Keys of `T` whose value is a {@link ConfigMethod}. Methods declared as
 * optional are still detected (`NonNullable`), so they are split out of the
 * config half rather than leaking into it.
 */
export type ConfigMethodKeys<T> = {
	[K in keyof T]-?: NonNullable<T[K]> extends ConfigMethod ? K : never;
}[keyof T];

/** The props/booleans half of a `define*Config` literal — the config data. */
export type ConfigData<T> = Omit<T, ConfigMethodKeys<T>>;

/** The methods half of a `define*Config` literal. */
export type ConfigMethodEntries<T> = Pick<T, ConfigMethodKeys<T>>;

/**
 * What every `define*Config` returns: the registered config under `config`,
 * plus the methods declared alongside it so `this.config` resolves inside them.
 *
 * @typeParam T - The literal passed to the `define*Config` call.
 *
 * @example
 * ```ts
 * const api = defineApiConfig({
 *   pokeapi: { baseUri: "…", endpoints: { users: "/users" } },
 *   debug: true,
 *   getUsers: async function () {
 *     return this.config.debug;
 *   },
 * });
 *
 * api.config.pokeapi; // ApiEntry
 * await api.getUsers();
 * ```
 */
export type ConfigFacade<T> = {
	/** Props and booleans declared in the literal (methods stripped out). */
	config: ConfigData<T>;
} & ConfigMethodEntries<T>;

/**
 * Constrains every non-method entry of a `define*Config` literal to `V`, while
 * leaving method entries untouched. Pair with `NoInfer<T>` in the signature so
 * it validates without stealing inference from the literal.
 *
 * @typeParam T - The literal being validated.
 * @typeParam V - The type every non-method value must satisfy.
 */
export type ConfigValues<T, V> = {
	[K in keyof T]: K extends ConfigMethodKeys<T> ? T[K] : V;
};

/**
 * Values accepted by {@link defineApiConfig}: an {@link ApiEntry}, a boolean
 * flag (kept on `config` only — never registered as an API) or a method.
 */
export type ApiConfigValue = ApiEntry | boolean | ConfigMethod;

/* -------------------------------------------------------------------------- */
/* Key vault: API keys, MCP registry and agent config emission                */

/** Lifecycle status of a stored API key. */
export type KeyStatus = z.infer<typeof KeyStatusSchema>;

/** One API key record as stored in the vault. */
export type KeyRecord = z.infer<typeof KeyRecordSchema>;

/** Input accepted when creating a key record (id/status/timestamps are assigned). */
export interface KeyRecordInput {
	provider: string;
	label: string;
	secret: string;
	note?: string;
}

/** One MCP server registry entry. */
export type McpServerEntry = z.infer<typeof McpServerSchema>;

/** Input accepted when creating an MCP server entry. */
export type McpServerInput = z.input<typeof McpServerSchema>;

/** Decrypted vault payload — the complete state of the key manager. */
export type VaultData = z.infer<typeof VaultDataSchema>;

/** Encrypted vault file as stored on disk. */
export type EncryptedVault = z.infer<typeof EncryptedVaultSchema>;

/** A coding tool whose configuration the key manager can generate. */
export interface AgentDefinition {
	id: string;
	name: string;
	description: string;
	docsUrl: string;
	configPath: string;
}

/** Input accepted when emitting agent configuration. */
export interface AgentConfigInput {
	provider: string;
	secret: string;
	/** Environment variable name the tool should read; defaults per provider. */
	apiKeyEnv?: string;
	/** Optional gateway/proxy endpoint. */
	baseUrl?: string;
	/** MCP servers to embed in the generated config. */
	mcpServers?: McpServerEntry[];
	/** Emit real secret values; when omitted every printed value is masked. */
	reveal?: boolean;
}

/** One file the auto-configuration would write. */
export interface AgentConfigFile {
	path: string;
	content: string;
}

/** One "manual connection" line (env export, endpoint, …). */
export interface AgentConfigManualEntry {
	label: string;
	value: string;
}

/** Output of agent config emission: files, manual entries and safety notes. */
export interface AgentConfigOutput {
	agent: AgentDefinition;
	files: AgentConfigFile[];
	manual: AgentConfigManualEntry[];
	notes: string[];
}
