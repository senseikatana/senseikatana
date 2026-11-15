[katanakit-js](../index.md) / NotionSearchQuerySchema

# Variable: NotionSearchQuerySchema

```ts
const NotionSearchQuerySchema: ZodObject<{
  filter: ZodOptional<ZodObject<{
     property: ZodLiteral<"object">;
     value: ZodEnum<{
        database: "database";
        page: "page";
     }>;
  }, $strip>>;
  page_size: ZodOptional<ZodNumber>;
  query: ZodOptional<ZodString>;
  sort: ZodOptional<ZodObject<{
     direction: ZodEnum<{
        ascending: "ascending";
        descending: "descending";
     }>;
     timestamp: ZodLiteral<"last_edited_time">;
  }, $strip>>;
  start_cursor: ZodOptional<ZodString>;
}, $strip>;
```

Defined in: [schemas/notion.schema.ts:235](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/notion.schema.ts#L235)

Search query options for the Notion API.
