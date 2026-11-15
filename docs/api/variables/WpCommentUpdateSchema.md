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

Defined in: [schemas/wordpress.schema.ts:430](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/wordpress.schema.ts#L430)

Payload for updating a WordPress comment.
