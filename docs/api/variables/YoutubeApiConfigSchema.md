[katanakit-js](../index.md) / YoutubeApiConfigSchema

# Variable: YoutubeApiConfigSchema

```ts
const YoutubeApiConfigSchema: ZodObject<{
  apiKey: ZodString;
  channelId: ZodString;
}, $strip>;
```

Defined in: [schemas/youtube.schema.ts:4](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/youtube.schema.ts#L4)

Config for the YouTube service. One GCP project serves all repos.
