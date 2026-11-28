[katanakit-js](../index.md) / onMap

# Variable: onMap

```ts
onMap: <T, U>(array, transform) => U[];
```

Defined in: [core/services/array.service.ts:455](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L455)

Projects every item through `transform`. Returns `[]` for nullish input.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-__typet"></a> `T` | Source element type. |
| <a id="type-parameter-__typeu"></a> `U` | Projected element type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |
| `transform` | (`item`, `index`, `array`) => `U` | Receives the item, its index and the source array. |

## Returns

`U`[]

A new array of projected values.
