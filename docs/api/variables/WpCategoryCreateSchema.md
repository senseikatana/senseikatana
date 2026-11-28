[katanakit-js](../index.md) / WpCategoryCreateSchema

# Variable: WpCategoryCreateSchema

```ts
const WpCategoryCreateSchema: ZodObject<{
  acf: ZodOptional<ZodOptional<ZodRecord<ZodString, ZodUnknown>>>;
  description: ZodOptional<ZodString>;
  name: ZodString;
  parent: ZodOptional<ZodNumber>;
  slug: ZodString;
  taxonomy: ZodString;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:326](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/wordpress.schema.ts#L326)

Payload for creating a WordPress category.
