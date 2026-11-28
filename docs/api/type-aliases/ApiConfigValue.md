[katanakit-js](../index.md) / ApiConfigValue

# Type Alias: ApiConfigValue

```ts
type ApiConfigValue = 
  | ApiEntry
  | boolean
  | ConfigMethod;
```

Defined in: [types/core/config-facade.ts:78](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/config-facade.ts#L78)

Values accepted by [defineApiConfig](../functions/defineApiConfig.md) as a flat entry: an [ApiEntry](../interfaces/ApiEntry.md),
a boolean flag (kept on `config` only — never registered as an API) or a
method.
