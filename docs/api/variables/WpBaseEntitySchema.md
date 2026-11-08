[katanakit-js](../index.md) / WpBaseEntitySchema

# Variable: WpBaseEntitySchema

```ts
const WpBaseEntitySchema: ZodObject<{
  date: ZodString;
  date_gmt: ZodString;
  guid: ZodOptional<ZodObject<{
     rendered: ZodString;
  }, $catchall<ZodUnknown>>>;
  id: ZodNumber;
  link: ZodString;
  modified: ZodString;
  modified_gmt: ZodString;
  slug: ZodString;
  status: ZodString;
  type: ZodOptional<ZodString>;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:36](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L36)

Base fields shared by all WordPress entities.
