[katanakit-js](../index.md) / ConfigData

# Type Alias: ConfigData\<T\>

```ts
type ConfigData<T> = Omit<T, 
  | ConfigMethodKeys<T>
| ApiConfigSectionKey>;
```

Defined in: [types/core/config-facade.ts:26](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/core/config-facade.ts#L26)

The props/booleans half of a `define*Config` literal — the config data.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
