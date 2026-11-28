[katanakit-js](../index.md) / useSomeAsync

# Function: useSomeAsync()

```ts
function useSomeAsync<T>(array, predicate): Promise<boolean>;
```

Defined in: [core/services/array.service.ts:569](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/array.service.ts#L569)

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
