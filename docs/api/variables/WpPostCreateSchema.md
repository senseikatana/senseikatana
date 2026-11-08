[katanakit-js](../index.md) / WpPostCreateSchema

# Variable: WpPostCreateSchema

```ts
const WpPostCreateSchema: ZodObject<{
  acf: ZodOptional<ZodOptional<ZodRecord<ZodString, ZodUnknown>>>;
  author: ZodNumber;
  categories: ZodOptional<ZodArray<ZodNumber>>;
  comment_status: ZodString;
  content: ZodObject<{
     protected: ZodBoolean;
     rendered: ZodString;
  }, $catchall<ZodUnknown>>;
  excerpt: ZodObject<{
     protected: ZodBoolean;
     rendered: ZodString;
  }, $catchall<ZodUnknown>>;
  featured_media: ZodNumber;
  format: ZodOptional<ZodString>;
  guid: ZodOptional<ZodObject<{
     rendered: ZodString;
  }, $catchall<ZodUnknown>>>;
  meta: ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
  ping_status: ZodString;
  slug: ZodOptional<ZodString>;
  status: ZodOptional<ZodString>;
  sticky: ZodBoolean;
  tags: ZodOptional<ZodArray<ZodNumber>>;
  template: ZodOptional<ZodString>;
  title: ZodObject<{
     rendered: ZodString;
  }, $catchall<ZodUnknown>>;
  type: ZodOptional<ZodString>;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:220](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L220)

Payload for creating a WordPress post.
