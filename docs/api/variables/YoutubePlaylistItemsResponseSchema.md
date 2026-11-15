[katanakit-js](../index.md) / YoutubePlaylistItemsResponseSchema

# Variable: YoutubePlaylistItemsResponseSchema

```ts
const YoutubePlaylistItemsResponseSchema: ZodObject<{
  items: ZodOptional<ZodArray<ZodObject<{
     contentDetails: ZodOptional<ZodObject<{
        videoId: ZodOptional<ZodString>;
     }, $strip>>;
     snippet: ZodOptional<ZodObject<{
        channelTitle: ZodOptional<ZodString>;
        description: ZodOptional<ZodString>;
        publishedAt: ZodOptional<ZodString>;
        resourceId: ZodOptional<ZodObject<..., ...>>;
        thumbnails: ZodOptional<ZodObject<..., ...>>;
        title: ZodOptional<ZodString>;
     }, $strip>>;
  }, $strip>>>;
  nextPageToken: ZodOptional<ZodString>;
  pageInfo: ZodOptional<ZodObject<{
     totalResults: ZodOptional<ZodNumber>;
  }, $strip>>;
  prevPageToken: ZodOptional<ZodString>;
}, $strip>;
```

Defined in: [schemas/youtube.schema.ts:80](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/youtube.schema.ts#L80)

Minimal `playlistItems.list` shape (only what the service reads).
