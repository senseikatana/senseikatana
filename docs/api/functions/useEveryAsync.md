[katanakit-js](../index.md) / useEveryAsync

# Function: useEveryAsync()

```ts
function useEveryAsync<T>(array, predicate): Promise<boolean>;
```

Defined in: [core/services/array.service.ts:577](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/array.service.ts#L577)

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
