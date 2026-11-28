[katanakit-js](../index.md) / ApiConfigNestedMethods

# Type Alias: ApiConfigNestedMethods\<T\>

```ts
type ApiConfigNestedMethods<T> = T extends {
  methods: infer M;
} ? M : unknown;
```

Defined in: [types/core/config-facade.ts:35](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/core/config-facade.ts#L35)

Methods declared in the `methods: {}` section, merged flat onto the facade
alongside any top-level methods. Absent when the literal declares none.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
