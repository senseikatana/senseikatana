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

Defined in: [schemas/youtube.schema.ts:110](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/youtube.schema.ts#L110)

Minimal `videos.list` shape (only what the service reads).
