[katanakit-js](../index.md) / ConfigMethodEntries

# Type Alias: ConfigMethodEntries\<T\>

```ts
type ConfigMethodEntries<T> = Pick<T, Exclude<ConfigMethodKeys<T>, ApiConfigSectionKey>>;
```

Defined in: [types/core/config-facade.ts:26](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/config-facade.ts#L26)

The flat methods half of a `define*Config` literal.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
