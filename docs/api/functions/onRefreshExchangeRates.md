[katanakit-js](../index.md) / onRefreshExchangeRates

# Function: onRefreshExchangeRates()

```ts
function onRefreshExchangeRates(): Promise<SafeResult<{
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

Defined in: [infrastructure/currency/currency.service.ts:113](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/currency/currency.service.ts#L113)

Forces a rate refresh, bypassing the cache. Subscribers get `onRatesUpdate`.

## Returns

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

## Example

```ts
await onRefreshExchangeRates();
```
