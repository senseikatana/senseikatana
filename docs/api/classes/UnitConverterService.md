[katanakit-js](../index.md) / UnitConverterService

# Class: UnitConverterService

Defined in: [core/services/converter.service.ts:24](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/converter.service.ts#L24)

UnitConverterService — Singleton facade for physical unit conversions.

Applies the **Singleton** pattern ([UnitConverterService.getInstance](#getinstance)),
the **Facade** pattern (one call per conversion) and **Dependency Injection**:
it never formats numbers itself, it delegates to an injected
[IFormatterService](../interfaces/IFormatterService.md). Swap that dependency through
[UnitConverterService.create](#create) or [UnitConverterService.useSetFormatter](#usesetformatter).

Every conversion is pure and returns a formatted string; the underlying
factors are instance state, never statics.

## Example

```ts
import { useToKilometers } from "katanakit-js";

useToKilometers(1); // "1.61"
```

## Implements

- [`IConverterService`](../interfaces/IConverterService.md)

## Methods

### useSetFormatter()

```ts
useSetFormatter(formatter): void;
```

Defined in: [core/services/converter.service.ts:71](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/converter.service.ts#L71)

Swaps the number formatter dependency at runtime (DI).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `formatter` | [`IFormatterService`](../interfaces/IFormatterService.md) | The new formatter to delegate to. |

#### Returns

`void`

***

### useToCelsius()

```ts
useToCelsius(
   fahrenheit, 
   locale?, 
   digits?
): string;
```

Defined in: [core/services/converter.service.ts:96](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/converter.service.ts#L96)

Pure: °F → °C (formatted).

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `fahrenheit` | `number` | `undefined` | Temperature in Fahrenheit. |
| `locale` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` | `"en"` | BCP 47 locale tag. Defaults to `"en"`. |
| `digits` | `number` | `2` | Fraction digits. Defaults to `2`. |

#### Returns

`string`

The formatted Celsius string.

#### Example

```ts
import { useToCelsius } from "katanakit-js";

useToCelsius(212); // "100.00"
useToCelsius(32);  // "0.00"
```

#### Implementation of

[`IConverterService`](../interfaces/IConverterService.md).[`useToCelsius`](../interfaces/IConverterService.md#usetocelsius)

***

### useToCm()

```ts
useToCm(
   inches, 
   locale?, 
   digits?
): string;
```

Defined in: [core/services/converter.service.ts:192](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/converter.service.ts#L192)

Pure: inches → centimeters (formatted).

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `inches` | `number` | `undefined` | Length in inches. |
| `locale` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` | `"en"` | BCP 47 locale tag. Defaults to `"en"`. |
| `digits` | `number` | `2` | Fraction digits. Defaults to `2`. |

#### Returns

`string`

The formatted centimeter string.

#### Example

```ts
import { useToCm } from "katanakit-js";

useToCm(1); // "2.54"
```

#### Implementation of

[`IConverterService`](../interfaces/IConverterService.md).[`useToCm`](../interfaces/IConverterService.md#usetocm)

***

### useToFahrenheit()

```ts
useToFahrenheit(
   celsius, 
   locale?, 
   digits?
): string;
```

Defined in: [core/services/converter.service.ts:116](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/converter.service.ts#L116)

Pure: °C → °F (formatted).

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `celsius` | `number` | `undefined` | Temperature in Celsius. |
| `locale` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` | `"en"` | BCP 47 locale tag. Defaults to `"en"`. |
| `digits` | `number` | `2` | Fraction digits. Defaults to `2`. |

#### Returns

`string`

The formatted Fahrenheit string.

#### Example

```ts
import { useToFahrenheit } from "katanakit-js";

useToFahrenheit(100); // "212.00"
useToFahrenheit(0);   // "32.00"
```

#### Implementation of

[`IConverterService`](../interfaces/IConverterService.md).[`useToFahrenheit`](../interfaces/IConverterService.md#usetofahrenheit)

***

### useToInches()

```ts
useToInches(
   cm, 
   locale?, 
   digits?
): string;
```

Defined in: [core/services/converter.service.ts:173](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/converter.service.ts#L173)

Pure: centimeters → inches (formatted).

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `cm` | `number` | `undefined` | Length in centimeters. |
| `locale` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` | `"en"` | BCP 47 locale tag. Defaults to `"en"`. |
| `digits` | `number` | `2` | Fraction digits. Defaults to `2`. |

#### Returns

`string`

The formatted inch string.

#### Example

```ts
import { useToInches } from "katanakit-js";

useToInches(2.54); // "1.00"
```

#### Implementation of

[`IConverterService`](../interfaces/IConverterService.md).[`useToInches`](../interfaces/IConverterService.md#usetoinches)

***

### useToKilometers()

```ts
useToKilometers(
   miles, 
   locale?, 
   digits?
): string;
```

Defined in: [core/services/converter.service.ts:135](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/converter.service.ts#L135)

Pure: miles → kilometers (formatted). Round-trips with [UnitConverterService.useToMiles](#usetomiles).

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `miles` | `number` | `undefined` | Distance in miles. |
| `locale` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` | `"en"` | BCP 47 locale tag. Defaults to `"en"`. |
| `digits` | `number` | `2` | Fraction digits. Defaults to `2`. |

#### Returns

`string`

The formatted kilometer string.

#### Example

```ts
import { useToKilometers } from "katanakit-js";

useToKilometers(1); // "1.61"
```

#### Implementation of

[`IConverterService`](../interfaces/IConverterService.md).[`useToKilometers`](../interfaces/IConverterService.md#usetokilometers)

***

### useToKilos()

```ts
useToKilos(
   pounds, 
   locale?, 
   digits?
): string;
```

Defined in: [core/services/converter.service.ts:211](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/converter.service.ts#L211)

Pure: pounds → kilograms (formatted).

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `pounds` | `number` | `undefined` | Weight in pounds. |
| `locale` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` | `"en"` | BCP 47 locale tag. Defaults to `"en"`. |
| `digits` | `number` | `2` | Fraction digits. Defaults to `2`. |

#### Returns

`string`

The formatted kilogram string.

#### Example

```ts
import { useToKilos } from "katanakit-js";

useToKilos(1); // "0.45"
```

#### Implementation of

[`IConverterService`](../interfaces/IConverterService.md).[`useToKilos`](../interfaces/IConverterService.md#usetokilos)

***

### useToMiles()

```ts
useToMiles(
   km, 
   locale?, 
   digits?
): string;
```

Defined in: [core/services/converter.service.ts:154](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/converter.service.ts#L154)

Pure: kilometers → miles (formatted). Round-trips with [UnitConverterService.useToKilometers](#usetokilometers).

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `km` | `number` | `undefined` | Distance in kilometers. |
| `locale` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` | `"en"` | BCP 47 locale tag. Defaults to `"en"`. |
| `digits` | `number` | `2` | Fraction digits. Defaults to `2`. |

#### Returns

`string`

The formatted mile string.

#### Example

```ts
import { useToMiles } from "katanakit-js";

useToMiles(1.60934); // "1.00"
```

#### Implementation of

[`IConverterService`](../interfaces/IConverterService.md).[`useToMiles`](../interfaces/IConverterService.md#usetomiles)

***

### useToPounds()

```ts
useToPounds(
   kilos, 
   locale?, 
   digits?
): string;
```

Defined in: [core/services/converter.service.ts:230](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/converter.service.ts#L230)

Pure: kilograms → pounds (formatted).

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `kilos` | `number` | `undefined` | Weight in kilograms. |
| `locale` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` | `"en"` | BCP 47 locale tag. Defaults to `"en"`. |
| `digits` | `number` | `2` | Fraction digits. Defaults to `2`. |

#### Returns

`string`

The formatted pound string.

#### Example

```ts
import { useToPounds } from "katanakit-js";

useToPounds(1); // "2.20"
```

#### Implementation of

[`IConverterService`](../interfaces/IConverterService.md).[`useToPounds`](../interfaces/IConverterService.md#usetopounds)

***

### create()

```ts
static create(formatter?): UnitConverterService;
```

Defined in: [core/services/converter.service.ts:62](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/converter.service.ts#L62)

Creates a NO-singleton instance with an injected formatter (DI).
Useful for tests or for custom number formatting.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `formatter?` | [`IFormatterService`](../interfaces/IFormatterService.md) | Formatter to inject. Defaults to `FormatterService`. |

#### Returns

`UnitConverterService`

A new UnitConverterService.

#### Example

```ts
const converter = UnitConverterService.create(myFormatter);
```

***

### getInstance()

```ts
static getInstance(): UnitConverterService;
```

Defined in: [core/services/converter.service.ts:43](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/converter.service.ts#L43)

Returns the shared instance (Singleton).

#### Returns

`UnitConverterService`
