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

Defined in: [schemas/notion.schema.ts:275](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/notion.schema.ts#L275)

Single user response (fields may be sparse depending on the endpoint).
