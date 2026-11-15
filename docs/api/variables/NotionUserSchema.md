[katanakit-js](../index.md) / NotionUserSchema

# Variable: NotionUserSchema

```ts
const NotionUserSchema: ZodObject<{
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
}, $loose>;
```

Defined in: [schemas/notion.schema.ts:216](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/notion.schema.ts#L216)

A Notion user object.
