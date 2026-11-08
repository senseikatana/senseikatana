[katanakit-js](../index.md) / WpMediaListSchema

# Variable: WpMediaListSchema

```ts
const WpMediaListSchema: ZodArray<ZodObject<{
  _embedded: ZodOptional<ZodOptional<ZodLazy<ZodObject<{
     author: ZodOptional<ZodArray<ZodObject<..., ...>>>;
     wp:comment: ZodOptional<ZodArray<ZodArray<...>>>;
     wp:featuredmedia: ZodOptional<ZodArray<ZodObject<..., ...>>>;
     wp:term: ZodOptional<ZodArray<ZodArray<...>>>;
  }, $catchall<ZodUnknown>>>>>;
  acf: ZodOptional<ZodOptional<ZodRecord<ZodString, ZodUnknown>>>;
  alt_text: ZodOptional<ZodString>;
  author: ZodOptional<ZodNumber>;
  caption: ZodOptional<ZodObject<{
     rendered: ZodString;
  }, $catchall<ZodUnknown>>>;
  date: ZodOptional<ZodString>;
  date_gmt: ZodOptional<ZodString>;
  description: ZodOptional<ZodObject<{
     rendered: ZodString;
  }, $catchall<ZodUnknown>>>;
  guid: ZodOptional<ZodOptional<ZodObject<{
     rendered: ZodString;
  }, $catchall<ZodUnknown>>>>;
  id: ZodOptional<ZodNumber>;
  link: ZodOptional<ZodString>;
  media_details: ZodOptional<ZodObject<{
     file: ZodOptional<ZodString>;
     filesize: ZodOptional<ZodNumber>;
     height: ZodOptional<ZodNumber>;
     image_meta: ZodOptional<ZodObject<{
        aperture: ZodOptional<ZodString>;
        camera: ZodOptional<ZodString>;
        caption: ZodOptional<ZodString>;
        copyright: ZodOptional<ZodString>;
        created_timestamp: ZodOptional<ZodString>;
        credit: ZodOptional<ZodString>;
        focal_length: ZodOptional<ZodString>;
        iso: ZodOptional<ZodString>;
        orientation: ZodOptional<ZodString>;
        shutter_speed: ZodOptional<ZodString>;
        title: ZodOptional<ZodString>;
     }, $catchall<ZodUnknown>>>;
     sizes: ZodOptional<ZodRecord<ZodString, ZodObject<{
        file: ZodString;
        filesize: ZodOptional<...>;
        height: ZodNumber;
        mime_type: ZodString;
        source_url: ZodString;
        width: ZodNumber;
     }, $catchall<ZodUnknown>>>>;
     width: ZodOptional<ZodNumber>;
  }, $catchall<ZodUnknown>>>;
  media_type: ZodOptional<ZodString>;
  meta: ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
  mime_type: ZodOptional<ZodString>;
  modified: ZodOptional<ZodString>;
  modified_gmt: ZodOptional<ZodString>;
  post: ZodOptional<ZodNullable<ZodNumber>>;
  slug: ZodOptional<ZodString>;
  source_url: ZodOptional<ZodString>;
  status: ZodOptional<ZodString>;
  title: ZodOptional<ZodObject<{
     rendered: ZodString;
  }, $catchall<ZodUnknown>>>;
  type: ZodOptional<ZodOptional<ZodString>>;
}, $catchall<ZodUnknown>>>;
```

Defined in: [schemas/wordpress.schema.ts:136](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L136)

List of media items.
