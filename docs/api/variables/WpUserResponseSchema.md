[katanakit-js](../index.md) / WpUserResponseSchema

# Variable: WpUserResponseSchema

```ts
const WpUserResponseSchema: ZodObject<{
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
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:531](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/wordpress.schema.ts#L531)

User response variant (partials via `_fields` stay well-typed).
