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

Defined in: [schemas/wordpress.schema.ts:60](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/wordpress.schema.ts#L60)

Metadata for a media upload.
