[katanakit-js](../index.md) / ApiConfigStateEntry

# Type Alias: ApiConfigStateEntry\<T\>

```ts
type ApiConfigStateEntry<T> = T extends {
  data: () => infer S;
} ? {
  data: S;
} : unknown;
```

Defined in: [types/core/config-facade.ts:32](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/config-facade.ts#L32)

State declared by the `data()` section — the return type of that factory. Absent when the literal declares no `data`, matching the runtime facade.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
