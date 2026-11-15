[katanakit-js](../index.md) / useOmit

# Function: useOmit()

```ts
function useOmit<T, K>(obj, keys): Omit<T, K>;
```

Defined in: [core/services/utils.service.ts:512](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/utils.service.ts#L512)

Omits the listed keys from an object, returning a shallow copy without them.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` *extends* `object` |
| <a id="type-parameter-k"></a> `K` *extends* `string` \| `number` \| `symbol` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `obj` | `T` |
| `keys` | `K`[] |

## Returns

`Omit`\<`T`, `K`\>

## Example

```ts
useOmit(user, ["password"]);
```
