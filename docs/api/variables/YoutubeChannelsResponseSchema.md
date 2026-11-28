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

Defined in: [schemas/youtube.schema.ts:65](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/youtube.schema.ts#L65)

Minimal `channels.list` shape (only what the service reads).
