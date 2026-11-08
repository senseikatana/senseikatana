[katanakit-js](../index.md) / GeometryPerimeterService

# Class: GeometryPerimeterService

Defined in: [core/services/geometry.service.ts:213](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L213)

GeometryPerimeterService — pure perimeter calculations for geometric shapes.
All methods are stateless — input → formatted string only.

Applies the **Singleton** pattern (one shared instance via
[GeometryPerimeterService.getInstance](#getinstance)), exposed publicly through the
`GeometryUtils.perimeter` facade. Every public method uses the `use*` prefix
per `CONTRIBUTING.md`.

## Methods

### useCircle()

```ts
useCircle(radius, options?): string;
```

Defined in: [core/services/geometry.service.ts:299](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L299)

Calculates the perimeter (circumference) of a circle.

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

The formatted perimeter string.

#### Example

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.perimeter.useCircle(5); // "31.42"
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

Defined in: [core/services/geometry.service.ts:363](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L363)

Calculates the perimeter of an ellipse using Ramanujan's approximation II.

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

The formatted perimeter string.

#### Example

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.perimeter.useEllipse(5, 3); // "25.53"
```

***

### useHexagon()

```ts
useHexagon(side, options?): string;
```

Defined in: [core/services/geometry.service.ts:317](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L317)

Calculates the perimeter of a regular hexagon.

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

The formatted perimeter string.

#### Example

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.perimeter.useHexagon(3); // "18.00"
```

***

### useParallelogram()

```ts
useParallelogram(
   side1, 
   side2, 
   options?
): string;
```

Defined in: [core/services/geometry.service.ts:391](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L391)

Calculates the perimeter of a parallelogram.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `side1` | `number` | The length of the first side. |
| `side2` | `number` | The length of the second side. |
| `options?` | \{ `digits?`: `number`; `locale?`: `string`; `unit?`: `string`; \} | Optional formatting options. |
| `options.digits?` | `number` | - |
| `options.locale?` | `string` | - |
| `options.unit?` | `string` | - |

#### Returns

`string`

The formatted perimeter string.

#### Example

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.perimeter.useParallelogram(5, 3); // "16.00"
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

Defined in: [core/services/geometry.service.ts:243](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L243)

Calculates the perimeter of a rectangle.

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

The formatted perimeter string.

#### Example

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.perimeter.useRectangle(5, 10); // "30.00"
GeometryUtils.perimeter.useRectangle(5, 10, { unit: "m" }); // "30.00 m"
```

***

### useSquare()

```ts
useSquare(side, options?): string;
```

Defined in: [core/services/geometry.service.ts:261](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L261)

Calculates the perimeter of a square.

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

The formatted perimeter string.

#### Example

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.perimeter.useSquare(4); // "16.00"
```

***

### useTrapezoid()

```ts
useTrapezoid(
   side1, 
   side2, 
   side3, 
   side4, 
   options?
): string;
```

Defined in: [core/services/geometry.service.ts:338](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L338)

Calculates the perimeter of a trapezoid.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `side1` | `number` | The length of the first side. |
| `side2` | `number` | The length of the second side. |
| `side3` | `number` | The length of the third side. |
| `side4` | `number` | The length of the fourth side. |
| `options?` | \{ `digits?`: `number`; `locale?`: `string`; `unit?`: `string`; \} | Optional formatting options. |
| `options.digits?` | `number` | - |
| `options.locale?` | `string` | - |
| `options.unit?` | `string` | - |

#### Returns

`string`

The formatted perimeter string.

#### Example

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.perimeter.useTrapezoid(3, 5, 4, 4); // "16.00"
```

***

### useTriangle()

```ts
useTriangle(
   side1, 
   side2, 
   side3, 
   options?
): string;
```

Defined in: [core/services/geometry.service.ts:281](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L281)

Calculates the perimeter of a triangle.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `side1` | `number` | The length of the first side. |
| `side2` | `number` | The length of the second side. |
| `side3` | `number` | The length of the third side. |
| `options?` | \{ `digits?`: `number`; `locale?`: `string`; `unit?`: `string`; \} | Optional formatting options. |
| `options.digits?` | `number` | - |
| `options.locale?` | `string` | - |
| `options.unit?` | `string` | - |

#### Returns

`string`

The formatted perimeter string.

#### Example

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.perimeter.useTriangle(3, 4, 5); // "12.00"
```

***

### getInstance()

```ts
static getInstance(): GeometryPerimeterService;
```

Defined in: [core/services/geometry.service.ts:220](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L220)

Returns the shared instance (Singleton).

#### Returns

`GeometryPerimeterService`
