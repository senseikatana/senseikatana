import { describe, expect, it, vi } from "vitest";

import { CurrencyConverterService } from "@/core/services/currency.service";
import { useFormatCurrency } from "@/core/services/formatter.service";
import type {
	Currency,
	CurrencyRateSnapshot,
	ICurrencyRateProvider,
	SafeResult,
} from "@/types/index";

/**
 * Real USD-quoted rates as the ECB source (Frankfurter) returns them, observed
 * on 2026-10-16 and 2026-10-19.
 */
const ECB_USD: Record<string, number> = {
	EUR: 0.88865,
	GBP: 0.74989,
	JPY: 158.02,
	MXN: 18.3835,
	BRL: 5.0828,
	CAD: 1.4074,
	NZD: 1.7632,
};

/** Fake rate source: no I/O, injected through the port (DI). */
function fakeProvider(
	rates: Record<string, number> = ECB_USD,
	date = "2026-10-16",
): ICurrencyRateProvider {
	return {
		useFetchRates: vi.fn(async (base: Currency): Promise<SafeResult<CurrencyRateSnapshot>> => ({
			data: { base, date, rates: { ...rates } },
			error: null,
			ok: true,
		})),
	};
}

/** Builds a service wired with a fake provider (DI) and a private cache. */
function serviceWith(
	provider: ICurrencyRateProvider,
	options: { ttlMs?: number } = {},
): CurrencyConverterService {
	return CurrencyConverterService.create({ provider, ...options });
}

describe("CurrencyConverterService", () => {
	describe("accuracy", () => {
		it("converts USD → EUR with the source's direct quote", async () => {
			const result = await serviceWith(fakeProvider()).useConvert({
				amount: 100,
				from: "USD",
				to: "EUR",
			});

			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.data.rate).toBe(0.88865);
			expect(result.data.date).toBe("2026-10-16");
		});

		it("keeps the full precision of the rate", async () => {
			const result = await serviceWith(fakeProvider()).useGetRate("USD", "JPY");

			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.data).toBe(158.02);
		});

		it("computes cross-rates when the source quotes against a fixed base", async () => {
			// A provider that always answers USD-quoted rates, whatever you ask for.
			const provider: ICurrencyRateProvider = {
				useFetchRates: vi.fn(async (): Promise<SafeResult<CurrencyRateSnapshot>> => ({
					data: { base: "USD", date: "2026-10-16", rates: { EUR: 0.88865 } },
					error: null,
					ok: true,
				})),
			};
			const result = await serviceWith(provider).useConvert({
				amount: 100,
				from: "EUR",
				to: "USD",
			});

			expect(result.ok).toBe(true);
			if (!result.ok) return;
			// 1 / 0.88865 = 1.125302… — the same quote the source gives for EUR base.
			expect(result.data.rate).toBeCloseTo(1.1253, 4);
			expect(result.data.converted).toBe(112.53);
		});

		it("treats the snapshot base as 1 when it is one side of the pair", async () => {
			const result = await serviceWith(fakeProvider()).useConvert({
				amount: 10,
				from: "USD",
				to: "GBP",
			});

			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.data.rate).toBe(0.74989);
		});
	});

	describe("two-decimal output", () => {
		it("rounds converted to exactly 2 decimals", async () => {
			const result = await serviceWith(fakeProvider()).useConvert({
				amount: 29.99,
				from: "USD",
				to: "GBP",
			});

			expect(result.ok).toBe(true);
			if (!result.ok) return;
			// 29.99 * 0.74989 = 22.4892011
			expect(result.data.converted).toBe(22.49);
			expect(String(result.data.converted).split(".")[1]?.length ?? 0).toBeLessThanOrEqual(2);
		});

		it("rounds half away from zero on negative amounts", async () => {
			const result = await serviceWith(fakeProvider()).useConvert({
				amount: -100,
				from: "USD",
				to: "EUR",
			});

			expect(result.ok).toBe(true);
			if (!result.ok) return;
			// -88.865 → -88.87 (Math.round would give -88.86).
			expect(result.data.converted).toBe(-88.87);
		});

		it("keeps conversion and formatting separate but composable", async () => {
			const result = await serviceWith(fakeProvider()).useConvert({
				amount: 100,
				from: "USD",
				to: "EUR",
			});

			expect(result.ok).toBe(true);
			if (!result.ok) return;

			// Two responsibilities, two calls: the service converts, the formatter
			// renders. `digits: 2` pins the decimals.
			const shown = useFormatCurrency({
				amount: result.data.converted,
				currency: result.data.to,
				locale: "es",
				digits: 2,
			});
			// `Intl` separates the symbol with a NO-BREAK SPACE (U+00A0) in es-ES,
			// not a plain space — match the digits and let `\s` accept either.
			expect(shown).toMatch(/^88,87\s€$/u);
		});

		it("prints 2 decimals even for zero-decimal currencies", async () => {
			const result = await serviceWith(fakeProvider()).useConvert({
				amount: 100,
				from: "USD",
				to: "JPY",
			});

			expect(result.ok).toBe(true);
			if (!result.ok) return;

			// 100 * 158.02 = 15802 → JPY normally prints without decimals.
			const shown = useFormatCurrency({
				amount: result.data.converted,
				currency: "JPY",
				digits: 2,
			});
			expect(shown).toContain("15,802.00");
		});
	});

	describe("identity conversions", () => {
		it("returns rate 1 without hitting the network", async () => {
			const provider = fakeProvider();
			const result = await serviceWith(provider).useConvert({
				amount: 100,
				from: "EUR",
				to: "EUR",
			});

			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.data.rate).toBe(1);
			expect(result.data.converted).toBe(100);
			expect(provider.useFetchRates).not.toHaveBeenCalled();
		});
	});

	describe("cache", () => {
		it("fetches once per base currency", async () => {
			const provider = fakeProvider();
			const service = serviceWith(provider);

			await service.useConvert({ amount: 1, from: "USD", to: "EUR" });
			await service.useConvert({ amount: 2, from: "USD", to: "GBP" });

			expect(provider.useFetchRates).toHaveBeenCalledTimes(1);
		});

		it("keeps serving the cache while the TTL is alive", async () => {
			const provider = fakeProvider();
			const service = serviceWith(provider, { ttlMs: 60_000 });

			const first = await service.useGetRate("USD", "EUR");
			const second = await service.useGetRate("USD", "EUR");

			expect(first.ok && second.ok).toBe(true);
			expect(provider.useFetchRates).toHaveBeenCalledTimes(1);
		});

		it("refetches when the TTL expired", async () => {
			const provider = fakeProvider();
			const service = serviceWith(provider, { ttlMs: 1 });

			await service.useGetRate("USD", "EUR");
			await new Promise((resolve) => setTimeout(resolve, 5));
			await service.useGetRate("USD", "EUR");

			expect(provider.useFetchRates).toHaveBeenCalledTimes(2);
		});

		it("refetches on demand through useRefreshRates", async () => {
			const provider = fakeProvider();
			const service = serviceWith(provider);

			await service.useGetRate("USD", "EUR");
			await service.useRefreshRates();

			expect(provider.useFetchRates).toHaveBeenCalledTimes(2);
		});

		it("exposes the cached snapshot without fetching", async () => {
			const service = serviceWith(fakeProvider());
			expect(service.useGetSnapshot()).toBeNull();

			await service.useGetRate("USD", "EUR");
			expect(service.useGetSnapshot()?.date).toBe("2026-10-16");
		});

		it("drops every snapshot on useClearCache", async () => {
			const provider = fakeProvider();
			const service = serviceWith(provider);

			await service.useGetRate("USD", "EUR");
			service.useClearCache();

			expect(service.useGetSnapshot()).toBeNull();
			await service.useGetRate("USD", "EUR");
			expect(provider.useFetchRates).toHaveBeenCalledTimes(2);
		});
	});

	describe("Observer", () => {
		it("fires onRatesUpdate with the stored snapshot", async () => {
			const service = serviceWith(fakeProvider());
			const onRatesUpdate = vi.fn();

			service.useSubscribe({ onRatesUpdate });
			await service.useGetRate("USD", "EUR");

			expect(onRatesUpdate).toHaveBeenCalledTimes(1);
			expect(onRatesUpdate.mock.calls[0][0]).toMatchObject({
				base: "USD",
				date: "2026-10-16",
			});
		});

		it("fires onRatesError when the source fails", async () => {
			const provider: ICurrencyRateProvider = {
				useFetchRates: vi.fn(async () => {
					throw new Error("network down");
				}),
			};
			const service = serviceWith(provider);
			const onRatesError = vi.fn();

			service.useSubscribe({ onRatesError });
			const result = await service.useGetRate("USD", "EUR");

			expect(result.ok).toBe(false);
			expect(onRatesError).toHaveBeenCalledTimes(1);
			expect(onRatesError.mock.calls[0][0]).toMatchObject({ message: "network down" });
		});

		it("stops notifying after unsubscribing", async () => {
			const service = serviceWith(fakeProvider());
			const onRatesUpdate = vi.fn();

			const off = service.useSubscribe({ onRatesUpdate });
			off();
			await service.useGetRate("USD", "EUR");

			expect(onRatesUpdate).not.toHaveBeenCalled();
		});

		it("keeps notifying other subscribers when one handler throws", async () => {
			const service = serviceWith(fakeProvider());
			const onRatesUpdate = vi.fn();

			service.useSubscribe({
				onRatesUpdate: () => {
					throw new Error("boom");
				},
			});
			service.useSubscribe({ onRatesUpdate });

			await service.useGetRate("USD", "EUR");
			expect(onRatesUpdate).toHaveBeenCalledTimes(1);
		});
	});

	describe("error handling", () => {
		it("returns an actionable error when no provider is configured", async () => {
			const result = await CurrencyConverterService.create().useConvert({
				amount: 1,
				from: "USD",
				to: "EUR",
			});

			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error.status).toBe(0);
			expect(result.error.message).toContain("useCurrencyConverter()");
		});

		it("reports currencies the source does not know instead of guessing", async () => {
			const result = await serviceWith(fakeProvider()).useConvert({
				amount: 100,
				from: "USD",
				to: "ARS",
			});

			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error.status).toBe(404);
			expect(result.error.message).toContain("ARS");
		});

		it("never throws when the source rejects", async () => {
			const provider: ICurrencyRateProvider = {
				useFetchRates: vi.fn(async () => {
					throw new Error("boom");
				}),
			};

			const result = await serviceWith(provider).useGetRate("USD", "EUR");

			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error.message).toContain("boom");
		});

		it("swaps the rate source at runtime through DI", async () => {
			const service = serviceWith(fakeProvider({ EUR: 0.5 }));
			expect((await service.useGetRate("USD", "EUR")).ok).toBe(true);

			service.useSetProvider(fakeProvider({ EUR: 0.25 }));
			const result = await service.useGetRate("USD", "EUR");

			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.data).toBe(0.25);
		});
	});

	describe("dependency injection", () => {
		it("wires provider and TTL through create()", async () => {
			const provider = fakeProvider();
			const service = CurrencyConverterService.create({ provider, ttlMs: 60_000 });

			await service.useGetRate("USD", "EUR");
			await service.useGetRate("USD", "GBP");

			// The injected provider was used, and the TTL collapsed both into one fetch.
			expect(provider.useFetchRates).toHaveBeenCalledTimes(1);
			expect(service.useHasProvider()).toBe(true);
		});

		it("returns numbers, leaving rendering to the formatter", async () => {
			const result = await serviceWith(fakeProvider()).useConvert({
				amount: 100,
				from: "USD",
				to: "EUR",
			});

			expect(result.ok).toBe(true);
			if (!result.ok) return;

			// Separation of concerns: the service never builds a display string.
			expect(typeof result.data.converted).toBe("number");
			expect(
				useFormatCurrency({ amount: result.data.converted, currency: "EUR", digits: 2 }),
			).toContain("88.87");
		});
	});
});

describe("FormatterService currency output", () => {
	it("keeps each currency's own fraction digits by default", () => {
		// Frozen behaviour of the published symbol: JPY has no minor unit.
		expect(useFormatCurrency({ amount: 100, currency: "JPY" })).toBe("¥100");
		expect(useFormatCurrency({ amount: 100, currency: "USD" })).toBe("$100.00");
	});

	it("pins the fraction digits when digits is given", () => {
		expect(useFormatCurrency({ amount: 100, currency: "JPY", digits: 2 })).toBe("¥100.00");
		expect(useFormatCurrency({ amount: 100, currency: "USD", digits: 0 })).toBe("$100");
	});
});

describe("CurrencyConverterService major pairs", () => {
	it("resolves the majors both ways from one snapshot", async () => {
		const service = serviceWith(fakeProvider());
		const pairs: [Currency, Currency, number][] = [
			["USD", "EUR", 0.88865],
			["EUR", "USD", 1 / 0.88865],
			["CAD", "EUR", 0.88865 / 1.4074],
			["GBP", "EUR", 0.88865 / 0.74989],
			["NZD", "EUR", 0.88865 / 1.7632],
			["EUR", "GBP", 0.74989 / 0.88865],
		];

		for (const [from, to, expected] of pairs) {
			const result = await service.useGetRate(from, to);
			expect(result.ok, `${from} → ${to}`).toBe(true);
			if (!result.ok) return;
			expect(result.data).toBeCloseTo(expected, 10);
		}
	});

	it("is exactly reciprocal: rate(A→B) × rate(B→A) = 1", async () => {
		const service = serviceWith(fakeProvider());
		const forward = await service.useGetRate("EUR", "GBP");
		const backward = await service.useGetRate("GBP", "EUR");

		expect(forward.ok && backward.ok).toBe(true);
		if (!forward.ok || !backward.ok) return;
		// Both sides come from the same snapshot, so the product is exactly 1 —
		// no drift between the two directions of a pair.
		expect(forward.data * backward.data).toBeCloseTo(1, 12);
	});

	it("keeps the precision a rounded small quote would destroy", async () => {
		// The ECB source rounds quotes to 5 decimal places, so the direct quote
		// for KRW → USD arrives as 0.00075 and has already lost digits. The
		// service divides through the pivot instead: 1 / 1329.49 = 0.00075217…
		const result = await serviceWith(fakeProvider({ KRW: 1329.49 })).useGetRate("KRW", "USD");

		expect(result.ok).toBe(true);
		if (!result.ok) return;

		// On 1M KRW the rounded quote says 750.00 USD; the precise one 752.17.
		expect(1_000_000 * result.data).toBeCloseTo(752.17, 2);
		expect(1_000_000 * result.data).not.toBeCloseTo(750, 1);
	});

	it("quotes every rate against a configurable pivot", async () => {
		const provider = fakeProvider({ USD: 1.1225, GBP: 0.84205 }, "2026-10-19");
		const service = CurrencyConverterService.create({ provider, pivot: "EUR" });

		const rate = await service.useGetRate("EUR", "USD");

		expect(rate.ok).toBe(true);
		if (!rate.ok) return;
		expect(rate.data).toBe(1.1225);
		expect(provider.useFetchRates).toHaveBeenCalledWith("EUR");
	});
});

describe("CurrencyConverterService concurrency", () => {
	it("collapses concurrent requests for one base into a single fetch", async () => {
		const provider = fakeProvider();
		const service = serviceWith(provider);

		await Promise.all([
			service.useGetRate("USD", "EUR"),
			service.useGetRate("USD", "GBP"),
			service.useGetRate("USD", "JPY"),
		]);

		expect(provider.useFetchRates).toHaveBeenCalledTimes(1);
	});

	it("never expires the cache when ttlMs is 0", async () => {
		const provider = fakeProvider();
		const service = serviceWith(provider, { ttlMs: 0 });

		await service.useGetRate("USD", "EUR");
		await new Promise((resolve) => setTimeout(resolve, 5));
		await service.useGetRate("USD", "EUR");

		expect(provider.useFetchRates).toHaveBeenCalledTimes(1);
	});

	it("discards a response that lands after the provider was swapped", async () => {
		let releaseStale!: (value: SafeResult<CurrencyRateSnapshot>) => void;
		const stale: ICurrencyRateProvider = {
			useFetchRates: vi.fn(
				() =>
					new Promise<SafeResult<CurrencyRateSnapshot>>((resolve) => {
						releaseStale = resolve;
					}),
			),
		};
		const service = serviceWith(stale);

		const pending = service.useGetRate("USD", "EUR");
		service.useSetProvider(fakeProvider({ EUR: 0.5 }));
		releaseStale({
			data: { base: "USD", date: "2026-10-16", rates: { EUR: 0.9 } },
			error: null,
			ok: true,
		});
		await pending;

		// The superseded snapshot must not have been cached…
		expect(service.useGetSnapshot()).toBeNull();
		// …and the new provider's rate is the one served.
		const fresh = await service.useGetRate("USD", "EUR");
		expect(fresh.ok && fresh.data).toBe(0.5);
	});

	it("does not drop the cache when the same provider is set again", async () => {
		const provider = fakeProvider();
		const service = serviceWith(provider);

		await service.useGetRate("USD", "EUR");
		service.useSetProvider(provider);

		expect(service.useGetSnapshot()).not.toBeNull();
		expect(provider.useFetchRates).toHaveBeenCalledTimes(1);
	});
});

describe("CurrencyConverterService edge inputs", () => {
	it("rejects a non-finite amount instead of returning NaN", async () => {
		const result = await serviceWith(fakeProvider()).useConvert({
			amount: Infinity,
			from: "USD",
			to: "EUR",
		});

		expect(result.ok).toBe(false);
		if (result.ok) return;
		expect(result.error.status).toBe(400);
	});

	it("rejects a zero or negative quote instead of pricing it as free", async () => {
		const service = serviceWith(fakeProvider({ EUR: 0, GBP: -1 }));

		const zero = await service.useGetRate("USD", "EUR");
		const negative = await service.useGetRate("USD", "GBP");

		expect(zero.ok).toBe(false);
		expect(negative.ok).toBe(false);
	});
});
