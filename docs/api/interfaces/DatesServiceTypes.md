[katanakit-js](../index.md) / DatesServiceTypes

# Interface: DatesServiceTypes

Defined in: [types/core/dates.ts:38](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dates.ts#L38)

Contract of the dates facade.

`useDateBetween`, `useDateAdd`, `useDateSubtract` and `useDateOrder` are the
arithmetic primitives; `useDurationBetween` is the structured breakdown.

## Methods

### useAddDays()

```ts
useAddDays(date, days): string;
```

Defined in: [types/core/dates.ts:47](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dates.ts#L47)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date` | `string` \| `PlainDate` |
| `days` | `number` |

#### Returns

`string`

***

### useDateAdd()

```ts
useDateAdd(
   date, 
   amount, 
   unit
): string;
```

Defined in: [types/core/dates.ts:41](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dates.ts#L41)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date` | [`TemporalInput`](../type-aliases/TemporalInput.md) |
| `amount` | `number` |
| `unit` | `"years"` \| `"quarters"` \| `"months"` \| `"weeks"` \| `"days"` \| `"hours"` \| `"minutes"` |

#### Returns

`string`

***

### useDateBetween()

```ts
useDateBetween(
   start, 
   end, 
   unit?
): number;
```

Defined in: [types/core/dates.ts:39](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dates.ts#L39)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `start` | [`TemporalInput`](../type-aliases/TemporalInput.md) |
| `end` | [`TemporalInput`](../type-aliases/TemporalInput.md) |
| `unit?` | `"years"` \| `"quarters"` \| `"months"` \| `"weeks"` \| `"days"` \| `"hours"` \| `"minutes"` |

#### Returns

`number`

***

### useDateOrder()

```ts
useDateOrder(date1, date2): "before" | "after" | "same";
```

Defined in: [types/core/dates.ts:43](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dates.ts#L43)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date1` | [`TemporalInput`](../type-aliases/TemporalInput.md) |
| `date2` | [`TemporalInput`](../type-aliases/TemporalInput.md) |

#### Returns

`"before"` \| `"after"` \| `"same"`

***

### useDateSubtract()

```ts
useDateSubtract(
   date, 
   amount, 
   unit
): string;
```

Defined in: [types/core/dates.ts:42](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dates.ts#L42)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date` | [`TemporalInput`](../type-aliases/TemporalInput.md) |
| `amount` | `number` |
| `unit` | `"years"` \| `"quarters"` \| `"months"` \| `"weeks"` \| `"days"` \| `"hours"` \| `"minutes"` |

#### Returns

`string`

***

### useDurationBetween()

```ts
useDurationBetween(start, end): Duration;
```

Defined in: [types/core/dates.ts:40](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dates.ts#L40)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `start` | [`TemporalInput`](../type-aliases/TemporalInput.md) |
| `end` | [`TemporalInput`](../type-aliases/TemporalInput.md) |

#### Returns

`Duration`

***

### useFirstDayOfMonth()

```ts
useFirstDayOfMonth(date?): string;
```

Defined in: [types/core/dates.ts:52](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dates.ts#L52)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date?` | `string` \| `PlainDate` |

#### Returns

`string`

***

### useFormat()

```ts
useFormat(
   dateInput, 
   locale?, 
   options?
): string;
```

Defined in: [types/core/dates.ts:44](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dates.ts#L44)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `dateInput` | [`TemporalInput`](../type-aliases/TemporalInput.md) |
| `locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` |
| `options?` | `DateTimeFormatOptions` |

#### Returns

`string`

***

### useIsAfter()

```ts
useIsAfter(date1, date2): boolean;
```

Defined in: [types/core/dates.ts:51](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dates.ts#L51)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date1` | `string` \| `PlainDate` |
| `date2` | `string` \| `PlainDate` |

#### Returns

`boolean`

***

### useIsBefore()

```ts
useIsBefore(date1, date2): boolean;
```

Defined in: [types/core/dates.ts:50](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dates.ts#L50)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date1` | `string` \| `PlainDate` |
| `date2` | `string` \| `PlainDate` |

#### Returns

`boolean`

***

### useIsEqual()

```ts
useIsEqual(date1, date2): boolean;
```

Defined in: [types/core/dates.ts:49](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dates.ts#L49)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date1` | `string` \| `PlainDate` |
| `date2` | `string` \| `PlainDate` |

#### Returns

`boolean`

***

### useLastDayOfMonth()

```ts
useLastDayOfMonth(date?): string;
```

Defined in: [types/core/dates.ts:53](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dates.ts#L53)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date?` | `string` \| `PlainDate` |

#### Returns

`string`

***

### useNow()

```ts
useNow(): string;
```

Defined in: [types/core/dates.ts:45](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dates.ts#L45)

#### Returns

`string`

***

### useNowDateTime()

```ts
useNowDateTime(): string;
```

Defined in: [types/core/dates.ts:46](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dates.ts#L46)

#### Returns

`string`

***

### useSubtractDays()

```ts
useSubtractDays(date, days): string;
```

Defined in: [types/core/dates.ts:48](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dates.ts#L48)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date` | `string` \| `PlainDate` |
| `days` | `number` |

#### Returns

`string`
