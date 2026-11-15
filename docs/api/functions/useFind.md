[katanakit-js](../index.md) / useFind

# Function: useFind()

```ts
function useFind<T>(array, predicate): T | undefined;
```

Defined in: [core/services/array.service.ts:459](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/array.service.ts#L459)

Returns the first matching item, or `undefined`. See [ArrayService.useFind](../classes/ArrayService.md#usefind).

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `NullableArray`\<`T`\> |
| `predicate` | `Predicate`\<`T`\> |

## Returns

`T` \| `undefined`
