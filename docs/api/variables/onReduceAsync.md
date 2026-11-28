[katanakit-js](../index.md) / onReduceAsync

# Variable: onReduceAsync

```ts
onReduceAsync: <T, U>(array, reducer, initial) => Promise<U>;
```

Defined in: [core/services/array.service.ts:468](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L468)

Folds the collection with an async reducer, sequentially — a reduce that
ran in parallel could not be ordered.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-__typet"></a> `T` | Source element type. |
| <a id="type-parameter-__typeu"></a> `U` | Accumulator type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |
| `reducer` | (`accumulator`, `item`, `index`) => `Promise`\<`U`\> | Async step receiving the accumulator, the item and its index. |
| `initial` | `U` | Seed value. |

## Returns

`Promise`\<`U`\>

A promise of the accumulated value.
