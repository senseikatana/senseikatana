[katanakit-js](../index.md) / WpTagSchema

# Variable: WpTagSchema

```ts
const WpTagSchema: ZodObject<{
  acf: ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
  count: ZodNumber;
  description: ZodString;
  id: ZodNumber;
  link: ZodString;
  meta: ZodRecord<ZodString, ZodUnknown>;
  name: ZodString;
  slug: ZodString;
  taxonomy: ZodString;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:352](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L352)

A WordPress tag.
