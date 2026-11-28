[katanakit-js](../index.md) / ConfigData

# Type Alias: ConfigData\<T\>

```ts
type ConfigData<T> = Omit<T, 
  | ConfigMethodKeys<T>
| ApiConfigSectionKey>;
```

Defined in: [types/core/config-facade.ts:23](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/config-facade.ts#L23)

The props/booleans half of a `define*Config` literal — the config data.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
