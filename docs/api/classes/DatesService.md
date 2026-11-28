[katanakit-js](../index.md) / DatesService

# Class: DatesService

Defined in: [core/services/dates.service.ts:72](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/dates.service.ts#L72)

DatesService - Singleton para operaciones de fechas.

Aplica el patrón Singleton: una única instancia reutilizable que centraliza
toda la lógica de fechas (diferencias, formateo, aritmética y comparaciones).
Puro, sin I/O, seguro para SSR.

## Methods

### addDays()

```ts
addDays(date, days): string;
```

Defined in: [core/services/dates.service.ts:393](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/dates.service.ts#L393)

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
addDays("2024-01-01", 10); // "2024-01-11"
```

***

### dateAdd()

```ts
dateAdd(
   date, 
   amount, 
   unit
): string;
```

Defined in: [core/services/dates.service.ts:242](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/dates.service.ts#L242)

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
dateAdd("2026-01-31", 1, "months");  // "2026-02-28"
dateAdd(now(), 14, "days");       // two weeks out
dateAdd("2026-01-01", 2, "quarters");// "2026-07-01"
```

***

### dateBetween()

```ts
dateBetween(
   start, 
   end, 
   unit?
): number;
```

Defined in: [core/services/dates.service.ts:182](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/dates.service.ts#L182)

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
| `unit?` | `"years"` \| `"quarters"` \| `"months"` \| `"weeks"` \| `"days"` \| `"hours"` \| `"minutes"` | `"days"` | Granularity to report; defaults to `days`. |

#### Returns

`number`

#### Example

```ts
dateBetween("2020-01-01", "2022-04-16");            // 836
dateBetween("2020-01-01", "2022-04-16", "months");  // 27
dateBetween("2022-04-16", "2020-01-01", "days");   // -836
```

***

### dateOrder()

```ts
dateOrder(date1, date2): "before" | "after" | "same";
```

Defined in: [core/services/dates.service.ts:292](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/dates.service.ts#L292)

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
dateOrder(deadline, now()); // "before" | "after" | "same"
```

***

### dateSubtract()

```ts
dateSubtract(
   date, 
   amount, 
   unit
): string;
```

Defined in: [core/services/dates.service.ts:247](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/dates.service.ts#L247)

Subtracts units from a date. The mirror of [dateAdd](#dateadd).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date` | [`TemporalInput`](../type-aliases/TemporalInput.md) |
| `amount` | `number` |
| `unit` | `"years"` \| `"quarters"` \| `"months"` \| `"weeks"` \| `"days"` \| `"hours"` \| `"minutes"` |

#### Returns

`string`

***

### durationBetween()

```ts
durationBetween(start, end): Duration;
```

Defined in: [core/services/dates.service.ts:220](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/dates.service.ts#L220)

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
const span = durationBetween("2020-01-01", "2022-04-16");
span.years;  // 2
span.months; // 3
span.days;   // 15
```

***

### firstDayOfMonth()

```ts
firstDayOfMonth(date?): string;
```

Defined in: [core/services/dates.service.ts:475](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/dates.service.ts#L475)

Returns the first day of the month for a given date.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date?` | `string` \| `PlainDate` | Base date (defaults to today). |

#### Returns

`string`

The first day of the month as an ISO string.

#### Example

```ts
firstDayOfMonth("2024-06-15"); // "2024-06-01"
```

***

### format()

```ts
format(
   dateInput, 
   locale?, 
   options?
): string;
```

Defined in: [core/services/dates.service.ts:318](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/dates.service.ts#L318)

Formats a date input into a localised string using `Intl.DateTimeFormat`.

Accepts epoch milliseconds, ISO strings, native `Date` objects,
`Temporal.Instant`, or any `Temporal` date/time type.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `dateInput` | [`TemporalInput`](../type-aliases/TemporalInput.md) | `undefined` | The value to format. |
| `locale?` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` | `"en"` | BCP 47 locale tag (defaults to `"en"`). |
| `options?` | `DateTimeFormatOptions` | `{}` | `Intl.DateTimeFormatOptions` (defaults to `{}`). |

#### Returns

`string`

The formatted date string.

#### Throws

If the input cannot be parsed as a date.

#### Example

```ts
format("2024-06-15");                        // "6/15/2024" (en-US)
format(Date.now(), "es", { dateStyle: "full" }); // "sábado, 15 de junio de 2024"
```

***

### isAfter()

```ts
isAfter(date1, date2): boolean;
```

Defined in: [core/services/dates.service.ts:460](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/dates.service.ts#L460)

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
isAfter("2024-06-15", "2024-01-01"); // true
isAfter("2024-06-15", "2024-06-15"); // false
```

***

### isBefore()

```ts
isBefore(date1, date2): boolean;
```

Defined in: [core/services/dates.service.ts:443](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/dates.service.ts#L443)

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
isBefore("2024-01-01", "2024-06-15"); // true
isBefore("2024-06-15", "2024-06-15"); // false
```

***

### isEqual()

```ts
isEqual(date1, date2): boolean;
```

Defined in: [core/services/dates.service.ts:426](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/dates.service.ts#L426)

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
isEqual("2024-06-15", "2024-06-15"); // true
isEqual("2024-06-15", "2024-06-16"); // false
```

***

### lastDayOfMonth()

```ts
lastDayOfMonth(date?): string;
```

Defined in: [core/services/dates.service.ts:491](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/dates.service.ts#L491)

Returns the last day of the month for a given date.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date?` | `string` \| `PlainDate` | Base date (defaults to today). |

#### Returns

`string`

The last day of the month as an ISO string.

#### Example

```ts
lastDayOfMonth("2024-02-10"); // "2024-02-29" (leap year)
lastDayOfMonth("2024-06-15"); // "2024-06-30"
```

***

### now()

```ts
now(): string;
```

Defined in: [core/services/dates.service.ts:363](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/dates.service.ts#L363)

Returns today's date as an ISO date string.

#### Returns

`string`

The current date in `YYYY-MM-DD` format.

#### Example

```ts
now(); // "2024-06-15"
```

***

### nowDateTime()

```ts
nowDateTime(): string;
```

Defined in: [core/services/dates.service.ts:377](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/dates.service.ts#L377)

Returns the current date and time as an ISO string (no timezone offset).

#### Returns

`string`

The current date-time in `YYYY-MM-DDTHH:MM:SS` format.

#### Example

```ts
nowDateTime(); // "2024-06-15T14:30:00"
```

***

### subtractDays()

```ts
subtractDays(date, days): string;
```

Defined in: [core/services/dates.service.ts:409](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/dates.service.ts#L409)

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
subtractDays("2024-01-11", 10); // "2024-01-01"
```

***

### getInstance()

```ts
static getInstance(): DatesService;
```

Defined in: [core/services/dates.service.ts:89](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/dates.service.ts#L89)

Obtiene la instancia única del DatesService (Singleton).

#### Returns

`DatesService`

La instancia única de DatesService.

#### Example

```ts
const dates = DatesService.getInstance();
dates.now();
```
