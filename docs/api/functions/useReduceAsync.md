[katanakit-js](../index.md) / useReduceAsync

# Function: useReduceAsync()

```ts
function useReduceAsync<T, U>(
   array, 
   reducer, 
   initial
): Promise<U>;
```

Defined in: [core/services/array.service.ts:585](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/array.service.ts#L585)

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
