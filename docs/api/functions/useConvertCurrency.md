[katanakit-js](../index.md) / useConvertCurrency

# Function: useConvertCurrency()

```ts
function useConvertCurrency(options): Promise<SafeResult<{
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

Defined in: [infrastructure/currency/currency.service.ts:74](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/currency/currency.service.ts#L74)

Converts an amount between two currencies against ECB reference rates.

Conversion and formatting are separate concerns: this returns numbers, and
[useFormatCurrency](useFormatCurrency.md) turns them into display strings.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `amount`: `number`; `from`: \| `"USD"` \| `"EUR"` \| `"GBP"` \| `"JPY"` \| `"CHF"` \| `"CAD"` \| `"AUD"` \| `"NZD"` \| `"MXN"` \| `"BRL"` \| `"ARS"` \| `"COP"` \| `"CLP"` \| `"SEK"` \| `"NOK"` \| `"DKK"` \| `"PLN"` \| `"CZK"` \| `"HUF"` \| `"RON"` \| `"TRY"` \| `"ISK"` \| `"CNY"` \| `"HKD"` \| `"SGD"` \| `"INR"` \| `"KRW"` \| `"THB"` \| `"IDR"` \| `"MYR"` \| `"PHP"` \| `"ILS"` \| `"ZAR"`; `to`: \| `"USD"` \| `"EUR"` \| `"GBP"` \| `"JPY"` \| `"CHF"` \| `"CAD"` \| `"AUD"` \| `"NZD"` \| `"MXN"` \| `"BRL"` \| `"ARS"` \| `"COP"` \| `"CLP"` \| `"SEK"` \| `"NOK"` \| `"DKK"` \| `"PLN"` \| `"CZK"` \| `"HUF"` \| `"RON"` \| `"TRY"` \| `"ISK"` \| `"CNY"` \| `"HKD"` \| `"SGD"` \| `"INR"` \| `"KRW"` \| `"THB"` \| `"IDR"` \| `"MYR"` \| `"PHP"` \| `"ILS"` \| `"ZAR"`; \} | Amount, source and target currency. |
| `options.amount` | `number` | Amount to convert, in units of `from`. |
| `options.from` | \| `"USD"` \| `"EUR"` \| `"GBP"` \| `"JPY"` \| `"CHF"` \| `"CAD"` \| `"AUD"` \| `"NZD"` \| `"MXN"` \| `"BRL"` \| `"ARS"` \| `"COP"` \| `"CLP"` \| `"SEK"` \| `"NOK"` \| `"DKK"` \| `"PLN"` \| `"CZK"` \| `"HUF"` \| `"RON"` \| `"TRY"` \| `"ISK"` \| `"CNY"` \| `"HKD"` \| `"SGD"` \| `"INR"` \| `"KRW"` \| `"THB"` \| `"IDR"` \| `"MYR"` \| `"PHP"` \| `"ILS"` \| `"ZAR"` | Source currency. |
| `options.to` | \| `"USD"` \| `"EUR"` \| `"GBP"` \| `"JPY"` \| `"CHF"` \| `"CAD"` \| `"AUD"` \| `"NZD"` \| `"MXN"` \| `"BRL"` \| `"ARS"` \| `"COP"` \| `"CLP"` \| `"SEK"` \| `"NOK"` \| `"DKK"` \| `"PLN"` \| `"CZK"` \| `"HUF"` \| `"RON"` \| `"TRY"` \| `"ISK"` \| `"CNY"` \| `"HKD"` \| `"SGD"` \| `"INR"` \| `"KRW"` \| `"THB"` \| `"IDR"` \| `"MYR"` \| `"PHP"` \| `"ILS"` \| `"ZAR"` | Target currency. |

## Returns

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

`{ data, error, ok }` — never throws. `converted` has exactly 2
decimals; `rate` keeps the full precision the source reported.

## Example

```ts
import { useConvertCurrency, useFormatCurrency } from "katanakit-js";

const result = await useConvertCurrency({ amount: 100, from: "USD", to: "EUR" });
if (result.ok) {
  console.log(result.data.converted, result.data.date);
  console.log(useFormatCurrency({ amount: result.data.converted, currency: "EUR", locale: "es", digits: 2 }));
  // "88,87 €"
}
```
