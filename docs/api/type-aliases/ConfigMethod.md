[katanakit-js](../index.md) / ConfigMethod

# Type Alias: ConfigMethod

```ts
type ConfigMethod = (...args) => unknown;
```

Defined in: [types/core/config-facade.ts:7](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/config-facade.ts#L7)

Any method a consumer declares inline in a `define*Config` literal.
Written with `function` (never an arrow) so `this` resolves to the facade.

## Parameters

| Parameter | Type |
| ------ | ------ |
| ...`args` | `never`[] |

## Returns

`unknown`
