[katanakit-js](../index.md) / NotionSortSchema

# Variable: NotionSortSchema

```ts
const NotionSortSchema: ZodObject<{
  direction: ZodEnum<{
     ascending: "ascending";
     descending: "descending";
  }>;
  property: ZodOptional<ZodString>;
  timestamp: ZodOptional<ZodEnum<{
     created_time: "created_time";
     last_edited_time: "last_edited_time";
  }>>;
}, $strip>;
```

Defined in: [schemas/notion.schema.ts:191](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/notion.schema.ts#L191)

Sort option for querying a Notion database.
