[katanakit-js](../index.md) / YoutubeVideoPageSchema

# Variable: YoutubeVideoPageSchema

```ts
const YoutubeVideoPageSchema: ZodObject<{
  nextPageToken: ZodOptional<ZodString>;
  prevPageToken: ZodOptional<ZodString>;
  totalResults: ZodOptional<ZodNumber>;
  videos: ZodArray<ZodObject<{
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
  }, $strip>>;
}, $strip>;
```

Defined in: [schemas/youtube.schema.ts:51](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/youtube.schema.ts#L51)

Paginated channel listing result.
