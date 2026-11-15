[katanakit-js](../index.md) / WpMenuItemSchema

# Variable: WpMenuItemSchema

```ts
const WpMenuItemSchema: ZodObject<{
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
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:543](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/wordpress.schema.ts#L543)

A WordPress menu item.
