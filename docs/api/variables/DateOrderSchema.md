[katanakit-js](../index.md) / DateOrderSchema

# Variable: DateOrderSchema

```ts
const DateOrderSchema: ZodEnum<{
  after: "after";
  before: "before";
  same: "same";
}>;
```

Defined in: [schemas/core.schema.ts:158](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/core.schema.ts#L158)

Relative ordering of two dates, matching Notion's `dateOrder()`.
