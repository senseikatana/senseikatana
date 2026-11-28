[katanakit-js](../index.md) / onFormatCurrency

# Function: onFormatCurrency()

```ts
function onFormatCurrency(options): string;
```

Defined in: [core/services/formatter.service.ts:267](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/formatter.service.ts#L267)

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `amount`: `number`; `currency?`: \| `"USD"` \| `"EUR"` \| `"GBP"` \| `"JPY"` \| `"CHF"` \| `"CAD"` \| `"AUD"` \| `"NZD"` \| `"MXN"` \| `"BRL"` \| `"ARS"` \| `"COP"` \| `"CLP"` \| `"SEK"` \| `"NOK"` \| `"DKK"` \| `"PLN"` \| `"CZK"` \| `"HUF"` \| `"RON"` \| `"TRY"` \| `"ISK"` \| `"CNY"` \| `"HKD"` \| `"SGD"` \| `"INR"` \| `"KRW"` \| `"THB"` \| `"IDR"` \| `"MYR"` \| `"PHP"` \| `"ILS"` \| `"ZAR"`; `digits?`: `number`; `locale?`: `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"`; `taxes?`: `number`; \} | - |
| `options.amount?` | `number` | - |
| `options.currency?` | \| `"USD"` \| `"EUR"` \| `"GBP"` \| `"JPY"` \| `"CHF"` \| `"CAD"` \| `"AUD"` \| `"NZD"` \| `"MXN"` \| `"BRL"` \| `"ARS"` \| `"COP"` \| `"CLP"` \| `"SEK"` \| `"NOK"` \| `"DKK"` \| `"PLN"` \| `"CZK"` \| `"HUF"` \| `"RON"` \| `"TRY"` \| `"ISK"` \| `"CNY"` \| `"HKD"` \| `"SGD"` \| `"INR"` \| `"KRW"` \| `"THB"` \| `"IDR"` \| `"MYR"` \| `"PHP"` \| `"ILS"` \| `"ZAR"` | - |
| `options.digits?` | `number` | Exact number of fraction digits in the output. Omit it to keep each currency's own digits as `Intl` defines them (`"¥100"`, `"$1.00"`); pass `2` to pin exactly two decimals (`"¥100.00"`). |
| `options.locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` | - |
| `options.taxes?` | `number` | Tax rate: percentage when `> 1` (e.g. `21` → 21%), or decimal fraction when in `(0, 1]` (e.g. `0.21` → 21%). Prefer a fraction for rates ≤ 1%. |

## Returns

`string`
