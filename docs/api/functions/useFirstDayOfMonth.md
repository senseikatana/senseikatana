[katanakit-js](../index.md) / useFirstDayOfMonth

# Function: useFirstDayOfMonth()

```ts
function useFirstDayOfMonth(date?): string;
```

Defined in: [core/services/dates.service.ts:726](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/dates.service.ts#L726)

Returns the first day of the month for a given date.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date?` | `string` \| `PlainDate` | Base date (defaults to today). |

## Returns

`string`

The first day of the month as an ISO string.

## Example

```ts
useFirstDayOfMonth("2024-06-15"); // "2024-06-01"
```
