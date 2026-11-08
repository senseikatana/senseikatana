[katanakit-js](../index.md) / useIsAfter

# Function: useIsAfter()

```ts
function useIsAfter(date1, date2): boolean;
```

Defined in: [core/services/dates.service.ts:708](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/dates.service.ts#L708)

Checks whether `date1` is after `date2`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date1` | `string` \| `PlainDate` | First date (ISO string or `PlainDate`). |
| `date2` | `string` \| `PlainDate` | Second date (ISO string or `PlainDate`). |

## Returns

`boolean`

`true` if `date1` is strictly after `date2`.

## Example

```ts
useIsAfter("2024-06-15", "2024-01-01"); // true
```
