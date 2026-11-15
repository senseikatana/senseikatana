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

Defined in: [schemas/youtube.schema.ts:65](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/youtube.schema.ts#L65)

Minimal `channels.list` shape (only what the service reads).
