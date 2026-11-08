[katanakit-js](../index.md) / ConfigValues

# Type Alias: ConfigValues\<T, V\>

```ts
type ConfigValues<T, V> = { [K in keyof T]: K extends ConfigMethodKeys<T> ? T[K] : V };
```

Defined in: [types/core/config-facade.ts:57](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/config-facade.ts#L57)

Constrains every non-method entry of a `define*Config` literal to `V`, while
leaving method entries untouched. Pair with `NoInfer<T>` in the signature so
it validates without stealing inference from the literal.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The literal being validated. |
| `V` | The type every non-method value must satisfy. |
