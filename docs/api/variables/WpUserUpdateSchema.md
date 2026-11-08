[katanakit-js](../index.md) / WpUserUpdateSchema

# Variable: WpUserUpdateSchema

```ts
const WpUserUpdateSchema: ZodObject<{
  acf: ZodOptional<ZodOptional<ZodRecord<ZodString, ZodUnknown>>>;
  description: ZodOptional<ZodString>;
  email: ZodOptional<ZodString>;
  first_name: ZodOptional<ZodString>;
  last_name: ZodOptional<ZodString>;
  locale: ZodOptional<ZodString>;
  name: ZodOptional<ZodString>;
  nickname: ZodOptional<ZodString>;
  password: ZodOptional<ZodString>;
  roles: ZodOptional<ZodArray<ZodString>>;
  slug: ZodOptional<ZodString>;
  url: ZodOptional<ZodString>;
  username: ZodOptional<ZodString>;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:503](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L503)

Payload for updating a WordPress user.
