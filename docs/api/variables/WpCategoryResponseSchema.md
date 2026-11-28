[katanakit-js](../index.md) / WpCategoryResponseSchema

# Variable: WpCategoryResponseSchema

```ts
const WpCategoryResponseSchema: ZodObject<{
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
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:346](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/wordpress.schema.ts#L346)

Category response variant (partials via `_fields` stay well-typed).
