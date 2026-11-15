[katanakit-js](../index.md) / useAddDays

# Function: useAddDays()

```ts
function useAddDays(date, days): string;
```

Defined in: [core/services/dates.service.ts:638](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/dates.service.ts#L638)

Adds a number of days to a date.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date` | `string` \| `PlainDate` | Base date (ISO string or `PlainDate`). |
| `days` | `number` | Number of days to add (can be negative). |

## Returns

`string`

The resulting date as an ISO string.

## Example

```ts
useAddDays("2024-01-01", 10); // "2024-01-11"
```
