[katanakit-js](../index.md) / useDateOrder

# Function: useDateOrder()

```ts
function useDateOrder(date1, date2): "before" | "after" | "same";
```

Defined in: [core/services/dates.service.ts:573](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/dates.service.ts#L573)

Returns whether the first date comes before, after, or at the same time as
the second.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `date1` | [`TemporalInput`](../type-aliases/TemporalInput.md) |
| `date2` | [`TemporalInput`](../type-aliases/TemporalInput.md) |

## Returns

`"before"` \| `"after"` \| `"same"`

## Example

```ts
useDateOrder(deadline, useNow()); // "before"
```
