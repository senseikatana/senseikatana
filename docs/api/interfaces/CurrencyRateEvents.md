[katanakit-js](../index.md) / CurrencyRateEvents

# Interface: CurrencyRateEvents

Defined in: [types/core/currency-conversion.ts:36](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/currency-conversion.ts#L36)

Observer callbacks fired by [ICurrencyConverterService](ICurrencyConverterService.md).

Event handlers are the one surface allowed outside the `use*` convention:
`on*` marks a **callback invoked by the service**, never a method you call
imperatively. Every handler is optional.

## Methods

### onRatesError()?

```ts
optional onRatesError(error): void;
```

Defined in: [types/core/currency-conversion.ts:40](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/currency-conversion.ts#L40)

Fired when a rate fetch fails.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | \{ `details?`: `unknown`; `message`: `string`; `status`: `number`; \} |
| `error.details?` | `unknown` |
| `error.message` | `string` |
| `error.status` | `number` |

#### Returns

`void`

***

### onRatesUpdate()?

```ts
optional onRatesUpdate(snapshot): void;
```

Defined in: [types/core/currency-conversion.ts:38](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/currency-conversion.ts#L38)

Fired after a rate snapshot has been stored in cache.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `snapshot` | \{ `base`: \| `"USD"` \| `"EUR"` \| `"GBP"` \| `"JPY"` \| `"CHF"` \| `"CAD"` \| `"AUD"` \| `"NZD"` \| `"MXN"` \| `"BRL"` \| `"ARS"` \| `"COP"` \| `"CLP"` \| `"SEK"` \| `"NOK"` \| `"DKK"` \| `"PLN"` \| `"CZK"` \| `"HUF"` \| `"RON"` \| `"TRY"` \| `"ISK"` \| `"CNY"` \| `"HKD"` \| `"SGD"` \| `"INR"` \| `"KRW"` \| `"THB"` \| `"IDR"` \| `"MYR"` \| `"PHP"` \| `"ILS"` \| `"ZAR"`; `date`: `string`; `rates`: `Record`\<`string`, `number`\>; \} | - |
| `snapshot.base` | \| `"USD"` \| `"EUR"` \| `"GBP"` \| `"JPY"` \| `"CHF"` \| `"CAD"` \| `"AUD"` \| `"NZD"` \| `"MXN"` \| `"BRL"` \| `"ARS"` \| `"COP"` \| `"CLP"` \| `"SEK"` \| `"NOK"` \| `"DKK"` \| `"PLN"` \| `"CZK"` \| `"HUF"` \| `"RON"` \| `"TRY"` \| `"ISK"` \| `"CNY"` \| `"HKD"` \| `"SGD"` \| `"INR"` \| `"KRW"` \| `"THB"` \| `"IDR"` \| `"MYR"` \| `"PHP"` \| `"ILS"` \| `"ZAR"` | Base currency the rates are quoted against. |
| `snapshot.date` | `string` | ISO date (`YYYY-MM-DD`) the rates belong to. |
| `snapshot.rates` | `Record`\<`string`, `number`\> | Quote currency → units of quote per 1 unit of `base`. Keys are the source's own vocabulary (loose on purpose: providers know currencies this kit does not, and an unknown key must not invalidate the snapshot). |

#### Returns

`void`
