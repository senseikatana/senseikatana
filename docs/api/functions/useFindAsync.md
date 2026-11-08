[katanakit-js](../index.md) / useFindAsync

# Function: useFindAsync()

```ts
function useFindAsync<T>(array, predicate): Promise<T | undefined>;
```

Defined in: [core/services/array.service.ts:561](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/array.service.ts#L561)

Async find, short-circuiting. See [ArrayService.useFindAsync](../classes/ArrayService.md#usefindasync).

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `NullableArray`\<`T`\> |
| `predicate` | `AsyncPredicate`\<`T`\> |

## Returns

`Promise`\<`T` \| `undefined`\>
