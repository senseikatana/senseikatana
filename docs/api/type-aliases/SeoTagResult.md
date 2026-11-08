[katanakit-js](../index.md) / SeoTagResult

# Type Alias: SeoTagResult

```ts
type SeoTagResult = UseSeoMetaOptions & {
  html: string;
  jsonLd?: Record<string, unknown>;
  tags: SeoTagNode[];
};
```

Defined in: [config/seo.service.ts:33](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo.service.ts#L33)

Result of [useSeoMeta](../functions/useSeoMeta.md): `html` / `tags` for the head, plus **one**
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
optional jsonLd?: Record<string, unknown>;
```

### tags

```ts
tags: SeoTagNode[];
```
