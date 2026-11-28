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

Defined in: [schemas/youtube.schema.ts:65](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/youtube.schema.ts#L65)

Minimal `channels.list` shape (only what the service reads).
