[katanakit-js](../index.md) / onFilter

# Variable: onFilter

```ts
onFilter: <T>(array, predicate) => T[];
```

Defined in: [core/services/array.service.ts:448](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L448)

Keeps the items that satisfy `predicate`. Returns `[]` for nullish input.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-__typet"></a> `T` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |
| `predicate` | (`item`, `index`, `array`) => `boolean` | Receives the item, its index and the source array. |

## Returns

`T`[]

A new array of matching items.

## Example

```ts
filter(products, (product) => product.inStock);
filter(undefined, () => true); // []
```
