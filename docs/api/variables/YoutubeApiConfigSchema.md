[katanakit-js](../index.md) / YoutubeApiConfigSchema

# Variable: YoutubeApiConfigSchema

```ts
const YoutubeApiConfigSchema: ZodObject<{
  apiKey: ZodString;
  channelId: ZodString;
}, $strip>;
```

Defined in: [schemas/youtube.schema.ts:4](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/youtube.schema.ts#L4)

Config for the YouTube service. One GCP project serves all repos.
