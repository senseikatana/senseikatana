[katanakit-js](../index.md) / NotionBlockSchema

# Variable: NotionBlockSchema

```ts
const NotionBlockSchema: ZodObject<{
  archived: ZodOptional<ZodBoolean>;
  created_time: ZodOptional<ZodString>;
  has_children: ZodOptional<ZodBoolean>;
  id: ZodString;
  last_edited_time: ZodOptional<ZodString>;
  object: ZodLiteral<"block">;
  type: ZodString;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/notion.schema.ts:134](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/notion.schema.ts#L134)

A Notion block object.
