import type {
	ApiError,
	Currency,
	CurrencyConversion,
	CurrencyConverterServiceOptions,
	CurrencyConvertOptions,
	CurrencyRateEvents,
	CurrencyRateSnapshot,
	ICurrencyConverterService,
	ICurrencyRateProvider,
	SafeResult,
} from "@/types/index.js";

import { useLogger } from "./logger.service.js";
import { useAttempt } from "./result.service.js";

/** Default cache time-to-live: 10 minutes. */
const DEFAULT_TTL_MS = 10 * 60 * 1000;

/**
 * Default pivot currency.
 *
 * Quotes are stored against this currency and every pair is resolved by
 * division, so a small quote never carries the rounding of the source.
 */
const DEFAULT_PIVOT: Currency = "USD";

/** Actionable error returned when no rate source has been injected. */
const NO_PROVIDER_MESSAGE =
	"No exchange-rate provider configured. Use useCurrencyConverter() from " +
	'"katanakit-js" (wires Frankfurter) or call ' +
	"CurrencyConverterService.getInstance().useSetProvider(provider).";

/** Internal cache entry: a snapshot plus the moment it was stored. */
interface RateCacheEntry {
	snapshot: CurrencyRateSnapshot;
	fetchedAt: number;
}

/**
 * CurrencyConverterService — Singleton facade for currency conversion against
 * **external exchange rates**.
 *
 * Applies four patterns at once:
 *
 * - **Singleton** — one shared instance via {@link CurrencyConverterService.getInstance}.
 * - **Facade** — one call converts an amount; rate fetching, caching and math
 *   stay behind it.
 * - **Observer** — subscribers get `onRatesUpdate` / `onRatesError` callbacks
 *   whenever rates change. Those handlers are the only `on*` surface in the
 *   kit: `on*` marks *a callback the service invokes*, never a method you call.
 * - **Dependency Injection** — the rate source is an {@link ICurrencyRateProvider}
 *   port, injected through {@link CurrencyConverterService.create} or
 *   {@link CurrencyConverterService.useSetProvider}. The default implementation
 *   lives in `src/infrastructure/` (runtime I/O stays out of the core), and the
 *   `useCurrencyConverter()` helper wires it for you.
 *
 * Every fallible call returns a {@link SafeResult} — this service never throws.
 * `converted` is money: rounded to exactly 2 decimals with `Intl`'s symmetric
 * half-expand rule. `rate` keeps the full precision the source reported, so
 * chained arithmetic multiplies instead of re-fetching.
 *
 * This service **converts and never formats**. Presentation is a separate
 * responsibility owned by {@link FormatterService}; compose the two when you
 * need a string (`useFormatCurrency({ amount: converted, currency: to })`).
 *
 * @example
 * ```ts
 * import { useCurrencyConverter, useConvertCurrency } from "katanakit-js";
 *
 * // One-shot helper (wires the Frankfurter provider on first call):
 * const result = await useConvertCurrency({ amount: 100, from: "USD", to: "EUR" });
 * if (result.ok) console.log(result.data.converted, result.data.rate);
 *
 * // Or hold the facade and subscribe to rate updates (Observer):
 * const currency = useCurrencyConverter();
 * const unsubscribe = currency.useSubscribe({
 *   onRatesUpdate: (snapshot) => console.log("rates for", snapshot.date),
 * });
 * ```
 */
export class CurrencyConverterService implements ICurrencyConverterService {
	private static instance: CurrencyConverterService;

	/** Rate source port. `null` until injected (see the error in `loadRates`). */
	private provider: ICurrencyRateProvider | null;
	/** Cache time-to-live in milliseconds. */
	private ttlMs: number;
	/** Snapshot cache: one entry, quoted against the pivot. */
	private cacheEntry: RateCacheEntry | null = null;
	/** In-flight fetch (single-flight). */
	private inFlight: Promise<SafeResult<CurrencyRateSnapshot>> | null = null;
	/** Observer subscribers. */
	private readonly subscribers = new Set<CurrencyRateEvents>();
	/** Currency every rate is quoted against before a pair is divided. */
	private readonly pivot: Currency;
	/** Fetch sequence of the last response that was stored. */
	private lastWrite = 0;
	/** Monotonic fetch sequence — orders writes across overlapping requests. */
	private fetchSeq = 0;
	/** Fetch sequences below this one belong to a previous configuration. */
	private minSeq = 0;

	/** Private constructor — enforce Singleton. Use `create()` for DI. */
	private constructor(options: CurrencyConverterServiceOptions = {}) {
		this.provider = options.provider ?? null;
		this.ttlMs = options.ttlMs ?? DEFAULT_TTL_MS;
		this.pivot = options.pivot ?? DEFAULT_PIVOT;
	}

	/** Returns the shared instance (Singleton). */
	static getInstance(): CurrencyConverterService {
		if (!CurrencyConverterService.instance) {
			CurrencyConverterService.instance = new CurrencyConverterService();
		}
		return CurrencyConverterService.instance;
	}

	/**
	 * Creates a NO-singleton instance with injected dependencies (DI).
	 * Useful for tests and for custom rate sources.
	 *
	 * @param options - Provider, formatter and cache TTL to inject.
	 * @returns A new {@link CurrencyConverterService}.
	 *
	 * @example
	 * ```ts
	 * const currency = CurrencyConverterService.create({ provider: fakeRates });
	 * ```
	 */
	static create(options: CurrencyConverterServiceOptions = {}): CurrencyConverterService {
		return new CurrencyConverterService(options);
	}

	/**
	 * Swaps the rate source at runtime (DI).
	 *
	 * Drops the cache: every stored snapshot came from the previous source, so
	 * keeping it would silently serve rates the new provider never confirmed.
	 * Re-setting the *same* provider is a no-op, so a per-call wiring helper
	 * cannot defeat the cache. In-flight responses from the previous provider
	 * are discarded instead of written.
	 *
	 * @param provider - The new {@link ICurrencyRateProvider}.
	 */
	useSetProvider(provider: ICurrencyRateProvider): void {
		if (this.provider === provider) return;
		this.provider = provider;
		this.invalidate();
	}

	/**
	 * Whether a rate source is already injected.
	 *
	 * Wiring helpers use it to install a default provider only when none is
	 * configured, so a custom one is never clobbered.
	 */
	useHasProvider(): boolean {
		return this.provider !== null;
	}

	/**
	 * Changes the cache time-to-live at runtime.
	 *
	 * @param ttlMs - New TTL in milliseconds. `0` caches until `useClearCache()`.
	 */
	useSetTtlMs(ttlMs: number): void {
		this.ttlMs = ttlMs;
	}

	/**
	 * Subscribes to rate events (Observer).
	 *
	 * @param events - Handlers; `onRatesUpdate` and/or `onRatesError`.
	 * @returns An unsubscribe function.
	 *
	 * @example
	 * ```ts
	 * const off = currency.useSubscribe({ onRatesUpdate: (s) => render(s) });
	 * off();
	 * ```
	 */
	useSubscribe(events: CurrencyRateEvents): () => void {
		this.subscribers.add(events);
		return () => {
			this.subscribers.delete(events);
		};
	}

	/**
	 * Converts an amount between two currencies.
	 *
	 * Uses cached rates when fresh (see `ttlMs`); otherwise fetches them first.
	 * `rate` keeps the full precision the source reported, while `converted` is
	 * rounded to **exactly 2 decimals** (money). `date` is the ISO date the rate
	 * belongs to.
	 *
	 * @param options - Amount, source and target currency.
	 * @returns `{ data, error, ok }` — never throws.
	 *
	 * @example
	 * ```ts
	 * const result = await useConvertCurrency({ amount: 100, from: "USD", to: "EUR" });
	 * // result.ok → { amount: 100, from: "USD", to: "EUR", rate: 0.88865, converted: 88.87, date: "2026-10-16" }
	 * ```
	 */
	async useConvert(options: CurrencyConvertOptions): Promise<SafeResult<CurrencyConversion>> {
		const { amount, from, to } = options;

		if (!Number.isFinite(amount)) {
			return {
				data: null,
				error: { message: "amount must be a finite number.", status: 400 },
				ok: false,
			};
		}

		// Identity: no rate is involved, so no request is made either.
		if (from === to) {
			return {
				data: {
					amount,
					from,
					to,
					rate: 1,
					converted: this.roundAmount(amount, 2),
					date: this.currentDate(),
				},
				error: null,
				ok: true,
			};
		}

		const snapshot = await this.loadRates();
		if (!snapshot.ok) return snapshot;

		const rate = this.resolveRate(snapshot.data, from, to);
		if (!rate.ok) return rate;

		return {
			data: {
				amount,
				from,
				to,
				rate: rate.data,
				converted: this.roundAmount(amount * rate.data, 2),
				date: snapshot.data.date,
			},
			error: null,
			ok: true,
		};
	}

	/**
	 * Returns the exchange rate between two currencies.
	 *
	 * @param from - Source currency.
	 * @param to - Target currency.
	 * @returns `{ data, error, ok }` — never throws.
	 *
	 * @example
	 * ```ts
	 * const rate = await useGetExchangeRate("USD", "EUR");
	 * // rate.ok → 0.92
	 * ```
	 */
	async useGetRate(from: Currency, to: Currency): Promise<SafeResult<number>> {
		if (from === to) return { data: 1, error: null, ok: true };

		const snapshot = await this.loadRates();
		if (!snapshot.ok) return snapshot;
		return this.resolveRate(snapshot.data, from, to);
	}

	/**
	 * Forces a rate refresh, bypassing the cache (Observer fires `onRatesUpdate`
	 * when it succeeds).
	 *
	 * @returns `{ data, error, ok }` with the snapshot quoted against the pivot.
	 * Never throws.
	 */
	async useRefreshRates(): Promise<SafeResult<CurrencyRateSnapshot>> {
		return this.loadRates(true);
	}

	/**
	 * Returns the cached snapshot without fetching — every rate quoted against
	 * the pivot currency.
	 *
	 * @returns The cached snapshot, or `null` when nothing was fetched yet.
	 */
	useGetSnapshot(): CurrencyRateSnapshot | null {
		return this.cacheEntry?.snapshot ?? null;
	}

	/**
	 * Drops every cached snapshot. In-flight responses are discarded too: they
	 * were requested before the drop and must not repopulate the cache.
	 */
	useClearCache(): void {
		this.invalidate();
	}

	/* ---------------------------------------------------------------------- */
	/* Private                                                                */
	/* ---------------------------------------------------------------------- */

	/**
	 * Cache-aware rate loader.
	 *
	 * Serves the cache while it is fresh, collapses concurrent requests into a
	 * single fetch (single-flight), and writes through a monotonic sequence so a
	 * slower response can never overwrite a newer one. Every snapshot is quoted
	 * against the pivot currency — see {@link CurrencyConverterService.resolveRate}.
	 */
	private async loadRates(force = false): Promise<SafeResult<CurrencyRateSnapshot>> {
		if (!force) {
			const cached = this.cacheEntry;
			if (cached && (this.ttlMs === 0 || Date.now() - cached.fetchedAt < this.ttlMs)) {
				return { data: cached.snapshot, error: null, ok: true };
			}

			if (this.inFlight) return this.inFlight;
		}

		const seq = ++this.fetchSeq;
		const request = this.fetchRates(seq);
		this.inFlight = request;

		try {
			return await request;
		} finally {
			if (this.inFlight === request) this.inFlight = null;
		}
	}

	/** Performs the fetch through the provider port and stores the result. */
	private async fetchRates(seq: number): Promise<SafeResult<CurrencyRateSnapshot>> {
		if (!this.provider) {
			const error: ApiError = { message: NO_PROVIDER_MESSAGE, status: 0 };
			this.notifyRatesError(error);
			return { data: null, error, ok: false };
		}

		const provider = this.provider;
		// Defensive: the port says implementations never throw, but this facade
		// still owns the no-throw promise if a third-party provider misbehaves.
		const attempt = await useAttempt(() => provider.useFetchRates(this.pivot));
		if (!attempt.ok) {
			this.notifyRatesError(attempt.error);
			return attempt;
		}

		const result = attempt.data;
		if (!result.ok) {
			this.notifyRatesError(result.error);
			return result;
		}

		// Drop a response whose configuration was replaced mid-flight, and one
		// that a newer fetch has already superseded.
		if (seq < this.minSeq || seq <= this.lastWrite) return result;

		this.lastWrite = seq;
		this.cacheEntry = { snapshot: result.data, fetchedAt: Date.now() };
		this.notifyRatesUpdate(result.data);
		return result;
	}

	/**
	 * Invalidates cache state and raises the sequence floor, so responses that
	 * are already in flight are discarded instead of repopulating the cache.
	 */
	private invalidate(): void {
		this.minSeq = ++this.fetchSeq;
		this.cacheEntry = null;
		this.lastWrite = 0;
	}

	/**
	 * Pure rate math over a snapshot: units of `to` per 1 unit of `from`.
	 * The snapshot base itself counts as `1` and is absent from `rates`.
	 *
	 * Dividing two quotes instead of consuming the source's direct quote for the
	 * pair is deliberate. Sources round their quotes — Frankfurter keeps 5
	 * decimal places — so a small quote such as `KRW → USD` arrives as `0.00075`
	 * and has already lost digits. `1 / USD.KRW` has not.
	 */
	private resolveRate(
		snapshot: CurrencyRateSnapshot,
		from: Currency,
		to: Currency,
	): SafeResult<number> {
		if (from === to) return { data: 1, error: null, ok: true };

		const fromPerBase = this.lookupRate(snapshot, from);
		const toPerBase = this.lookupRate(snapshot, to);

		if (fromPerBase === null || toPerBase === null) {
			return {
				data: null,
				error: {
					message: `No rate available for ${from}/${to} on ${snapshot.date} (${snapshot.base} base).`,
					status: 404,
				},
				ok: false,
			};
		}

		return { data: toPerBase / fromPerBase, error: null, ok: true };
	}

	/**
	 * Units of `currency` per 1 unit of the snapshot base. `null` when absent,
	 * non-finite, zero or negative — a quote that cannot price anything.
	 */
	private lookupRate(snapshot: CurrencyRateSnapshot, currency: Currency): number | null {
		if (snapshot.base === currency) return 1;
		const rate = snapshot.rates[currency];
		return typeof rate === "number" && Number.isFinite(rate) && rate > 0 ? rate : null;
	}

	/**
	 * Date to report on a conversion that needs no rate: the cached snapshot's
	 * date when there is one, otherwise today's ISO date.
	 */
	private currentDate(): string {
		return this.cacheEntry?.snapshot.date ?? new Date().toISOString().slice(0, 10);
	}

	/**
	 * Rounds a money amount to `digits` decimals (default `2`) through
	 * `new Intl.NumberFormat`.
	 *
	 * Rounding with the same engine as the formatter guarantees the raw number
	 * and the displayed string can never disagree, and takes `Intl`'s symmetric
	 * half-expand rounding instead of `Math.round`, which rounds `-1.005`
	 * towards zero.
	 */
	private roundAmount(value: number, digits = 2): number {
		const rounded = new Intl.NumberFormat("en-US", {
			minimumFractionDigits: digits,
			maximumFractionDigits: digits,
			useGrouping: false,
		}).format(value);

		return Number(rounded);
	}

	/** Observer dispatch: fires `onRatesUpdate` on every subscriber. */
	private notifyRatesUpdate(snapshot: CurrencyRateSnapshot): void {
		for (const events of this.subscribers) {
			if (!events.onRatesUpdate) continue;
			try {
				events.onRatesUpdate(snapshot);
			} catch (error) {
				useLogger("[CurrencyConverterService] onRatesUpdate failed:", error, "error");
			}
		}
	}

	/** Observer dispatch: fires `onRatesError` on every subscriber. */
	private notifyRatesError(error: ApiError): void {
		for (const events of this.subscribers) {
			if (!events.onRatesError) continue;
			try {
				events.onRatesError(error);
			} catch (listenerError) {
				useLogger("[CurrencyConverterService] onRatesError failed:", listenerError, "error");
			}
		}
	}
}
