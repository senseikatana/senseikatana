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

Defined in: [schemas/rss.schema.ts:4](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/rss.schema.ts#L4)

A single item in an RSS feed.
