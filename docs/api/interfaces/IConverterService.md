[katanakit-js](../index.md) / IConverterService

# Interface: IConverterService

Defined in: [types/core/formatter.ts:16](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/formatter.ts#L16)

Contract of the unit converter facade.

## Methods

### useToCelsius()

```ts
useToCelsius(
   fahrenheit, 
   locale?, 
   digits?
): string;
```

Defined in: [types/core/formatter.ts:17](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/formatter.ts#L17)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fahrenheit` | `number` |
| `locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` |
| `digits?` | `number` |

#### Returns

`string`

***

### useToCm()

```ts
useToCm(
   inches, 
   locale?, 
   digits?
): string;
```

Defined in: [types/core/formatter.ts:22](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/formatter.ts#L22)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `inches` | `number` |
| `locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` |
| `digits?` | `number` |

#### Returns

`string`

***

### useToFahrenheit()

```ts
useToFahrenheit(
   celsius, 
   locale?, 
   digits?
): string;
```

Defined in: [types/core/formatter.ts:18](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/formatter.ts#L18)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `celsius` | `number` |
| `locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` |
| `digits?` | `number` |

#### Returns

`string`

***

### useToInches()

```ts
useToInches(
   cm, 
   locale?, 
   digits?
): string;
```

Defined in: [types/core/formatter.ts:21](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/formatter.ts#L21)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `cm` | `number` |
| `locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` |
| `digits?` | `number` |

#### Returns

`string`

***

### useToKilometers()

```ts
useToKilometers(
   miles, 
   locale?, 
   digits?
): string;
```

Defined in: [types/core/formatter.ts:19](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/formatter.ts#L19)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `miles` | `number` |
| `locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` |
| `digits?` | `number` |

#### Returns

`string`

***

### useToKilos()

```ts
useToKilos(
   pounds, 
   locale?, 
   digits?
): string;
```

Defined in: [types/core/formatter.ts:23](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/formatter.ts#L23)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pounds` | `number` |
| `locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` |
| `digits?` | `number` |

#### Returns

`string`

***

### useToMiles()

```ts
useToMiles(
   km, 
   locale?, 
   digits?
): string;
```

Defined in: [types/core/formatter.ts:20](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/formatter.ts#L20)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `km` | `number` |
| `locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` |
| `digits?` | `number` |

#### Returns

`string`

***

### useToPounds()

```ts
useToPounds(
   kilos, 
   locale?, 
   digits?
): string;
```

Defined in: [types/core/formatter.ts:24](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/formatter.ts#L24)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `kilos` | `number` |
| `locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` |
| `digits?` | `number` |

#### Returns

`string`
