[katanakit-js](../index.md) / WpUserSchema

# Variable: WpUserSchema

```ts
const WpUserSchema: ZodObject<{
  acf: ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
  avatar_urls: ZodRecord<ZodString, ZodString>;
  capabilities: ZodRecord<ZodString, ZodBoolean>;
  description: ZodString;
  email: ZodString;
  extra_capabilities: ZodRecord<ZodString, ZodBoolean>;
  first_name: ZodString;
  id: ZodNumber;
  last_name: ZodString;
  link: ZodString;
  locale: ZodString;
  meta: ZodRecord<ZodString, ZodUnknown>;
  name: ZodString;
  nickname: ZodString;
  registered_date: ZodString;
  roles: ZodArray<ZodString>;
  slug: ZodString;
  url: ZodString;
  username: ZodString;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:459](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/wordpress.schema.ts#L459)

A WordPress user.
