[katanakit-js](../index.md) / useIsEqual

# Function: useIsEqual()

```ts
function useIsEqual(date1, date2): boolean;
```

Defined in: [core/services/dates.service.ts:670](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/dates.service.ts#L670)

Checks whether two dates are equal.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date1` | `string` \| `PlainDate` | First date (ISO string or `PlainDate`). |
| `date2` | `string` \| `PlainDate` | Second date (ISO string or `PlainDate`). |

## Returns

`boolean`

`true` if the dates represent the same day.

## Example

```ts
useIsEqual("2024-06-15", "2024-06-15"); // true
```
