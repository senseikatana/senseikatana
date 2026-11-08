[katanakit-js](../index.md) / WpUserCreateSchema

# Variable: WpUserCreateSchema

```ts
const WpUserCreateSchema: ZodObject<{
  acf: ZodOptional<ZodOptional<ZodRecord<ZodString, ZodUnknown>>>;
  description: ZodOptional<ZodString>;
  email: ZodString;
  first_name: ZodOptional<ZodString>;
  last_name: ZodOptional<ZodString>;
  locale: ZodOptional<ZodString>;
  name: ZodString;
  nickname: ZodOptional<ZodString>;
  roles: ZodOptional<ZodArray<ZodString>>;
  slug: ZodString;
  url: ZodString;
  username: ZodString;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:484](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L484)

Payload for creating a WordPress user.
