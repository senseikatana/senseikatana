[katanakit-js](../index.md) / usePick

# Function: usePick()

```ts
function usePick<T, K>(obj, keys): Pick<T, K>;
```

Defined in: [core/services/utils.service.ts:500](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/utils.service.ts#L500)

Picks the listed keys from an object into a new object.

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

`Pick`\<`T`, `K`\>

## Example

```ts
usePick(user, ["id", "name"]);
```
