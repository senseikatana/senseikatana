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

Defined in: [schemas/notion.schema.ts:134](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/notion.schema.ts#L134)

A Notion block object.
