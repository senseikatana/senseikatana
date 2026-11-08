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

Defined in: [schemas/notion.schema.ts:191](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/notion.schema.ts#L191)

Sort option for querying a Notion database.
