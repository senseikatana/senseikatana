[katanakit-js](../index.md) / YoutubeListParamsSchema

# Variable: YoutubeListParamsSchema

```ts
const YoutubeListParamsSchema: ZodObject<{
  channelId: ZodOptional<ZodString>;
  maxResults: ZodOptional<ZodNumber>;
  pageToken: ZodOptional<ZodString>;
  playlistId: ZodOptional<ZodString>;
}, $strip>;
```

Defined in: [schemas/youtube.schema.ts:12](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/youtube.schema.ts#L12)

Params for `useGetChannelVideos`.
