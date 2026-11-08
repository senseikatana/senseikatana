[katanakit-js](../index.md) / DatesService

# Class: DatesService

Defined in: [core/services/dates.service.ts:72](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/dates.service.ts#L72)

DatesService - Singleton para operaciones de fechas.

Aplica el patrón Singleton: una única instancia reutilizable que centraliza
toda la lógica de fechas (diferencias, formateo, aritmética y comparaciones).
Puro, sin I/O, seguro para SSR.

## Methods

### useAddDays()

```ts
useAddDays(date, days): string;
```

Defined in: [core/services/dates.service.ts:395](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/dates.service.ts#L395)

Adds a number of days to a date.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date` | `string` \| `PlainDate` | Base date (ISO string or `PlainDate`). |
| `days` | `number` | Number of days to add (can be negative). |

#### Returns

`string`

The resulting date as an ISO string.

#### Example

```ts
useAddDays("2024-01-01", 10); // "2024-01-11"
```

***

### useDateAdd()

```ts
useDateAdd(
   date, 
   amount, 
   unit
): string;
```

Defined in: [core/services/dates.service.ts:244](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/dates.service.ts#L244)

Returns the date a given number of units away, preserving calendar
semantics — adding one month to the 31st lands on the 31st of a shorter
month, not on an overflow.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date` | [`TemporalInput`](../type-aliases/TemporalInput.md) | Starting date. |
| `amount` | `number` | Signed amount; negative moves backwards. |
| `unit` | `"years"` \| `"quarters"` \| `"months"` \| `"weeks"` \| `"days"` \| `"hours"` \| `"minutes"` | Granularity to move by. |

#### Returns

`string`

#### Example

```ts
useDateAdd("2026-01-31", 1, "months");  // "2026-02-28"
useDateAdd(useNow(), 14, "days");       // two weeks out
useDateAdd("2026-01-01", 2, "quarters");// "2026-07-01"
```

***

### useDateBetween()

```ts
useDateBetween(
   start, 
   end, 
   unit?
): number;
```

Defined in: [core/services/dates.service.ts:184](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/dates.service.ts#L184)

Returns the whole number of `unit`s between two dates.

Signed, like Notion's `dateBetween`: a later `end` is positive, an
earlier one negative. Never fractional — `total()` reports `0.0849` years
across a month because a year is not a whole number of months, and a
fractional year count is noise for a calendar API.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `start` | [`TemporalInput`](../type-aliases/TemporalInput.md) | `undefined` | Range start (any `TemporalInput`). |
| `end` | [`TemporalInput`](../type-aliases/TemporalInput.md) | `undefined` | Range end (any `TemporalInput`). |
| `unit` | `"years"` \| `"quarters"` \| `"months"` \| `"weeks"` \| `"days"` \| `"hours"` \| `"minutes"` | `"days"` | Granularity to report; defaults to `days`. |

#### Returns

`number`

#### Example

```ts
useDateBetween("2020-01-01", "2022-04-16");            // 836
useDateBetween("2020-01-01", "2022-04-16", "months");  // 27
useDateBetween("2022-04-16", "2020-01-01", "days");   // -836
```

***

### useDateOrder()

```ts
useDateOrder(date1, date2): "before" | "after" | "same";
```

Defined in: [core/services/dates.service.ts:294](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/dates.service.ts#L294)

Returns which of two dates comes first.

A three-way comparison is what a date range filter actually needs —
`before` and `after` answer different queries, and collapsing them into
a boolean loses the direction you were asked about.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date1` | [`TemporalInput`](../type-aliases/TemporalInput.md) |
| `date2` | [`TemporalInput`](../type-aliases/TemporalInput.md) |

#### Returns

`"before"` \| `"after"` \| `"same"`

#### Example

```ts
useDateOrder(deadline, useNow()); // "before" | "after" | "same"
```

***

### useDateSubtract()

```ts
useDateSubtract(
   date, 
   amount, 
   unit
): string;
```

Defined in: [core/services/dates.service.ts:249](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/dates.service.ts#L249)

Subtracts units from a date. The mirror of [useDateAdd](../functions/useDateAdd.md).

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

Defined in: [core/services/dates.service.ts:222](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/dates.service.ts#L222)

Returns the balanced breakdown of the span between two dates, without
collapsing it to prose or to a single number.

The shape is Temporal's own, so `.years`, `.months` and `.days` are
available separately — which a single formatted string cannot give you
without parsing English out of it.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `start` | [`TemporalInput`](../type-aliases/TemporalInput.md) |
| `end` | [`TemporalInput`](../type-aliases/TemporalInput.md) |

#### Returns

`Duration`

#### Example

```ts
const span = useDurationBetween("2020-01-01", "2022-04-16");
span.years;  // 2
span.months; // 3
span.days;   // 15
```

***

### useFirstDayOfMonth()

```ts
useFirstDayOfMonth(date?): string;
```

Defined in: [core/services/dates.service.ts:477](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/dates.service.ts#L477)

Returns the first day of the month for a given date.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date` | `string` \| `PlainDate` | Base date (defaults to today). |

#### Returns

`string`

The first day of the month as an ISO string.

#### Example

```ts
useFirstDayOfMonth("2024-06-15"); // "2024-06-01"
```

***

### useFormat()

```ts
useFormat(
   dateInput, 
   locale?, 
   options?
): string;
```

Defined in: [core/services/dates.service.ts:320](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/dates.service.ts#L320)

Formats a date input into a localised string using `Intl.DateTimeFormat`.

Accepts epoch milliseconds, ISO strings, native `Date` objects,
`Temporal.Instant`, or any `Temporal` date/time type.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `dateInput` | [`TemporalInput`](../type-aliases/TemporalInput.md) | `undefined` | The value to format. |
| `locale` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` | `"en"` | BCP 47 locale tag (defaults to `"en"`). |
| `options` | `DateTimeFormatOptions` | `{}` | `Intl.DateTimeFormatOptions` (defaults to `{}`). |

#### Returns

`string`

The formatted date string.

#### Throws

If the input cannot be parsed as a date.

#### Example

```ts
useFormat("2024-06-15");                        // "6/15/2024" (en-US)
useFormat(Date.now(), "es", { dateStyle: "full" }); // "sábado, 15 de junio de 2024"
```

***

### useIsAfter()

```ts
useIsAfter(date1, date2): boolean;
```

Defined in: [core/services/dates.service.ts:462](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/dates.service.ts#L462)

Checks whether `date1` is after `date2`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date1` | `string` \| `PlainDate` | First date (ISO string or `PlainDate`). |
| `date2` | `string` \| `PlainDate` | Second date (ISO string or `PlainDate`). |

#### Returns

`boolean`

`true` if `date1` is strictly after `date2`.

#### Example

```ts
useIsAfter("2024-06-15", "2024-01-01"); // true
useIsAfter("2024-06-15", "2024-06-15"); // false
```

***

### useIsBefore()

```ts
useIsBefore(date1, date2): boolean;
```

Defined in: [core/services/dates.service.ts:445](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/dates.service.ts#L445)

Checks whether `date1` is before `date2`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date1` | `string` \| `PlainDate` | First date (ISO string or `PlainDate`). |
| `date2` | `string` \| `PlainDate` | Second date (ISO string or `PlainDate`). |

#### Returns

`boolean`

`true` if `date1` is strictly before `date2`.

#### Example

```ts
useIsBefore("2024-01-01", "2024-06-15"); // true
useIsBefore("2024-06-15", "2024-06-15"); // false
```

***

### useIsEqual()

```ts
useIsEqual(date1, date2): boolean;
```

Defined in: [core/services/dates.service.ts:428](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/dates.service.ts#L428)

Checks whether two dates are equal.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date1` | `string` \| `PlainDate` | First date (ISO string or `PlainDate`). |
| `date2` | `string` \| `PlainDate` | Second date (ISO string or `PlainDate`). |

#### Returns

`boolean`

`true` if the dates represent the same day.

#### Example

```ts
useIsEqual("2024-06-15", "2024-06-15"); // true
useIsEqual("2024-06-15", "2024-06-16"); // false
```

***

### useLastDayOfMonth()

```ts
useLastDayOfMonth(date?): string;
```

Defined in: [core/services/dates.service.ts:493](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/dates.service.ts#L493)

Returns the last day of the month for a given date.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date` | `string` \| `PlainDate` | Base date (defaults to today). |

#### Returns

`string`

The last day of the month as an ISO string.

#### Example

```ts
useLastDayOfMonth("2024-02-10"); // "2024-02-29" (leap year)
useLastDayOfMonth("2024-06-15"); // "2024-06-30"
```

***

### useNow()

```ts
useNow(): string;
```

Defined in: [core/services/dates.service.ts:365](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/dates.service.ts#L365)

Returns today's date as an ISO date string.

#### Returns

`string`

The current date in `YYYY-MM-DD` format.

#### Example

```ts
useNow(); // "2024-06-15"
```

***

### useNowDateTime()

```ts
useNowDateTime(): string;
```

Defined in: [core/services/dates.service.ts:379](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/dates.service.ts#L379)

Returns the current date and time as an ISO string (no timezone offset).

#### Returns

`string`

The current date-time in `YYYY-MM-DDTHH:MM:SS` format.

#### Example

```ts
useNowDateTime(); // "2024-06-15T14:30:00"
```

***

### useSubtractDays()

```ts
useSubtractDays(date, days): string;
```

Defined in: [core/services/dates.service.ts:411](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/dates.service.ts#L411)

Subtracts a number of days from a date.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date` | `string` \| `PlainDate` | Base date (ISO string or `PlainDate`). |
| `days` | `number` | Number of days to subtract. |

#### Returns

`string`

The resulting date as an ISO string.

#### Example

```ts
useSubtractDays("2024-01-11", 10); // "2024-01-01"
```

***

### getInstance()

```ts
static getInstance(): DatesService;
```

Defined in: [core/services/dates.service.ts:91](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/dates.service.ts#L91)

Obtiene la instancia única del DatesService (Singleton).

#### Returns

`DatesService`

La instancia única de DatesService.

#### Example

```ts
const dates = DatesService.getInstance();
dates.useNow();
```
