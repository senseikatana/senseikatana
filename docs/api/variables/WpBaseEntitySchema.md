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

Defined in: [schemas/wordpress.schema.ts:36](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/wordpress.schema.ts#L36)

Base fields shared by all WordPress entities.
