[katanakit-js](../index.md) / FormatterService

# Class: FormatterService

Defined in: [core/services/formatter.service.ts:29](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/formatter.service.ts#L29)

FormatterService — Singleton facade over `Intl.NumberFormat`, locale-aware
casing and `JSON`.

Applies the **Singleton** pattern (one shared instance via
[FormatterService.getInstance](#getinstance)) and the **Facade** pattern: each public
method hides the `Intl`/`JSON` details behind one call. Everything is pure —
no state, no I/O — so the instance is safe to share across environments
(Node, Bun, browser, SSR).

Every public method uses the `use*` prefix per `CONTRIBUTING.md`; the module
level `use*` functions below are thin wrappers kept for call-site ergonomics.

## Example

```ts
import { useFormatNumber } from "katanakit-js";

useFormatNumber(1234.5, "en", 2); // "1,234.50"
```

## Implements

- [`IFormatterService`](../interfaces/IFormatterService.md)

## Methods

### useCapitalize()

```ts
useCapitalize(text, locale?): string;
```

Defined in: [core/services/formatter.service.ts:132](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/formatter.service.ts#L132)

Pure: capitalizes the first character; leaves the rest unchanged.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `text` | `string` | `undefined` | The string to capitalize. |
| `locale` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` | `"en"` | BCP 47 locale tag. Defaults to `"en"`. |

#### Returns

`string`

The string with its first character upper-cased.

#### Example

```ts
import { useCapitalize } from "katanakit-js";

useCapitalize("hello world"); // "Hello world"
```

#### Implementation of

[`IFormatterService`](../interfaces/IFormatterService.md).[`useCapitalize`](../interfaces/IFormatterService.md#usecapitalize)

***

### useFormatCurrency()

```ts
useFormatCurrency(options): string;
```

Defined in: [core/services/formatter.service.ts:164](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/formatter.service.ts#L164)

Pure: formats an amount as currency.

`taxes` follows the shared rate convention: percentage (`21` → 21%) or
decimal fraction (`0.21` → 21%). Values `> 1` are percentages; values in
`(0, 1]` are fractions.

By default the fraction digits are the currency's own (`"¥100"`, `"$1.00"`),
exactly as `Intl` defines them. Pass `digits` to pin an exact count —
`digits: 2` prints two decimals even for zero-decimal currencies
(`"¥100.00"`).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `amount`: `number`; `currency?`: \| `"USD"` \| `"EUR"` \| `"GBP"` \| `"JPY"` \| `"CHF"` \| `"CAD"` \| `"AUD"` \| `"NZD"` \| `"MXN"` \| `"BRL"` \| `"ARS"` \| `"COP"` \| `"CLP"` \| `"SEK"` \| `"NOK"` \| `"DKK"` \| `"PLN"` \| `"CZK"` \| `"HUF"` \| `"RON"` \| `"TRY"` \| `"ISK"` \| `"CNY"` \| `"HKD"` \| `"SGD"` \| `"INR"` \| `"KRW"` \| `"THB"` \| `"IDR"` \| `"MYR"` \| `"PHP"` \| `"ILS"` \| `"ZAR"`; `digits?`: `number`; `locale?`: `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"`; `taxes?`: `number`; \} | Currency formatting options. |
| `options.amount` | `number` | - |
| `options.currency?` | \| `"USD"` \| `"EUR"` \| `"GBP"` \| `"JPY"` \| `"CHF"` \| `"CAD"` \| `"AUD"` \| `"NZD"` \| `"MXN"` \| `"BRL"` \| `"ARS"` \| `"COP"` \| `"CLP"` \| `"SEK"` \| `"NOK"` \| `"DKK"` \| `"PLN"` \| `"CZK"` \| `"HUF"` \| `"RON"` \| `"TRY"` \| `"ISK"` \| `"CNY"` \| `"HKD"` \| `"SGD"` \| `"INR"` \| `"KRW"` \| `"THB"` \| `"IDR"` \| `"MYR"` \| `"PHP"` \| `"ILS"` \| `"ZAR"` | - |
| `options.digits?` | `number` | Exact number of fraction digits in the output. Omit it to keep each currency's own digits as `Intl` defines them (`"¥100"`, `"$1.00"`); pass `2` to pin exactly two decimals (`"¥100.00"`). |
| `options.locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` | - |
| `options.taxes?` | `number` | Tax rate: percentage when `> 1` (e.g. `21` → 21%), or decimal fraction when in `(0, 1]` (e.g. `0.21` → 21%). Prefer a fraction for rates ≤ 1%. |

#### Returns

`string`

The formatted currency string.

#### Example

```ts
import { useFormatCurrency } from "katanakit-js";

useFormatCurrency({ amount: 100, currency: "USD" }); // "$100.00"
useFormatCurrency({ amount: 100, taxes: 21 }); // "$121.00"
useFormatCurrency({ amount: 100, taxes: 0.21, locale: "es" }); // "121,00 €"
useFormatCurrency({ amount: 100, currency: "JPY" }); // "¥100"
useFormatCurrency({ amount: 100, currency: "JPY", digits: 2 }); // "¥100.00"
```

#### Implementation of

[`IFormatterService`](../interfaces/IFormatterService.md).[`useFormatCurrency`](../interfaces/IFormatterService.md#useformatcurrency)

***

### useFormatNumber()

```ts
useFormatNumber(
   value, 
   locale?, 
   digits?
): string;
```

Defined in: [core/services/formatter.service.ts:74](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/formatter.service.ts#L74)

Pure number formatter over `Intl.NumberFormat`.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `value` | `number` | `undefined` | The number to format. |
| `locale` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` | `"en"` | BCP 47 locale tag. Defaults to `"en"`. |
| `digits` | `number` | `2` | Maximum and minimum fraction digits. Defaults to `2`. |

#### Returns

`string`

The formatted number string.

#### Example

```ts
import { useFormatNumber } from "katanakit-js";

useFormatNumber(1234.5, "en", 2); // "1,234.50"
useFormatNumber(1234.5, "de", 2); // "1.234,50"
```

#### Implementation of

[`IFormatterService`](../interfaces/IFormatterService.md).[`useFormatNumber`](../interfaces/IFormatterService.md#useformatnumber)

***

### useJsonParse()

```ts
useJsonParse<T>(json): T;
```

Defined in: [core/services/formatter.service.ts:246](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/formatter.service.ts#L246)

Pure: parse JSON (throws on invalid input — same as `JSON.parse`).

#### Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `T` | `unknown` | Expected parsed shape. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `json` | `string` | The JSON string to parse. |

#### Returns

`T`

The parsed value typed as `T`.

#### Example

```ts
import { useJsonParse } from "katanakit-js";

const obj = useJsonParse<{ a: number }>('{"a":1}');
// { a: 1 }
```

#### Implementation of

[`IFormatterService`](../interfaces/IFormatterService.md).[`useJsonParse`](../interfaces/IFormatterService.md#usejsonparse)

***

### useJsonStringify()

```ts
useJsonStringify(data): string;
```

Defined in: [core/services/formatter.service.ts:227](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/formatter.service.ts#L227)

Pure: pretty-print JSON (3-space indent).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `unknown` | The value to serialize. |

#### Returns

`string`

The indented JSON string.

#### Example

```ts
import { useJsonStringify } from "katanakit-js";

useJsonStringify({ a: 1 });
// '{\n   "a": 1\n}'
```

#### Implementation of

[`IFormatterService`](../interfaces/IFormatterService.md).[`useJsonStringify`](../interfaces/IFormatterService.md#usejsonstringify)

***

### useLowerCase()

```ts
useLowerCase(text, locale?): string;
```

Defined in: [core/services/formatter.service.ts:114](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/formatter.service.ts#L114)

Pure: locale-aware lower case (trims whitespace).

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `text` | `string` | `undefined` | The string to transform. |
| `locale` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` | `"en"` | BCP 47 locale tag. Defaults to `"en"`. |

#### Returns

`string`

The lower-cased, trimmed string.

#### Example

```ts
import { useLowerCase } from "katanakit-js";

useLowerCase("HELLO"); // "hello"
```

#### Implementation of

[`IFormatterService`](../interfaces/IFormatterService.md).[`useLowerCase`](../interfaces/IFormatterService.md#uselowercase)

***

### useSalePrice()

```ts
useSalePrice(options): SalePrice;
```

Defined in: [core/services/formatter.service.ts:203](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/formatter.service.ts#L203)

Pure: applies a discount to a price and reports what was taken off.

`discount` follows the same rate convention as `taxes` in
[FormatterService.useFormatCurrency](#useformatcurrency): percentage (`40` → 40%) or
decimal fraction (`0.4` → 40%).

The returned `salePrice` is unrounded, so it survives markup chains (10% +
20% of the same base) without accumulating error; pass it straight to
[FormatterService.useFormatCurrency](#useformatcurrency) to get the digits the currency
demands. Only `percentOff` is rounded, because it exists to be displayed.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `discount`: `number`; `price`: `number`; \} | Price and discount rate. |
| `options.discount` | `number` | Discount rate: percentage when `> 1` (e.g. `40` → 40%), or decimal fraction when in `(0, 1]` (e.g. `0.4` → 40%). Same convention as `taxes`. |
| `options.price` | `number` | Regular price, before the discount. |

#### Returns

[`SalePrice`](../interfaces/SalePrice.md)

The regular price, the discounted price and the rounded percentage.

#### Example

```ts
import { useFormatCurrency, useSalePrice } from "katanakit-js";

const sale = useSalePrice({ price: 29.99, discount: 40 });
// { price: 29.99, salePrice: 17.994, percentOff: 40 }

useFormatCurrency({ amount: sale.salePrice, currency: "EUR", locale: "es" }); // "17,99 €"
```

#### Implementation of

[`IFormatterService`](../interfaces/IFormatterService.md).[`useSalePrice`](../interfaces/IFormatterService.md#usesaleprice)

***

### useUpperCase()

```ts
useUpperCase(text, locale?): string;
```

Defined in: [core/services/formatter.service.ts:96](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/formatter.service.ts#L96)

Pure: locale-aware upper case (trims whitespace).

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `text` | `string` | `undefined` | The string to transform. |
| `locale` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` | `"en"` | BCP 47 locale tag. Defaults to `"en"`. |

#### Returns

`string`

The upper-cased, trimmed string.

#### Example

```ts
import { useUpperCase } from "katanakit-js";

useUpperCase("hello"); // "HELLO"
useUpperCase("straße", "de"); // "STRASSE"
```

#### Implementation of

[`IFormatterService`](../interfaces/IFormatterService.md).[`useUpperCase`](../interfaces/IFormatterService.md#useuppercase)

***

### getInstance()

```ts
static getInstance(): FormatterService;
```

Defined in: [core/services/formatter.service.ts:36](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/formatter.service.ts#L36)

Returns the shared instance (Singleton).

#### Returns

`FormatterService`
