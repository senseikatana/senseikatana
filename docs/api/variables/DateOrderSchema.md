[katanakit-js](../index.md) / DateOrderSchema

# Variable: DateOrderSchema

```ts
const DateOrderSchema: ZodEnum<{
  after: "after";
  before: "before";
  same: "same";
}>;
```

Defined in: [schemas/core.schema.ts:149](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/core.schema.ts#L149)

Relative ordering of two dates, matching Notion's `dateOrder()`.
