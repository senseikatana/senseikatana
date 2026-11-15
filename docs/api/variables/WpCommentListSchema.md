[katanakit-js](../index.md) / WpCommentListSchema

# Variable: WpCommentListSchema

```ts
const WpCommentListSchema: ZodArray<ZodObject<{
  author: ZodOptional<ZodNumber>;
  author_avatar_urls: ZodOptional<ZodRecord<ZodString, ZodString>>;
  author_email: ZodOptional<ZodString>;
  author_name: ZodOptional<ZodString>;
  author_url: ZodOptional<ZodString>;
  content: ZodOptional<ZodObject<{
     rendered: ZodString;
  }, $catchall<ZodUnknown>>>;
  date: ZodOptional<ZodString>;
  date_gmt: ZodOptional<ZodString>;
  id: ZodOptional<ZodNumber>;
  link: ZodOptional<ZodString>;
  meta: ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
  parent: ZodOptional<ZodNumber>;
  post: ZodOptional<ZodNumber>;
  status: ZodOptional<ZodString>;
  type: ZodOptional<ZodString>;
}, $catchall<ZodUnknown>>>;
```

Defined in: [schemas/wordpress.schema.ts:453](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/wordpress.schema.ts#L453)

List of comments.
