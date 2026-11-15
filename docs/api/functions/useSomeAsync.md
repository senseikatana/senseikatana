[katanakit-js](../index.md) / useSomeAsync

# Function: useSomeAsync()

```ts
function useSomeAsync<T>(array, predicate): Promise<boolean>;
```

Defined in: [core/services/array.service.ts:569](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/array.service.ts#L569)

Async some, short-circuiting. See [ArrayService.useSomeAsync](../classes/ArrayService.md#usesomeasync).

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `NullableArray`\<`T`\> |
| `predicate` | `AsyncPredicate`\<`T`\> |

## Returns

`Promise`\<`boolean`\>
