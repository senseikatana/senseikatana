[katanakit-js](../index.md) / useGetExchangeRate

# Function: useGetExchangeRate()

```ts
function useGetExchangeRate(from, to): Promise<SafeResult<number>>;
```

Defined in: [infrastructure/currency/currency.service.ts:95](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/currency/currency.service.ts#L95)

Returns the exchange rate between two currencies.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `from` | \| `"USD"` \| `"EUR"` \| `"GBP"` \| `"JPY"` \| `"CHF"` \| `"CAD"` \| `"AUD"` \| `"NZD"` \| `"MXN"` \| `"BRL"` \| `"ARS"` \| `"COP"` \| `"CLP"` \| `"SEK"` \| `"NOK"` \| `"DKK"` \| `"PLN"` \| `"CZK"` \| `"HUF"` \| `"RON"` \| `"TRY"` \| `"ISK"` \| `"CNY"` \| `"HKD"` \| `"SGD"` \| `"INR"` \| `"KRW"` \| `"THB"` \| `"IDR"` \| `"MYR"` \| `"PHP"` \| `"ILS"` \| `"ZAR"` | Source currency. |
| `to` | \| `"USD"` \| `"EUR"` \| `"GBP"` \| `"JPY"` \| `"CHF"` \| `"CAD"` \| `"AUD"` \| `"NZD"` \| `"MXN"` \| `"BRL"` \| `"ARS"` \| `"COP"` \| `"CLP"` \| `"SEK"` \| `"NOK"` \| `"DKK"` \| `"PLN"` \| `"CZK"` \| `"HUF"` \| `"RON"` \| `"TRY"` \| `"ISK"` \| `"CNY"` \| `"HKD"` \| `"SGD"` \| `"INR"` \| `"KRW"` \| `"THB"` \| `"IDR"` \| `"MYR"` \| `"PHP"` \| `"ILS"` \| `"ZAR"` | Target currency. |

## Returns

`Promise`\<[`SafeResult`](../type-aliases/SafeResult.md)\<`number`\>\>

`{ data, error, ok }` — never throws.

## Example

```ts
import { useGetExchangeRate } from "katanakit-js";

const rate = await useGetExchangeRate("USD", "EUR");
if (rate.ok) console.log(rate.data); // 0.88865
```
