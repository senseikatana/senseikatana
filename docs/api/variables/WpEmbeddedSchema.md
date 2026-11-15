[katanakit-js](../index.md) / WpEmbeddedSchema

# Variable: WpEmbeddedSchema

```ts
const WpEmbeddedSchema: ZodObject<{
  author: ZodOptional<ZodArray<ZodObject<{
     acf: ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
     avatar_urls: ZodRecord<ZodString, ZodString>;
     description: ZodString;
     id: ZodNumber;
     link: ZodString;
     name: ZodString;
     slug: ZodString;
     url: ZodString;
  }, $catchall<ZodUnknown>>>>;
  "wp:comment": ZodOptional<ZodArray<ZodArray<ZodObject<{
     author: ZodNumber;
     author_name: ZodString;
     content: ZodObject<{
        rendered: ZodString;
     }, $catchall<ZodUnknown>>;
     date: ZodString;
     id: ZodNumber;
     parent: ZodNumber;
  }, $catchall<ZodUnknown>>>>>;
  "wp:featuredmedia": ZodOptional<ZodArray<ZodObject<{
     alt_text: ZodString;
     date: ZodString;
     date_gmt: ZodString;
     guid: ZodOptional<ZodObject<{
        rendered: ZodString;
     }, $catchall<ZodUnknown>>>;
     id: ZodNumber;
     link: ZodString;
     modified: ZodString;
     modified_gmt: ZodString;
     slug: ZodString;
     source_url: ZodString;
     status: ZodString;
     title: ZodObject<{
        rendered: ZodString;
     }, $catchall<ZodUnknown>>;
     type: ZodOptional<ZodString>;
  }, $catchall<ZodUnknown>>>>;
  "wp:term": ZodOptional<ZodArray<ZodArray<ZodObject<{
     acf: ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
     id: ZodNumber;
     name: ZodString;
     slug: ZodString;
     taxonomy: ZodString;
  }, $catchall<ZodUnknown>>>>>;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:139](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/wordpress.schema.ts#L139)

Embedded resources returned when `_embed` is used.
