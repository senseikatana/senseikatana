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

Defined in: [schemas/wordpress.schema.ts:60](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/wordpress.schema.ts#L60)

Metadata for a media upload.
