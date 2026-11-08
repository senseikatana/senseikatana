[katanakit-js](../index.md) / useEveryAsync

# Function: useEveryAsync()

```ts
function useEveryAsync<T>(array, predicate): Promise<boolean>;
```

Defined in: [core/services/array.service.ts:577](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/array.service.ts#L577)

Async every, short-circuiting. See [ArrayService.useEveryAsync](../classes/ArrayService.md#useeveryasync).

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
