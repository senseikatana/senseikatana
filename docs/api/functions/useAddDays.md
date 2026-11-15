[katanakit-js](../index.md) / useAddDays

# Function: useAddDays()

```ts
function useAddDays(date, days): string;
```

Defined in: [core/services/dates.service.ts:638](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/dates.service.ts#L638)

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
