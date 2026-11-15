[katanakit-js](../index.md) / NotionBlockResponseSchema

# Variable: NotionBlockResponseSchema

```ts
const NotionBlockResponseSchema: ZodObject<{
  archived: ZodOptional<ZodOptional<ZodBoolean>>;
  created_time: ZodOptional<ZodOptional<ZodString>>;
  has_children: ZodOptional<ZodOptional<ZodBoolean>>;
  id: ZodOptional<ZodString>;
  last_edited_time: ZodOptional<ZodOptional<ZodString>>;
  object: ZodOptional<ZodLiteral<"block">>;
  type: ZodOptional<ZodString>;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/notion.schema.ts:269](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/notion.schema.ts#L269)

Single block response (fields may be sparse depending on the endpoint).
