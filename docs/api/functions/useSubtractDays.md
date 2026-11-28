[katanakit-js](../index.md) / useSubtractDays

# Function: useSubtractDays()

```ts
function useSubtractDays(date, days): string;
```

Defined in: [core/services/dates.service.ts:654](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/dates.service.ts#L654)

Subtracts a number of days from a date.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date` | `string` \| `PlainDate` | Base date (ISO string or `PlainDate`). |
| `days` | `number` | Number of days to subtract. |

## Returns

`string`

The resulting date as an ISO string.

## Example

```ts
useSubtractDays("2024-01-11", 10); // "2024-01-01"
```
