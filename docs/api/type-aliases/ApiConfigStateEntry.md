[katanakit-js](../index.md) / ApiConfigStateEntry

# Type Alias: ApiConfigStateEntry\<T\>

```ts
type ApiConfigStateEntry<T> = T extends {
  data: () => infer S;
} ? {
  data: S;
} : unknown;
```

Defined in: [types/core/config-facade.ts:41](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/core/config-facade.ts#L41)

State declared by the `data()` section — the return type of that factory.
Absent when the literal declares no `data`, matching the runtime facade.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
