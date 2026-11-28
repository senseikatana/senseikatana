[katanakit-js](../index.md) / WpQueryParamsSchema

# Variable: WpQueryParamsSchema

```ts
const WpQueryParamsSchema: ZodObject<{
  _embed: ZodOptional<ZodUnion<readonly [ZodBoolean, ZodString]>>;
  _fields: ZodOptional<ZodString>;
  author: ZodOptional<ZodUnion<readonly [ZodNumber, ZodArray<ZodNumber>]>>;
  categories: ZodOptional<ZodUnion<readonly [ZodNumber, ZodArray<ZodNumber>]>>;
  exclude: ZodOptional<ZodArray<ZodNumber>>;
  include: ZodOptional<ZodArray<ZodNumber>>;
  offset: ZodOptional<ZodNumber>;
  order: ZodOptional<ZodEnum<{
     asc: "asc";
     desc: "desc";
  }>>;
  orderby: ZodOptional<ZodString>;
  page: ZodOptional<ZodNumber>;
  per_page: ZodOptional<ZodNumber>;
  search: ZodOptional<ZodString>;
  slug: ZodOptional<ZodString>;
  status: ZodOptional<ZodUnion<readonly [ZodString, ZodArray<ZodString>]>>;
  tags: ZodOptional<ZodUnion<readonly [ZodNumber, ZodArray<ZodNumber>]>>;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:684](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/wordpress.schema.ts#L684)

Common query parameters for WordPress REST API list endpoints.
