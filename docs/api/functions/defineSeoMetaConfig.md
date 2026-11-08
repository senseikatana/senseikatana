[katanakit-js](../index.md) / defineSeoMetaConfig

# Function: defineSeoMetaConfig()

```ts
function defineSeoMetaConfig(config): SiteConfig;
```

Defined in: [config/seo.service.ts:146](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo.service.ts#L146)

Registers the site-wide SEO config once — the same `define*Config` pattern
used by the HTTP client and the other services.

After the call, every `useSeoMeta(opts)` resolves against this config, so
pages only pass their own fields. An explicit second argument still wins, so
per-call overrides and tests stay possible.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`SiteConfig`](../interfaces/SiteConfig.md) | The site config (same shape the docs site uses). |

## Returns

[`SiteConfig`](../interfaces/SiteConfig.md)

The same config, for chaining or reference.

## Throws

When required blocks (`seo`, `rss`) are missing.

## Example

```ts
import { defineSeoMetaConfig, useSeoMeta } from "katanakit-js";

defineSeoMetaConfig({
  site: "https://myblog.com",
  title: "My Blog",
  description: "Notes on software",
  lang: "en",
  author: "Ada",
  ogImage: "https://myblog.com/og.png",
  rss: { enabled: true, path: "/rss.xml", limit: 20 },
  seo: { noindex: false, canonical: true, openGraph: true, twitterCard: true, jsonLd: true },
});

const seo = useSeoMeta({ title: "My Post", description: "A great post" });
// seo.site === "https://myblog.com", seo.html / seo.tags ready for <head>
```
