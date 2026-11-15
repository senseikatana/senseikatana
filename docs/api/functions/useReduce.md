[katanakit-js](../index.md) / useReduce

# Function: useReduce()

```ts
function useReduce<T, U>(
   array, 
   reducer, 
   initial
): U;
```

Defined in: [core/services/array.service.ts:505](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/array.service.ts#L505)

Folds into a single value. See [ArrayService.useReduce](../classes/ArrayService.md#usereduce).

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
| <a id="type-parameter-u"></a> `U` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `NullableArray`\<`T`\> |
| `reducer` | (`accumulator`, `item`, `index`) => `U` |
| `initial` | `U` |

## Returns

`U`
