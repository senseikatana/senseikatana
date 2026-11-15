[katanakit-js](../index.md) / DateOrderSchema

# Variable: DateOrderSchema

```ts
const DateOrderSchema: ZodEnum<{
  after: "after";
  before: "before";
  same: "same";
}>;
```

Defined in: [schemas/core.schema.ts:158](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/core.schema.ts#L158)

Relative ordering of two dates, matching Notion's `dateOrder()`.
