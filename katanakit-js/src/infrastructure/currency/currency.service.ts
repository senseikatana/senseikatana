import { CurrencyConverterService } from "@/core/services/currency.service.js";
import type {
	Currency,
	CurrencyConversion,
	CurrencyConverterServiceOptions,
	CurrencyConvertOptions,
	CurrencyRateEvents,
	CurrencyRateSnapshot,
	SafeResult,
} from "@/types/index.js";

import { FrankfurterCurrencyProvider } from "./frankfurter.service.js";

/**
 * Wires the shared {@link CurrencyConverterService} with the default rate
 * source (Frankfurter) and returns it.
 *
 * This is the composition point between the pure core service and the
 * infrastructure that performs the network I/O: the core only knows the
 * {@link ICurrencyRateProvider} port, so someone has to plug an implementation
 * in. Calling this once is that "someone" — and it is idempotent, so calling it
 * on every use is fine and a provider you injected yourself is never replaced.
 *
 * @param options - Provider and cache TTL. `ttlMs` is applied through
 * `useSetTtlMs`, so it also works on the shared instance.
 * @returns The shared {@link CurrencyConverterService} (Singleton).
 *
 * @example
 * ```ts
 * import { useCurrencyConverter } from "katanakit-js";
 *
 * const currency = useCurrencyConverter();
 * const unsubscribe = currency.useSubscribe({ onRatesUpdate: (s) => render(s) });
 * ```
 */
export function useCurrencyConverter(
	options: CurrencyConverterServiceOptions = {},
): CurrencyConverterService {
	const service = CurrencyConverterService.getInstance();

	if (options.provider) {
		service.useSetProvider(options.provider);
	} else if (!service.useHasProvider()) {
		service.useSetProvider(FrankfurterCurrencyProvider.getInstance());
	}

	if (options.ttlMs !== undefined) service.useSetTtlMs(options.ttlMs);

	return service;
}

/**
 * Converts an amount between two currencies against ECB reference rates.
 *
 * Conversion and formatting are separate concerns: this returns numbers, and
 * {@link useFormatCurrency} turns them into display strings.
 *
 * @param options - Amount, source and target currency.
 * @returns `{ data, error, ok }` — never throws. `converted` has exactly 2
 * decimals; `rate` keeps the full precision the source reported.
 *
 * @example
 * ```ts
 * import { useConvertCurrency, useFormatCurrency } from "katanakit-js";
 *
 * const result = await useConvertCurrency({ amount: 100, from: "USD", to: "EUR" });
 * if (result.ok) {
 *   console.log(result.data.converted, result.data.date);
 *   console.log(useFormatCurrency({ amount: result.data.converted, currency: "EUR", locale: "es", digits: 2 }));
 *   // "88,87 €"
 * }
 * ```
 */
export async function useConvertCurrency(
	options: CurrencyConvertOptions,
): Promise<SafeResult<CurrencyConversion>> {
	return useCurrencyConverter().useConvert(options);
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
 * import { useGetExchangeRate } from "katanakit-js";
 *
 * const rate = await useGetExchangeRate("USD", "EUR");
 * if (rate.ok) console.log(rate.data); // 0.88865
 * ```
 */
export async function useGetExchangeRate(
	from: Currency,
	to: Currency,
): Promise<SafeResult<number>> {
	return useCurrencyConverter().useGetRate(from, to);
}

/**
 * Forces a rate refresh, bypassing the cache. Subscribers get `onRatesUpdate`.
 *
 * @returns `{ data, error, ok }` with the snapshot quoted against the pivot.
 * Never throws.
 *
 * @example
 * ```ts
 * await useRefreshExchangeRates();
 * ```
 */
export async function useRefreshExchangeRates(): Promise<SafeResult<CurrencyRateSnapshot>> {
	return useCurrencyConverter().useRefreshRates();
}

/**
 * Subscribes to rate events (Observer).
 *
 * @param events - Handlers, `onRatesUpdate` and/or `onRatesError`.
 * @returns An unsubscribe function.
 *
 * @example
 * ```ts
 * import { useSubscribeRates } from "katanakit-js";
 *
 * const off = useSubscribeRates({ onRatesUpdate: (s) => render(s) });
 * off();
 * ```
 */
export function useSubscribeRates(events: CurrencyRateEvents): () => void {
	return useCurrencyConverter().useSubscribe(events);
}
