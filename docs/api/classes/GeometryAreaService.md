[katanakit-js](../index.md) / GeometryAreaService

# Class: GeometryAreaService

Defined in: [core/services/geometry.service.ts:33](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L33)

GeometryAreaService — pure area calculations for geometric shapes.
All methods are stateless — input → formatted string only.

Applies the **Singleton** pattern (one shared instance via
[GeometryAreaService.getInstance](#getinstance)), exposed publicly through the
`GeometryUtils.area` facade. Every public method uses the `use*` prefix
per `CONTRIBUTING.md`.

## Methods

### useCircle()

```ts
useCircle(radius, options?): string;
```

Defined in: [core/services/geometry.service.ts:118](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L118)

Calculates the area of a circle.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `radius` | `number` | The radius of the circle. |
| `options?` | \{ `digits?`: `number`; `locale?`: `string`; `unit?`: `string`; \} | Optional formatting options. |
| `options.digits?` | `number` | - |
| `options.locale?` | `string` | - |
| `options.unit?` | `string` | - |

#### Returns

`string`

The formatted area string.

#### Example

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.area.useCircle(5); // "78.54"
```

***

### useEllipse()

```ts
useEllipse(
   semiMajor, 
   semiMinor, 
   options?
): string;
```

Defined in: [core/services/geometry.service.ts:180](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L180)

Calculates the area of an ellipse.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `semiMajor` | `number` | The semi-major axis length. |
| `semiMinor` | `number` | The semi-minor axis length. |
| `options?` | \{ `digits?`: `number`; `locale?`: `string`; `unit?`: `string`; \} | Optional formatting options. |
| `options.digits?` | `number` | - |
| `options.locale?` | `string` | - |
| `options.unit?` | `string` | - |

#### Returns

`string`

The formatted area string.

#### Example

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.area.useEllipse(5, 3); // "47.12"
```

***

### useHexagon()

```ts
useHexagon(side, options?): string;
```

Defined in: [core/services/geometry.service.ts:161](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L161)

Calculates the area of a regular hexagon.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `side` | `number` | The side length of the hexagon. |
| `options?` | \{ `digits?`: `number`; `locale?`: `string`; `unit?`: `string`; \} | Optional formatting options. |
| `options.digits?` | `number` | - |
| `options.locale?` | `string` | - |
| `options.unit?` | `string` | - |

#### Returns

`string`

The formatted area string.

#### Example

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.area.useHexagon(3); // "23.38"
```

***

### useParallelogram()

```ts
useParallelogram(
   base, 
   height, 
   options?
): string;
```

Defined in: [core/services/geometry.service.ts:199](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L199)

Calculates the area of a parallelogram.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `base` | `number` | The base length of the parallelogram. |
| `height` | `number` | The height of the parallelogram. |
| `options?` | \{ `digits?`: `number`; `locale?`: `string`; `unit?`: `string`; \} | Optional formatting options. |
| `options.digits?` | `number` | - |
| `options.locale?` | `string` | - |
| `options.unit?` | `string` | - |

#### Returns

`string`

The formatted area string.

#### Example

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.area.useParallelogram(6, 4); // "24.00"
```

***

### useRectangle()

```ts
useRectangle(
   width, 
   height, 
   options?
): string;
```

Defined in: [core/services/geometry.service.ts:63](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L63)

Calculates the area of a rectangle.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `width` | `number` | The width of the rectangle. |
| `height` | `number` | The height of the rectangle. |
| `options?` | \{ `digits?`: `number`; `locale?`: `string`; `unit?`: `string`; \} | Optional formatting options. |
| `options.digits?` | `number` | - |
| `options.locale?` | `string` | - |
| `options.unit?` | `string` | - |

#### Returns

`string`

The formatted area string.

#### Example

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.area.useRectangle(5, 10); // "50.00"
GeometryUtils.area.useRectangle(5, 10, { unit: "m²" }); // "50.00 m²"
```

***

### useSquare()

```ts
useSquare(side, options?): string;
```

Defined in: [core/services/geometry.service.ts:81](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L81)

Calculates the area of a square.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `side` | `number` | The side length of the square. |
| `options?` | \{ `digits?`: `number`; `locale?`: `string`; `unit?`: `string`; \} | Optional formatting options. |
| `options.digits?` | `number` | - |
| `options.locale?` | `string` | - |
| `options.unit?` | `string` | - |

#### Returns

`string`

The formatted area string.

#### Example

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.area.useSquare(4); // "16.00"
```

***

### useTrapezoid()

```ts
useTrapezoid(
   parallelSide1, 
   parallelSide2, 
   height, 
   options?
): string;
```

Defined in: [core/services/geometry.service.ts:138](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L138)

Calculates the area of a trapezoid.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parallelSide1` | `number` | The length of the first parallel side. |
| `parallelSide2` | `number` | The length of the second parallel side. |
| `height` | `number` | The height between parallel sides. |
| `options?` | \{ `digits?`: `number`; `locale?`: `string`; `unit?`: `string`; \} | Optional formatting options. |
| `options.digits?` | `number` | - |
| `options.locale?` | `string` | - |
| `options.unit?` | `string` | - |

#### Returns

`string`

The formatted area string.

#### Example

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.area.useTrapezoid(3, 5, 4); // "16.00"
```

***

### useTriangle()

```ts
useTriangle(
   base, 
   height, 
   options?
): string;
```

Defined in: [core/services/geometry.service.ts:100](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L100)

Calculates the area of a triangle.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `base` | `number` | The base length of the triangle. |
| `height` | `number` | The height of the triangle. |
| `options?` | \{ `digits?`: `number`; `locale?`: `string`; `unit?`: `string`; \} | Optional formatting options. |
| `options.digits?` | `number` | - |
| `options.locale?` | `string` | - |
| `options.unit?` | `string` | - |

#### Returns

`string`

The formatted area string.

#### Example

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.area.useTriangle(6, 4); // "12.00"
```

***

### getInstance()

```ts
static getInstance(): GeometryAreaService;
```

Defined in: [core/services/geometry.service.ts:40](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L40)

Returns the shared instance (Singleton).

#### Returns

`GeometryAreaService`
