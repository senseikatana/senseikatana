[katanakit-js](../index.md) / WpCategoryListSchema

# Variable: WpCategoryListSchema

```ts
const WpCategoryListSchema: ZodArray<ZodObject<{
  acf: ZodOptional<ZodOptional<ZodRecord<ZodString, ZodUnknown>>>;
  count: ZodOptional<ZodNumber>;
  description: ZodOptional<ZodString>;
  id: ZodOptional<ZodNumber>;
  link: ZodOptional<ZodString>;
  meta: ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
  name: ZodOptional<ZodString>;
  parent: ZodOptional<ZodNumber>;
  slug: ZodOptional<ZodString>;
  taxonomy: ZodOptional<ZodString>;
}, $catchall<ZodUnknown>>>;
```

Defined in: [schemas/wordpress.schema.ts:349](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/wordpress.schema.ts#L349)

List of categories.
