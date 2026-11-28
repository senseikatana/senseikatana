[katanakit-js](../index.md) / YoutubeApiConfigSchema

# Variable: YoutubeApiConfigSchema

```ts
const YoutubeApiConfigSchema: ZodObject<{
  apiKey: ZodString;
  channelId: ZodString;
}, $strip>;
```

Defined in: [schemas/youtube.schema.ts:4](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/youtube.schema.ts#L4)

Config for the YouTube service. One GCP project serves all repos.
