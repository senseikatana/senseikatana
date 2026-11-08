[katanakit-js](../index.md) / useDateSubtract

# Function: useDateSubtract()

```ts
function useDateSubtract(
   date, 
   amount, 
   unit
): string;
```

Defined in: [core/services/dates.service.ts:560](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/dates.service.ts#L560)

Subtracts units from a date, with calendar semantics.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `date` | [`TemporalInput`](../type-aliases/TemporalInput.md) |
| `amount` | `number` |
| `unit` | `"years"` \| `"quarters"` \| `"months"` \| `"weeks"` \| `"days"` \| `"hours"` \| `"minutes"` |

## Returns

`string`

## Example

```ts
useDateSubtract(useNow(), 30, "days");
```
