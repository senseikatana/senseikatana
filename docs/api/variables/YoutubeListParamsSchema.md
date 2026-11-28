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

Defined in: [schemas/youtube.schema.ts:12](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/youtube.schema.ts#L12)

Params for `useGetChannelVideos`.
