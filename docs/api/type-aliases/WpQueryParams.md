[katanakit-js](../index.md) / WpQueryParams

# Type Alias: WpQueryParams

```ts
type WpQueryParams = z.infer<typeof WpQueryParamsSchema>;
```

Defined in: [types/wordpress/types.ts:146](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L146)

Common query parameters for WordPress REST API list endpoints.

Includes field limiting (`_fields: "id,title,link"`) and resource
embedding (`_embed: true | "author,wp:featuredmedia"`).
