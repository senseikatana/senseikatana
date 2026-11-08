[katanakit-js](../index.md) / SeoBooleanable

# Type Alias: SeoBooleanable

```ts
type SeoBooleanable = boolean | "true" | "false" | "" | 0 | 1;
```

Defined in: [config/seo-meta.types.ts:11](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L11)

Slim SEO types: typical HTML meta + Open Graph (Facebook) only.
CamelCase keys map to `<title>` / `<meta>` / `<link rel="canonical">`.

Naming cheat-sheet for [UseSeoMetaOptions](UseSeoMetaOptions.md):
- `site` = base URL (`https://example.com`)
- `siteTitle` = brand / site name (`"My Site"`)
- `title` = **page** document title (`"Blog Post"` → often `"Blog Post | My Site"`)
