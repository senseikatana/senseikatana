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

Defined in: [schemas/youtube.schema.ts:12](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/youtube.schema.ts#L12)

Params for `useGetChannelVideos`.
