import { FetchApiManager, useGet } from "@/core/services/http.service.js";
import { CurrencyRateSnapshotSchema } from "@/schemas/core.schema.js";
import type {
	Currency,
	CurrencyRateSnapshot,
	ICurrencyRateProvider,
	SafeResult,
} from "@/types/index.js";

/**
 * Canonical Frankfurter host.
 *
 * `https://api.frankfurter.app` answers **301 Moved Permanently** to this host,
 * and the kit's fetch manager deliberately fails closed on redirects
 * (`redirect: "error"`, an SSRF guard in `FetchApiManager.useFetch`). Pointing
 * at the canonical host means no redirect is ever issued, so the guard never
 * trips.
 */
const BASE_URI = "https://api.frankfurter.dev/v1";

/** Raw payload of `GET /latest`. */
interface FrankfurterLatestResponse {
	amount: number;
	base: string;
	date: string;
	rates: Record<string, number>;
}

/** Wiring options for {@link FrankfurterCurrencyProvider}. */
export interface FrankfurterCurrencyProviderOptions {
	/**
	 * Base URI override, for a self-hosted Frankfurter instance.
	 * Must be `http(s)://` — the fetch manager rejects any other scheme.
	 */
	baseUri?: string;
}

/**
 * FrankfurterCurrencyProvider — rate source over **Frankfurter**, the open
 * source (MIT) API for European Central Bank reference rates. No API key, no
 * quota.
 *
 * Implements the {@link ICurrencyRateProvider} port and performs the network
 * I/O through the kit's own API system (`FetchApiManager`), so it inherits the
 * request interceptors, the SSRF scheme allow-list and the Safe Result shape.
 *
 * Rates are the **ECB daily reference rates**, published each working day at
 * around 14:15 CET and not updated on weekends or ECB holidays — `date` on the
 * snapshot is the day they belong to. They are the reference used for
 * accounting and invoicing, but they are not an intraday forex quote and carry
 * no bid/ask spread. Swap the provider through the port when you need live
 * market quotes.
 *
 * @remarks Each configured host registers its own entry in the API registry
 * (keyed by base URI), so a self-hosted instance and the shared one never
 * overwrite each other. Frankfurter covers ~30 currencies and **does not
 * include `ARS`, `COP` or `CLP`** — conversions involving them fail with an
 * explicit `404` error instead of a silent wrong number.
 *
 * @example
 * ```ts
 * import { FrankfurterCurrencyProvider, CurrencyConverterService } from "katanakit-js";
 *
 * const currency = CurrencyConverterService.create({
 *   provider: FrankfurterCurrencyProvider.getInstance(),
 * });
 * ```
 */
export class FrankfurterCurrencyProvider implements ICurrencyRateProvider {
	private static instance: FrankfurterCurrencyProvider;

	/** Registry entry name. Derived from the base URI so hosts never collide. */
	private readonly apiName: string;

	/** Private constructor — enforce Singleton. */
	private constructor(options: FrankfurterCurrencyProviderOptions = {}) {
		const baseUri = options.baseUri ?? BASE_URI;
		this.apiName = `frankfurter:${baseUri}`;

		// Registers the API in the kit's client registry. Explicit (not an import
		// side effect): it runs the first time someone asks for the provider.
		FetchApiManager.getInstance().useInit({
			[this.apiName]: {
				baseUri,
				endpoints: { latest: "/latest" },
			},
		});
	}

	/** Returns the shared instance (Singleton). */
	static getInstance(): FrankfurterCurrencyProvider {
		if (!FrankfurterCurrencyProvider.instance) {
			FrankfurterCurrencyProvider.instance = new FrankfurterCurrencyProvider();
		}
		return FrankfurterCurrencyProvider.instance;
	}

	/**
	 * Creates a NO-singleton instance with a custom base URI (DI).
	 *
	 * @param options - Wiring options.
	 * @returns A new {@link FrankfurterCurrencyProvider}.
	 */
	static create(options: FrankfurterCurrencyProviderOptions = {}): FrankfurterCurrencyProvider {
		return new FrankfurterCurrencyProvider(options);
	}

	/**
	 * Fetches ECB reference rates quoted against `base`.
	 *
	 * @param base - Currency the rates are quoted against.
	 * @param quotes - Optional subset of quote currencies. Omit for every rate the source knows.
	 * @returns `{ data, error, ok }` with the dated snapshot, or the source
	 * failure. Never throws.
	 */
	async useFetchRates(
		base: Currency,
		quotes?: Currency[],
	): Promise<SafeResult<CurrencyRateSnapshot>> {
		const result = await useGet<FrankfurterLatestResponse>(this.apiName, "latest", {
			query: {
				from: base,
				to: quotes?.length ? quotes.join(",") : undefined,
			},
		});

		if (!result.ok) {
			return {
				data: null,
				error: {
					message: `Frankfurter rates request failed: ${result.error.message}`,
					status: result.error.status,
				},
				ok: false,
			};
		}

		// Validate at the boundary: the payload comes from outside the kit.
		const parsed = CurrencyRateSnapshotSchema.safeParse({
			base: result.data.base,
			date: result.data.date,
			rates: result.data.rates ?? {},
		});

		if (!parsed.success) {
			const issue = parsed.error.issues[0];
			return {
				data: null,
				error: {
					message: `Unexpected Frankfurter payload: ${issue ? `${issue.path.join(".")} ${issue.message}` : "invalid shape"}`,
					status: 502,
				},
				ok: false,
			};
		}

		return { data: parsed.data, error: null, ok: true };
	}
}
