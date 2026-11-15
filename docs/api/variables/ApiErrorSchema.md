[katanakit-js](../index.md) / ApiErrorSchema

# Variable: ApiErrorSchema

```ts
const ApiErrorSchema: ZodObject<{
  details: ZodOptional<ZodUnknown>;
  message: ZodString;
  status: ZodNumber;
}, $strip>;
```

Defined in: [schemas/common.schema.ts:25](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/common.schema.ts#L25)

Safe error returned on non-2xx, network or validation failures.
