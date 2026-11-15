[katanakit-js](../index.md) / ConfigData

# Type Alias: ConfigData\<T\>

```ts
type ConfigData<T> = Omit<T, ConfigMethodKeys<T>>;
```

Defined in: [types/core/config-facade.ts:19](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/types/core/config-facade.ts#L19)

The props/booleans half of a `define*Config` literal — the config data.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
