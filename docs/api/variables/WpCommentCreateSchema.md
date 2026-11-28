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

Defined in: [schemas/wordpress.schema.ts:413](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/wordpress.schema.ts#L413)

Payload for creating a WordPress comment.
