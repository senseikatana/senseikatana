[katanakit-js](../index.md) / IfWriteQuerySchema

# Variable: IfWriteQuerySchema

```ts
const IfWriteQuerySchema: ZodObject<{
  filters: ZodRecord<ZodString, ZodUnion<readonly [ZodString, ZodNumber, ZodBoolean]>>;
  schema: ZodOptional<ZodString>;
  table: ZodString;
}, $strip>;
```

Defined in: [schemas/insforge.schema.ts:58](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/insforge.schema.ts#L58)

Options for an update or delete. Filters are REQUIRED (no mass writes).
