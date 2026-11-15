[katanakit-js](../index.md) / NotionUserResponseSchema

# Variable: NotionUserResponseSchema

```ts
const NotionUserResponseSchema: ZodObject<{
  avatar_url: ZodOptional<ZodOptional<ZodString>>;
  bot: ZodOptional<ZodOptional<ZodObject<{
     owner: ZodObject<{
        type: ZodString;
     }, $loose>;
  }, $loose>>>;
  id: ZodOptional<ZodString>;
  name: ZodOptional<ZodOptional<ZodString>>;
  object: ZodOptional<ZodLiteral<"user">>;
  person: ZodOptional<ZodOptional<ZodObject<{
     email: ZodOptional<ZodString>;
  }, $loose>>>;
  type: ZodOptional<ZodEnum<{
     bot: "bot";
     person: "person";
  }>>;
}, $loose>;
```

Defined in: [schemas/notion.schema.ts:275](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/notion.schema.ts#L275)

Single user response (fields may be sparse depending on the endpoint).
