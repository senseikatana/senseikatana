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

Defined in: [schemas/wordpress.schema.ts:36](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/wordpress.schema.ts#L36)

Base fields shared by all WordPress entities.
