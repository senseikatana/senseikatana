[katanakit-js](../index.md) / WpCommentCreateSchema

# Variable: WpCommentCreateSchema

```ts
const WpCommentCreateSchema: ZodObject<{
  author: ZodNumber;
  author_email: ZodOptional<ZodString>;
  author_name: ZodOptional<ZodString>;
  author_url: ZodOptional<ZodString>;
  content: ZodObject<{
     rendered: ZodString;
  }, $catchall<ZodUnknown>>;
  parent: ZodOptional<ZodNumber>;
  post: ZodNumber;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:413](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/wordpress.schema.ts#L413)

Payload for creating a WordPress comment.
