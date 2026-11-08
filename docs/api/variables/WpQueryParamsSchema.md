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

Defined in: [schemas/wordpress.schema.ts:693](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L693)

Common query parameters for WordPress REST API list endpoints.
