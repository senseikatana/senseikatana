[katanakit-js](../index.md) / WpQueryParams

# Type Alias: WpQueryParams

```ts
type WpQueryParams = z.infer<typeof WpQueryParamsSchema>;
```

Defined in: [types/adapters/wordpress.ts:146](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/adapters/wordpress.ts#L146)

Common query parameters for WordPress REST API list endpoints.

Includes field limiting (`_fields: "id,title,link"`) and resource
embedding (`_embed: true | "author,wp:featuredmedia"`).
