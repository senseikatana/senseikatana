[katanakit-js](../index.md) / useRefreshExchangeRates

# Function: useRefreshExchangeRates()

```ts
function useRefreshExchangeRates(): Promise<SafeResult<{
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

Defined in: [infrastructure/currency/currency.service.ts:113](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/currency/currency.service.ts#L113)

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
await useRefreshExchangeRates();
```
