[katanakit-js](../index.md) / useFind

# Function: useFind()

```ts
function useFind<T>(array, predicate): T | undefined;
```

Defined in: [core/services/array.service.ts:459](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/array.service.ts#L459)

Returns the first matching item, or `undefined`. See [ArrayService.useFind](../classes/ArrayService.md#usefind).

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

`T` \| `undefined`
