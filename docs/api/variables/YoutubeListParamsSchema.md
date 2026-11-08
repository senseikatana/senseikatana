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

Defined in: [schemas/youtube.schema.ts:12](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/youtube.schema.ts#L12)

Params for `useGetChannelVideos`.
