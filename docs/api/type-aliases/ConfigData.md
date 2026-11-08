[katanakit-js](../index.md) / ConfigData

# Type Alias: ConfigData\<T\>

```ts
type ConfigData<T> = Omit<T, ConfigMethodKeys<T>>;
```

Defined in: [types/core/config-facade.ts:19](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/config-facade.ts#L19)

The props/booleans half of a `define*Config` literal — the config data.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |
