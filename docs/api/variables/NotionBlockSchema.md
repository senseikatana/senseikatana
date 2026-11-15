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

Defined in: [schemas/notion.schema.ts:134](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/notion.schema.ts#L134)

A Notion block object.
