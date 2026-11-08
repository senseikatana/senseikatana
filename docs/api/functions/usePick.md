[katanakit-js](../index.md) / usePick

# Function: usePick()

```ts
function usePick<T, K>(obj, keys): Pick<T, K>;
```

Defined in: [core/services/utils.service.ts:500](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L500)

Picks the listed keys from an object into a new object.

## Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `object` |
| `K` *extends* `string` \| `number` \| `symbol` |

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
