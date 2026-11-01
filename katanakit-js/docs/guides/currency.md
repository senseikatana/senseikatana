---
title: Currency Conversion
description: "Convert amounts between currencies with ECB reference rates — the helpers, Safe Results, rate subscriptions and swapping the provider for live-market quotes."
---

# Currency Conversion

Convert an amount between two currencies with one call. Rates come from
[Frankfurter](https://www.frankfurter.app/) (MIT, ECB reference rates, no API
key) by default, every call returns a
[Safe Result](/guides/errors) and nothing throws. The five flat helpers cover the
usual jobs; the `CurrencyConverterService` facade underneath exposes the rest
(cache control, snapshots, provider injection).

```ts
import {
  useConvertCurrency,
  useGetExchangeRate,
  useRefreshExchangeRates,
  useSubscribeRates,
  useCurrencyConverter,
} from "katanakit-js";
```

## 1. Convert an amount

`useConvertCurrency()` returns the math plus the rate and date it came from. It
**converts and does not format** — rendering is
[`useFormatCurrency()`](/guides/services/formatter)'s job, and the two compose:

```ts
import { useConvertCurrency, useFormatCurrency } from "katanakit-js";

const result = await useConvertCurrency({ amount: 100, from: "USD", to: "EUR" });

if (result.ok) {
  result.data.converted; // 88.87 — money: exactly 2 decimals
  result.data.rate;      // 0.88865 — full precision from the source
  result.data.date;      // "2026-10-16" — the day the rate belongs to

  const shown = useFormatCurrency({
    amount: result.data.converted,
    currency: result.data.to,
    locale: "es",
    digits: 2,
  });
  console.log(shown); // "88,87 €"
}
```

Two rules to remember:

- **`converted` is money.** It is rounded to exactly 2 decimals with
  `Intl.NumberFormat` (symmetric half-expand), so `1.005` rounds to `1.01` on
  both sides of zero. `rate` keeps the full source precision — multiply and
  round yourself only if you need more than 2 decimals.
- **`date` is the rate's day, not today's.** Display it next to the amount
  whenever the number is on an invoice or a report.

Pass `digits: 2` to `useFormatCurrency()` when you want two decimals on a
zero-decimal currency like JPY. Conversion and formatting stay separate on
purpose: one produces the number, the other decides how it looks — see
[Formatter](/guides/services/formatter).

## 2. Branch on the Safe Result

Every helper resolves to `{ data, error, ok }` and never throws, so the failure
modes are values you can log, render or retry:

```ts
const result = await useConvertCurrency({ amount: 100, from: "USD", to: "ARS" });

if (!result.ok) {
  // result.error.message — what happened
  // result.error.status  — 400 bad input, 404 no rate for the pair,
  //                        or the source's own HTTP status
  showError(result.error.message);
}
```

| Failure | `status` | What to do |
| --- | --- | --- |
| `amount` is `NaN` / `Infinity` | `400` | Fix the input before calling. |
| The source has no rate for the pair | `404` | See [rate coverage](#rate-coverage) below. |
| Network or source failure | source's status | Retry or fall back; subscribe to `onRatesError` to observe it. |

Converting a currency into itself (`from === to`) succeeds with `rate: 1`
without making any request.

## 3. Read a rate and control the cache

`useGetExchangeRate()` returns just the rate. Rates are cached as **one snapshot
quoted against a pivot currency** (USD by default) with a TTL of 10 minutes, and
concurrent calls collapse into a single request:

```ts
import { useCurrencyConverter, useGetExchangeRate, useRefreshExchangeRates } from "katanakit-js";

const rate = await useGetExchangeRate("USD", "EUR");
if (rate.ok) console.log(rate.data); // 0.89087

// Tune the cache once, at startup:
useCurrencyConverter({ ttlMs: 5 * 60 * 1000 }); // 5 minutes
// ttlMs: 0 → cached until you clear it explicitly.

// Bypass the cache when you need a fresh quote now:
await useRefreshExchangeRates();
```

### Why a pivot?

Sources round their quotes — Frankfurter keeps 5 decimal places — so a small
quote arrives already short of digits: `KRW → USD` is published as `0.00075`
when the rate is `0.00075217`. On 1M KRW that is 750.00 USD instead of 752.17.

So every rate is stored against **one pivot** and each pair is resolved by
division: `rate(A → B) = pivot[B] / pivot[A]`. The rounding then sits on the
well-conditioned side of the pair, and both directions are exactly reciprocal —
`rate(A→B) × rate(B→A) = 1`, with no drift between them. Move the pivot closer
to your usual pairs with `useCurrencyConverter({ pivot: "EUR" })`, or set it on
`CurrencyConverterService.create({ pivot })`.

The facade gives you the remaining cache controls: `useGetSnapshot()` reads the
cached snapshot without fetching, and `useClearCache()` drops everything
(including responses that are still in flight).

## 4. Subscribe to rate updates

The service is an Observer: `useSubscribeRates()` registers callbacks and
returns an unsubscribe function. Handlers named `on*` are callbacks the service
invokes — they are the only `on*` surface in the kit.

```ts
import { useSubscribeRates } from "katanakit-js";

const off = useSubscribeRates({
  onRatesUpdate: (snapshot) => render(snapshot.rates, snapshot.date),
  onRatesError: (error) => console.warn("rates unavailable", error.message),
});

// Later — for example in a component teardown:
off();
```

`onRatesUpdate` fires whenever a snapshot is stored in the cache — after any
fetch triggered by a conversion, `useGetExchangeRate()` or
`useRefreshExchangeRates()`. A throwing handler is logged and does not affect
the other subscribers.

## 5. Swap the provider for live-market rates

The default source is ECB reference data (see [rate coverage](#rate-coverage)).
For a live-market quote, implement the `ICurrencyRateProvider` port and inject
it — no service code changes:

```ts
import {
  useCurrencyConverter,
  type Currency,
  type CurrencyRateSnapshot,
  type ICurrencyRateProvider,
  type SafeResult,
} from "katanakit-js";

const liveRates: ICurrencyRateProvider = {
  async useFetchRates(base: Currency): Promise<SafeResult<CurrencyRateSnapshot>> {
    // Call your provider here. Return a Safe Result — never throw.
    return { data: { base, date: "2026-10-19", rates: {} }, error: null, ok: true };
  },
};

useCurrencyConverter({ provider: liveRates });
```

Equivalent injection points, pick one:

```ts
import { CurrencyConverterService } from "katanakit-js";

// Isolated instance (tests, per-request clients):
const currency = CurrencyConverterService.create({ provider: liveRates });

// Or the shared singleton:
CurrencyConverterService.getInstance().useSetProvider(liveRates);
```

Injecting a provider **drops the cache**: every stored snapshot came from the
previous source. `useCurrencyConverter()` is idempotent and never replaces a
provider you injected yourself.

## Rate coverage

The kit typechecks **33 currencies**: the 30 the ECB source covers, plus `ARS`,
`COP` and `CLP` for formatting.

- **Majors** — `USD`, `EUR`, `GBP`, `JPY`, `CHF`, `CAD`, `AUD`, `NZD`.
- **Americas** — `MXN`, `BRL`, `ARS`, `COP`, `CLP`.
- **Europe, non-euro** — `SEK`, `NOK`, `DKK`, `PLN`, `CZK`, `HUF`, `RON`, `TRY`, `ISK`.
- **Asia-Pacific & Middle East** — `CNY`, `HKD`, `SGD`, `INR`, `KRW`, `THB`, `IDR`, `MYR`, `PHP`, `ILS`.
- **Africa** — `ZAR`.

Frankfurter covers the ECB set — **not** `ARS`, `COP` or `CLP`. Pairs involving
those three return an explicit `404` error instead of a wrong number; that is
the deal, and the provider swap above is the escape hatch. Formatting
(`useFormatCurrency`) works for all 33.

::: warning These are reference rates, not a forex quote
The default source returns **ECB daily reference rates**: published around
14:15 CET on working days (not on weekends or ECB holidays), with no intraday
updates and no bid/ask spread. They are reliable for accounting, invoicing and
reporting — where `date` tells you exactly which day you settled against — but
they are **not** a trading quote. When you need one, inject a live-market
provider (step 5).
:::

## Gotcha: the canonical host

`api.frankfurter.app` answers with a `301` redirect to `api.frankfurter.dev/v1`,
and the kit's fetch manager fails closed on redirects (anti-SSRF). The bundled
adapter therefore targets the canonical `https://api.frankfurter.dev/v1` host,
where no redirect is ever issued. Keep this in mind if you write your own
Frankfurter client on top of the kit's HTTP API.

## Related

- [Errors & Results](/guides/errors) — the Safe Result contract in depth.
- [ADR-0015](/explanation/decisions/adr-0015-cross-rates-through-a-pivot) — why
  pairs divide through a pivot instead of consuming the source's quote.
- [ADR-0014](/explanation/decisions/adr-0014-frankfurter-ecb-rates) — why ECB
  reference rates, and the provider port as the escape hatch.
- [Formatter](/guides/services/formatter) — `useFormatCurrency()` and the
  `digits` option.
- [Service architecture](/explanation/service-architecture) — why the rate
  source is a port and the adapter lives in `src/infrastructure/`.
- [ADR-0014: Frankfurter/ECB rates behind a provider port](/explanation/decisions/adr-0014-frankfurter-ecb-rates) —
  the decision record behind the default source.
- [API Reference](/api/) — every export, generated from source.
