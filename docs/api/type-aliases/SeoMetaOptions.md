[katanakit-js](../index.md) / SeoMetaOptions

# Type Alias: SeoMetaOptions

```ts
type SeoMetaOptions = SeoMeta & SeoSocial & {
  lang?: string | null;
  nav?:   | {
     external?: boolean;
     href: string;
     label: string;
   }[]
     | null;
  rss?:   | Partial<{
     description?: string;
     enabled: boolean;
     limit: number;
     path: string;
     title?: string;
   }>
     | null;
  seo?:   | Partial<{
     canonical: boolean;
     jsonLd: boolean;
     noindex: boolean;
     openGraph: boolean;
     twitterCard: boolean;
   }>
     | null;
  site?: string | null;
  siteTitle?: string | null;
};
```

Defined in: [config/seo-meta.types.ts:76](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L76)

Site configuration plus every page metadata field.

## Type Declaration

### lang?

```ts
lang?: string | null;
```

### nav?

```ts
nav?: 
  | {
  external?: boolean;
  href: string;
  label: string;
}[]
  | null;
```

### rss?

```ts
rss?: 
  | Partial<{
  description?: string;
  enabled: boolean;
  limit: number;
  path: string;
  title?: string;
}>
  | null;
```

### seo?

```ts
seo?: 
  | Partial<{
  canonical: boolean;
  jsonLd: boolean;
  noindex: boolean;
  openGraph: boolean;
  twitterCard: boolean;
}>
  | null;
```

### site?

```ts
site?: string | null;
```

### siteTitle?

```ts
siteTitle?: string | null;
```
