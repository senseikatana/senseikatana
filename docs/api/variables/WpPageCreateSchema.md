[katanakit-js](../index.md) / WpPageCreateSchema

# Variable: WpPageCreateSchema

```ts
const WpPageCreateSchema: ZodObject<{
  acf: ZodOptional<ZodOptional<ZodRecord<ZodString, ZodUnknown>>>;
  author: ZodNumber;
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
  guid: ZodOptional<ZodObject<{
     rendered: ZodString;
  }, $catchall<ZodUnknown>>>;
  menu_order: ZodOptional<ZodNumber>;
  meta: ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
  parent: ZodOptional<ZodNumber>;
  ping_status: ZodString;
  slug: ZodOptional<ZodString>;
  status: ZodOptional<ZodString>;
  template: ZodOptional<ZodString>;
  title: ZodObject<{
     rendered: ZodString;
  }, $catchall<ZodUnknown>>;
  type: ZodOptional<ZodString>;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:274](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L274)

Payload for creating a WordPress page.
