[katanakit-js](../index.md) / onPick

# Variable: onPick

```ts
onPick: <T, K>(obj, keys) => Pick<T, K>;
```

Defined in: [core/services/utils.service.ts:408](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L408)

Picks the listed keys from an object into a new object.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-__typet"></a> `T` *extends* `object` | Source object type. |
| <a id="type-parameter-__typek"></a> `K` *extends* `string` \| `number` \| `symbol` | Keys to pick. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `obj` | `T` | The source object. |
| `keys` | `K`[] | Array of keys to include. |

## Returns

`Pick`\<`T`, `K`\>

A new object with only the picked keys.

## Example

```ts
const user = { id: 1, name: "Alice", email: "a@b.com" };
pick(user, ["id", "name"]); // { id: 1, name: "Alice" }
```
