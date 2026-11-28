[katanakit-js](../index.md) / onValues

# Variable: onValues

```ts
onValues: <T>(object) => T[keyof T][];
```

Defined in: [core/services/array.service.ts:461](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L461)

Typed `Object.values`. The native call returns `unknown[]`.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-__typet"></a> `T` *extends* `object` | Object type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `object` | `T` \| `null` \| `undefined` | Source object, possibly nullish. |

## Returns

`T`\[keyof `T`\][]

The object values.
