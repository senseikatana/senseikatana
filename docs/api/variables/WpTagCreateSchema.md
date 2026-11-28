[katanakit-js](../index.md) / WpTagCreateSchema

# Variable: WpTagCreateSchema

```ts
const WpTagCreateSchema: ZodObject<{
  acf: ZodOptional<ZodOptional<ZodRecord<ZodString, ZodUnknown>>>;
  description: ZodOptional<ZodString>;
  name: ZodString;
  slug: ZodString;
  taxonomy: ZodString;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:367](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/wordpress.schema.ts#L367)

Payload for creating a WordPress tag.
