[katanakit-js](../index.md) / useUnique

# Function: useUnique()

```ts
function useUnique<T>(array): T[];
```

Defined in: [core/services/utils.service.ts:422](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/utils.service.ts#L422)

Returns a new array with duplicate values removed, preserving first-seen order.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

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
