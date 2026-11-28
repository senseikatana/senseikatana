[katanakit-js](../index.md) / ApiConfigSectionKey

# Type Alias: ApiConfigSectionKey

```ts
type ApiConfigSectionKey = "apis" | "data" | "onInit" | "methods";
```

Defined in: [types/core/config-facade.ts:23](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/core/config-facade.ts#L23)

Section keys `defineApiConfig` reads as Options-API-style groups instead of
flat entries. They are never copied onto `config` and never registered as
APIs.
