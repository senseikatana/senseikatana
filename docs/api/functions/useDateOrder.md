[katanakit-js](../index.md) / useDateOrder

# Function: useDateOrder()

```ts
function useDateOrder(date1, date2): "before" | "after" | "same";
```

Defined in: [core/services/dates.service.ts:573](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/dates.service.ts#L573)

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
