[katanakit-js](../index.md) / ConfigData

# Type Alias: ConfigData\<T\>

```ts
type ConfigData<T> = Omit<T, ConfigMethodKeys<T>>;
```

Defined in: [types/core/config-facade.ts:19](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/types/core/config-facade.ts#L19)

The props/booleans half of a `define*Config` literal — the config data.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
