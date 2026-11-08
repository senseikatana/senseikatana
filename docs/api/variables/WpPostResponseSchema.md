[katanakit-js](../index.md) / WpPostResponseSchema

# Variable: WpPostResponseSchema

```ts
const WpPostResponseSchema: ZodObject<{
  _embedded: ZodOptional<ZodOptional<ZodLazy<ZodObject<{
     author: ZodOptional<ZodArray<ZodObject<{
        acf: ...;
        avatar_urls: ...;
        description: ...;
        id: ...;
        link: ...;
        name: ...;
        slug: ...;
        url: ...;
     }, $catchall<...>>>>;
     wp:comment: ZodOptional<ZodArray<ZodArray<ZodObject<..., ...>>>>;
     wp:featuredmedia: ZodOptional<ZodArray<ZodObject<{
        alt_text: ...;
        date: ...;
        date_gmt: ...;
        guid: ...;
        id: ...;
        link: ...;
        modified: ...;
        modified_gmt: ...;
        slug: ...;
        source_url: ...;
        status: ...;
        title: ...;
        type: ...;
     }, $catchall<...>>>>;
     wp:term: ZodOptional<ZodArray<ZodArray<ZodObject<..., ...>>>>;
  }, $catchall<ZodUnknown>>>>>;
  acf: ZodOptional<ZodOptional<ZodRecord<ZodString, ZodUnknown>>>;
  author: ZodOptional<ZodNumber>;
  categories: ZodOptional<ZodArray<ZodNumber>>;
  comment_status: ZodOptional<ZodString>;
  content: ZodOptional<ZodObject<{
     protected: ZodBoolean;
     rendered: ZodString;
  }, $catchall<ZodUnknown>>>;
  date: ZodOptional<ZodString>;
  date_gmt: ZodOptional<ZodString>;
  excerpt: ZodOptional<ZodObject<{
     protected: ZodBoolean;
     rendered: ZodString;
  }, $catchall<ZodUnknown>>>;
  featured_media: ZodOptional<ZodNumber>;
  format: ZodOptional<ZodString>;
  guid: ZodOptional<ZodOptional<ZodObject<{
     rendered: ZodString;
  }, $catchall<ZodUnknown>>>>;
  id: ZodOptional<ZodNumber>;
  link: ZodOptional<ZodString>;
  meta: ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
  modified: ZodOptional<ZodString>;
  modified_gmt: ZodOptional<ZodString>;
  ping_status: ZodOptional<ZodString>;
  slug: ZodOptional<ZodString>;
  status: ZodOptional<ZodString>;
  sticky: ZodOptional<ZodBoolean>;
  tags: ZodOptional<ZodArray<ZodNumber>>;
  template: ZodOptional<ZodString>;
  title: ZodOptional<ZodObject<{
     rendered: ZodString;
  }, $catchall<ZodUnknown>>>;
  type: ZodOptional<ZodOptional<ZodString>>;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:251](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L251)

Post response variant (partials via `_fields` stay well-typed).
