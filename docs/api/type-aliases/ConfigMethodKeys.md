[katanakit-js](../index.md) / ConfigMethodKeys

# Type Alias: ConfigMethodKeys\<T\>

```ts
type ConfigMethodKeys<T> = { [K in keyof T]-?: NonNullable<T[K]> extends ConfigMethod ? K : never }[keyof T];
```

Defined in: [types/core/config-facade.ts:14](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/core/config-facade.ts#L14)

Keys of `T` whose value is a [ConfigMethod](ConfigMethod.md). Methods declared as
optional are still detected (`NonNullable`), so they are split out of the
config half rather than leaking into it.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
