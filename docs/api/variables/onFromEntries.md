[katanakit-js](../index.md) / onFromEntries

# Variable: onFromEntries

```ts
onFromEntries: <K, V>(entries) => Record<K, V>;
```

Defined in: [core/services/array.service.ts:462](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L462)

Typed `Object.fromEntries`. Returns `{}` for nullish input.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-__typek"></a> `K` *extends* `PropertyKey` | Key type. |
| <a id="type-parameter-__typev"></a> `V` | Value type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `entries` | readonly (readonly \[`K`, `V`\])[] \| `null` \| `undefined` | Entry pairs, possibly nullish. |

## Returns

`Record`\<`K`, `V`\>

A new record.

## Example

```ts
fromEntries(products.map((p) => [p.id, p.name] as const));
```
