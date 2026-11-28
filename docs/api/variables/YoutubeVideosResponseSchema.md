[katanakit-js](../index.md) / YoutubeVideosResponseSchema

# Variable: YoutubeVideosResponseSchema

```ts
const YoutubeVideosResponseSchema: ZodObject<{
  items: ZodOptional<ZodArray<ZodObject<{
     contentDetails: ZodOptional<ZodObject<{
        duration: ZodOptional<ZodString>;
     }, $strip>>;
     id: ZodOptional<ZodString>;
     snippet: ZodOptional<ZodObject<{
        channelTitle: ZodOptional<ZodString>;
        description: ZodOptional<ZodString>;
        publishedAt: ZodOptional<ZodString>;
        title: ZodOptional<ZodString>;
     }, $strip>>;
     statistics: ZodOptional<ZodObject<{
        viewCount: ZodOptional<ZodString>;
     }, $strip>>;
  }, $strip>>>;
}, $strip>;
```

Defined in: [schemas/youtube.schema.ts:110](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/youtube.schema.ts#L110)

Minimal `videos.list` shape (only what the service reads).
