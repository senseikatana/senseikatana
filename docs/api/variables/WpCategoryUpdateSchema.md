[katanakit-js](../index.md) / WpCategoryUpdateSchema

# Variable: WpCategoryUpdateSchema

```ts
const WpCategoryUpdateSchema: ZodObject<{
  acf: ZodOptional<ZodOptional<ZodRecord<ZodString, ZodUnknown>>>;
  description: ZodOptional<ZodString>;
  name: ZodOptional<ZodString>;
  parent: ZodOptional<ZodNumber>;
  slug: ZodOptional<ZodString>;
  taxonomy: ZodOptional<ZodString>;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:338](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L338)

Payload for updating a WordPress category.
