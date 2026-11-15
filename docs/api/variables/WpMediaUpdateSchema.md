[katanakit-js](../index.md) / WpMediaUpdateSchema

# Variable: WpMediaUpdateSchema

```ts
const WpMediaUpdateSchema: ZodObject<{
  alt_text: ZodOptional<ZodOptional<ZodString>>;
  caption: ZodOptional<ZodOptional<ZodString>>;
  description: ZodOptional<ZodOptional<ZodString>>;
  post: ZodOptional<ZodOptional<ZodNumber>>;
  slug: ZodOptional<ZodOptional<ZodString>>;
  status: ZodOptional<ZodString>;
  title: ZodOptional<ZodOptional<ZodString>>;
}, $strip>;
```

Defined in: [schemas/wordpress.schema.ts:128](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/wordpress.schema.ts#L128)

Payload for updating a WordPress media item.
