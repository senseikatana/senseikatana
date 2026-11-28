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

Defined in: [schemas/youtube.schema.ts:12](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/youtube.schema.ts#L12)

Params for `onGetChannelVideos`.
