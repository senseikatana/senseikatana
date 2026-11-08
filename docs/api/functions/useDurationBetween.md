[katanakit-js](../index.md) / useDurationBetween

# Function: useDurationBetween()

```ts
function useDurationBetween(start, end): Duration;
```

Defined in: [core/services/dates.service.ts:535](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/dates.service.ts#L535)

Returns the balanced breakdown between two dates as a `Temporal.Duration`.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `start` | [`TemporalInput`](../type-aliases/TemporalInput.md) |
| `end` | [`TemporalInput`](../type-aliases/TemporalInput.md) |

## Returns

`Duration`

## Example

```ts
const span = useDurationBetween("2020-01-01", "2022-04-16");
span.years; // 2
span.days;  // 15
```
