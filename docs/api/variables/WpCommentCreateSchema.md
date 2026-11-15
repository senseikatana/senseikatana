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

Defined in: [schemas/wordpress.schema.ts:413](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/wordpress.schema.ts#L413)

Payload for creating a WordPress comment.
