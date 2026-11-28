[katanakit-js](../index.md) / ApiConfigSectionKey

# Type Alias: ApiConfigSectionKey

```ts
type ApiConfigSectionKey = "apis" | "data" | "onInit" | "methods";
```

Defined in: [types/core/config-facade.ts:20](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/config-facade.ts#L20)

Section keys `defineApiConfig` reads as Options-API-style groups instead of
flat entries. They are never copied onto `config` and never registered as
APIs.
