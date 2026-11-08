[katanakit-js](../index.md) / useReduce

# Function: useReduce()

```ts
function useReduce<T, U>(
   array, 
   reducer, 
   initial
): U;
```

Defined in: [core/services/array.service.ts:505](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/array.service.ts#L505)

Folds into a single value. See [ArrayService.useReduce](../classes/ArrayService.md#usereduce).

## Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `U` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `NullableArray`\<`T`\> |
| `reducer` | (`accumulator`, `item`, `index`) => `U` |
| `initial` | `U` |

## Returns

`U`
