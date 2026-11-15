[katanakit-js](../index.md) / PROVIDER\_ENV\_NAMES

# Variable: PROVIDER\_ENV\_NAMES

```ts
const PROVIDER_ENV_NAMES: Readonly<Record<string, string>>;
```

Defined in: [core/services/keyvault.service.ts:9](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/keyvault.service.ts#L9)

Provider slugs whose conventional environment variable name is known.
Unknown providers fall back to `KATANAKIT_KEY_<PROVIDER>`, so the mapping is
open-ended — a new provider never needs a code change here to work.
