---
title: Converter
description: "Unit conversions for temperature, distance and weight — every useTo* helper, formula, locale and precision note explained."
---

# Converter

The converter helpers live in `converter.service.ts` behind
**`UnitConverterService`**, the Singleton facade for physical unit
conversions. Like every core service, its methods are re-exported as thin
`use*` wrappers, so there is no setup at the call site, and they are safe to
call from any environment because the only runtime dependency is `Intl`.

The service never formats numbers itself: it delegates to an injected
`IFormatterService` (dependency injection — swap it with
`UnitConverterService.create(formatter)` or `useSetFormatter()`, defaulting to
`FormatterService`).

Every helper does exactly two things:

1. applies a fixed conversion formula to a `number`, then
2. hands the result to the injected formatter —
   [`useFormatNumber()`](/guides/services/formatter) on the default
   `FormatterService` — which formats it with the requested locale and
   **fixed** fraction digits.

Four rules apply to all of them:

- **Output is a string, never a number.** These helpers are for display. Keep
  raw values in your state and convert at the edge, the same way you use the
  [Formatter](/guides/services/formatter).
- **`locale` is a closed set.** Use one of `"en" | "es" | "fr" | "de" | "it" |
  "pt" | "ja" | "zh"`; it defaults to `"en"` and only affects decimal
  separators and grouping, never the unit.
- **`digits` fixes both ends of the output.** It is applied as both the minimum
  and the maximum fraction digits, so `digits: 2` always renders two decimals,
  padding with zeros when needed. It defaults to `2`; values outside the range
  accepted by the runtime throw `RangeError`.
- **No unit suffix is added.** `useToCelsius(212)` returns `"100.00"`, not
  `"100.00 °C"`. Append the label (`°C`, `km`, `kg`, …) yourself, ideally
  through your i18n layer, so it can be translated.

Because both optional arguments have defaults, the common call site stays
terse: `useToKilos(10)` is enough for an English two-decimal interface.

## Quick example

```ts
import {
  useToCelsius, useToFahrenheit,
  useToKilometers, useToMiles,
  useToCm, useToInches,
  useToKilos, useToPounds,
} from "katanakit-js";

// Temperature
useToCelsius(212);            // "100.00"
useToFahrenheit(100);         // "212.00"

// Distance
useToKilometers(1);           // "1.61"  — miles → km
useToMiles(10);               // "6.21"  — km → miles
useToInches(30.48);           // "12.00" — cm → inches
useToCm(1);                   // "2.54"  — inches → cm

// Weight
useToKilos(10);               // "4.54"  — pounds → kg
useToPounds(10);              // "22.05" — kg → pounds

// Locale and precision are per call
useToKilometers(1, "de", 3);  // "1,609" — comma is the de decimal separator
useToPounds(1000, "en", 0);   // "2,205" — zero decimals, grouping kept
```

## Temperature

Temperature is the one family where both units are absolute scales, so the
formulas combine a factor with an offset. `-40` is the point where the two
scales meet and works as a quick sanity check in either direction.

### useToCelsius(fahrenheit, locale?, digits?)

Converts degrees Fahrenheit to degrees Celsius with `(fahrenheit - 32) / 1.8`
and formats the result.

**Parameters**

- `fahrenheit` — source temperature in degrees Fahrenheit.
- `locale` — supported `Locale` tag. Defaults to `"en"`.
- `digits` — fraction digits, applied to both min and max. Defaults to `2`.

**Returns** — a formatted `string` with exactly `digits` decimals; no `°C`
suffix.

The `1.8` factor is the exact fraction `9/5`, so the classic anchors survive
the conversion: water boils at `"100.00"`, freezes at `"0.00"`, body
temperature reads `"37.00"`, and `-40` maps to `"-40.00"` in both directions.

```ts
import { useToCelsius } from "katanakit-js";

useToCelsius(212);            // "100.00" — boiling point
useToCelsius(32);             // "0.00"   — freezing point
useToCelsius(98.6);           // "37.00"  — body temperature
useToCelsius(212, "de", 0);   // "100"    — German separators, no decimals
```

**Real use case** — a weather widget fed by a US provider: keep the API
reading in Fahrenheit in state and convert only when rendering, so a later
unit toggle does not touch the fetch layer.

```ts
import { useToCelsius, useFormatNumber } from "katanakit-js";

const readingF = 98.6;

export const labels = {
  celsius: `${useToCelsius(readingF)} °C`,        // "37.00 °C"
  fahrenheit: `${useFormatNumber(readingF)} °F`,  // "98.60 °F"
};
```

### useToFahrenheit(celsius, locale?, digits?)

Converts degrees Celsius to degrees Fahrenheit with `celsius * 1.8 + 32` and
formats the result. It is the exact inverse of `useToCelsius()`.

**Parameters**

- `celsius` — source temperature in degrees Celsius.
- `locale` — supported `Locale` tag. Defaults to `"en"`.
- `digits` — fraction digits, applied to both min and max. Defaults to `2`.

**Returns** — a formatted `string`; no `°F` suffix.

The multiplication by `1.8` happens before the `+ 32` offset, and the anchors
mirror the other direction: `0` → `"32.00"`, `100` → `"212.00"`, `37` →
`"98.60"`, `-40` → `"-40.00"`.

```ts
import { useToFahrenheit } from "katanakit-js";

useToFahrenheit(0);             // "32.00"
useToFahrenheit(100);           // "212.00"
useToFahrenheit(37);            // "98.60"
useToFahrenheit(180, "en", 0);  // "356" — oven temperature, no decimals
```

**Real use case** — recipe scaling for an international audience: store oven
temperatures once in Celsius and render the other scale on demand, instead of
maintaining two copies of every recipe.

```ts
import { useToFahrenheit } from "katanakit-js";

const recipe = { name: "Sourdough", ovenC: 230, minutes: 35 };

export const instructions =
  `Bake at ${useToFahrenheit(recipe.ovenC)} °F for ${recipe.minutes} min`;
// "Bake at 446.00 °F for 35 min"
```

## Distance

Distance helpers come in two pairs at very different scales: miles ↔
kilometers for travel and shipping, and inches ↔ centimeters for short
lengths. Each pair shares one constant so both directions stay consistent.

### useToKilometers(miles, locale?, digits?)

Converts miles to kilometers with `miles * 1.60934` and formats the result.

**Parameters**

- `miles` — source distance in miles.
- `locale` — supported `Locale` tag. Defaults to `"en"`.
- `digits` — fraction digits, applied to both min and max. Defaults to `2`.

**Returns** — a formatted `string`; no `"km"` suffix.

The constant is the international statute mile **rounded to five decimal
places** (the exact value is `1.609344`). At the default `digits: 2` the
difference never reaches the output, but from five decimals up the constant
rounding becomes visible: `useToKilometers(100, "en", 5)` gives `"160.93400"`,
where the exact mile would give `160.93440`.

```ts
import { useToKilometers } from "katanakit-js";

useToKilometers(1);           // "1.61"
useToKilometers(100);         // "160.93"
useToKilometers(1, "de", 3);  // "1,609" — locale-aware decimal separator
```

**Real use case** — shipping estimates: a carrier API returns leg distances
in miles while the customer-facing summary is metric. Convert per leg when
rendering and keep the raw miles for later recalculation.

```ts
import { useToKilometers } from "katanakit-js";

const legs = [12.4, 88, 210.5];                     // miles
const total = legs.reduce((sum, m) => sum + m, 0);  // 310.9

`${useToKilometers(total)} km`;                     // "500.34 km"
```

### useToMiles(km, locale?, digits?)

Converts kilometers to miles with `km / 1.60934` and formats the result. It is
the inverse of `useToKilometers()` and shares the same constant, so the two
round-trip: converting a value and converting it back returns the original
magnitude before display rounding.

**Parameters**

- `km` — source distance in kilometers.
- `locale` — supported `Locale` tag. Defaults to `"en"`.
- `digits` — fraction digits, applied to both min and max. Defaults to `2`.

**Returns** — a formatted `string`; no `"mi"` suffix.

Precision note: because each call returns a **string**, chaining
`useToMiles(Number(useToKilometers(x)))` re-parses a value already rounded to
`digits` decimals. At the default precision the round-trip stays stable
(`useToKilometers(1)` → `"1.61"` → `useToMiles(1.61)` → `"1.00"`), but when
you need to chain several conversions, keep the raw number and convert once at
the end.

```ts
import { useToMiles } from "katanakit-js";

useToMiles(1.60934);       // "1.00" — exact inverse
useToMiles(5);             // "3.11" — a 5K race
useToMiles(10, "en", 4);   // "6.2137"
```

**Real use case** — fitness tracking: a GPS watch reports kilometers while
the athlete reads miles. Format per activity and let the raw kilometers stay
in the training log.

```ts
import { useToMiles } from "katanakit-js";

const run = { distanceKm: 21.0975, paceMinPerKm: 5.1 };

export const summary =
  `${useToMiles(run.distanceKm)} mi — ${run.paceMinPerKm}/km`;
// "13.11 mi — 5.1/km"
```

### useToInches(cm, locale?, digits?)

Converts centimeters to inches with `cm / 2.54` and formats the result.

**Parameters**

- `cm` — source length in centimeters.
- `locale` — supported `Locale` tag. Defaults to `"en"`.
- `digits` — fraction digits, applied to both min and max. Defaults to `2`.

**Returns** — a formatted `string`; no `"in"` suffix.

Unlike the distance constants, `2.54` is **exact by definition** — an inch is
defined as exactly 2.54 cm — so accuracy is limited only by the input and the
requested `digits`. Converting `2.54` gives exactly `"1.00"`, and `30.48`
(one foot) gives exactly `"12.00"`.

```ts
import { useToInches } from "katanakit-js";

useToInches(2.54);           // "1.00"
useToInches(30.48);          // "12.00" — one foot
useToInches(180);            // "70.87" — 180 cm tall
useToInches(180, "en", 0);   // "71"    — rounded to whole inches
```

**Real use case** — an e-commerce catalog with metric dimensions: storage and
search stay in centimeters while the US storefront renders inches. Convert
only in the product view, so one dataset drives both storefronts.

```ts
import { useToInches } from "katanakit-js";

const tv = { diagonalCm: 139.7, price: 799 };

`${useToInches(tv.diagonalCm, "en", 1)}" — $${tv.price}`;
// '55.0" — $799'
```

### useToCm(inches, locale?, digits?)

Converts inches to centimeters with `inches * 2.54` and formats the result.
It is the exact inverse of `useToInches()`.

**Parameters**

- `inches` — source length in inches.
- `locale` — supported `Locale` tag. Defaults to `"en"`.
- `digits` — fraction digits, applied to both min and max. Defaults to `2`.

**Returns** — a formatted `string`; no `"cm"` suffix.

Because `2.54` is exact, the only rounding is the one `Intl` applies for
display. Height is the classic case: `useToCm(70)` renders `"177.80"`, which
is mathematically exact, so the same value can be shown at any precision
without drift.

```ts
import { useToCm } from "katanakit-js";

useToCm(1);             // "2.54"
useToCm(12);            // "30.48"
useToCm(65);            // "165.10" — 5'5" in metric form
useToCm(65, "es", 0);   // "165"    — Spanish separator rules
```

**Real use case** — a body-measurement form: users in the US type feet and
inches, the API stores centimeters, and the progress screen shows both.
Convert at the boundary so the database keeps a single canonical unit.

```ts
import { useToCm } from "katanakit-js";

const input = { feet: 5, inches: 9 };
const totalInches = input.feet * 12 + input.inches; // 69

`${useToCm(totalInches)} cm`;                       // "175.26 cm"
```

## Weight

The two weight helpers convert between pounds and kilograms with one shared
constant. As with distance, the default display precision hides the constant
rounding; the notes call out where it starts to matter.

### useToKilos(pounds, locale?, digits?)

Converts pounds to kilograms with `pounds * 0.453592` and formats the result.

**Parameters**

- `pounds` — source weight in pounds.
- `locale` — supported `Locale` tag. Defaults to `"en"`.
- `digits` — fraction digits, applied to both min and max. Defaults to `2`.

**Returns** — a formatted `string`; no `"kg"` suffix.

`0.453592` is the international avoirdupois pound **rounded to six decimal
places** (the exact factor is `0.45359237`). At the default `digits: 2` the
difference is invisible (`useToKilos(1)` → `"0.45"`), and even at five
decimals the displayed value is correct for everyday weights:
`useToKilos(1, "en", 5)` → `"0.45359"`. Treat the seventh decimal as
unreliable — this is display math, not metrology.

```ts
import { useToKilos } from "katanakit-js";

useToKilos(1);            // "0.45"
useToKilos(10);           // "4.54"
useToKilos(2204.62);      // "1,000.00" — grouping from Intl
useToKilos(1, "en", 5);   // "0.45359"
```

**Real use case** — international shipping: carriers quote by the pound while
customs paperwork wants kilograms. Convert at the label-rendering step and
keep the carrier's pounds untouched for rate calculations.

```ts
import { useToKilos } from "katanakit-js";

const parcel = { weightLb: 14.3, tracking: "1Z…" };

`${parcel.tracking}: ${useToKilos(parcel.weightLb)} kg`;
// "1Z…: 6.49 kg"
```

### useToPounds(kilos, locale?, digits?)

Converts kilograms to pounds with `kilos / 0.453592` and formats the result.
It is the exact inverse of `useToKilos()`, sharing the same rounded constant.

**Parameters**

- `kilos` — source weight in kilograms.
- `locale` — supported `Locale` tag. Defaults to `"en"`.
- `digits` — fraction digits, applied to both min and max. Defaults to `2`.

**Returns** — a formatted `string`; no `"lb"` suffix.

Precision note: dividing by the rounded constant accumulates the same error in
the opposite direction — at `digits: 6`, `useToPounds(1)` renders
`"2.204624"`, while the exact factor would give `2.204622…`, displayed as
`"2.204623"`. For anything short of six decimals the difference never reaches
the output.

```ts
import { useToPounds } from "katanakit-js";

useToPounds(1);             // "2.20"
useToPounds(10);            // "22.05"
useToPounds(1000);          // "2,204.62" — grouping from Intl
useToPounds(1, "en", 6);    // "2.204624"
```

**Real use case** — gym progress: a European app records lifts in kilograms
and shows pounds to readers on imperial units. Convert when rendering the
chart or the PR badge, and keep kilograms in the log so sorting and
comparisons stay numeric.

```ts
import { useToPounds } from "katanakit-js";

const lift = { exercise: "Deadlift", weightKg: 120, reps: 5 };

export const pr = `${lift.exercise}: ${useToPounds(lift.weightKg)} lb × ${lift.reps}`;
// "Deadlift: 264.55 lb × 5"
```

## Related

- [Formatter](/guides/services/formatter) — `useFormatNumber()`, the helper
  every converter delegates to, plus currency, date and text formatting.
- [Geometry](/guides/services/geometry) — area, perimeter and volume helpers
  to pair with the centimeter and inch conversions.
- [API Reference](/api/) — every export, generated from source.
