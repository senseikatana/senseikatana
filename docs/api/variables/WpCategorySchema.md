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

Defined in: [schemas/wordpress.schema.ts:310](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/wordpress.schema.ts#L310)

A WordPress category.
