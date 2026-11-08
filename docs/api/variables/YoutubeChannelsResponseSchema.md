[katanakit-js](../index.md) / YoutubeChannelsResponseSchema

# Variable: YoutubeChannelsResponseSchema

```ts
const YoutubeChannelsResponseSchema: ZodObject<{
  items: ZodOptional<ZodArray<ZodObject<{
     contentDetails: ZodOptional<ZodObject<{
        relatedPlaylists: ZodOptional<ZodObject<..., ...>>;
     }, $strip>>;
  }, $strip>>>;
}, $strip>;
```

Defined in: [schemas/youtube.schema.ts:65](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/youtube.schema.ts#L65)

Minimal `channels.list` shape (only what the service reads).
