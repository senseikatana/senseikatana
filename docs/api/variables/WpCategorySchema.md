[katanakit-js](../index.md) / WpCategorySchema

# Variable: WpCategorySchema

```ts
const WpCategorySchema: ZodObject<{
  acf: ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
  count: ZodNumber;
  description: ZodString;
  id: ZodNumber;
  link: ZodString;
  meta: ZodRecord<ZodString, ZodUnknown>;
  name: ZodString;
  parent: ZodNumber;
  slug: ZodString;
  taxonomy: ZodString;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:310](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/wordpress.schema.ts#L310)

A WordPress category.
