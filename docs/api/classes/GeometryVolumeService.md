[katanakit-js](../index.md) / GeometryVolumeService

# Class: GeometryVolumeService

Defined in: [core/services/geometry.service.ts:405](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/geometry.service.ts#L405)

GeometryVolumeService — pure volume calculations for 3D geometric shapes.
All methods are stateless — input → formatted string only.

Applies the **Singleton** pattern (one shared instance via
[GeometryVolumeService.getInstance](#getinstance)), exposed publicly through the
`GeometryUtils.volume` facade. Every public method uses the `use*` prefix
per `CONTRIBUTING.md`.

## Methods

### box()

```ts
box(
   length, 
   width, 
   height, 
   options?
): string;
```

Defined in: [core/services/geometry.service.ts:454](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/geometry.service.ts#L454)

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

GeometryUtils.volume.box(2, 3, 4); // "24.00"
```

***

### cone()

```ts
cone(
   radius, 
   height, 
   options?
): string;
```

Defined in: [core/services/geometry.service.ts:510](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/geometry.service.ts#L510)

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

GeometryUtils.volume.cone(3, 5); // "47.12"
```

***

### cube()

```ts
cube(side, options?): string;
```

Defined in: [core/services/geometry.service.ts:434](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/geometry.service.ts#L434)

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

GeometryUtils.volume.cube(3); // "27.00"
GeometryUtils.volume.cube(3, { unit: "m³" }); // "27.00 m³"
```

***

### cylinder()

```ts
cylinder(
   radius, 
   height, 
   options?
): string;
```

Defined in: [core/services/geometry.service.ts:491](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/geometry.service.ts#L491)

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

GeometryUtils.volume.cylinder(3, 5); // "141.37"
```

***

### pyramid()

```ts
pyramid(
   baseArea, 
   height, 
   options?
): string;
```

Defined in: [core/services/geometry.service.ts:529](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/geometry.service.ts#L529)

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

GeometryUtils.volume.pyramid(12, 5); // "20.00"
```

***

### sphere()

```ts
sphere(radius, options?): string;
```

Defined in: [core/services/geometry.service.ts:472](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/geometry.service.ts#L472)

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

GeometryUtils.volume.sphere(3); // "113.10"
```

***

### getInstance()

```ts
static getInstance(): GeometryVolumeService;
```

Defined in: [core/services/geometry.service.ts:412](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/geometry.service.ts#L412)

Returns the shared instance (Singleton).

#### Returns

`GeometryVolumeService`
