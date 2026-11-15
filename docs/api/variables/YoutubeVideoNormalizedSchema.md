[katanakit-js](../index.md) / YoutubeVideoNormalizedSchema

# Variable: YoutubeVideoNormalizedSchema

```ts
const YoutubeVideoNormalizedSchema: ZodObject<{
  channelTitle: ZodOptional<ZodString>;
  description: ZodString;
  durationSeconds: ZodOptional<ZodNumber>;
  embedUrl: ZodString;
  id: ZodString;
  publishedAt: ZodString;
  thumbnail: ZodString;
  thumbnails: ZodObject<{
     default: ZodString;
     high: ZodString;
     medium: ZodString;
  }, $strip>;
  title: ZodString;
  url: ZodString;
  viewCount: ZodOptional<ZodNumber>;
}, $strip>;
```

Defined in: [schemas/youtube.schema.ts:31](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/youtube.schema.ts#L31)

Normalized video, enriched with player-ready URLs.
