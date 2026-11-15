[katanakit-js](../index.md) / YoutubeApiConfigSchema

# Variable: YoutubeApiConfigSchema

```ts
const YoutubeApiConfigSchema: ZodObject<{
  apiKey: ZodString;
  channelId: ZodString;
}, $strip>;
```

Defined in: [schemas/youtube.schema.ts:4](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/youtube.schema.ts#L4)

Config for the YouTube service. One GCP project serves all repos.
