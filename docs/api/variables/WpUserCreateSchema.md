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

Defined in: [schemas/wordpress.schema.ts:484](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/wordpress.schema.ts#L484)

Payload for creating a WordPress user.
