[katanakit-js](../index.md) / useFindAsync

# Function: useFindAsync()

```ts
function useFindAsync<T>(array, predicate): Promise<T | undefined>;
```

Defined in: [core/services/array.service.ts:561](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/array.service.ts#L561)

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
