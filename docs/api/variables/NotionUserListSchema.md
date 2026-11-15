[katanakit-js](../index.md) / NotionUserListSchema

# Variable: NotionUserListSchema

```ts
const NotionUserListSchema: ZodObject<{
  has_more: ZodBoolean;
  next_cursor: ZodNullable<ZodString>;
  object: ZodLiteral<"list">;
  results: ZodArray<ZodObject<{
     avatar_url: ZodOptional<ZodString>;
     bot: ZodOptional<ZodObject<{
        owner: ZodObject<{
           type: ZodString;
        }, $loose>;
     }, $loose>>;
     id: ZodString;
     name: ZodOptional<ZodString>;
     object: ZodLiteral<"user">;
     person: ZodOptional<ZodObject<{
        email: ZodOptional<ZodString>;
     }, $loose>>;
     type: ZodEnum<{
        bot: "bot";
        person: "person";
     }>;
  }, $loose>>;
}, $loose>;
```

Defined in: [schemas/notion.schema.ts:227](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/notion.schema.ts#L227)

Paginated list of Notion users.
