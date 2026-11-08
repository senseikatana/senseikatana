[katanakit-js](../index.md) / useFirstDayOfMonth

# Function: useFirstDayOfMonth()

```ts
function useFirstDayOfMonth(date?): string;
```

Defined in: [core/services/dates.service.ts:726](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/dates.service.ts#L726)

Returns the first day of the month for a given date.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date` | `string` \| `PlainDate` | Base date (defaults to today). |

## Returns

`string`

The first day of the month as an ISO string.

## Example

```ts
useFirstDayOfMonth("2024-06-15"); // "2024-06-01"
```
