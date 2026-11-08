[katanakit-js](../index.md) / useSomeAsync

# Function: useSomeAsync()

```ts
function useSomeAsync<T>(array, predicate): Promise<boolean>;
```

Defined in: [core/services/array.service.ts:569](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/array.service.ts#L569)

Async some, short-circuiting. See [ArrayService.useSomeAsync](../classes/ArrayService.md#usesomeasync).

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

`Promise`\<`boolean`\>
