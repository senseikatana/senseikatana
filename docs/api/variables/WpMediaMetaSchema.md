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

Defined in: [schemas/wordpress.schema.ts:60](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/wordpress.schema.ts#L60)

Metadata for a media upload.
