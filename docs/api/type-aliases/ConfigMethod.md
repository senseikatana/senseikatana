[katanakit-js](../index.md) / ConfigMethod

# Type Alias: ConfigMethod

```ts
type ConfigMethod = (...args) => unknown;
```

Defined in: [types/core/config-facade.ts:4](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/config-facade.ts#L4)

Any method a consumer declares inline in a `define*Config` literal. Written with `function` (never an arrow) so `this` resolves to the facade.

## Parameters

| Parameter | Type |
| ------ | ------ |
| ...`args` | `never`[] |

## Returns

`unknown`
