[katanakit-js](../index.md) / onSortBy

# Variable: onSortBy

```ts
onSortBy: <T>(array, selector, direction) => T[];
```

Defined in: [core/services/array.service.ts:458](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L458)

Sorts a **copy** of the collection by a derived key. `Array.prototype.sort`
mutates in place, which would corrupt a shared array coming from a store
or a cache; this never does.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-__typet"></a> `T` | Source element type. |

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | `undefined` | Source collection, possibly nullish. |
| `selector` | (`item`) => `string` \| `number` \| `bigint` \| `boolean` \| `Date` | `undefined` | Derives the comparable value from an item. |
| `direction?` | `"desc"` \| `"asc"` | `"asc"` | `"asc"` (default) or `"desc"`. |

## Returns

`T`[]

A new sorted array.

## Example

```ts
sortBy(products, (product) => product.price, "desc");
```
