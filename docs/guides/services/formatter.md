---
title: Formatter
description: "Locale-aware number, currency, date and text formatting — every pure helper explained."
---

# Formatter

`formatter.service.ts` is a **Singleton facade** (`FormatterService`) over pure
formatting logic. Every export is re-exported as a thin `use*` wrapper that
delegates to `FormatterService.getInstance()`, so there is no setup at the call
site. All helpers are pure, stateless and **SSR-safe** — they depend only on
`Intl` and `JSON`, so they behave the same in the browser, Node, Bun and edge
runtimes.

Three rules shape the whole module:

1. **Format at the edge** — helpers return display strings. Keep raw numbers,
   dates and objects in your state and call the formatter when you render.
2. **Locales are explicit** — the `Locale` type is a closed union:
   `"en" | "es" | "fr" | "de" | "it" | "pt" | "ja" | "zh"`. Other BCP 47 tags
   work at runtime through `Intl`, but only these eight typecheck.
3. **No token mini-language** — the library never parses format patterns.
   Numbers and currency delegate to `Intl.NumberFormat`; dates delegate to
   `Intl.DateTimeFormat` through Temporal; text uses the built-in case methods.

The unit-conversion helpers (`onToCelsius()`, `onToKilometers()`,
`onToKilos()` and the rest) live in `converter.service.ts` behind
`UnitConverterService`; they are documented on the
[Converter](/guides/services/converter) page.

## Quick example

```ts
import {
  onFormatNumber,
  onFormatCurrency,
  onCapitalize,
  onUpperCase,
  onLowerCase,
  onJsonStringify,
  onJsonParse,
} from "katanakit-js";
import { DatesService } from "katanakit-js";

const dates = DatesService.getInstance();

onFormatNumber(1234.5);              // "1,234.50"
onFormatNumber(1234.5, "de");        // "1.234,50"
onFormatCurrency({ amount: 100 });   // "$100.00"
onFormatCurrency({ amount: 100, taxes: 21, locale: "es" }); // "121,00 US$"

dates.format("2024-06-15", "en");   // "6/15/2024"
onCapitalize("hello world");         // "Hello world"
onUpperCase("straße", "de");         // "STRASSE"
onLowerCase("HELLO");                // "hello"

onJsonStringify({ a: 1 });           // '{\n   "a": 1\n}'
onJsonParse<{ a: number }>('{"a":1}'); // { a: 1 }
```

## Numbers

### onFormatNumber(value, locale?, digits?)

Formats a number with locale-aware grouping and a **fixed** number of fraction
digits. `digits` is applied as both the minimum and the maximum, so the output
is always padded or rounded to that precision:

| Call | Result | Notes |
| --- | --- | --- |
| `onFormatNumber(1234.5)` | `"1,234.50"` | `en` defaults, 2 digits |
| `onFormatNumber(1234.5, "de")` | `"1.234,50"` | `de` swaps separators |
| `onFormatNumber(42, "en", 0)` | `"42"` | `0` disables decimals |
| `onFormatNumber(0.5, "en", 4)` | `"0.5000"` | pads to exactly 4 digits |
| `onFormatNumber(1.005, "en", 2)` | `"1.01"` | rounding is delegated to `Intl` |

**Parameters**

- `value` — the number to format.
- `locale` — one of the supported `Locale` tags. Defaults to `"en"`.
- `digits` — fraction digits, applied to both min and max. Defaults to `2`.

```ts
import { onFormatNumber, type Locale } from "katanakit-js";

export function formatKpi(value: number, locale: Locale) {
  return onFormatNumber(value, locale, 1);
}
```

**Edge cases**

- Non-finite values are formatted literally instead of throwing: `NaN` →
  `"NaN"`, `Infinity` → `"∞"`, `-Infinity` → `"-∞"`.
- A `digits` value outside the range accepted by the runtime (0–100 in current
  engines) throws `RangeError`.
- A structurally valid but unknown locale falls back to the runtime default;
  a malformed tag throws `RangeError`. Stick to the `Locale` union when the
  output must be stable.

**Real use case** — dashboard metrics: store the raw number returned by the
API and format it per user locale at render time, so no rounding is baked into
your data layer.

## Currency

### onFormatCurrency(options)

Formats an amount as currency, optionally applying a tax rate. Everything is
configured through a single options object:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `amount` | `number` | — (required) | Base amount, before taxes. |
| `currency` | `Currency` | `"USD"` | One of the supported ISO codes. |
| `taxes` | `number` | `0` | Tax rate added to the amount. |
| `locale` | `Locale` | `"en"` | Controls separators, symbol and spacing. |
| `digits` | `number` | the currency's own | Exact fraction digits. Omit to keep `Intl`'s per-currency digits (`"¥100"`); pass `2` to pin exactly two (`"¥100.00"`). |

**Supported currencies:** `EUR`, `USD`, `GBP`, `JPY`, `CAD`, `MXN`, `CHF`,
`AUD`, `BRL`, `CNY`, `ARS`, `COP`, `CLP`.

Tax handling is the subtle part. The implementation computes
`rate = taxes > 1 ? taxes / 100 : taxes` and then `amount * (1 + rate)`, which
means:

- `taxes: 0` (default) — no tax.
- `taxes: 21` — a percentage: **+21%**.
- `taxes: 0.21` — a decimal fraction: **+21%**.
- `taxes: 1` — the fraction branch, so **+100%**, not +1%.

Use explicit fractions only for rates at or below 1% (`0.005` → 0.5%). The
source does not validate the sign: negative values follow the fraction branch
and reduce the total.

```ts
import { onFormatCurrency } from "katanakit-js";

onFormatCurrency({ amount: 100, currency: "USD" });                           // "$100.00"
onFormatCurrency({ amount: 100, taxes: 21 });                                  // "$121.00"
onFormatCurrency({ amount: 100, taxes: 0.21, locale: "es" });                  // "121,00 US$"
onFormatCurrency({ amount: 100, taxes: 0.21, currency: "EUR", locale: "es" }); // "121,00 €"
onFormatCurrency({ amount: 100, currency: "JPY" });                            // "¥100"
onFormatCurrency({ amount: 100, currency: "JPY", digits: 2 });                 // "¥100.00"
```

**Edge cases**

- By default, fraction digits come from the currency, not from a parameter:
  `USD` renders two decimals, `JPY` renders none (`"¥100"`). The optional
  `digits` pins an exact count for every currency — `digits: 2` renders
  `"¥100.00"` even for `JPY`. The currency-conversion helpers pin `digits: 2`
  for you (see [Currency Conversion](/guides/currency)).
- Only the 13 codes above typecheck. At runtime the string reaches `Intl`
  unchanged, so an unknown-but-well-formed code still renders (the code itself
  is shown), while a malformed code throws `RangeError`.
- `amount: 0` and negative amounts format normally (`"-$10.00"`).

**Real use case** — checkout summaries: keep prices tax-free in the database
and apply the tax rate at render time, passing the buyer's locale so the symbol
and separators match their region.

```ts
import { onFormatCurrency, type Currency, type Locale } from "katanakit-js";

export function orderTotal(
  subtotal: number,
  taxPercent: number,
  currency: Currency,
  locale: Locale,
) {
  return onFormatCurrency({ amount: subtotal, taxes: taxPercent, currency, locale });
}
```

## Dates

### format(dateInput, locale?, options?)

Formats a date-like value into a localized string. This method lives on the
[Dates service](/guides/services/dates) (`DatesService.getInstance().format`)
and is documented here because it is the formatting entry point. The rest of
the Temporal-based date toolkit lives on that page.

**Accepted inputs**

| Input | Parsed as |
| --- | --- |
| `number` | Epoch milliseconds → zoned date-time in the runtime time zone. |
| `Date` | Epoch milliseconds → zoned date-time in the runtime time zone. |
| `Temporal.Instant` | Zoned date-time in the runtime time zone. |
| ISO date string (`"2024-06-15"`) | `Temporal.PlainDate`. |
| ISO date-time string without offset | `Temporal.PlainDate` first — see edge cases. |
| `Temporal.PlainDate`, `PlainDateTime`, `ZonedDateTime` | Used as-is. |

**Options** are plain `Intl.DateTimeFormatOptions` (default `{}`), forwarded to
Temporal's `toLocaleString` and then to `Intl.DateTimeFormat`. The library
implements **no custom tokens**, so the accepted keys are the standard ones:
`dateStyle`, `timeStyle`, `year`, `month`, `day`, `weekday`, `hour`, `minute`,
`second`, `fractionalSecondDigits`, `timeZone`, `timeZoneName`, and so on.

```ts
import { DatesService } from "katanakit-js";

const dates = DatesService.getInstance();

dates.format("2024-06-15");                                    // "6/15/2024"
dates.format("2024-06-15", "es", { dateStyle: "full" });       // "sábado, 15 de junio de 2024"
dates.format("2024-06-15", "de", { dateStyle: "long" });       // "15. Juni 2024"
dates.format(
  new Date(2024, 5, 15, 14, 30),
  "en",
  { dateStyle: "medium", timeStyle: "short" },
);                                                              // "Jun 15, 2024, 2:30 PM"
```

**Edge cases**

- Date-time strings without an offset are parsed as `PlainDate` first, which
  **drops the time silently**. `dates.format("2024-06-15T14:30:00", "en", { dateStyle: "medium" })`
  returns `"Jun 15, 2024"`, and requesting `timeStyle` alone throws
  `Invalid date input`. When the time matters, pass a `Date`, epoch
  milliseconds, or a `Temporal.PlainDateTime`.
- Strings carrying a UTC designator (`Z`) or a numeric offset (`+02:00`) are
  rejected, because neither `PlainDate` nor `PlainDateTime` accepts offsets.
- Invalid input is logged through `onLogger` and then thrown as
  `new Error("Invalid date input: ...")`. Wrap the call with
  [`onAttempt()`](/start/errors) at I/O boundaries.
- `number`, `Date` and `Temporal.Instant` inputs are converted to the runtime's
  time zone, so a server in UTC and a browser in UTC+2 can render different
  hours for the same instant. Pass `timeZone` in `options` or a
  `ZonedDateTime` for deterministic output.
- With the default `{}` options, the output depends on the runtime's ICU
  defaults. Always pass an explicit style for user-facing copy.

**Real use case** — localized timestamps in feeds and comments: store ISO
strings in the API, then format them per reader locale and style at render
time.

## Text

Text helpers transform and normalize strings. All case helpers **trim**
whitespace before returning.

### onCapitalize(text, locale?)

Upper-cases only the first character and leaves the rest untouched. Empty or
whitespace-only input returns `""`, so it is safe to call on uncontrolled data.

```ts
import { onCapitalize } from "katanakit-js";

onCapitalize("hello world");   // "Hello world"
onCapitalize("  hello  ");     // "Hello"
onCapitalize("áÉl");           // "ÁÉl"
```

**Real use case** — rendering names from a database that stores them in
lowercase: capitalize for display without mutating the stored value.

### onUpperCase(text, locale?)

Locale-aware upper case via `toLocaleUpperCase`, then `trim()`.

```ts
import { onUpperCase } from "katanakit-js";

onUpperCase("hello");          // "HELLO"
onUpperCase("straße", "de");   // "STRASSE"
onUpperCase("i", "tr");        // "İ" — Turkish dotted capital I
```

**Edge case** — do not use it for case-insensitive comparisons: equal-looking
strings can differ under locale rules. Use `localeCompare` (or
`Intl.Collator`) for that.

### onLowerCase(text, locale?)

Mirror of `onUpperCase()` through `toLocaleLowerCase`, then `trim()`.

```ts
import { onLowerCase } from "katanakit-js";

onLowerCase("HELLO");          // "hello"
onLowerCase("I", "tr");        // "ı" — Turkish dotless lower case
```

**Real use case** — normalizing user input (emails, tags, search terms) before
persisting or comparing, with the locale the input was typed in.

### onJsonStringify(data)

Pretty-prints a value as JSON with a **3-space** indent — note the unusual
indent, which comes from `JSON.stringify(data, null, 3)`.

```ts
import { onJsonStringify } from "katanakit-js";

onJsonStringify({ a: 1, nested: { b: 2 } });
// {
//    "a": 1,
//    "nested": {
//       "b": 2
//    }
// }
```

**Edge cases** — circular references and `BigInt` values throw `TypeError`
(same as `JSON.stringify`); top-level values with no JSON representation
(`undefined`, functions, symbols) return `undefined` at runtime even though
the declared return type is `string`.

**Real use case** — a developer-facing payload preview or a "copy debug state"
button that needs readable JSON.

### onJsonParse&lt;T&gt;(json)

A thin, typed wrapper around `JSON.parse` — useful to avoid `as` casts while
keeping the familiar throw-on-invalid behavior. It performs **no runtime
validation**: the generic `T` is an assertion, not a guarantee. Invalid JSON
throws `SyntaxError`.

```ts
import { onJsonParse } from "katanakit-js";

const config = onJsonParse<{ theme: "light" | "dark" }>('{"theme":"dark"}');
config.theme; // "dark"
```

**Edge case** — for untrusted input (storage, network, user files), prefer
[`onTryJsonParse()`](/start/errors), which returns a Safe Result instead of
throwing, and validate the parsed shape with a schema before using it.

## Related

- [Converter](/guides/services/converter) — temperature, distance, height and
  weight conversions.
- [Dates](/guides/services/dates) — the full Temporal toolkit behind
  `format()`.
- [Generator](/guides/services/generator) — `GeneratorService.getInstance().slugify()` and other string
  generators.
- [Errors & Results](/start/errors) — `onTryJsonParse()` and Safe Results.
- [API Reference](/api/) — every export, generated from source.
