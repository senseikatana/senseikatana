[katanakit-js](../index.md) / useUnique

# Function: useUnique()

```ts
function useUnique<T>(array): T[];
```

Defined in: [core/services/utils.service.ts:422](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L422)

Returns a new array with duplicate values removed, preserving first-seen order.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `T`[] |

## Returns

`T`[]

## Example

```ts
useUnique([1, 2, 2, 3, 1]); // [1, 2, 3]
```
