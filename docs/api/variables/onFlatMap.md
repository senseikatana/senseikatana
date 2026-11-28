[katanakit-js](../index.md) / onFlatMap

# Variable: onFlatMap

```ts
onFlatMap: <T, U>(array, transform) => U[];
```

Defined in: [core/services/array.service.ts:456](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L456)

Maps each item to a collection and flattens one level. Returns `[]` for
nullish input.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-__typet"></a> `T` | Source element type. |
| <a id="type-parameter-__typeu"></a> `U` | Flattened element type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |
| `transform` | (`item`, `index`, `array`) => readonly `U`[] | Returns an iterable of `U` per item. |

## Returns

`U`[]

A new flattened array.
