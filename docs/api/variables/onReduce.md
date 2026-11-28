[katanakit-js](../index.md) / onReduce

# Variable: onReduce

```ts
onReduce: <T, U>(array, reducer, initial) => U;
```

Defined in: [core/services/array.service.ts:457](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L457)

Folds the collection into a single value. `initial` is required, so the
return type is unambiguous even for an empty or nullish collection.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-__typet"></a> `T` | Source element type. |
| <a id="type-parameter-__typeu"></a> `U` | Accumulator type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |
| `reducer` | (`accumulator`, `item`, `index`) => `U` | Receives the accumulator, the item and its index. |
| `initial` | `U` | Seed value. |

## Returns

`U`

The accumulated value.
