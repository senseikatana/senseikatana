---
title: Geometry
description: "Pure area, perimeter and volume calculations with Intl-formatted string output — every GeometryUtils method explained."
---

# Geometry

`geometry.service.ts` is **pure math** behind three Singleton classes —
`GeometryAreaService`, `GeometryPerimeterService` and `GeometryVolumeService` —
composed into the `GeometryUtils` object (each namespace holds the matching
class's `getInstance()`). There is no I/O, no configuration and no dependency
on the DOM or Node APIs — every call takes numbers and returns a string, and
you never create an instance yourself.

The API is grouped into three namespaces:

| Namespace | Purpose | Methods |
| --- | --- | --- |
| `GeometryUtils.area` | 2D surface calculations | `useRectangle`, `useSquare`, `useTriangle`, `useCircle`, `useTrapezoid`, `useHexagon`, `useEllipse`, `useParallelogram` |
| `GeometryUtils.perimeter` | 2D boundary calculations | `useRectangle`, `useSquare`, `useTriangle`, `useCircle`, `useTrapezoid`, `useHexagon`, `useEllipse`, `useParallelogram` |
| `GeometryUtils.volume` | 3D capacity calculations | `useCube`, `useBox`, `useSphere`, `useCylinder`, `useCone`, `usePyramid` |

Two rules apply to every method on this page:

1. **The return value is always a formatted `string`, never a `number`.** The
   raw result is passed through `Intl.NumberFormat` with a fixed number of
   fraction digits, optionally suffixed with a unit. This makes the output
   display-ready: print it, bind it to a template, or put it in a PDF quote.
2. **Same-named methods live in different namespaces.** `area.useCircle()`
   computes `πr²`, while `perimeter.useCircle()` computes `2πr`. Always
   namespace-qualify the call — never destructure a method out of its parent.

Inputs are **not validated**: `NaN`, `Infinity` and negative dimensions flow
straight into `Intl`, which formats them as `"NaN"`, `"∞"` and negative values.
Guard user input at the edge (see [Formatting options](#formatting-options)).

## Quick example

```ts
import { GeometryUtils } from "katanakit-js";

// Flooring quote: a 4.5 m × 3.2 m room
GeometryUtils.area.useRectangle(4.5, 3.2);                 // "14.40"
GeometryUtils.area.useRectangle(4.5, 3.2, { unit: "m²" }); // "14.40 m²"

// Shipping box: 40 cm × 30 cm × 25 cm
GeometryUtils.volume.useBox(40, 30, 25, { unit: "cm³" });  // "30,000.00 cm³"

// UI: circumference of a 24 px avatar ring
GeometryUtils.perimeter.useCircle(24);                     // "150.80"

// Same number, different locale
GeometryUtils.area.useRectangle(4.5, 3.2, { locale: "de-DE" }); // "14,40"
```

## Formatting options

Every method accepts an optional `options` object typed as
`GeometryFormatOptions`:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `locale` | `string` | `"en"` | BCP 47 tag forwarded to `Intl.NumberFormat` (grouping and decimal separator follow it). |
| `digits` | `number` (non-negative integer) | `2` | Number of fraction digits **forced in both directions** (`minimumFractionDigits` and `maximumFractionDigits`). |
| `unit` | `string` | `undefined` | Suffix appended after the number with a single space. It is never converted or validated. |

Rounding is delegated to `Intl.NumberFormat`, so results are rounded to `digits`
decimals and trailing zeros are **kept**: a whole number prints as `"50.00"`,
not `"50"`, unless you pass `digits: 0`.

```ts
GeometryUtils.area.useRectangle(5, 10);                        // "50.00"
GeometryUtils.area.useRectangle(5, 10, { digits: 0 });         // "50"
GeometryUtils.area.useRectangle(5, 10, { digits: 3 });         // "50.000"
GeometryUtils.area.useRectangle(5, 10, { locale: "de-DE" });   // "50,00"
GeometryUtils.area.useRectangle(1234.5, 2);                    // "2,469.00"
GeometryUtils.area.useRectangle(5, 10, { unit: "m²" });        // "50.00 m²"

// No input validation — format defensively
GeometryUtils.area.useRectangle(Number.NaN, 2);                // "NaN"
GeometryUtils.volume.useCube(Number.POSITIVE_INFINITY);        // "∞"
```

If you need the numeric value for further math, compute the formula directly
(for example `width * height`) and use these helpers only at the rendering
boundary. To format numbers outside geometry, see
[Formatter](/guides/services/formatter).

## Area

All eight methods return the surface as a formatted string. Rounding follows the
`digits` option documented in [Formatting options](#formatting-options).

### area.useRectangle(width, height, options?)

Formula: `width * height`.

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.area.useRectangle(5, 10);                 // "50.00"
GeometryUtils.area.useRectangle(5, 10, { unit: "m²" }); // "50.00 m²"
```

**Real use case** — flooring or painting quotes: `width * height` gives the
surface to cover; prefix the price per square meter and the formatted area can
be printed in the estimate without another formatting step.

### area.useSquare(side, options?)

Formula: `side²`.

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.area.useSquare(4);                 // "16.00"
GeometryUtils.area.useSquare(4, { unit: "cm²" }); // "16.00 cm²"
```

**Real use case** — tile counts: compute the area of a single square tile once,
then divide the room area by it to get the number of tiles to order.

### area.useTriangle(base, height, options?)

Formula: `(base * height) / 2`. Note that `height` is the perpendicular height,
not the length of a slanted side.

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.area.useTriangle(6, 4); // "12.00"
```

**Real use case** — gable roofs and SVG polygons: the area of a triangular wall
section or a custom SVG face is often needed for material estimates or hit-area
math.

### area.useCircle(radius, options?)

Formula: `π * radius²`. The argument is the **radius**, not the diameter.

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.area.useCircle(5);                  // "78.54"
GeometryUtils.area.useCircle(5, { unit: "m²" });  // "78.54 m²"
```

**Real use case** — pricing circular items (pizza, round tables, circular
plots): pricing by area is fairer than pricing by diameter, and the formatted
string drops straight into a line item.

### area.useTrapezoid(parallelSide1, parallelSide2, height, options?)

Formula: `((parallelSide1 + parallelSide2) * height) / 2`. The two first
arguments are the **parallel** sides; `height` is the distance between them.

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.area.useTrapezoid(3, 5, 4); // "16.00"
```

**Real use case** — irregular land plots: many lots are trapezoidal, and the
average-width formula gives the billable surface for fencing, seeding or taxes.

### area.useHexagon(side, options?)

Formula: `(3 * √3 / 2) * side²` for a **regular** hexagon.

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.area.useHexagon(3); // "23.38"
```

**Real use case** — honeycomb layouts: hexagonal grids in dashboards and games
need the cell area to size spacing or scale data-driven fills.

### area.useEllipse(semiMajor, semiMinor, options?)

Formula: `π * semiMajor * semiMinor`. Both arguments are **semi-axes** (half of
the full width and height).

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.area.useEllipse(5, 3); // "47.12"
```

**Real use case** — oval tables and garden beds: multiply the two semi-axes
instead of the full axes to avoid the classic `π * width * height` mistake.

### area.useParallelogram(base, height, options?)

Formula: `base * height`. As with the triangle, `height` is the perpendicular
distance between the bases, not the slanted side length.

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.area.useParallelogram(6, 4); // "24.00"
```

**Real use case** — slanted signage banners: material cost is computed from the
perpendicular height, even though the printed artwork follows the slanted edge.

## Perimeter

The perimeter namespace mirrors the area shapes but returns the boundary length.
All results follow the same fixed-decimal formatting.

### perimeter.useRectangle(width, height, options?)

Formula: `2 * (width + height)`.

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.perimeter.useRectangle(5, 10);                // "30.00"
GeometryUtils.perimeter.useRectangle(5, 10, { unit: "m" }); // "30.00 m"
```

**Real use case** — fencing and picture frames: the boundary length is what you
buy, so `useRectangle` in the perimeter namespace is the one to reach for — not
the area method with the same name.

### perimeter.useSquare(side, options?)

Formula: `4 * side`.

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.perimeter.useSquare(4); // "16.00"
```

**Real use case** — trim and molding: four equal edges make the total length a
single multiplication.

### perimeter.useTriangle(side1, side2, side3, options?)

Formula: `side1 + side2 + side3` — the sum of the three side lengths, no
geometry theorem involved.

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.perimeter.useTriangle(3, 4, 5); // "12.00"
```

**Real use case** — triangular plots and SVG paths: when the three sides are
known (property survey, `<polygon points>`), the boundary is a plain sum.

### perimeter.useCircle(radius, options?)

Formula: `2 * π * radius` (circumference). The argument is the radius; pass
`diameter / 2` if that is what you have.

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.perimeter.useCircle(5); // "31.42"
```

**Real use case** — UI rings and tracks: an SVG progress circle needs the
circumference to compute `stroke-dasharray`; `150.80` for a `r=24` ring is the
full track length.

### perimeter.useHexagon(side, options?)

Formula: `6 * side` for a **regular** hexagon.

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.perimeter.useHexagon(3); // "18.00"
```

**Real use case** — scoring or cutting paths for hexagonal tiles: the outline
length drives machine time and material waste.

### perimeter.useTrapezoid(side1, side2, side3, side4, options?)

Formula: `side1 + side2 + side3 + side4`. The four sides are summed in order,
so the oblique sides must be provided individually.

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.perimeter.useTrapezoid(3, 5, 4, 4); // "16.00"
```

**Real use case** — boundary walls of trapezoidal plots: unlike the area method,
the perimeter needs every side, so keep the survey measurements handy.

### perimeter.useEllipse(semiMajor, semiMinor, options?)

Formula: **Ramanujan's approximation II** —

```text
h = ((a - b) / (a + b))²
P = π * (a + b) * (1 + 3h / (10 + √(4 - 3h)))
```

where `a` and `b` are the absolute values of the semi-axes. The implementation
is exact for circles (`a === b` → `h = 0` → `2πr`) and returns `"0.00"` when both
axes are `0`.

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.perimeter.useEllipse(5, 3); // "25.53"
```

**Real use case** — oval tracks, table edges and border trim: the approximation
is accurate to a few parts per million for practical ellipses, which is far
below the tolerance of any physical material.

### perimeter.useParallelogram(side1, side2, options?)

Formula: `2 * (side1 + side2)` — opposite sides are equal.

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.perimeter.useParallelogram(5, 3); // "16.00"
```

**Real use case** — frame or edge banding around a slanted panel: only one pair
of adjacent sides is needed because the shape is symmetric.

## Volume

Six 3D helpers. Results are cubic strings; pass `unit: "m³"`, `"cm³"`, `"L"`
(you convert units yourself) or omit it.

### volume.useCube(side, options?)

Formula: `side³`.

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.volume.useCube(3);                  // "27.00"
GeometryUtils.volume.useCube(3, { unit: "m³" });  // "27.00 m³"
```

**Real use case** — crate and pallet capacity: cubing the edge gives the volume
used for freight class and storage pricing.

### volume.useBox(length, width, height, options?)

Formula: `length * width * height` (rectangular prism).

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.volume.useBox(2, 3, 4); // "24.00"
GeometryUtils.volume.useBox(40, 30, 25, { unit: "cm³" }); // "30,000.00 cm³"
```

**Real use case** — shipping quotes: carriers price by volumetric weight, so the
box volume is the first number an e-commerce checkout needs. Grouping separators
come free from `Intl` (`"30,000.00"`).

### volume.useSphere(radius, options?)

Formula: `(4 / 3) * π * radius³`.

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.volume.useSphere(3); // "113.10"
```

**Real use case** — spherical tanks and globes: capacity estimates or 3D scene
scale calculations both start from the radius-cubed formula.

### volume.useCylinder(radius, height, options?)

Formula: `π * radius² * height`.

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.volume.useCylinder(3, 5); // "141.37"
```

**Real use case** — cans, pipes and silos: base area times height covers any
straight-walled cylinder; combine with
[Converter](/guides/services/converter) to turn `cm³` into `L`.

### volume.useCone(radius, height, options?)

Formula: `(1 / 3) * π * radius² * height` — exactly one third of the cylinder
with the same base and height.

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.volume.useCone(3, 5); // "47.12"
```

**Real use case** — funnels, hoppers and ice-cream cones: cone volume matters
for dosing equipment and mold capacity.

### volume.usePyramid(baseArea, height, options?)

Formula: `(1 / 3) * baseArea * height`. The first argument is the **base area**,
not a side length — compose it with an area helper when the base is a polygon:

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.volume.usePyramid(12, 5); // "20.00"

// Square-based pyramid with a 4 m side and 6 m height
const base = 4 ** 2; // compute the number directly — do not parse the formatted string
GeometryUtils.volume.usePyramid(base, 6); // "32.00"
```

**Real use case** — roof and hopper volumes: once the base surface is known
(possibly from `area.useHexagon` or `area.useSquare`), the pyramid helper turns
it into capacity with a single call.

## Rounding and precision notes

- `digits` controls both minimum and maximum fraction digits, so the output
  width is stable — ideal for aligned table columns.
- Formatting never mutates the numeric result: `area.useCircle(5)` prints
  `"78.54"` even though the raw value is `78.5398…`; compute with raw numbers if
  you chain formulas.
- `perimeter.useEllipse` is the only approximation in the module (Ramanujan II);
  every other method is an exact arithmetic expression evaluated in double
  precision.
- `NaN`, `Infinity` and negative inputs are formatted as-is (`"NaN"`, `"∞"`,
  `"-50.00"`). Validate dimensions before calling.

## Related

- [Formatter](/guides/services/formatter) — locale-aware formatting for numbers, dates and currency.
- [Converter](/guides/services/converter) — unit conversions to pair with area and volume results.
- [API Reference](/api/variables/GeometryUtils) — every export, generated from source.
