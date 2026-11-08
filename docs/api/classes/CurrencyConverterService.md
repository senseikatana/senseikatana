[katanakit-js](../index.md) / CurrencyConverterService

# Class: CurrencyConverterService

Defined in: [core/services/currency.service.ts:82](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/currency.service.ts#L82)

CurrencyConverterService — Singleton facade for currency conversion against
**external exchange rates**.

Applies four patterns at once:

- **Singleton** — one shared instance via [CurrencyConverterService.getInstance](#getinstance).
- **Facade** — one call converts an amount; rate fetching, caching and math
  stay behind it.
- **Observer** — subscribers get `onRatesUpdate` / `onRatesError` callbacks
  whenever rates change. Those handlers are the only `on*` surface in the
  kit: `on*` marks *a callback the service invokes*, never a method you call.
- **Dependency Injection** — the rate source is an [ICurrencyRateProvider](../interfaces/ICurrencyRateProvider.md)
  port, injected through [CurrencyConverterService.create](#create) or
  [CurrencyConverterService.useSetProvider](#usesetprovider). The default implementation
  lives in `src/infrastructure/` (runtime I/O stays out of the core), and the
  `useCurrencyConverter()` helper wires it for you.

Every fallible call returns a [SafeResult](../type-aliases/SafeResult.md) — this service never throws.
`converted` is money: rounded to exactly 2 decimals with `Intl`'s symmetric
half-expand rule. `rate` keeps the full precision the source reported, so
chained arithmetic multiplies instead of re-fetching.

This service **converts and never formats**. Presentation is a separate
responsibility owned by [FormatterService](FormatterService.md); compose the two when you
need a string (`useFormatCurrency({ amount: converted, currency: to })`).

## Example

```ts
import { useCurrencyConverter, useConvertCurrency } from "katanakit-js";

// One-shot helper (wires the Frankfurter provider on first call):
const result = await useConvertCurrency({ amount: 100, from: "USD", to: "EUR" });
if (result.ok) console.log(result.data.converted, result.data.rate);

// Or hold the facade and subscribe to rate updates (Observer):
const currency = useCurrencyConverter();
const unsubscribe = currency.useSubscribe({
  onRatesUpdate: (snapshot) => console.log("rates for", snapshot.date),
});
```

## Implements

- [`ICurrencyConverterService`](../interfaces/ICurrencyConverterService.md)

## Methods

### useClearCache()

```ts
useClearCache(): void;
```

Defined in: [core/services/currency.service.ts:300](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/currency.service.ts#L300)

Drops every cached snapshot. In-flight responses are discarded too: they
were requested before the drop and must not repopulate the cache.

#### Returns

`void`

***

### useConvert()

```ts
useConvert(options): Promise<SafeResult<{
  amount: number;
  converted: number;
  date: string;
  from:   | "USD"
     | "EUR"
     | "GBP"
     | "JPY"
     | "CHF"
     | "CAD"
     | "AUD"
     | "NZD"
     | "MXN"
     | "BRL"
     | "ARS"
     | "COP"
     | "CLP"
     | "SEK"
     | "NOK"
     | "DKK"
     | "PLN"
     | "CZK"
     | "HUF"
     | "RON"
     | "TRY"
     | "ISK"
     | "CNY"
     | "HKD"
     | "SGD"
     | "INR"
     | "KRW"
     | "THB"
     | "IDR"
     | "MYR"
     | "PHP"
     | "ILS"
     | "ZAR";
  rate: number;
  to:   | "USD"
     | "EUR"
     | "GBP"
     | "JPY"
     | "CHF"
     | "CAD"
     | "AUD"
     | "NZD"
     | "MXN"
     | "BRL"
     | "ARS"
     | "COP"
     | "CLP"
     | "SEK"
     | "NOK"
     | "DKK"
     | "PLN"
     | "CZK"
     | "HUF"
     | "RON"
     | "TRY"
     | "ISK"
     | "CNY"
     | "HKD"
     | "SGD"
     | "INR"
     | "KRW"
     | "THB"
     | "IDR"
     | "MYR"
     | "PHP"
     | "ILS"
     | "ZAR";
}>>;
```

Defined in: [core/services/currency.service.ts:207](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/currency.service.ts#L207)

Converts an amount between two currencies.

Uses cached rates when fresh (see `ttlMs`); otherwise fetches them first.
`rate` keeps the full precision the source reported, while `converted` is
rounded to **exactly 2 decimals** (money). `date` is the ISO date the rate
belongs to.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `amount`: `number`; `from`: \| `"USD"` \| `"EUR"` \| `"GBP"` \| `"JPY"` \| `"CHF"` \| `"CAD"` \| `"AUD"` \| `"NZD"` \| `"MXN"` \| `"BRL"` \| `"ARS"` \| `"COP"` \| `"CLP"` \| `"SEK"` \| `"NOK"` \| `"DKK"` \| `"PLN"` \| `"CZK"` \| `"HUF"` \| `"RON"` \| `"TRY"` \| `"ISK"` \| `"CNY"` \| `"HKD"` \| `"SGD"` \| `"INR"` \| `"KRW"` \| `"THB"` \| `"IDR"` \| `"MYR"` \| `"PHP"` \| `"ILS"` \| `"ZAR"`; `to`: \| `"USD"` \| `"EUR"` \| `"GBP"` \| `"JPY"` \| `"CHF"` \| `"CAD"` \| `"AUD"` \| `"NZD"` \| `"MXN"` \| `"BRL"` \| `"ARS"` \| `"COP"` \| `"CLP"` \| `"SEK"` \| `"NOK"` \| `"DKK"` \| `"PLN"` \| `"CZK"` \| `"HUF"` \| `"RON"` \| `"TRY"` \| `"ISK"` \| `"CNY"` \| `"HKD"` \| `"SGD"` \| `"INR"` \| `"KRW"` \| `"THB"` \| `"IDR"` \| `"MYR"` \| `"PHP"` \| `"ILS"` \| `"ZAR"`; \} | Amount, source and target currency. |
| `options.amount` | `number` | Amount to convert, in units of `from`. |
| `options.from` | \| `"USD"` \| `"EUR"` \| `"GBP"` \| `"JPY"` \| `"CHF"` \| `"CAD"` \| `"AUD"` \| `"NZD"` \| `"MXN"` \| `"BRL"` \| `"ARS"` \| `"COP"` \| `"CLP"` \| `"SEK"` \| `"NOK"` \| `"DKK"` \| `"PLN"` \| `"CZK"` \| `"HUF"` \| `"RON"` \| `"TRY"` \| `"ISK"` \| `"CNY"` \| `"HKD"` \| `"SGD"` \| `"INR"` \| `"KRW"` \| `"THB"` \| `"IDR"` \| `"MYR"` \| `"PHP"` \| `"ILS"` \| `"ZAR"` | Source currency. |
| `options.to` | \| `"USD"` \| `"EUR"` \| `"GBP"` \| `"JPY"` \| `"CHF"` \| `"CAD"` \| `"AUD"` \| `"NZD"` \| `"MXN"` \| `"BRL"` \| `"ARS"` \| `"COP"` \| `"CLP"` \| `"SEK"` \| `"NOK"` \| `"DKK"` \| `"PLN"` \| `"CZK"` \| `"HUF"` \| `"RON"` \| `"TRY"` \| `"ISK"` \| `"CNY"` \| `"HKD"` \| `"SGD"` \| `"INR"` \| `"KRW"` \| `"THB"` \| `"IDR"` \| `"MYR"` \| `"PHP"` \| `"ILS"` \| `"ZAR"` | Target currency. |

#### Returns

`Promise`\<[`SafeResult`](../type-aliases/SafeResult.md)\<\{
  `amount`: `number`;
  `converted`: `number`;
  `date`: `string`;
  `from`:   \| `"USD"`
     \| `"EUR"`
     \| `"GBP"`
     \| `"JPY"`
     \| `"CHF"`
     \| `"CAD"`
     \| `"AUD"`
     \| `"NZD"`
     \| `"MXN"`
     \| `"BRL"`
     \| `"ARS"`
     \| `"COP"`
     \| `"CLP"`
     \| `"SEK"`
     \| `"NOK"`
     \| `"DKK"`
     \| `"PLN"`
     \| `"CZK"`
     \| `"HUF"`
     \| `"RON"`
     \| `"TRY"`
     \| `"ISK"`
     \| `"CNY"`
     \| `"HKD"`
     \| `"SGD"`
     \| `"INR"`
     \| `"KRW"`
     \| `"THB"`
     \| `"IDR"`
     \| `"MYR"`
     \| `"PHP"`
     \| `"ILS"`
     \| `"ZAR"`;
  `rate`: `number`;
  `to`:   \| `"USD"`
     \| `"EUR"`
     \| `"GBP"`
     \| `"JPY"`
     \| `"CHF"`
     \| `"CAD"`
     \| `"AUD"`
     \| `"NZD"`
     \| `"MXN"`
     \| `"BRL"`
     \| `"ARS"`
     \| `"COP"`
     \| `"CLP"`
     \| `"SEK"`
     \| `"NOK"`
     \| `"DKK"`
     \| `"PLN"`
     \| `"CZK"`
     \| `"HUF"`
     \| `"RON"`
     \| `"TRY"`
     \| `"ISK"`
     \| `"CNY"`
     \| `"HKD"`
     \| `"SGD"`
     \| `"INR"`
     \| `"KRW"`
     \| `"THB"`
     \| `"IDR"`
     \| `"MYR"`
     \| `"PHP"`
     \| `"ILS"`
     \| `"ZAR"`;
\}\>\>

`{ data, error, ok }` — never throws.

#### Example

```ts
const result = await useConvertCurrency({ amount: 100, from: "USD", to: "EUR" });
// result.ok → { amount: 100, from: "USD", to: "EUR", rate: 0.88865, converted: 88.87, date: "2026-10-16" }
```

#### Implementation of

[`ICurrencyConverterService`](../interfaces/ICurrencyConverterService.md).[`useConvert`](../interfaces/ICurrencyConverterService.md#useconvert)

***

### useGetRate()

```ts
useGetRate(from, to): Promise<SafeResult<number>>;
```

Defined in: [core/services/currency.service.ts:267](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/currency.service.ts#L267)

Returns the exchange rate between two currencies.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `from` | \| `"USD"` \| `"EUR"` \| `"GBP"` \| `"JPY"` \| `"CHF"` \| `"CAD"` \| `"AUD"` \| `"NZD"` \| `"MXN"` \| `"BRL"` \| `"ARS"` \| `"COP"` \| `"CLP"` \| `"SEK"` \| `"NOK"` \| `"DKK"` \| `"PLN"` \| `"CZK"` \| `"HUF"` \| `"RON"` \| `"TRY"` \| `"ISK"` \| `"CNY"` \| `"HKD"` \| `"SGD"` \| `"INR"` \| `"KRW"` \| `"THB"` \| `"IDR"` \| `"MYR"` \| `"PHP"` \| `"ILS"` \| `"ZAR"` | Source currency. |
| `to` | \| `"USD"` \| `"EUR"` \| `"GBP"` \| `"JPY"` \| `"CHF"` \| `"CAD"` \| `"AUD"` \| `"NZD"` \| `"MXN"` \| `"BRL"` \| `"ARS"` \| `"COP"` \| `"CLP"` \| `"SEK"` \| `"NOK"` \| `"DKK"` \| `"PLN"` \| `"CZK"` \| `"HUF"` \| `"RON"` \| `"TRY"` \| `"ISK"` \| `"CNY"` \| `"HKD"` \| `"SGD"` \| `"INR"` \| `"KRW"` \| `"THB"` \| `"IDR"` \| `"MYR"` \| `"PHP"` \| `"ILS"` \| `"ZAR"` | Target currency. |

#### Returns

`Promise`\<[`SafeResult`](../type-aliases/SafeResult.md)\<`number`\>\>

`{ data, error, ok }` — never throws.

#### Example

```ts
const rate = await useGetExchangeRate("USD", "EUR");
// rate.ok → 0.92
```

#### Implementation of

[`ICurrencyConverterService`](../interfaces/ICurrencyConverterService.md).[`useGetRate`](../interfaces/ICurrencyConverterService.md#usegetrate)

***

### useGetSnapshot()

```ts
useGetSnapshot(): 
  | {
  base:   | "USD"
     | "EUR"
     | "GBP"
     | "JPY"
     | "CHF"
     | "CAD"
     | "AUD"
     | "NZD"
     | "MXN"
     | "BRL"
     | "ARS"
     | "COP"
     | "CLP"
     | "SEK"
     | "NOK"
     | "DKK"
     | "PLN"
     | "CZK"
     | "HUF"
     | "RON"
     | "TRY"
     | "ISK"
     | "CNY"
     | "HKD"
     | "SGD"
     | "INR"
     | "KRW"
     | "THB"
     | "IDR"
     | "MYR"
     | "PHP"
     | "ILS"
     | "ZAR";
  date: string;
  rates: Record<string, number>;
}
  | null;
```

Defined in: [core/services/currency.service.ts:292](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/currency.service.ts#L292)

Returns the cached snapshot without fetching — every rate quoted against
the pivot currency.

#### Returns

The cached snapshot, or `null` when nothing was fetched yet.

##### Type Literal

```ts
{
  base:   | "USD"
     | "EUR"
     | "GBP"
     | "JPY"
     | "CHF"
     | "CAD"
     | "AUD"
     | "NZD"
     | "MXN"
     | "BRL"
     | "ARS"
     | "COP"
     | "CLP"
     | "SEK"
     | "NOK"
     | "DKK"
     | "PLN"
     | "CZK"
     | "HUF"
     | "RON"
     | "TRY"
     | "ISK"
     | "CNY"
     | "HKD"
     | "SGD"
     | "INR"
     | "KRW"
     | "THB"
     | "IDR"
     | "MYR"
     | "PHP"
     | "ILS"
     | "ZAR";
  date: string;
  rates: Record<string, number>;
}
```

###### base

```ts
base: 
  | "USD"
  | "EUR"
  | "GBP"
  | "JPY"
  | "CHF"
  | "CAD"
  | "AUD"
  | "NZD"
  | "MXN"
  | "BRL"
  | "ARS"
  | "COP"
  | "CLP"
  | "SEK"
  | "NOK"
  | "DKK"
  | "PLN"
  | "CZK"
  | "HUF"
  | "RON"
  | "TRY"
  | "ISK"
  | "CNY"
  | "HKD"
  | "SGD"
  | "INR"
  | "KRW"
  | "THB"
  | "IDR"
  | "MYR"
  | "PHP"
  | "ILS"
  | "ZAR" = CurrencySchema;
```

Base currency the rates are quoted against.

###### date

```ts
date: string;
```

ISO date (`YYYY-MM-DD`) the rates belong to.

###### rates

```ts
rates: Record<string, number>;
```

Quote currency → units of quote per 1 unit of `base`. Keys are the source's
own vocabulary (loose on purpose: providers know currencies this kit does
not, and an unknown key must not invalidate the snapshot).

***

`null`

#### Implementation of

[`ICurrencyConverterService`](../interfaces/ICurrencyConverterService.md).[`useGetSnapshot`](../interfaces/ICurrencyConverterService.md#usegetsnapshot)

***

### useHasProvider()

```ts
useHasProvider(): boolean;
```

Defined in: [core/services/currency.service.ts:158](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/currency.service.ts#L158)

Whether a rate source is already injected.

Wiring helpers use it to install a default provider only when none is
configured, so a custom one is never clobbered.

#### Returns

`boolean`

***

### useRefreshRates()

```ts
useRefreshRates(): Promise<SafeResult<{
  base:   | "USD"
     | "EUR"
     | "GBP"
     | "JPY"
     | "CHF"
     | "CAD"
     | "AUD"
     | "NZD"
     | "MXN"
     | "BRL"
     | "ARS"
     | "COP"
     | "CLP"
     | "SEK"
     | "NOK"
     | "DKK"
     | "PLN"
     | "CZK"
     | "HUF"
     | "RON"
     | "TRY"
     | "ISK"
     | "CNY"
     | "HKD"
     | "SGD"
     | "INR"
     | "KRW"
     | "THB"
     | "IDR"
     | "MYR"
     | "PHP"
     | "ILS"
     | "ZAR";
  date: string;
  rates: Record<string, number>;
}>>;
```

Defined in: [core/services/currency.service.ts:282](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/currency.service.ts#L282)

Forces a rate refresh, bypassing the cache (Observer fires `onRatesUpdate`
when it succeeds).

#### Returns

`Promise`\<[`SafeResult`](../type-aliases/SafeResult.md)\<\{
  `base`:   \| `"USD"`
     \| `"EUR"`
     \| `"GBP"`
     \| `"JPY"`
     \| `"CHF"`
     \| `"CAD"`
     \| `"AUD"`
     \| `"NZD"`
     \| `"MXN"`
     \| `"BRL"`
     \| `"ARS"`
     \| `"COP"`
     \| `"CLP"`
     \| `"SEK"`
     \| `"NOK"`
     \| `"DKK"`
     \| `"PLN"`
     \| `"CZK"`
     \| `"HUF"`
     \| `"RON"`
     \| `"TRY"`
     \| `"ISK"`
     \| `"CNY"`
     \| `"HKD"`
     \| `"SGD"`
     \| `"INR"`
     \| `"KRW"`
     \| `"THB"`
     \| `"IDR"`
     \| `"MYR"`
     \| `"PHP"`
     \| `"ILS"`
     \| `"ZAR"`;
  `date`: `string`;
  `rates`: `Record`\<`string`, `number`\>;
\}\>\>

`{ data, error, ok }` with the snapshot quoted against the pivot.
Never throws.

#### Implementation of

[`ICurrencyConverterService`](../interfaces/ICurrencyConverterService.md).[`useRefreshRates`](../interfaces/ICurrencyConverterService.md#userefreshrates)

***

### useSetProvider()

```ts
useSetProvider(provider): void;
```

Defined in: [core/services/currency.service.ts:146](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/currency.service.ts#L146)

Swaps the rate source at runtime (DI).

Drops the cache: every stored snapshot came from the previous source, so
keeping it would silently serve rates the new provider never confirmed.
Re-setting the *same* provider is a no-op, so a per-call wiring helper
cannot defeat the cache. In-flight responses from the previous provider
are discarded instead of written.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `provider` | [`ICurrencyRateProvider`](../interfaces/ICurrencyRateProvider.md) | The new [ICurrencyRateProvider](../interfaces/ICurrencyRateProvider.md). |

#### Returns

`void`

***

### useSetTtlMs()

```ts
useSetTtlMs(ttlMs): void;
```

Defined in: [core/services/currency.service.ts:167](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/currency.service.ts#L167)

Changes the cache time-to-live at runtime.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ttlMs` | `number` | New TTL in milliseconds. `0` caches until `useClearCache()`. |

#### Returns

`void`

***

### useSubscribe()

```ts
useSubscribe(events): () => void;
```

Defined in: [core/services/currency.service.ts:183](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/currency.service.ts#L183)

Subscribes to rate events (Observer).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `events` | [`CurrencyRateEvents`](../interfaces/CurrencyRateEvents.md) | Handlers; `onRatesUpdate` and/or `onRatesError`. |

#### Returns

An unsubscribe function.

() => `void`

#### Example

```ts
const off = currency.useSubscribe({ onRatesUpdate: (s) => render(s) });
off();
```

#### Implementation of

[`ICurrencyConverterService`](../interfaces/ICurrencyConverterService.md).[`useSubscribe`](../interfaces/ICurrencyConverterService.md#usesubscribe)

***

### create()

```ts
static create(options?): CurrencyConverterService;
```

Defined in: [core/services/currency.service.ts:131](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/currency.service.ts#L131)

Creates a NO-singleton instance with injected dependencies (DI).
Useful for tests and for custom rate sources.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`CurrencyConverterServiceOptions`](../interfaces/CurrencyConverterServiceOptions.md) | Provider, formatter and cache TTL to inject. |

#### Returns

`CurrencyConverterService`

A new CurrencyConverterService.

#### Example

```ts
const currency = CurrencyConverterService.create({ provider: fakeRates });
```

***

### getInstance()

```ts
static getInstance(): CurrencyConverterService;
```

Defined in: [core/services/currency.service.ts:112](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/currency.service.ts#L112)

Returns the shared instance (Singleton).

#### Returns

`CurrencyConverterService`
