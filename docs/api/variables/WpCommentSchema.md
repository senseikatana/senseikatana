[katanakit-js](../index.md) / WpCommentSchema

# Variable: WpCommentSchema

```ts
const WpCommentSchema: ZodObject<{
  author: ZodNumber;
  author_avatar_urls: ZodRecord<ZodString, ZodString>;
  author_email: ZodString;
  author_name: ZodString;
  author_url: ZodString;
  content: ZodObject<{
     rendered: ZodString;
  }, $catchall<ZodUnknown>>;
  date: ZodString;
  date_gmt: ZodString;
  id: ZodNumber;
  link: ZodString;
  meta: ZodRecord<ZodString, ZodUnknown>;
  parent: ZodNumber;
  post: ZodNumber;
  status: ZodString;
  type: ZodString;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:392](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/wordpress.schema.ts#L392)

A WordPress comment.
