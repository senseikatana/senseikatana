[katanakit-js](../index.md) / RssItemSchema

# Variable: RssItemSchema

```ts
const RssItemSchema: ZodObject<{
  author: ZodOptional<ZodString>;
  categories: ZodOptional<ZodArray<ZodString>>;
  content: ZodOptional<ZodString>;
  customData: ZodOptional<ZodString>;
  description: ZodOptional<ZodString>;
  link: ZodString;
  pubDate: ZodUnion<readonly [ZodString, ZodDate]>;
  title: ZodString;
}, $strip>;
```

Defined in: [schemas/rss.schema.ts:4](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/rss.schema.ts#L4)

A single item in an RSS feed.
