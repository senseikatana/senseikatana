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

Defined in: [schemas/wordpress.schema.ts:392](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/wordpress.schema.ts#L392)

A WordPress comment.
