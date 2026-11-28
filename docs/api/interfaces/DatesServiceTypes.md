[katanakit-js](../index.md) / DatesServiceTypes

# Interface: DatesServiceTypes

Defined in: [types/core/dates.ts:38](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dates.ts#L38)

Contract of the dates facade.

`onDateBetween`, `onDateAdd`, `onDateSubtract` and `onDateOrder` are the
arithmetic primitives; `onDurationBetween` is the structured breakdown.

## Methods

### onAddDays()

```ts
onAddDays(date, days): string;
```

Defined in: [types/core/dates.ts:47](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dates.ts#L47)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date` | `string` \| `PlainDate` |
| `days` | `number` |

#### Returns

`string`

***

### onDateAdd()

```ts
onDateAdd(
   date, 
   amount, 
   unit
): string;
```

Defined in: [types/core/dates.ts:41](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dates.ts#L41)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date` | [`TemporalInput`](../type-aliases/TemporalInput.md) |
| `amount` | `number` |
| `unit` | `"years"` \| `"quarters"` \| `"months"` \| `"weeks"` \| `"days"` \| `"hours"` \| `"minutes"` |

#### Returns

`string`

***

### onDateBetween()

```ts
onDateBetween(
   start, 
   end, 
   unit?
): number;
```

Defined in: [types/core/dates.ts:39](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dates.ts#L39)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `start` | [`TemporalInput`](../type-aliases/TemporalInput.md) |
| `end` | [`TemporalInput`](../type-aliases/TemporalInput.md) |
| `unit?` | `"years"` \| `"quarters"` \| `"months"` \| `"weeks"` \| `"days"` \| `"hours"` \| `"minutes"` |

#### Returns

`number`

***

### onDateOrder()

```ts
onDateOrder(date1, date2): "before" | "after" | "same";
```

Defined in: [types/core/dates.ts:43](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dates.ts#L43)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date1` | [`TemporalInput`](../type-aliases/TemporalInput.md) |
| `date2` | [`TemporalInput`](../type-aliases/TemporalInput.md) |

#### Returns

`"before"` \| `"after"` \| `"same"`

***

### onDateSubtract()

```ts
onDateSubtract(
   date, 
   amount, 
   unit
): string;
```

Defined in: [types/core/dates.ts:42](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dates.ts#L42)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date` | [`TemporalInput`](../type-aliases/TemporalInput.md) |
| `amount` | `number` |
| `unit` | `"years"` \| `"quarters"` \| `"months"` \| `"weeks"` \| `"days"` \| `"hours"` \| `"minutes"` |

#### Returns

`string`

***

### onDurationBetween()

```ts
onDurationBetween(start, end): Duration;
```

Defined in: [types/core/dates.ts:40](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dates.ts#L40)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `start` | [`TemporalInput`](../type-aliases/TemporalInput.md) |
| `end` | [`TemporalInput`](../type-aliases/TemporalInput.md) |

#### Returns

`Duration`

***

### onFirstDayOfMonth()

```ts
onFirstDayOfMonth(date?): string;
```

Defined in: [types/core/dates.ts:52](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dates.ts#L52)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date?` | `string` \| `PlainDate` |

#### Returns

`string`

***

### onFormat()

```ts
onFormat(
   dateInput, 
   locale?, 
   options?
): string;
```

Defined in: [types/core/dates.ts:44](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dates.ts#L44)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `dateInput` | [`TemporalInput`](../type-aliases/TemporalInput.md) |
| `locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` |
| `options?` | `DateTimeFormatOptions` |

#### Returns

`string`

***

### onIsAfter()

```ts
onIsAfter(date1, date2): boolean;
```

Defined in: [types/core/dates.ts:51](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dates.ts#L51)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date1` | `string` \| `PlainDate` |
| `date2` | `string` \| `PlainDate` |

#### Returns

`boolean`

***

### onIsBefore()

```ts
onIsBefore(date1, date2): boolean;
```

Defined in: [types/core/dates.ts:50](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dates.ts#L50)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date1` | `string` \| `PlainDate` |
| `date2` | `string` \| `PlainDate` |

#### Returns

`boolean`

***

### onIsEqual()

```ts
onIsEqual(date1, date2): boolean;
```

Defined in: [types/core/dates.ts:49](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dates.ts#L49)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date1` | `string` \| `PlainDate` |
| `date2` | `string` \| `PlainDate` |

#### Returns

`boolean`

***

### onLastDayOfMonth()

```ts
onLastDayOfMonth(date?): string;
```

Defined in: [types/core/dates.ts:53](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dates.ts#L53)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date?` | `string` \| `PlainDate` |

#### Returns

`string`

***

### onNow()

```ts
onNow(): string;
```

Defined in: [types/core/dates.ts:45](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dates.ts#L45)

#### Returns

`string`

***

### onNowDateTime()

```ts
onNowDateTime(): string;
```

Defined in: [types/core/dates.ts:46](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dates.ts#L46)

#### Returns

`string`

***

### onSubtractDays()

```ts
onSubtractDays(date, days): string;
```

Defined in: [types/core/dates.ts:48](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dates.ts#L48)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date` | `string` \| `PlainDate` |
| `days` | `number` |

#### Returns

`string`
