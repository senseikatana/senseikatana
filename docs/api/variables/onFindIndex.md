[katanakit-js](../index.md) / onFindIndex

# Variable: onFindIndex

```ts
onFindIndex: <T>(array, predicate) => number;
```

Defined in: [core/services/array.service.ts:451](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L451)

Returns the index of the first match, or `-1`.

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

`number`

The index of the first match, or `-1`.
