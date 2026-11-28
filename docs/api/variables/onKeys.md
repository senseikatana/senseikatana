[katanakit-js](../index.md) / onKeys

# Variable: onKeys

```ts
onKeys: <T>(object) => (keyof T)[];
```

Defined in: [core/services/array.service.ts:460](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L460)

Typed `Object.keys`. The native call returns `string[]`, losing the key
union of the object it was given.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-__typet"></a> `T` *extends* `object` | Object type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `object` | `T` \| `null` \| `undefined` | Source object, possibly nullish. |

## Returns

(keyof `T`)[]

The object keys as a `keyof` array.

## Example

```ts
keys(user); // ("id" | "name" | "email")[]
```
