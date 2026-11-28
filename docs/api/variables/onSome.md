[katanakit-js](../index.md) / onSome

# Variable: onSome

```ts
onSome: <T>(array, predicate) => boolean;
```

Defined in: [core/services/array.service.ts:452](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L452)

Returns `true` when at least one item satisfies `predicate`. Nullish input
is `false`, never `true`.

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

Whether any item matches.
