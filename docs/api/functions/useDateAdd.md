[katanakit-js](../index.md) / useDateAdd

# Function: useDateAdd()

```ts
function useDateAdd(
   date, 
   amount, 
   unit
): string;
```

Defined in: [core/services/dates.service.ts:548](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/dates.service.ts#L548)

Returns the date a given number of units away, with calendar semantics.

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
useDateAdd("2026-01-31", 1, "months");  // "2026-02-28"
useDateAdd("2026-01-01", 2, "quarters"); // "2026-07-01"
```
