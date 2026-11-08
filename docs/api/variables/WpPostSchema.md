[katanakit-js](../index.md) / WpPostSchema

# Variable: WpPostSchema

```ts
const WpPostSchema: ZodObject<{
  _embedded: ZodOptional<ZodLazy<ZodObject<{
     author: ZodOptional<ZodArray<ZodObject<{
        acf: ZodOptional<...>;
        avatar_urls: ZodRecord<..., ...>;
        description: ZodString;
        id: ZodNumber;
        link: ZodString;
        name: ZodString;
        slug: ZodString;
        url: ZodString;
     }, $catchall<ZodUnknown>>>>;
     wp:comment: ZodOptional<ZodArray<ZodArray<ZodObject<{
        author: ...;
        author_name: ...;
        content: ...;
        date: ...;
        id: ...;
        parent: ...;
     }, $catchall<...>>>>>;
     wp:featuredmedia: ZodOptional<ZodArray<ZodObject<{
        alt_text: ZodString;
        date: ZodString;
        date_gmt: ZodString;
        guid: ZodOptional<...>;
        id: ZodNumber;
        link: ZodString;
        modified: ZodString;
        modified_gmt: ZodString;
        slug: ZodString;
        source_url: ZodString;
        status: ZodString;
        title: ZodObject<..., ...>;
        type: ZodOptional<...>;
     }, $catchall<ZodUnknown>>>>;
     wp:term: ZodOptional<ZodArray<ZodArray<ZodObject<{
        acf: ...;
        id: ...;
        name: ...;
        slug: ...;
        taxonomy: ...;
     }, $catchall<...>>>>>;
  }, $catchall<ZodUnknown>>>>;
  acf: ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
  author: ZodNumber;
  categories: ZodArray<ZodNumber>;
  comment_status: ZodString;
  content: ZodObject<{
     protected: ZodBoolean;
     rendered: ZodString;
  }, $catchall<ZodUnknown>>;
  date: ZodString;
  date_gmt: ZodString;
  excerpt: ZodObject<{
     protected: ZodBoolean;
     rendered: ZodString;
  }, $catchall<ZodUnknown>>;
  featured_media: ZodNumber;
  format: ZodString;
  guid: ZodOptional<ZodObject<{
     rendered: ZodString;
  }, $catchall<ZodUnknown>>>;
  id: ZodNumber;
  link: ZodString;
  meta: ZodRecord<ZodString, ZodUnknown>;
  modified: ZodString;
  modified_gmt: ZodString;
  ping_status: ZodString;
  slug: ZodString;
  status: ZodString;
  sticky: ZodBoolean;
  tags: ZodArray<ZodNumber>;
  template: ZodString;
  title: ZodObject<{
     rendered: ZodString;
  }, $catchall<ZodUnknown>>;
  type: ZodOptional<ZodString>;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:201](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L201)

A WordPress post.
