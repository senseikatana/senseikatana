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

Defined in: [schemas/media.schema.ts:16](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/media.schema.ts#L16)

Options for the YouTube nocookie embed URL.
