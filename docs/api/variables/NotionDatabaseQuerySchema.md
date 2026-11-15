[katanakit-js](../index.md) / NotionDatabaseQuerySchema

# Variable: NotionDatabaseQuerySchema

```ts
const NotionDatabaseQuerySchema: ZodObject<{
  filter: ZodOptional<ZodType<NotionFilter, unknown, $ZodTypeInternals<NotionFilter, unknown>>>;
  page_size: ZodOptional<ZodNumber>;
  sorts: ZodOptional<ZodArray<ZodObject<{
     direction: ZodEnum<{
        ascending: "ascending";
        descending: "descending";
     }>;
     property: ZodOptional<ZodString>;
     timestamp: ZodOptional<ZodEnum<{
        created_time: "created_time";
        last_edited_time: "last_edited_time";
     }>>;
  }, $strip>>>;
  start_cursor: ZodOptional<ZodString>;
}, $strip>;
```

Defined in: [schemas/notion.schema.ts:198](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/notion.schema.ts#L198)

Query options for a Notion database.
