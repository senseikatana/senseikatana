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

Defined in: [schemas/wordpress.schema.ts:36](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/wordpress.schema.ts#L36)

Base fields shared by all WordPress entities.
