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

Defined in: [schemas/wordpress.schema.ts:310](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L310)

A WordPress category.
