[katanakit-js](../index.md) / ConfigMethodEntries

# Type Alias: ConfigMethodEntries\<T\>

```ts
type ConfigMethodEntries<T> = Pick<T, Exclude<ConfigMethodKeys<T>, ApiConfigSectionKey>>;
```

Defined in: [types/core/config-facade.ts:29](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/core/config-facade.ts#L29)

The flat methods half of a `define*Config` literal.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
