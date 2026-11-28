[katanakit-js](../index.md) / IfWriteQuerySchema

# Variable: IfWriteQuerySchema

```ts
const IfWriteQuerySchema: ZodObject<{
  filters: ZodRecord<ZodString, ZodUnion<readonly [ZodString, ZodNumber, ZodBoolean]>>;
  schema: ZodOptional<ZodString>;
  table: ZodString;
}, $strip>;
```

Defined in: [schemas/insforge.schema.ts:58](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/insforge.schema.ts#L58)

Options for an update or delete. Filters are REQUIRED (no mass writes).
