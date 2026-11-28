[katanakit-js](../index.md) / SeoTagResult

# Type Alias: SeoTagResult

```ts
type SeoTagResult = SeoMetaOptions & {
  html: string;
  jsonLd?: Record<string, unknown>;
  tags: SeoTagNode[];
};
```

Defined in: [config/seo.service.ts:43](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo.service.ts#L43)

Result of [onSeoMeta](../functions/onSeoMeta.md): `html` / `tags` for the head, plus **one**
flat object of resolved fields (site + HTML + OG + Twitter). No duplicate
`title` / `meta.title` / `config.title`.

- `title` = document title (page)
- `siteTitle` = brand / site name
- `html` / `tags` = what you inject into `<head>`

## Type Declaration

### html

```ts
html: string;
```

### jsonLd?

```ts
jsonLd?: Record<string, unknown>;
```

### tags

```ts
tags: SeoTagNode[];
```
