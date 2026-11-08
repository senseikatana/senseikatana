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

Defined in: [schemas/wordpress.schema.ts:430](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L430)

Payload for updating a WordPress comment.
