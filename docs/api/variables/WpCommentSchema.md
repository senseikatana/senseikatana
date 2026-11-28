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

Defined in: [schemas/wordpress.schema.ts:392](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/wordpress.schema.ts#L392)

A WordPress comment.
