[katanakit-js](../index.md) / useLastDayOfMonth

# Function: useLastDayOfMonth()

```ts
function useLastDayOfMonth(date?): string;
```

Defined in: [core/services/dates.service.ts:743](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/dates.service.ts#L743)

Returns the last day of the month for a given date.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date?` | `string` \| `PlainDate` | Base date (defaults to today). |

## Returns

`string`

The last day of the month as an ISO string.

## Example

```ts
useLastDayOfMonth("2024-02-10"); // "2024-02-29"
```
