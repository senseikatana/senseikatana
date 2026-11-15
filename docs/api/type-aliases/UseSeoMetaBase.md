[katanakit-js](../index.md) / UseSeoMetaBase

# Type Alias: UseSeoMetaBase

```ts
type UseSeoMetaBase = SeoMetaInput & {
  lang?: string;
  nav?: {
     external?: boolean;
     href: string;
     label: string;
  }[];
  rss?: Partial<{
     description?: string;
     enabled: boolean;
     limit: number;
     path: string;
     title?: string;
  }>;
  seo?: Partial<{
     canonical: boolean;
     jsonLd: boolean;
     noindex: boolean;
     openGraph: boolean;
     twitterCard: boolean;
  }>;
  site?: string;
  siteTitle?: string;
};
```

Defined in: [config/seo-meta.types.ts:127](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/config/seo-meta.types.ts#L127)

Site + HTML + OG fields in one object (before Omit).

## Type Declaration

### lang?

```ts
lang?: string;
```

Language code (e.g. `"en"`, `"es-ES"`).

### nav?

```ts
nav?: {
  external?: boolean;
  href: string;
  label: string;
}[];
```

#### Type Declaration

### rss?

```ts
rss?: Partial<{
  description?: string;
  enabled: boolean;
  limit: number;
  path: string;
  title?: string;
}>;
```

### seo?

```ts
seo?: Partial<{
  canonical: boolean;
  jsonLd: boolean;
  noindex: boolean;
  openGraph: boolean;
  twitterCard: boolean;
}>;
```

### site?

```ts
site?: string;
```

Site origin / base URL (no trailing slash), e.g. `"https://example.com"`.
Not a title — used for canonical, OG, RSS, and JSON-LD defaults.

### siteTitle?

```ts
siteTitle?: string;
```

Site brand / product name (e.g. `"KatanaKit"`).
Distinct from page [SeoMetaFlat.title](../interfaces/SeoMetaFlat.md#title).
Used as `<title>` suffix (`"Page | Brand"`), `og:site_name`, and RSS feed name.
