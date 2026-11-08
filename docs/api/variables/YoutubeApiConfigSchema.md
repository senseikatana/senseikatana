[katanakit-js](../index.md) / YoutubeApiConfigSchema

# Variable: YoutubeApiConfigSchema

```ts
const YoutubeApiConfigSchema: ZodObject<{
  apiKey: ZodString;
  channelId: ZodString;
}, $strip>;
```

Defined in: [schemas/youtube.schema.ts:4](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/youtube.schema.ts#L4)

Config for the YouTube service. One GCP project serves all repos.
