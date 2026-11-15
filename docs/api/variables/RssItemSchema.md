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

Defined in: [schemas/rss.schema.ts:4](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/rss.schema.ts#L4)

A single item in an RSS feed.
