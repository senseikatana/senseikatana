[katanakit-js](../index.md) / ConfigMethod

# Type Alias: ConfigMethod

```ts
type ConfigMethod = (...args) => unknown;
```

Defined in: [types/core/config-facade.ts:7](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/types/core/config-facade.ts#L7)

Any method a consumer declares inline in a `define*Config` literal.
Written with `function` (never an arrow) so `this` resolves to the facade.

## Parameters

| Parameter | Type |
| ------ | ------ |
| ...`args` | `never`[] |

## Returns

`unknown`
