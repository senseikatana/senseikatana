[katanakit-js](../index.md) / useIsBefore

# Function: useIsBefore()

```ts
function useIsBefore(date1, date2): boolean;
```

Defined in: [core/services/dates.service.ts:689](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/dates.service.ts#L689)

Checks whether `date1` is before `date2`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date1` | `string` \| `PlainDate` | First date (ISO string or `PlainDate`). |
| `date2` | `string` \| `PlainDate` | Second date (ISO string or `PlainDate`). |

## Returns

`boolean`

`true` if `date1` is strictly before `date2`.

## Example

```ts
useIsBefore("2024-01-01", "2024-06-15"); // true
```
