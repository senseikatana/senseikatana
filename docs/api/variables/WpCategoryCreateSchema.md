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

Defined in: [schemas/wordpress.schema.ts:326](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/wordpress.schema.ts#L326)

Payload for creating a WordPress category.
