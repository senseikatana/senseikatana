[katanakit-js](../index.md) / IFormatterService

# Interface: IFormatterService

Defined in: [types/core/formatter.ts:4](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/formatter.ts#L4)

Contract of the formatter facade.

## Methods

### useCapitalize()

```ts
useCapitalize(text, locale?): string;
```

Defined in: [types/core/formatter.ts:5](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/formatter.ts#L5)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `text` | `string` |
| `locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` |

#### Returns

`string`

***

### useFormatCurrency()

```ts
useFormatCurrency(options): string;
```

Defined in: [types/core/formatter.ts:6](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/formatter.ts#L6)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `amount`: `number`; `currency?`: \| `"USD"` \| `"EUR"` \| `"GBP"` \| `"JPY"` \| `"CHF"` \| `"CAD"` \| `"AUD"` \| `"NZD"` \| `"MXN"` \| `"BRL"` \| `"ARS"` \| `"COP"` \| `"CLP"` \| `"SEK"` \| `"NOK"` \| `"DKK"` \| `"PLN"` \| `"CZK"` \| `"HUF"` \| `"RON"` \| `"TRY"` \| `"ISK"` \| `"CNY"` \| `"HKD"` \| `"SGD"` \| `"INR"` \| `"KRW"` \| `"THB"` \| `"IDR"` \| `"MYR"` \| `"PHP"` \| `"ILS"` \| `"ZAR"`; `digits?`: `number`; `locale?`: `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"`; `taxes?`: `number`; \} | - |
| `options.amount` | `number` | - |
| `options.currency?` | \| `"USD"` \| `"EUR"` \| `"GBP"` \| `"JPY"` \| `"CHF"` \| `"CAD"` \| `"AUD"` \| `"NZD"` \| `"MXN"` \| `"BRL"` \| `"ARS"` \| `"COP"` \| `"CLP"` \| `"SEK"` \| `"NOK"` \| `"DKK"` \| `"PLN"` \| `"CZK"` \| `"HUF"` \| `"RON"` \| `"TRY"` \| `"ISK"` \| `"CNY"` \| `"HKD"` \| `"SGD"` \| `"INR"` \| `"KRW"` \| `"THB"` \| `"IDR"` \| `"MYR"` \| `"PHP"` \| `"ILS"` \| `"ZAR"` | - |
| `options.digits?` | `number` | Exact number of fraction digits in the output. Omit it to keep each currency's own digits as `Intl` defines them (`"¥100"`, `"$1.00"`); pass `2` to pin exactly two decimals (`"¥100.00"`). |
| `options.locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` | - |
| `options.taxes?` | `number` | Tax rate: percentage when `> 1` (e.g. `21` → 21%), or decimal fraction when in `(0, 1]` (e.g. `0.21` → 21%). Prefer a fraction for rates ≤ 1%. |

#### Returns

`string`

***

### useFormatNumber()

```ts
useFormatNumber(
   value, 
   locale?, 
   digits?
): string;
```

Defined in: [types/core/formatter.ts:7](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/formatter.ts#L7)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` |
| `locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` |
| `digits?` | `number` |

#### Returns

`string`

***

### useJsonParse()

```ts
useJsonParse<T>(json): T;
```

Defined in: [types/core/formatter.ts:9](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/formatter.ts#L9)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `json` | `string` |

#### Returns

`T`

***

### useJsonStringify()

```ts
useJsonStringify(data): string;
```

Defined in: [types/core/formatter.ts:10](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/formatter.ts#L10)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `unknown` |

#### Returns

`string`

***

### useLowerCase()

```ts
useLowerCase(text, locale?): string;
```

Defined in: [types/core/formatter.ts:11](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/formatter.ts#L11)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `text` | `string` |
| `locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` |

#### Returns

`string`

***

### useSalePrice()

```ts
useSalePrice(options): SalePrice;
```

Defined in: [types/core/formatter.ts:8](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/formatter.ts#L8)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `discount`: `number`; `price`: `number`; \} | - |
| `options.discount` | `number` | Discount rate: percentage when `> 1` (e.g. `40` → 40%), or decimal fraction when in `(0, 1]` (e.g. `0.4` → 40%). Same convention as `taxes`. |
| `options.price` | `number` | Regular price, before the discount. |

#### Returns

[`SalePrice`](SalePrice.md)

***

### useUpperCase()

```ts
useUpperCase(text, locale?): string;
```

Defined in: [types/core/formatter.ts:12](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/formatter.ts#L12)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `text` | `string` |
| `locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` |

#### Returns

`string`
