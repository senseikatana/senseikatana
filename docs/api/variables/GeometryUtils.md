[katanakit-js](../index.md) / GeometryUtils

# Variable: GeometryUtils

```ts
const GeometryUtils: {
  area: GeometryAreaService;
  perimeter: GeometryPerimeterService;
  volume: GeometryVolumeService;
};
```

Defined in: [core/services/geometry.service.ts:551](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/geometry.service.ts#L551)

Consolidated pure geometry utilities namespace.
Groups area, perimeter and volume calculations (no shared mutable state).

Applies the **Facade** pattern: exposes the three Singleton services
([GeometryAreaService](../classes/GeometryAreaService.md), [GeometryPerimeterService](../classes/GeometryPerimeterService.md),
[GeometryVolumeService](../classes/GeometryVolumeService.md)) under `area`, `perimeter` and `volume`.

## Type Declaration

### area

```ts
area: GeometryAreaService;
```

### perimeter

```ts
perimeter: GeometryPerimeterService;
```

### volume

```ts
volume: GeometryVolumeService;
```

## Example

```ts
import { GeometryUtils } from "katanakit-js";

GeometryUtils.area.circle(5);       // "78.54"
GeometryUtils.perimeter.circle(5);  // "31.42"
GeometryUtils.volume.sphere(3);     // "113.10"
```
