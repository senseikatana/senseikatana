[katanakit-js](../index.md) / WpMediaResponseSchema

# Variable: WpMediaResponseSchema

```ts
const WpMediaResponseSchema: ZodObject<{
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
        filesize: ZodOptional<ZodNumber>;
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
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:133](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L133)

Media response variant (partials via `_fields` stay well-typed).
