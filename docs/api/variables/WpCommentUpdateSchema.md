[katanakit-js](../index.md) / WpCommentUpdateSchema

# Variable: WpCommentUpdateSchema

```ts
const WpCommentUpdateSchema: ZodObject<{
  author: ZodOptional<ZodNumber>;
  author_email: ZodOptional<ZodString>;
  author_name: ZodOptional<ZodString>;
  author_url: ZodOptional<ZodString>;
  content: ZodOptional<ZodObject<{
     rendered: ZodString;
  }, $catchall<ZodUnknown>>>;
  parent: ZodOptional<ZodNumber>;
  status: ZodOptional<ZodString>;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:430](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/wordpress.schema.ts#L430)

Payload for updating a WordPress comment.
