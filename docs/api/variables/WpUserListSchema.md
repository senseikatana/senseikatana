[katanakit-js](../index.md) / WpUserListSchema

# Variable: WpUserListSchema

```ts
const WpUserListSchema: ZodArray<ZodObject<{
  acf: ZodOptional<ZodOptional<ZodRecord<ZodString, ZodUnknown>>>;
  avatar_urls: ZodOptional<ZodRecord<ZodString, ZodString>>;
  capabilities: ZodOptional<ZodRecord<ZodString, ZodBoolean>>;
  description: ZodOptional<ZodString>;
  email: ZodOptional<ZodString>;
  extra_capabilities: ZodOptional<ZodRecord<ZodString, ZodBoolean>>;
  first_name: ZodOptional<ZodString>;
  id: ZodOptional<ZodNumber>;
  last_name: ZodOptional<ZodString>;
  link: ZodOptional<ZodString>;
  locale: ZodOptional<ZodString>;
  meta: ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
  name: ZodOptional<ZodString>;
  nickname: ZodOptional<ZodString>;
  registered_date: ZodOptional<ZodString>;
  roles: ZodOptional<ZodArray<ZodString>>;
  slug: ZodOptional<ZodString>;
  url: ZodOptional<ZodString>;
  username: ZodOptional<ZodString>;
}, $catchall<ZodUnknown>>>;
```

Defined in: [schemas/wordpress.schema.ts:534](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/wordpress.schema.ts#L534)

List of users.
