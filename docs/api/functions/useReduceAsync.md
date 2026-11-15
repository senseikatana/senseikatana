[katanakit-js](../index.md) / useReduceAsync

# Function: useReduceAsync()

```ts
function useReduceAsync<T, U>(
   array, 
   reducer, 
   initial
): Promise<U>;
```

Defined in: [core/services/array.service.ts:585](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/array.service.ts#L585)

Async reduce, sequential. See [ArrayService.useReduceAsync](../classes/ArrayService.md#usereduceasync).

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
| <a id="type-parameter-u"></a> `U` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `NullableArray`\<`T`\> |
| `reducer` | (`accumulator`, `item`, `index`) => `Promise`\<`U`\> |
| `initial` | `U` |

## Returns

`Promise`\<`U`\>
