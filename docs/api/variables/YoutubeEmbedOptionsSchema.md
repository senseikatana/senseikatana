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

Defined in: [schemas/media.schema.ts:16](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/media.schema.ts#L16)

Options for the YouTube nocookie embed URL.
