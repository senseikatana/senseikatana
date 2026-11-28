[katanakit-js](../index.md) / onPartition

# Variable: onPartition

```ts
onPartition: <T>(array, predicate) => [T[], T[]];
```

Defined in: [core/services/array.service.ts:454](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L454)

Splits the collection into `[matching, rest]`. Nullish input yields
`[[], []]`.

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

\[`T`[], `T`[]\]

A tuple of the matching items and the rest.

## Example

```ts
const [inStock, soldOut] = partition(products, (p) => p.inStock);
```
