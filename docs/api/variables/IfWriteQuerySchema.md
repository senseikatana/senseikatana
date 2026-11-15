[katanakit-js](../index.md) / IfWriteQuerySchema

# Variable: IfWriteQuerySchema

```ts
const IfWriteQuerySchema: ZodObject<{
  filters: ZodRecord<ZodString, ZodUnion<readonly [ZodString, ZodNumber, ZodBoolean]>>;
  schema: ZodOptional<ZodString>;
  table: ZodString;
}, $strip>;
```

Defined in: [schemas/insforge.schema.ts:58](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/insforge.schema.ts#L58)

Options for an update or delete. Filters are REQUIRED (no mass writes).
