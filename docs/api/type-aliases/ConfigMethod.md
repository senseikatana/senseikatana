[katanakit-js](../index.md) / ConfigMethod

# Type Alias: ConfigMethod

```ts
type ConfigMethod = (...args) => unknown;
```

Defined in: [types/core/config-facade.ts:7](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/core/config-facade.ts#L7)

Any method a consumer declares inline in a `define*Config` literal.
Written with `function` (never an arrow) so `this` resolves to the facade.

## Parameters

| Parameter | Type |
| ------ | ------ |
| ...`args` | `never`[] |

## Returns

`unknown`
