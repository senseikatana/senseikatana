[katanakit-js](../index.md) / ApiConfigValue

# Type Alias: ApiConfigValue

```ts
type ApiConfigValue = 
  | ApiEntry
  | boolean
  | ConfigMethod;
```

Defined in: [types/core/config-facade.ts:65](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/types/core/config-facade.ts#L65)

Values accepted by [defineApiConfig](../functions/defineApiConfig.md): an [ApiEntry](../interfaces/ApiEntry.md), a boolean
flag (kept on `config` only — never registered as an API) or a method.
