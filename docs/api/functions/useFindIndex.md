[katanakit-js](../index.md) / useFindIndex

# Function: useFindIndex()

```ts
function useFindIndex<T>(array, predicate): number;
```

Defined in: [core/services/array.service.ts:469](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/array.service.ts#L469)

Returns the index of the first match, or `-1`. See [ArrayService.useFindIndex](../classes/ArrayService.md#usefindindex).

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `NullableArray`\<`T`\> |
| `predicate` | `Predicate`\<`T`\> |

## Returns

`number`
