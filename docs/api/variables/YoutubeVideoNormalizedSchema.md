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

Defined in: [schemas/youtube.schema.ts:31](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/youtube.schema.ts#L31)

Normalized video, enriched with player-ready URLs.
