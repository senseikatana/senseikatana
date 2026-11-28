[katanakit-js](../index.md) / onOmit

# Variable: onOmit

```ts
onOmit: <T, K>(obj, keys) => Omit<T, K>;
```

Defined in: [core/services/utils.service.ts:409](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L409)

Omits the listed keys from an object, returning a shallow copy without
them. Shallow on purpose to avoid `structuredClone` failures on
non-cloneable values.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-__typet"></a> `T` *extends* `object` | Source object type. |
| <a id="type-parameter-__typek"></a> `K` *extends* `string` \| `number` \| `symbol` | Keys to omit. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `obj` | `T` | The source object. |
| `keys` | `K`[] | Array of keys to exclude. |

## Returns

`Omit`\<`T`, `K`\>

A new object without the omitted keys.

## Example

```ts
const user = { id: 1, name: "Alice", password: "secret" };
omit(user, ["password"]); // { id: 1, name: "Alice" }
```
