[katanakit-js](../index.md) / DateOrderSchema

# Variable: DateOrderSchema

```ts
const DateOrderSchema: ZodEnum<{
  after: "after";
  before: "before";
  same: "same";
}>;
```

Defined in: [schemas/core.schema.ts:158](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/core.schema.ts#L158)

Relative ordering of two dates, matching Notion's `dateOrder()`.
