[katanakit-js](../index.md) / useDateBetween

# Function: useDateBetween()

```ts
function useDateBetween(
   start, 
   end, 
   unit?
): number;
```

Defined in: [core/services/dates.service.ts:517](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/dates.service.ts#L517)

Returns the whole number of `unit`s between two dates. Signed, never
fractional, and defaulting to `days`.

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `start` | [`TemporalInput`](../type-aliases/TemporalInput.md) | `undefined` |
| `end` | [`TemporalInput`](../type-aliases/TemporalInput.md) | `undefined` |
| `unit?` | `"years"` \| `"quarters"` \| `"months"` \| `"weeks"` \| `"days"` \| `"hours"` \| `"minutes"` | `"days"` |

## Returns

`number`

## Example

```ts
useDateBetween("2020-01-01", "2022-04-16");           // 836
useDateBetween("2020-01-01", "2022-04-16", "months"); // 27
useDateBetween(issued, useNow(), "days");            // age in days
```
