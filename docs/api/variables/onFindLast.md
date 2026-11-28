[katanakit-js](../index.md) / onFindLast

# Variable: onFindLast

```ts
onFindLast: <T>(array, predicate) => T | undefined;
```

Defined in: [core/services/array.service.ts:450](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L450)

Returns the last item satisfying `predicate`, or `undefined`.

Implemented with an explicit reverse scan rather than
`Array.prototype.findLast`, so it typechecks under the project's ES2022
`lib` and keeps working on any runtime.

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

`T` \| `undefined`

The last match, or `undefined`.
