[katanakit-js](../index.md) / YoutubeEmbedOptionsSchema

# Variable: YoutubeEmbedOptionsSchema

```ts
const YoutubeEmbedOptionsSchema: ZodObject<{
  autoplay: ZodOptional<ZodBoolean>;
  end: ZodOptional<ZodNumber>;
  params: ZodOptional<ZodRecord<ZodString, ZodUnion<readonly [ZodString, ZodNumber, ZodBoolean]>>>;
  start: ZodOptional<ZodNumber>;
}, $strip>;
```

Defined in: [schemas/media.schema.ts:16](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/media.schema.ts#L16)

Options for the YouTube nocookie embed URL.
