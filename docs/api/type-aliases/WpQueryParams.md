[katanakit-js](../index.md) / WpQueryParams

# Type Alias: WpQueryParams

```ts
type WpQueryParams = z.infer<typeof WpQueryParamsSchema>;
```

Defined in: [types/adapters/wordpress.ts:146](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/types/adapters/wordpress.ts#L146)

Common query parameters for WordPress REST API list endpoints.

Includes field limiting (`_fields: "id,title,link"`) and resource
embedding (`_embed: true | "author,wp:featuredmedia"`).
