[katanakit-js](../index.md) / useEveryAsync

# Function: useEveryAsync()

```ts
function useEveryAsync<T>(array, predicate): Promise<boolean>;
```

Defined in: [core/services/array.service.ts:577](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/array.service.ts#L577)

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
