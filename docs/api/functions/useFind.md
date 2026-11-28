[katanakit-js](../index.md) / useFind

# Function: useFind()

```ts
function useFind<T>(array, predicate): T | undefined;
```

Defined in: [core/services/array.service.ts:459](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/array.service.ts#L459)

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
