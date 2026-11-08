[katanakit-js](../index.md) / RssConfigSchema

# Variable: RssConfigSchema

```ts
const RssConfigSchema: ZodObject<{
  customData: ZodOptional<ZodString>;
  description: ZodString;
  items: ZodArray<ZodObject<{
     author: ZodOptional<ZodString>;
     categories: ZodOptional<ZodArray<ZodString>>;
     content: ZodOptional<ZodString>;
     customData: ZodOptional<ZodString>;
     description: ZodOptional<ZodString>;
     link: ZodString;
     pubDate: ZodUnion<readonly [ZodString, ZodDate]>;
     title: ZodString;
  }, $strip>>;
  language: ZodOptional<ZodString>;
  lastBuildDate: ZodOptional<ZodBoolean>;
  site: ZodString;
  title: ZodString;
  trailingSlash: ZodOptional<ZodBoolean>;
  xmlPath: ZodOptional<ZodString>;
  xslUrl: ZodOptional<ZodString>;
}, $strip>;
```

Defined in: [schemas/rss.schema.ts:24](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/rss.schema.ts#L24)

Configuration for generating an RSS feed.
