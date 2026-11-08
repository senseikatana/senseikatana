[katanakit-js](../index.md) / GeometryVolumeService

# Class: GeometryVolumeService

Defined in: [core/services/geometry.service.ts:405](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L405)

GeometryVolumeService — pure volume calculations for 3D geometric shapes.
All methods are stateless — input → formatted string only.

Applies the **Singleton** pattern (one shared instance via
[GeometryVolumeService.getInstance](#getinstance)), exposed publicly through the
`GeometryUtils.volume` facade. Every public method uses the `use*` prefix
per `CONTRIBUTING.md`.

## Methods

### useBox()

```ts
useBox(
   length, 
   width, 
   height, 
   options?
): string;
```

Defined in: [core/services/geometry.service.ts:454](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L454)

Calculates the volume of a box (rectangular prism).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `length` | `number` | The length of the box. |
| `width` | `number` | The width of the box. |
| `height` | `number` | The height of the box. |
| `options?` | \{ `digits?`: `number`; `locale?`: `string`; `unit?`: `string`; \} | Optional formatting options. |
| `options.digits?` | `number` | - |
| `options.locale?` | `string` | - |
| `options.unit?` | `string` | - |

#### Returns

`string`

The formatted volume string.

#### Example

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.volume.useBox(2, 3, 4); // "24.00"
```

***

### useCone()

```ts
useCone(
   radius, 
   height, 
   options?
): string;
```

Defined in: [core/services/geometry.service.ts:510](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L510)

Calculates the volume of a cone.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `radius` | `number` | The radius of the cone base. |
| `height` | `number` | The height of the cone. |
| `options?` | \{ `digits?`: `number`; `locale?`: `string`; `unit?`: `string`; \} | Optional formatting options. |
| `options.digits?` | `number` | - |
| `options.locale?` | `string` | - |
| `options.unit?` | `string` | - |

#### Returns

`string`

The formatted volume string.

#### Example

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.volume.useCone(3, 5); // "47.12"
```

***

### useCube()

```ts
useCube(side, options?): string;
```

Defined in: [core/services/geometry.service.ts:434](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L434)

Calculates the volume of a cube.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `side` | `number` | The side length of the cube. |
| `options?` | \{ `digits?`: `number`; `locale?`: `string`; `unit?`: `string`; \} | Optional formatting options. |
| `options.digits?` | `number` | - |
| `options.locale?` | `string` | - |
| `options.unit?` | `string` | - |

#### Returns

`string`

The formatted volume string.

#### Example

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.volume.useCube(3); // "27.00"
GeometryUtils.volume.useCube(3, { unit: "m³" }); // "27.00 m³"
```

***

### useCylinder()

```ts
useCylinder(
   radius, 
   height, 
   options?
): string;
```

Defined in: [core/services/geometry.service.ts:491](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L491)

Calculates the volume of a cylinder.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `radius` | `number` | The radius of the cylinder base. |
| `height` | `number` | The height of the cylinder. |
| `options?` | \{ `digits?`: `number`; `locale?`: `string`; `unit?`: `string`; \} | Optional formatting options. |
| `options.digits?` | `number` | - |
| `options.locale?` | `string` | - |
| `options.unit?` | `string` | - |

#### Returns

`string`

The formatted volume string.

#### Example

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.volume.useCylinder(3, 5); // "141.37"
```

***

### usePyramid()

```ts
usePyramid(
   baseArea, 
   height, 
   options?
): string;
```

Defined in: [core/services/geometry.service.ts:529](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L529)

Calculates the volume of a pyramid.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `baseArea` | `number` | The area of the pyramid base. |
| `height` | `number` | The height of the pyramid. |
| `options?` | \{ `digits?`: `number`; `locale?`: `string`; `unit?`: `string`; \} | Optional formatting options. |
| `options.digits?` | `number` | - |
| `options.locale?` | `string` | - |
| `options.unit?` | `string` | - |

#### Returns

`string`

The formatted volume string.

#### Example

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.volume.usePyramid(12, 5); // "20.00"
```

***

### useSphere()

```ts
useSphere(radius, options?): string;
```

Defined in: [core/services/geometry.service.ts:472](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L472)

Calculates the volume of a sphere.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `radius` | `number` | The radius of the sphere. |
| `options?` | \{ `digits?`: `number`; `locale?`: `string`; `unit?`: `string`; \} | Optional formatting options. |
| `options.digits?` | `number` | - |
| `options.locale?` | `string` | - |
| `options.unit?` | `string` | - |

#### Returns

`string`

The formatted volume string.

#### Example

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.volume.useSphere(3); // "113.10"
```

***

### getInstance()

```ts
static getInstance(): GeometryVolumeService;
```

Defined in: [core/services/geometry.service.ts:412](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/geometry.service.ts#L412)

Returns the shared instance (Singleton).

#### Returns

`GeometryVolumeService`
