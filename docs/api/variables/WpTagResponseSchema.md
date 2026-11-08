[katanakit-js](../index.md) / WpTagResponseSchema

# Variable: WpTagResponseSchema

```ts
const WpTagResponseSchema: ZodObject<{
  acf: ZodOptional<ZodOptional<ZodRecord<ZodString, ZodUnknown>>>;
  count: ZodOptional<ZodNumber>;
  description: ZodOptional<ZodString>;
  id: ZodOptional<ZodNumber>;
  link: ZodOptional<ZodString>;
  meta: ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
  name: ZodOptional<ZodString>;
  slug: ZodOptional<ZodString>;
  taxonomy: ZodOptional<ZodString>;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:386](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L386)

Tag response variant (partials via `_fields` stay well-typed).
