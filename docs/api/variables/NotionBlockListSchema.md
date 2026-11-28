[katanakit-js](../index.md) / NotionBlockListSchema

# Variable: NotionBlockListSchema

```ts
const NotionBlockListSchema: ZodObject<{
  block: ZodRecord<ZodString, ZodUnknown>;
  has_more: ZodBoolean;
  next_cursor: ZodNullable<ZodString>;
  object: ZodLiteral<"list">;
  results: ZodArray<ZodObject<{
     archived: ZodOptional<ZodBoolean>;
     created_time: ZodOptional<ZodString>;
     has_children: ZodOptional<ZodBoolean>;
     id: ZodString;
     last_edited_time: ZodOptional<ZodString>;
     object: ZodLiteral<"block">;
     type: ZodString;
  }, $catchall<ZodUnknown>>>;
  type: ZodLiteral<"block">;
}, $loose>;
```

Defined in: [schemas/notion.schema.ts:147](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/notion.schema.ts#L147)

Result of listing block children (paginated).
