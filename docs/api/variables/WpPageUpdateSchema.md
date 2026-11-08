[katanakit-js](../index.md) / WpPageUpdateSchema

# Variable: WpPageUpdateSchema

```ts
const WpPageUpdateSchema: ZodObject<{
  acf: ZodOptional<ZodOptional<ZodRecord<ZodString, ZodUnknown>>>;
  author: ZodOptional<ZodNumber>;
  comment_status: ZodOptional<ZodString>;
  content: ZodOptional<ZodObject<{
     protected: ZodBoolean;
     rendered: ZodString;
  }, $catchall<ZodUnknown>>>;
  excerpt: ZodOptional<ZodObject<{
     protected: ZodBoolean;
     rendered: ZodString;
  }, $catchall<ZodUnknown>>>;
  featured_media: ZodOptional<ZodNumber>;
  guid: ZodOptional<ZodOptional<ZodObject<{
     rendered: ZodString;
  }, $catchall<ZodUnknown>>>>;
  menu_order: ZodOptional<ZodNumber>;
  meta: ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
  parent: ZodOptional<ZodNumber>;
  ping_status: ZodOptional<ZodString>;
  slug: ZodOptional<ZodString>;
  status: ZodOptional<ZodString>;
  template: ZodOptional<ZodString>;
  title: ZodOptional<ZodObject<{
     rendered: ZodString;
  }, $catchall<ZodUnknown>>>;
  type: ZodOptional<ZodOptional<ZodString>>;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:293](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L293)

Payload for updating a WordPress page.
