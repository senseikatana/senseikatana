[katanakit-js](../index.md) / useFindAsync

# Function: useFindAsync()

```ts
function useFindAsync<T>(array, predicate): Promise<T | undefined>;
```

Defined in: [core/services/array.service.ts:561](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/array.service.ts#L561)

Async find, short-circuiting. See [ArrayService.useFindAsync](../classes/ArrayService.md#usefindasync).

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

`Promise`\<`T` \| `undefined`\>
