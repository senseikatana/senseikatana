[katanakit-js](../index.md) / WpQueryParams

# Type Alias: WpQueryParams

```ts
type WpQueryParams = z.infer<typeof WpQueryParamsSchema>;
```

Defined in: [types/adapters/wordpress.ts:146](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L146)

Common query parameters for WordPress REST API list endpoints.

Includes field limiting (`_fields: "id,title,link"`) and resource
embedding (`_embed: true | "author,wp:featuredmedia"`).
