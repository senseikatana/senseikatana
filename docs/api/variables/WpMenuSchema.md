[katanakit-js](../index.md) / WpMenuSchema

# Variable: WpMenuSchema

```ts
const WpMenuSchema: ZodObject<{
  count: ZodNumber;
  description: ZodString;
  id: ZodNumber;
  items: ZodOptional<ZodArray<ZodObject<{
     attr_title: ZodString;
     classes: ZodArray<ZodString>;
     description: ZodString;
     id: ZodNumber;
     menu_order: ZodNumber;
     object: ZodString;
     object_id: ZodNumber;
     parent: ZodNumber;
     status: ZodString;
     target: ZodString;
     title: ZodString;
     type: ZodString;
     type_label: ZodString;
     url: ZodString;
     xfn: ZodString;
  }, $catchall<ZodUnknown>>>>;
  name: ZodString;
  slug: ZodString;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:564](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/wordpress.schema.ts#L564)

A WordPress menu.
