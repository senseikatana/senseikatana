[katanakit-js](../index.md) / FrankfurterCurrencyProvider

# Class: FrankfurterCurrencyProvider

Defined in: [infrastructure/currency/frankfurter.service.ts:69](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/currency/frankfurter.service.ts#L69)

FrankfurterCurrencyProvider — rate source over **Frankfurter**, the open
source (MIT) API for European Central Bank reference rates. No API key, no
quota.

Implements the [ICurrencyRateProvider](../interfaces/ICurrencyRateProvider.md) port and performs the network
I/O through the kit's own API system (`FetchApiManager`), so it inherits the
request interceptors, the SSRF scheme allow-list and the Safe Result shape.

Rates are the **ECB daily reference rates**, published each working day at
around 14:15 CET and not updated on weekends or ECB holidays — `date` on the
snapshot is the day they belong to. They are the reference used for
accounting and invoicing, but they are not an intraday forex quote and carry
no bid/ask spread. Swap the provider through the port when you need live
market quotes.

## Remarks

Each configured host registers its own entry in the API registry
(keyed by base URI), so a self-hosted instance and the shared one never
overwrite each other. Frankfurter covers ~30 currencies and **does not
include `ARS`, `COP` or `CLP`** — conversions involving them fail with an
explicit `404` error instead of a silent wrong number.

## Example

```ts
import { FrankfurterCurrencyProvider, CurrencyConverterService } from "katanakit-js";

const currency = CurrencyConverterService.create({
  provider: FrankfurterCurrencyProvider.getInstance(),
});
```

## Implements

- [`ICurrencyRateProvider`](../interfaces/ICurrencyRateProvider.md)

## Methods

### useFetchRates()

```ts
useFetchRates(base, quotes?): Promise<SafeResult<{
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

Defined in: [infrastructure/currency/frankfurter.service.ts:116](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/currency/frankfurter.service.ts#L116)

Fetches ECB reference rates quoted against `base`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `base` | \| `"USD"` \| `"EUR"` \| `"GBP"` \| `"JPY"` \| `"CHF"` \| `"CAD"` \| `"AUD"` \| `"NZD"` \| `"MXN"` \| `"BRL"` \| `"ARS"` \| `"COP"` \| `"CLP"` \| `"SEK"` \| `"NOK"` \| `"DKK"` \| `"PLN"` \| `"CZK"` \| `"HUF"` \| `"RON"` \| `"TRY"` \| `"ISK"` \| `"CNY"` \| `"HKD"` \| `"SGD"` \| `"INR"` \| `"KRW"` \| `"THB"` \| `"IDR"` \| `"MYR"` \| `"PHP"` \| `"ILS"` \| `"ZAR"` | Currency the rates are quoted against. |
| `quotes?` | ( \| `"USD"` \| `"EUR"` \| `"GBP"` \| `"JPY"` \| `"CHF"` \| `"CAD"` \| `"AUD"` \| `"NZD"` \| `"MXN"` \| `"BRL"` \| `"ARS"` \| `"COP"` \| `"CLP"` \| `"SEK"` \| `"NOK"` \| `"DKK"` \| `"PLN"` \| `"CZK"` \| `"HUF"` \| `"RON"` \| `"TRY"` \| `"ISK"` \| `"CNY"` \| `"HKD"` \| `"SGD"` \| `"INR"` \| `"KRW"` \| `"THB"` \| `"IDR"` \| `"MYR"` \| `"PHP"` \| `"ILS"` \| `"ZAR"`)[] | Optional subset of quote currencies. Omit for every rate the source knows. |

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

`{ data, error, ok }` with the dated snapshot, or the source
failure. Never throws.

#### Implementation of

[`ICurrencyRateProvider`](../interfaces/ICurrencyRateProvider.md).[`useFetchRates`](../interfaces/ICurrencyRateProvider.md#usefetchrates)

***

### create()

```ts
static create(options?): FrankfurterCurrencyProvider;
```

Defined in: [infrastructure/currency/frankfurter.service.ts:104](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/currency/frankfurter.service.ts#L104)

Creates a NO-singleton instance with a custom base URI (DI).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`FrankfurterCurrencyProviderOptions`](../interfaces/FrankfurterCurrencyProviderOptions.md) | Wiring options. |

#### Returns

`FrankfurterCurrencyProvider`

A new FrankfurterCurrencyProvider.

***

### getInstance()

```ts
static getInstance(): FrankfurterCurrencyProvider;
```

Defined in: [infrastructure/currency/frankfurter.service.ts:91](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/currency/frankfurter.service.ts#L91)

Returns the shared instance (Singleton).

#### Returns

`FrankfurterCurrencyProvider`
