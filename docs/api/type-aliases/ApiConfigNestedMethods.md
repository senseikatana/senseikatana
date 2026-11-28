[katanakit-js](../index.md) / ApiConfigNestedMethods

# Type Alias: ApiConfigNestedMethods\<T\>

```ts
type ApiConfigNestedMethods<T> = T extends {
  methods: infer M;
} ? M : unknown;
```

Defined in: [types/core/config-facade.ts:29](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/config-facade.ts#L29)

Methods declared in the `methods: {}` section, merged flat onto the facade alongside any top-level methods. Absent when the literal declares none.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
