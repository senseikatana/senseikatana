[katanakit-js](../index.md) / ConfigValues

# Type Alias: ConfigValues\<T, V\>

```ts
type ConfigValues<T, V> = { [K in keyof T]: K extends ConfigMethodKeys<T> ? T[K] : V };
```

Defined in: [types/core/config-facade.ts:78](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/core/config-facade.ts#L78)

Constrains every non-method entry of a `define*Config` literal to `V`, while
leaving method entries untouched. Pair with `NoInfer<T>` in the signature so
it validates without stealing inference from the literal.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | The literal being validated. |
| <a id="type-parameter-v"></a> `V` | The type every non-method value must satisfy. |
