---
title: Dates
description: "Temporal-based date helpers: now, day arithmetic, month boundaries, comparisons and Intl formatting — every method explained."
---

# Dates

`dates.service.ts` is a **Singleton facade** over the
[Temporal API](https://tc39.es/proposal-temporal/docs/) provided by
`@js-temporal/polyfill`. Temporal replaces the classic `Date` object's sharp
edges — mutable instances, zero-indexed months, ambiguous time zones and DST
arithmetic — with immutable value types and explicit calendar math.

Three rules apply to every helper on this page:

1. **Immutable by design.** Helpers never mutate their inputs, and `Temporal`
   values are immutable too. `useAddDays()` returns a brand-new ISO string; the
   `PlainDate` or string you passed in stays untouched.
2. **ISO calendar dates in, ISO strings out.** Arithmetic, boundary and
   comparison helpers accept `string | Temporal.PlainDate`. Strings must be
   plain calendar dates (`YYYY-MM-DD`) — a timestamp such as
   `"2024-06-15T10:00:00Z"` throws a `RangeError`. Only `useFormat()` accepts
   the wider `TemporalInput` union.
3. **SSR-safe and pure.** No `window`/`document`, no I/O, no hidden state.
   `Temporal.Now` reads the clock and time zone of the runtime, so on the server
   you get the server's zone — see the notes on [`useNow()`](#usenow) for the
   hydration implications.

`@js-temporal/polyfill@0.5.1` is a direct dependency of `katanakit-js`, so
there is nothing extra to install. Two equivalent entry points exist:

```ts
import { DatesService, useNow } from "katanakit-js";

useNow();                              // named wrapper, recommended
DatesService.getInstance().useNow();   // same singleton, same result
```

`getInstance()` is idempotent: the first call creates the private instance and
every later call returns it. There is no state to reset and no lifecycle to
manage; prefer named wrappers at call sites and keep the facade for dependency
injection or legacy code. The related types (`TemporalInput`, `Locale`,
`DatesServiceTypes`) are re-exported from the same barrel.

## Quick example

```ts
import {
  useNow, useNowDateTime, useDateAdd, useDateSubtract,
  useFirstDayOfMonth, useLastDayOfMonth,
  useIsEqual, useIsBefore, useFormat,
  useDateBetween, useDateOrder, useDurationBetween,
} from "katanakit-js";

const today = useNow();                        // "2026-10-05"
const stamp = useNowDateTime();                // "2026-10-05T17:28:45.227125197"
const due = useDateAdd(today, 30, "days");     // "2026-11-04"
const issued = useDateSubtract(today, 7, "days"); // "2026-09-28"
const first = useFirstDayOfMonth(today);       // "2026-10-01"
const last = useLastDayOfMonth(today);         // "2026-10-31"
const overdue = useIsBefore(due, today);       // false
const same = useIsEqual(due, today);           // false
const age = useDateBetween(issued, today, "days");    // 7
const months = useDateBetween(issued, today, "months"); // 0
const state = useDateOrder(due, today);        // "after"
useFormat(due, "en", { dateStyle: "long" });   // "November 4, 2026"

const tenure = useDurationBetween("2020-01-01", "2022-04-16");
tenure.years;  // 2
tenure.months; // 3
tenure.days;   // 15
```

## Creating

### useNow()

`useNow(): string`

Returns the current calendar date in the runtime's time zone as a
`Temporal.PlainDate` string — always `YYYY-MM-DD`, zero-padded, with no time,
offset or `Z` suffix. Internally this is
`Temporal.Now.plainDateISO().toString()`, and the result is exactly the format
`<input type="date">` expects.

**Returns** `string` — for example `"2026-10-05"`.

**Edge cases**

- The value comes from the system clock's time zone. A server rendering at
  23:30 UTC may already be on the next calendar day relative to the browser
  (or the reverse), so rendering "today" during SSR can cause a hydration
  mismatch. Render the date client-side, or pass a fixed `PlainDate` down from
  the server when the output must match.
- Unlike an epoch timestamp, the value has no time component: two calls on the
  same calendar day are byte-identical.

```ts
import { useNow } from "katanakit-js";

useNow(); // "2026-10-05"
```

**Real use case** — the default value of a date picker or a "created on" field,
without accidentally shipping a timestamp from the server:

```ts
<input type="date" name="due" value={useNow()} />
```

### useNowDateTime()

`useNowDateTime(): string`

Returns the current wall-clock date and time with **no time-zone offset** —
`Temporal.Now.plainDateTimeISO().toString()`. This is a "plain" value: it is
not a UTC instant and does not know where it was observed.

**Returns** `string` — `YYYY-MM-DDTHH:MM:SS` plus fractional seconds when the
clock exposes sub-second precision. In Node and Bun the polyfill reads a
nanosecond-capable clock, so expect values such as
`"2026-10-05T17:28:45.227125197"`. Never slice to a fixed length; parse the
value back with `Temporal.PlainDateTime.from()`.

**Edge cases**

- Because there is no offset, do not hand the string to `new Date()` and assume
  UTC — different hosts may interpret the missing zone differently. Record
  epoch milliseconds or a `Temporal.Instant` when you need a real instant.
- If you need the time in a specific zone rather than the local one, use
  `Temporal.Now.zonedDateTimeISO("Europe/Madrid")` directly; the service stays
  intentionally locale-agnostic.

```ts
import { useNowDateTime } from "katanakit-js";

useNowDateTime(); // "2026-10-05T17:28:45.227125197"
```

**Real use case** — append a sortable, sub-second stamp to log lines that are
already local to the host, where converting to UTC would only add noise:

```ts
console.log(`[${useNowDateTime()}] job started`);
```

## Arithmetic

All arithmetic helpers share one contract: whole calendar units, immutable
inputs, and an ISO date string as the result. Day addition is calendar-aware —
adding one day always advances one day on the calendar, even across
daylight-saving transitions, which plain `Date` millisecond math cannot
guarantee.

### useAddDays(date, days)

`useAddDays(date: string | Temporal.PlainDate, days: number): string`

Adds `days` calendar days to the base date and returns the result as
`YYYY-MM-DD`. Internally: `toPlainDate(date).add({ days }).toString()`.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `date` | `string \| Temporal.PlainDate` | required | Base date, ISO `YYYY-MM-DD` or a `PlainDate`. |
| `days` | `number` | required | Whole days to add. Negative values move backwards. |

**Returns** `string` — the resulting ISO date.

**Edge cases**

- Invalid strings throw `RangeError` from `Temporal.PlainDate.from()`; this
  helper does not wrap or swallow errors.
- `days` must be an integer. `useAddDays(today, 1.5)` throws
  `RangeError: unsupported fractional value 1.5` — round before calling.
- A `PlainDate` argument is never mutated.

```ts
import { Temporal } from "@js-temporal/polyfill";
import { useAddDays } from "katanakit-js";

useAddDays("2024-02-28", 2);  // "2024-03-01" — leap year handled
useAddDays("2024-01-01", -1); // "2023-12-31" — negative days subtract

const start = Temporal.PlainDate.from("2024-06-15");
useAddDays(start, 10);        // "2024-06-25"
start.toString();             // "2024-06-15" — untouched
```

**Real use case** — trial expiration:
`const expiresAt = useAddDays(signupDate, 14)` stores a calendar date that
survives DST changes and month-length differences.

### useSubtractDays(date, days)

`useSubtractDays(date: string | Temporal.PlainDate, days: number): string`

Mirror image of [`useAddDays()`](#useadddaysdate-days): subtracts `days`
calendar days. Internally `toPlainDate(date).subtract({ days }).toString()`.
Same input rules, same `RangeError` behavior, same immutability.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `date` | `string \| Temporal.PlainDate` | required | Base date, ISO `YYYY-MM-DD` or a `PlainDate`. |
| `days` | `number` | required | Whole days to subtract. |

**Returns** `string` — the resulting ISO date.

```ts
import { useSubtractDays } from "katanakit-js";

useSubtractDays("2024-01-11", 10); // "2024-01-01"
useSubtractDays("2024-03-01", 1);  // "2024-02-29"
```

**Real use case** — a rolling report window:
`useSubtractDays(useNow(), 30)` gives the inclusive lower bound for a "last 30
days" query without recomputing timestamps.

### useDateBetween(start, end, unit?)

`useDateBetween(start: TemporalInput, end: TemporalInput, unit?: DateUnit): number`

The number of whole `unit`s between two dates. Signed, never fractional,
defaulting to `days`.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `start` | `TemporalInput` | required | Range start. |
| `end` | `TemporalInput` | required | Range end. |
| `unit` | `DateUnit` | `"days"` | Granularity to report. |

`DateUnit` is `"years" | "quarters" | "months" | "weeks" | "days" | "hours" |
"minutes"` — the same vocabulary Notion uses in its formula editor, so a
spreadsheet built there translates without a lookup table.

```ts
import { useDateBetween, useNow } from "katanakit-js";

useDateBetween("2020-01-01", "2022-04-16");            // 836
useDateBetween("2020-01-01", "2022-04-16", "months");  // 27
useDateBetween("2020-01-01", "2022-04-16", "years");   // 2
useDateBetween("2022-04-16", "2020-01-01", "days");   // -836
```

**Edge cases**

- **Reversed arguments give a negative number**, never an absolute value.
  `useDateBetween(end, start)` is exactly `-useDateBetween(start, end)` for
  every unit — a property worth relying on.
- **Never fractional.** `total()` reports `0.0849` years across a single month,
  because a year is not a whole number of months. The result is truncated to an
  integer: one month is `0` years.
- **Quarters are three months**, truncated toward zero. 4 months is
  `1` quarter, not `1.33`.
- **Calendar-based, not millisecond-based.** February gives 28 days in 2026 and
  29 in 2024, and DST never shifts a day count.
- **Sub-day units need a time to mean anything.** Two bare dates are read as
  midnight, so a 31-day gap reports `744` hours. The span is unchanged; only
  the scale is.
- **An unknown unit falls back to `"days"`** instead of throwing, so a value
  arriving from a form or an API cannot crash a render.

**Real use case** — an age field: `useDateBetween(birthday, useNow(), "years")`
is a number you can compare, threshold and sort, which is exactly what a
parsed-string diff cannot give you.

### useDurationBetween(start, end)

`useDurationBetween(start: TemporalInput, end: TemporalInput): Temporal.Duration`

The balanced breakdown, as Temporal's own `Duration`. Use this when you need
the parts separately rather than a single number.

```ts
import { useDurationBetween } from "katanakit-js";

const span = useDurationBetween("2020-01-01", "2022-04-16");
span.years;   // 2
span.months;  // 3
span.days;    // 15

useDurationBetween("2022-04-16", "2020-01-01").years; // -2
```

Months and days carry into the largest unit, so 15 months reads as
`1 year, 3 months`. Asking for `years` and `months` separately and adding them
gives the same figure as the duration.

### useDateAdd(date, amount, unit) / useDateSubtract(date, amount, unit)

`useDateAdd(date: TemporalInput, amount: number, unit: DateUnit): string`

Returns the date a given number of units away, as an ISO string. Calendar
semantics throughout: adding one month to the 31st lands on the 28th of a
shorter February rather than overflowing into March.

```ts
import { useDateAdd, useDateSubtract } from "katanakit-js";

useDateAdd("2026-01-31", 1, "months");   // "2026-02-28"  (not 2026-03-03)
useDateAdd("2026-01-01", 2, "quarters"); // "2026-07-01"
useDateAdd("2026-01-01", 3, "years");    // "2029-01-01"
useDateSubtract(useNow(), 90, "days");  // the quarter's start
```

A negative `amount` moves backwards, so `useDateAdd(d, -7, "days")` and
`useDateSubtract(d, 7, "days")` agree. `useAddDays()` and `useSubtractDays()`
remain as the two-argument shorthand for the common day case.

### useDateOrder(date1, date2)

`useDateOrder(date1: TemporalInput, date2: TemporalInput): "before" | "after" | "same"`

A three-way comparison. `useIsBefore()` answers yes/no; this answers *which
way*, which is what a range filter or a sort actually needs.

```ts
import { useDateOrder } from "katanakit-js";

useDateOrder("2026-03-01", "2026-04-01"); // "before"
useDateOrder("2026-04-01", "2026-03-01"); // "after"
useDateOrder("2026-03-01", "2026-03-01"); // "same"
```

Compares down to the minute when a time is present. A bare date reads as
midnight, so `useDateOrder("2026-03-01", "2026-03-01T00:00:01")` is `"before"`.

### useFirstDayOfMonth(date = Temporal.Now.plainDateISO())

`useFirstDayOfMonth(date?: string | Temporal.PlainDate): string`

Returns day one of the month that contains `date`, via
`toPlainDate(date).with({ day: 1 })` — no month-length arithmetic involved.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `date` | `string \| Temporal.PlainDate` | today | Any date inside the target month. |

**Returns** `string` — the first day as `YYYY-MM-DD`.

**Edge cases**

- Omitting the argument uses today in the runtime's time zone; the same SSR
  caveat as [`useNow()`](#usenow) applies.
- The input day is irrelevant: `"2024-02-29"`, `"2024-02-01"` and
  `"2024-02-15"` all return `"2024-02-01"`.
- Invalid input throws `RangeError`.

```ts
import { useFirstDayOfMonth } from "katanakit-js";

useFirstDayOfMonth("2024-06-15"); // "2024-06-01"
useFirstDayOfMonth();             // first day of the current month
```

**Real use case** — analytics dashboards and invoices: build the period with
`useFirstDayOfMonth(anchor)` and `useLastDayOfMonth(anchor)` instead of
hardcoding `01` or maintaining leap-year tables.

### useLastDayOfMonth(date = Temporal.Now.plainDateISO())

`useLastDayOfMonth(date?: string | Temporal.PlainDate): string`

Returns the final day of the month that contains `date`. The implementation is
deliberately defensive: add one month, snap to day one, then subtract one day
(`add({ months: 1 }).with({ day: 1 }).subtract({ days: 1 })`), which keeps
February and 30-day months correct without lookup tables.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `date` | `string \| Temporal.PlainDate` | today | Any date inside the target month. |

**Returns** `string` — the last day as `YYYY-MM-DD`.

**Edge cases**

- Leap years: `"2024-02-10"` returns `"2024-02-29"`, while `"2023-02-10"`
  returns `"2023-02-28"`.
- An input that is already the last day comes back unchanged:
  `"2024-01-31"` returns `"2024-01-31"`.
- December rolls over correctly: `"2024-12-15"` returns `"2024-12-31"`.
- Omitting the argument uses today; invalid input throws `RangeError`.

```ts
import { useFirstDayOfMonth, useLastDayOfMonth } from "katanakit-js";

useLastDayOfMonth("2024-02-10"); // "2024-02-29"
useLastDayOfMonth("2023-02-10"); // "2023-02-28"

const monthRange = {
  from: useFirstDayOfMonth("2024-06-15"), // "2024-06-01"
  to: useLastDayOfMonth("2024-06-15"),    // "2024-06-30"
};
```

**Real use case** — billing periods and due dates: "payment due on the last day
of the month" becomes one call, and February is handled for free.

## Comparisons

The three comparison helpers all delegate to `Temporal.PlainDate.compare()`,
accept the same `string | Temporal.PlainDate` inputs, ignore time zones
entirely, and throw `RangeError` when a string is not a valid ISO calendar
date. `useIsBefore()` and `useIsAfter()` are **strict**: both return `false`
for equal dates. ISO strings must be zero-padded (`"2024-06-15"`);
`"2024-6-15"` throws.

### useIsEqual(date1, date2)

`useIsEqual(date1: string | Temporal.PlainDate, date2: string | Temporal.PlainDate): boolean`

Returns `true` when both values represent the same calendar day.

```ts
import { useIsEqual } from "katanakit-js";

useIsEqual("2024-06-15", "2024-06-15"); // true
useIsEqual("2024-06-15", "2024-06-16"); // false
```

**Real use case** — idempotent day-scoped actions: skip creating today's journal
entry when `useIsEqual(entry.date, useNow())` is already `true`.

### useIsBefore(date1, date2)

`useIsBefore(date1: string | Temporal.PlainDate, date2: string | Temporal.PlainDate): boolean`

Returns `true` only when `date1` is strictly earlier than `date2`.

```ts
import { useIsBefore } from "katanakit-js";

useIsBefore("2024-01-01", "2024-06-15"); // true
useIsBefore("2024-06-15", "2024-06-15"); // false — equality is not "before"
```

**Real use case** — overdue badges and irreversible actions:
`if (useIsBefore(booking.date, useNow()))` blocks rescheduling a past
reservation before touching the database.

### useIsAfter(date1, date2)

`useIsAfter(date1: string | Temporal.PlainDate, date2: string | Temporal.PlainDate): boolean`

Returns `true` only when `date1` is strictly later than `date2`.

```ts
import { useIsAfter } from "katanakit-js";

useIsAfter("2024-06-15", "2024-01-01"); // true
useIsAfter("2024-06-15", "2024-06-15"); // false — equality is not "after"
```

**Real use case** — release gating: a migration runs only when
`useIsAfter(targetVersionDate, currentVersionDate)`, so re-running the same
release is a no-op.

## Formatting

### useFormat(dateInput, locale = "en", options = {})

`useFormat(dateInput: TemporalInput, locale: Locale = "en", options: Intl.DateTimeFormatOptions = {}): string`

The flexible counterpart to the strict workflow above: it normalizes every
supported input shape to a Temporal type and delegates to
`toLocaleString(locale, options)`.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `dateInput` | `TemporalInput` | required | Epoch ms, `Date`, `Temporal.Instant`, `PlainDate`, `PlainDateTime`, `ZonedDateTime`, or a plain date/date-time string. |
| `locale` | `Locale` | `"en"` | One of `en`, `es`, `fr`, `de`, `it`, `pt`, `ja`, `zh`. |
| `options` | `Intl.DateTimeFormatOptions` | `{}` | Passed straight to `Intl.DateTimeFormat`: `dateStyle`, `timeStyle`, `weekday`, `timeZone` and friends all work. |

`TemporalInput` is exported from `katanakit-js` as:

```ts
type TemporalInput =
  | string
  | number
  | Date
  | Temporal.PlainDate
  | Temporal.PlainDateTime
  | Temporal.ZonedDateTime
  | Temporal.Instant;
```

**Normalization rules**

- `number` and `Date` are treated as **epoch milliseconds**, converted with
  `Temporal.Instant.fromEpochMilliseconds()` and projected into the runtime's
  time zone (`Temporal.Now.timeZoneId()`).
- `Temporal.Instant` follows the same local-zone projection.
- A `string` is parsed as `PlainDate` first and falls back to `PlainDateTime`.
  That means only plain `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SS` strings work —
  values with an offset or a `Z` suffix (for example
  `"2024-06-15T00:00:00Z"`) throw. Convert those to epoch milliseconds or a
  `ZonedDateTime` first.
- `PlainDate`, `PlainDateTime` and `ZonedDateTime` instances are formatted
  as-is.

**Returns** `string` — the localized representation.

**Throws** a plain `Error` with the message `Invalid date input: <input>`
(after logging through `useLogger(..., "error")`). Unlike `Date`, it never
silently produces `"Invalid Date"`.

**Edge cases**

- The default `options` of `{}` still yields sensible output: `PlainDate`
  formats as date only (`"6/15/2024"` in `en`), while `PlainDateTime` includes
  the time (`"6/15/2024, 2:30:00 PM"`).
- [`useNowDateTime()`](#usenowdatetime) output parses cleanly through
  `PlainDateTime.from()`, so the two helpers compose directly.
- `Locale` is a narrow union: region variants such as `"en-US"` or `"pt-BR"`
  are rejected by TypeScript even though `Intl` would accept them at runtime.
- On the server, number and `Date` inputs are rendered in the **server's** time
  zone. For deterministic SSR output, pass a `ZonedDateTime` with an explicit
  zone or supply `timeZone` in the options.

```ts
import { useFormat, useNowDateTime } from "katanakit-js";

useFormat("2024-06-15");                                       // "6/15/2024" (en)
useFormat("2024-06-15", "en", { dateStyle: "long" });          // "June 15, 2024"
useFormat("2024-06-15", "es", { dateStyle: "full" });          // "sábado, 15 de junio de 2024"
useFormat("2024-06-15", "de", { dateStyle: "short" });         // "15.06.24"
useFormat("2024-06-15T14:30:00", "en", { timeStyle: "short" }); // "2:30 PM"
useFormat(new Date("2024-06-15T12:00:00"), "en", { dateStyle: "medium" });

// Throws Error("Invalid date input: 2024-06-15T00:00:00Z")
useFormat("2024-06-15T00:00:00Z");
```

**Real use case** — one stored ISO date rendered per request locale:

```ts
const invoiceDate = useAddDays(useNow(), -30);

return {
  en: useFormat(invoiceDate, "en", { dateStyle: "medium" }),
  es: useFormat(invoiceDate, "es", { dateStyle: "long" }),
};
```

## Related

- [Formatter](/guides/services/formatter) — numbers, currencies and strings, with the same `Locale` union.
- [Timing](/guides/services/timing) — measuring elapsed time and debouncing, the duration counterpart to date arithmetic.
- [API Reference](/api/classes/DatesService) — the singleton facade and every wrapper, generated from source.
