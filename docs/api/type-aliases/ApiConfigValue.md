[katanakit-js](../index.md) / ApiConfigValue

# Type Alias: ApiConfigValue

```ts
type ApiConfigValue = 
  | ApiEntry
  | boolean
  | ConfigMethod;
```

Defined in: [types/core/config-facade.ts:87](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/core/config-facade.ts#L87)

Values accepted by [defineApiConfig](../functions/defineApiConfig.md) as a flat entry: an [ApiEntry](../interfaces/ApiEntry.md),
a boolean flag (kept on `config` only — never registered as an API) or a
method.
