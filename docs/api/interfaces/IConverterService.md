[katanakit-js](../index.md) / IConverterService

# Interface: IConverterService

Defined in: [types/core/formatter.ts:16](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/formatter.ts#L16)

Contract of the unit converter facade.

## Methods

### toCelsius()

```ts
toCelsius(
   fahrenheit, 
   locale?, 
   digits?
): string;
```

Defined in: [types/core/formatter.ts:17](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/formatter.ts#L17)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fahrenheit` | `number` |
| `locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` |
| `digits?` | `number` |

#### Returns

`string`

***

### toCm()

```ts
toCm(
   inches, 
   locale?, 
   digits?
): string;
```

Defined in: [types/core/formatter.ts:22](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/formatter.ts#L22)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `inches` | `number` |
| `locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` |
| `digits?` | `number` |

#### Returns

`string`

***

### toFahrenheit()

```ts
toFahrenheit(
   celsius, 
   locale?, 
   digits?
): string;
```

Defined in: [types/core/formatter.ts:18](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/formatter.ts#L18)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `celsius` | `number` |
| `locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` |
| `digits?` | `number` |

#### Returns

`string`

***

### toInches()

```ts
toInches(
   cm, 
   locale?, 
   digits?
): string;
```

Defined in: [types/core/formatter.ts:21](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/formatter.ts#L21)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `cm` | `number` |
| `locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` |
| `digits?` | `number` |

#### Returns

`string`

***

### toKilometers()

```ts
toKilometers(
   miles, 
   locale?, 
   digits?
): string;
```

Defined in: [types/core/formatter.ts:19](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/formatter.ts#L19)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `miles` | `number` |
| `locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` |
| `digits?` | `number` |

#### Returns

`string`

***

### toKilos()

```ts
toKilos(
   pounds, 
   locale?, 
   digits?
): string;
```

Defined in: [types/core/formatter.ts:23](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/formatter.ts#L23)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pounds` | `number` |
| `locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` |
| `digits?` | `number` |

#### Returns

`string`

***

### toMiles()

```ts
toMiles(
   km, 
   locale?, 
   digits?
): string;
```

Defined in: [types/core/formatter.ts:20](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/formatter.ts#L20)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `km` | `number` |
| `locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` |
| `digits?` | `number` |

#### Returns

`string`

***

### toPounds()

```ts
toPounds(
   kilos, 
   locale?, 
   digits?
): string;
```

Defined in: [types/core/formatter.ts:24](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/formatter.ts#L24)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `kilos` | `number` |
| `locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` |
| `digits?` | `number` |

#### Returns

`string`
