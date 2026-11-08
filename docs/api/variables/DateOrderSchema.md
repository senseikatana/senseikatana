[katanakit-js](../index.md) / DateOrderSchema

# Variable: DateOrderSchema

```ts
const DateOrderSchema: ZodEnum<{
  after: "after";
  before: "before";
  same: "same";
}>;
```

Defined in: [schemas/core.schema.ts:158](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/core.schema.ts#L158)

Relative ordering of two dates, matching Notion's `dateOrder()`.
