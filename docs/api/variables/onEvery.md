[katanakit-js](../index.md) / onEvery

# Variable: onEvery

```ts
onEvery: <T>(array, predicate) => boolean;
```

Defined in: [core/services/array.service.ts:453](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L453)

Returns `true` when every item satisfies `predicate`. Nullish input is
`false`, because "every item passed" must not be vacuously true for a
collection that does not exist.

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

`boolean`

Whether all items match.
