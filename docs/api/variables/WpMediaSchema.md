[katanakit-js](../index.md) / WpMediaSchema

# Variable: WpMediaSchema

```ts
const WpMediaSchema: ZodObject<{
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
  alt_text: ZodString;
  author: ZodNumber;
  caption: ZodObject<{
     rendered: ZodString;
  }, $catchall<ZodUnknown>>;
  date: ZodString;
  date_gmt: ZodString;
  description: ZodObject<{
     rendered: ZodString;
  }, $catchall<ZodUnknown>>;
  guid: ZodOptional<ZodObject<{
     rendered: ZodString;
  }, $catchall<ZodUnknown>>>;
  id: ZodNumber;
  link: ZodString;
  media_details: ZodObject<{
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
  }, $catchall<ZodUnknown>>;
  media_type: ZodString;
  meta: ZodRecord<ZodString, ZodUnknown>;
  mime_type: ZodString;
  modified: ZodString;
  modified_gmt: ZodString;
  post: ZodNullable<ZodNumber>;
  slug: ZodString;
  source_url: ZodString;
  status: ZodString;
  title: ZodObject<{
     rendered: ZodString;
  }, $catchall<ZodUnknown>>;
  type: ZodOptional<ZodString>;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:111](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L111)

A WordPress media item (attachment).
