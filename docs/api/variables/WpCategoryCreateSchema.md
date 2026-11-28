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

Defined in: [schemas/wordpress.schema.ts:326](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/wordpress.schema.ts#L326)

Payload for creating a WordPress category.
