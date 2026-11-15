[katanakit-js](../index.md) / WpMediaMetaSchema

# Variable: WpMediaMetaSchema

```ts
const WpMediaMetaSchema: ZodObject<{
  alt_text: ZodOptional<ZodString>;
  caption: ZodOptional<ZodString>;
  description: ZodOptional<ZodString>;
  post: ZodOptional<ZodNumber>;
  slug: ZodOptional<ZodString>;
  title: ZodOptional<ZodString>;
}, $strip>;
```

Defined in: [schemas/wordpress.schema.ts:60](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/wordpress.schema.ts#L60)

Metadata for a media upload.
