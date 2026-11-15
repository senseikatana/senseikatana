[katanakit-js](../index.md) / useEveryAsync

# Function: useEveryAsync()

```ts
function useEveryAsync<T>(array, predicate): Promise<boolean>;
```

Defined in: [core/services/array.service.ts:577](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/array.service.ts#L577)

Async every, short-circuiting. See [ArrayService.useEveryAsync](../classes/ArrayService.md#useeveryasync).

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
