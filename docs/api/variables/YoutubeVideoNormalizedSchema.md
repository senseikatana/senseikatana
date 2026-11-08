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

Defined in: [schemas/youtube.schema.ts:31](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/youtube.schema.ts#L31)

Normalized video, enriched with player-ready URLs.
