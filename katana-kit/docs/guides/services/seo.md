---
title: SEO
description: "Site-wide SEO config, per-page metas, canonical and robots control, Open Graph, JSON-LD and RSS autodiscovery — every helper explained."
---

# SEO

`seo.service.ts` is a **pure, framework-agnostic function module**: one flat
object goes in, one flat object comes out, plus `html` and `tags` ready to
inject into `<head>`. Three design rules apply to every function on this page:

1. **HTML, Open Graph and Twitter cards** — the service emits standard HTML
   head tags (`<title>`, `<meta name>`, `<link rel="canonical">`), Open Graph
   (`og:*`, `article:*`) and optional Twitter/X card tags.
2. **One flat input, one flat output** — site fields, page fields, Open Graph
   and Twitter fields live in the same object. The result never duplicates
   `title` / `meta.title` / `config.title`: `title` is the **page** document
   title and `siteTitle` is the **brand**.
3. **No DOM required** — every helper returns strings or plain objects, so the
   same call works in Astro, VitePress, an Express handler, a Bun server or a
   browser SPA. `useApplySeoTag()` is the only function that touches
   `document`, and it no-ops during SSR.

Configuration is **fail-fast**: a full `SiteConfig` must include `seo` and
`rss`, and JavaScript consumers get
`[Seo] SiteConfig.seo is required (caller)` instead of a cryptic `TypeError`.
`nav` stays optional.

The library dogfoods this service: the docs site registers its own config with
[`defineSeoMetaConfig()`](#defineseometaconfigconfig) and feeds
[`useSeoMeta()`](#useseometaopts-defaults) into VitePress'
[`transformHead`](#vitepress-transformhead) (see
[Real use cases](#real-use-cases)).

## Quick example

```ts
import { defineSeoMetaConfig, useSeoMeta } from "katanakit-js";

// 1. Register the site once, at startup.
defineSeoMetaConfig({
  site: "https://myblog.com",
  title: "My Blog",
  description: "Notes on software",
  lang: "en",
  author: "Ada",
  ogImage: "/og.png",
  rss: { enabled: true, path: "/rss.xml", limit: 20 },
  seo: { noindex: false, canonical: true, openGraph: true, twitterCard: false, jsonLd: true },
});

// 2. Ask for per-page metas — only the page fields.
const seo = useSeoMeta({
  title: "Debugging CSS Grid",
  description: "A practical walkthrough",
  canonical: "https://myblog.com/posts/debugging-css-grid/",
  ogType: "article",
  articlePublishedTime: "2026-10-05",
});

seo.title;     // "Debugging CSS Grid | My Blog"
seo.siteTitle; // "My Blog"
seo.canonical; // "https://myblog.com/posts/debugging-css-grid/"
seo.ogImage;   // "https://myblog.com/og.png" — absolutized against site
seo.html;      // serialized <title>, <meta>, <link> and <script> tags
seo.tags;      // SeoTagNode[] — the same nodes, unserialized
```

`siteTitle` is the brand, `title` is the page. The relative
`ogImage: "/og.png"` was absolutized against `site`, and the RSS autodiscovery
link plus the JSON-LD `Article` script are already part of `seo.html`.

## Configure once

### defineSeoMetaConfig(config)

Registers the site-wide SEO config **once** at app startup — the same
`define*Config` pattern used by the HTTP client and the other services. After
the call, every `useSeoMeta(opts)` resolves the omitted site fields against this
config, so pages only pass their own fields.

```ts
import { defineSeoMetaConfig, type SiteConfig } from "katanakit-js";

const site: SiteConfig = defineSeoMetaConfig({
  site: "https://myblog.com",
  title: "My Blog",
  description: "Notes on software, design and shipping",
  lang: "en",
  author: "Ada Lovelace",
  ogImage: "/og/default.png",
  rss: {
    enabled: true,
    path: "/rss.xml",
    title: "My Blog — RSS",
    description: "New posts as they ship",
    limit: 20,
  },
  seo: {
    noindex: false,
    canonical: true,
    openGraph: true,
    twitterCard: true,
    jsonLd: true,
  },
  nav: [
    { label: "Blog", href: "/blog/" },
    { label: "About", href: "/about/" },
    { label: "GitHub", href: "https://github.com/me", external: true },
  ],
});

// `site` is the exact object you passed in — useful for chaining.
```

The function validates both required blocks and throws
`[Seo] SiteConfig.seo is required (defineSeoMetaConfig)` or
`[Seo] SiteConfig.rss is required (defineSeoMetaConfig)` when they are missing.
Calling it again replaces the registration (last call wins); the config is kept
in a module-level pointer, so there are no import side effects.

#### SiteConfig fields

| Field | Type | What it does |
| --- | --- | --- |
| `site` | `string` | Base URL, no trailing slash. Absolutizes canonical, `og:url` and `og:image`, and seeds the JSON-LD `WebSite` URL. |
| `title` | `string` | Brand / site name — **not** the page title. Used as the `<title>` suffix, `og:site_name`, JSON-LD publisher and RSS feed title fallback. |
| `description` | `string` | Default description for pages that omit one. |
| `lang` | `string` | Language code (`"en"`, `"es-ES"`). Returned as-is and mapped to `og:locale` with an underscore (`es_ES`). |
| `author` | `string` | Default author for `<meta name="author">`, `article:author` and JSON-LD. |
| `ogImage` | `string?` | Default share image, absolute or relative to `site`. |
| `twitter` | `string?` | Site account handle; adds `twitter:site` when Twitter cards are enabled. |
| `rss.enabled` | `boolean` | Emits (or omits) the RSS autodiscovery `<link>` in the head. |
| `rss.path` | `string` | Feed route such as `"/rss.xml"`; written verbatim into the link `href`. |
| `rss.title` | `string?` | Feed title; defaults to `title`. |
| `rss.description` | `string?` | Feed description for your generator; carried on the result, not rendered as a tag. |
| `rss.limit` | `number` | Maximum items for your feed generator; not used to build tags. |
| `seo.noindex` | `boolean` | When `true`, forces `robots="noindex, nofollow"` on pages that do not set `robots` explicitly. |
| `seo.canonical` | `boolean` | When `true` (the demo default), emits `<link rel="canonical">` from the resolved page URL even without an explicit `canonical`. |
| `seo.openGraph` | `boolean` | When `false`, strips every `og:*` and `article:*` tag from the result. |
| `seo.twitterCard` | `boolean` | Enables Twitter/X card tags; card size defaults to large-image when a share image exists. |
| `seo.jsonLd` | `boolean` | When `true`, appends a JSON-LD `<script>` (`WebSite` or `Article`). |
| `nav` | `Array?` | Optional `{ label, href, external }` list. Copied to the result untouched, so layout components can read navigation from the same object. |

### useSeoMetaConfig()

Returns the registered `SiteConfig`, or the bundled **demo defaults**
(`siteConfig`: `https://example.com`, "My Site", RSS enabled,
canonical/openGraph/jsonLd on) when [`defineSeoMetaConfig()`](#defineseometaconfigconfig)
was never called.

```ts
import { useSeoMetaConfig } from "katanakit-js";

const { site, title, lang, nav } = useSeoMetaConfig();
```

Use it in components that need the active site values (footers, feed
generators, sitemap builders) without hard-coding them twice.

### useResetSeoMetaConfig()

Clears the registration and restores the demo defaults. Intended for tests;
call it in `afterEach` so one test cannot leak config into another.

```ts
import { afterEach, describe, it } from "vitest";
import {
  defineSeoMetaConfig, useResetSeoMetaConfig, useSeoMeta, useSeoMetaConfig,
} from "katanakit-js";

afterEach(() => useResetSeoMetaConfig());

describe("page metas", () => {
  it("uses the registered brand", () => {
    defineSeoMetaConfig({ ...useSeoMetaConfig(), title: "Test Site" });
    expect(useSeoMeta({ title: "Post" }).title).toBe("Post | Test Site");
  });
});
```

### Overriding per call

`useSeoMeta(opts, defaults?)` takes an explicit second argument. It **still
wins** over the registered config, so per-request overrides and isolated tests
stay possible:

```ts
import { useSeoMeta, useSeoMetaConfig } from "katanakit-js";

const preview = useSeoMeta(
  { title: "Preview" },
  {
    ...useSeoMetaConfig(),
    site: "https://preview.myblog.com",
    seo: { ...useSeoMetaConfig().seo, noindex: true },
  },
);
```

The first object can also override site fields per key (`site`, `siteTitle`,
`lang`, `rss`, `seo`, `nav`); anything omitted falls back to the second
argument, and then to the bundled demo defaults.

::: warning `SiteConfig` is fail-fast: `seo` and `rss` are required

`UseSeoMetaOptions` accepts partial `seo` / `rss` because the defaults fill the
gaps — but a full `SiteConfig` (your registered config or the `defaults` you
pass to `useSeoMeta`) must include complete `seo` and `rss` blocks.
`defineSeoMetaConfig`, `useSeoTag`, `useGenerateMetaTags`, `useHeadTags`,
`useRssHeadLink` and the `useSeoMeta` defaults throw
`[Seo] SiteConfig.seo is required (caller)` /
`[Seo] SiteConfig.rss is required (caller)` instead of crashing later with
`Cannot read properties of undefined`.

:::

```ts
import { siteConfig, type SiteConfig } from "katanakit-js";

// Minimal valid config: spread the demo defaults so seo + rss travel along.
const config: SiteConfig = { ...siteConfig, site: "https://myblog.com", title: "My Blog" };
```

## Per-page metas

### useSeoMeta(opts, defaults?)

The workhorse: merges the flat page options with the site config, resolves the
Open Graph defaults and returns the flat fields plus `html` (the serialized
head fragment) and `tags` (the structured nodes).

```ts
import { useSeoMeta, type UseSeoMetaOptions } from "katanakit-js";

const seo = useSeoMeta({
  title: "My Post",
  description: "A great post",
  ogType: "article",
  canonical: "https://myblog.com/posts/my-post/",
  ogImage: { url: "/covers/my-post.png", width: 1200, height: 630, alt: "Post cover" },
} satisfies UseSeoMetaOptions);

// Narrow the type when a page never passes certain site keys:
useSeoMeta({ title: "Home" } as UseSeoMetaOptions<"rss" | "nav">);
```

Calling `useSeoMeta()` with `null` / a non-object throws
`[Seo] useSeoMeta(opts) is required (received empty options).`

#### Site fields (usually configured once)

| Key | Type | Notes |
| --- | --- | --- |
| `site` | `string` | Base URL; overrides the registered one for this call. |
| `siteTitle` | `string` | Brand override. Also seeds `og:site_name` and the `<title>` suffix. |
| `lang` | `string` | Language override; drives `og:locale`. |
| `rss` | `Partial<...>` | Per-page RSS overrides (`enabled`, `path`, `title`, `description`, `limit`). |
| `seo` | `Partial<...>` | Per-page flags (`noindex`, `canonical`, `openGraph`, `jsonLd`). |
| `nav` | `Array` | Copied to the result untouched. |

#### HTML fields

| Key | Type | Notes |
| --- | --- | --- |
| `title` | `string` | Page title; combined with the brand as "Page \| Brand". |
| `description` | `string` | `<meta name="description">` and default `og:description`. |
| `keywords` | `string` | Legacy `<meta name="keywords">`. |
| `author` | `string` | `<meta name="author">`; also the JSON-LD author fallback. |
| `canonical` | `string` | Explicit `<link rel="canonical">`; beats the auto-resolved URL. |
| `url` | `string` | Page URL fallback. Resolution order: `ogUrl` → `canonical` → `url` → `site`. |
| `charset` | `string` | Emits `<meta charset="...">`. |
| `viewport` | `string` or `object` | A string is written verbatim; an object becomes `width=device-width, initial-scale=1` (camelCase keys are kebab-cased). |
| `robots` | `string` or `object` | String verbatim, or an object of directives (see [Canonical and robots](#canonical-and-robots)). |

#### Open Graph fields

| Key | Type | Notes |
| --- | --- | --- |
| `ogTitle` | `string` | Defaults to the resolved `title`. |
| `ogDescription` | `string` | Defaults to `description`. |
| `ogUrl` | `string` | Defaults to the resolved page URL. |
| `ogType` | `string` | `"website"` (default), `"article"`, `"profile"` or a custom type. |
| `ogLocale` | `string` | Defaults to `lang` with `-` replaced by `_`. |
| `ogSiteName` | `string` | Defaults to the brand; a string value here also seeds the brand when `siteTitle` is absent. |
| `ogImage` | `string`, `SeoOgImageObject` or array | Absolute or relative URL, or an object with `url`, `secureUrl`, `type`, `width`, `height`, `alt`. |
| `ogImageUrl` | `string` | Fallback alias used to resolve the `ogImage` field when `ogImage` is not a plain URL. |
| `ogImageSecureUrl` | `string` | Scalar variant of `og:image:secure_url`. |
| `ogImageType` | `string` | Scalar variant of `og:image:type`. |
| `ogImageWidth` | `string` or `number` | Scalar variant of `og:image:width`. |
| `ogImageHeight` | `string` or `number` | Scalar variant of `og:image:height`. |
| `ogImageAlt` | `string` | Scalar variant of `og:image:alt`. |

#### Twitter/X card fields

Twitter cards are disabled unless `seo.twitterCard` is `true`. When enabled,
the card defaults to `summary_large_image` if a resolved share image exists,
otherwise `summary`. Title, description and image inherit their Open Graph
counterparts unless overridden.

| Key | Type | Notes |
| --- | --- | --- |
| `twitterCard` | `"summary" \| "summary_large_image"` | Per-page card layout override. |
| `twitterTitle` | `string` | Overrides the resolved Open Graph/page title. |
| `twitterDescription` | `string` | Overrides the resolved Open Graph/page description. |
| `twitterImage` | `string` | Absolute or site-relative image URL. |
| `twitterImageAlt` | `string` | Image alt text; falls back to `ogImageAlt` or the Open Graph image object's `alt`. |
| `twitterSite` | `string` | Site handle such as `"@katanakit"`; otherwise `SiteConfig.twitter` is used. |
| `twitterCreator` | `string` | Optional creator handle. |

#### Article extensions

Conventionally passed together with `ogType: "article"`; they render as
`article:*` properties and feed the JSON-LD `Article` object.

| Key | Type | Notes |
| --- | --- | --- |
| `articleAuthor` | `string[]` | Each entry becomes `article:author`; the first one is the JSON-LD author. |
| `articlePublishedTime` | `string` | `article:published_time` and JSON-LD `datePublished`. |
| `articleModifiedTime` | `string` | `article:modified_time`; JSON-LD `dateModified` falls back to the published time. |
| `articleSection` | `string` | `article:section`. |
| `articleTag` | `string[]` | Each entry becomes `article:tag`. |

#### How merging works

1. Explicit `opts` fields win over the registered config; the registered config
   wins over the bundled demo defaults.
2. `title` is composed once: `"Page | Brand"` when they differ, `"Brand"` when
   the page omits a title or repeats the brand, and left untouched when the
   page title already ends with `" | Brand"`.
3. `description`, `author`, `ogImage` and the canonical URL fall back to the
   config values.
4. Open Graph defaults are derived from the resolved page fields: `ogTitle`
   from `title`, `ogDescription` from `description`, `ogUrl` from the URL,
   `ogSiteName` from the brand, `ogLocale` from `lang`, `ogType` from
   `"website"`.
5. Relative `ogImage` values (`"/og.png"`) are absolutized against `site`;
   absolute `http(s)` URLs pass through.

```ts
useSeoMeta({ title: "About" }).title;           // "About | My Blog"
useSeoMeta({ title: "My Blog" }).title;         // "My Blog" — no suffix
useSeoMeta({}).title;                           // "My Blog" — brand fallback
useSeoMeta({ title: "About | My Blog" }).title; // already suffixed, untouched
```

#### Canonical and robots

With `seo.canonical: true` (the demo default) the resolved page URL is emitted
as `<link rel="canonical">` even when the page does not pass `canonical`; an
explicit `canonical` always wins. Set `seo.canonical: false` to emit the link
only when the page passes one.

```ts
const { canonical } = useSeoMeta({
  title: "Deploy notes",
  url: "https://myblog.com/deploy-notes/",
});
// canonical === "https://myblog.com/deploy-notes/"
```

`robots` accepts a raw string or an object that is serialized in directive
order — `index`, `follow`, `noindex`, `nofollow`, `none`, `noarchive`,
`nosnippet` — accepting `true`, `"true"`, `1` or `"1"` as truthy values.
`seo.noindex: true` forces `"noindex, nofollow"` only when the page does not
set `robots` itself, so a page can always override the global stance.

```ts
useSeoMeta({
  title: "Staging draft",
  robots: { noindex: true, nofollow: true, noarchive: true },
}).robots; // "noindex, nofollow, noarchive"
```

#### Article pages and JSON-LD

When `seo.jsonLd` is enabled, `useSeoMeta` appends a
`<script type="application/ld+json">` node built from the resolved fields:
`Article` for `ogType: "article"` (headline, description, author, publisher,
dates, image and `mainEntityOfPage`), `WebSite` otherwise. The serialized JSON
escapes `<`, `>` and `&` so it cannot break out of the script element.

```ts
const seo = useSeoMeta({
  title: "Shipping v6",
  description: "Release notes for v6",
  canonical: "https://myblog.com/releases/v6/",
  ogType: "article",
  articleAuthor: ["Ada Lovelace"],
  articlePublishedTime: "2026-10-01",
  articleModifiedTime: "2026-10-05",
  articleTag: ["release", "changelog"],
});

seo.tags.some((tag) => tag.tag === "script"); // true — the JSON-LD node
seo.jsonLd?.["@type"]; // "Article"
```

Disable it globally with `seo: { jsonLd: false }` in the registered config or
per page. The same switch controls the `jsonLd` field on the result.

#### Turning Open Graph off

`seo.openGraph: false` removes every `og:*` / `article:*` key before the tags
are flattened. The HTML essentials survive:

```ts
import { siteConfig, useSeoMeta } from "katanakit-js";

const seo = useSeoMeta(
  { title: "Internal doc", ogTitle: "Ignored" },
  { ...siteConfig, seo: { ...siteConfig.seo, openGraph: false } },
);

seo.ogTitle; // undefined
seo.title;   // "Internal doc | My Site"
```

#### The return shape

`SeoTagResult` extends `UseSeoMetaOptions` with the serialized output, so the
resolved fields and the head payload arrive in a single object:

| Field | Type | Use it when |
| --- | --- | --- |
| resolved fields | `UseSeoMetaOptions` | Read `title`, `description`, `canonical`, `ogImage`, `robots`, `lang`, the `seo` flags and `nav` without re-deriving them. |
| `html` | `string` | Injecting the whole head fragment at once (SSR templates, Astro, Express). |
| `tags` | `SeoTagNode[]` | The framework wants structured nodes (VitePress `transformHead`, custom serializers). |
| `jsonLd` | `Record<string, unknown>?` | Consuming the structured data separately (API responses, tests). |

```ts
const { html, tags, jsonLd, title, siteTitle } = useSeoMeta({ title: "Home" });

tags[0]; // { tag: "title", text: "Home | My Blog" }
```

#### Exported types

| Type | Shape |
| --- | --- |
| `UseSeoMetaOptions<OmitKeys?>` | Input object — every key optional; the generic removes site keys you never pass. |
| `UseSeoMetaBase` | The full input before the generic `Omit`. |
| `SeoMetaFlat` / `SeoMetaInput` | HTML + Open Graph + article fields (`SeoMetaInput` allows `null` values). |
| `SeoMetaArticle` | The `article*` extension fields. |
| `SeoOgImageObject` | `{ url?, secureUrl?, type?, width?, height?, alt? }`. |
| `SeoRobotsObject` | Boolean-able directives: `index`, `follow`, `noindex`, `nofollow`, `none`, `noarchive`, `nosnippet`. |
| `SeoArrayable<T>` / `SeoBooleanable` | List and boolean-ish helpers used by the fields above. |
| `SeoTagNode` | `{ tag, attrs?, text? }` where `tag` is `"title"`, `"meta"`, `"link"` or `"script"`. |
| `SeoTagResult` | Resolved flat fields + `html`, `tags`, optional `jsonLd`. |
| `SiteConfig` | The registered config shape. |
| `SeoMeta` / `SeoTagsResult` | Deprecated legacy aliases. |

## Utilities

### useHeadTags(config, meta)

One-shot alternative to registering a config: returns the **full `<head>`
HTML** (meta + RSS link) for a config object you already hold. It accepts both
the flat `SeoMetaInput` and the legacy `SeoMeta` shape — the legacy path is
detected by the presence of `publishedTime`, `modifiedTime`, `noindex` or a
legacy `tags` array (when `articleTag` is absent).

```ts
import { siteConfig, useHeadTags } from "katanakit-js";

const html = useHeadTags(siteConfig, {
  title: "Changelog",
  description: "Every release, in one page",
  canonical: "https://example.com/changelog/",
  viewport: "width=device-width, initial-scale=1",
  robots: { index: true, follow: true },
});
```

Because `siteConfig.rss.enabled` is `true` in the demo defaults, the result
also carries `<link rel="alternate" type="application/rss+xml">`.

### useGenerateMetaTags(config, meta)

Same idea, but **meta tags only**: the RSS autodiscovery link is disabled
internally and `rel="alternate"` links are filtered out. It takes the legacy
`SeoMeta` shape and asserts both `seo` and `rss` blocks.

```ts
import { siteConfig, useGenerateMetaTags } from "katanakit-js";

const metaHtml = useGenerateMetaTags(siteConfig, {
  title: "Checkout",
  description: "Complete your purchase",
  noindex: true,
});
// <title>Checkout | My Site</title> + metas, no RSS <link>
```

Prefer `useSeoMeta(...).html` for new code; this helper exists for migrations
from the legacy API.

### useTitle(config, pageTitle?)

Returns only the escaped `<title>` element — no metas, no canonical, no RSS.
Use it when your framework owns the rest of the head. Throws
`[Seo] SiteConfig is required (useTitle received empty config).` when `config`
is not an object.

```ts
import { siteConfig, useTitle } from "katanakit-js";

useTitle(siteConfig);            // <title>My Site</title>
useTitle(siteConfig, "About");   // <title>About | My Site</title>
useTitle(siteConfig, "My Site"); // <title>My Site</title> — no suffix
```

Unlike `useSeoMeta`, `useTitle` always appends the suffix when the titles
differ — it does not check whether `pageTitle` is already suffixed — and it
escapes `&`, `<` and `>` in the text.

### useRssHeadLink(config)

Returns the standalone RSS autodiscovery element, or `""` when
`rss.enabled` is `false`. `path` defaults to `"/rss.xml"` and `title` defaults
to `config.title`.

```ts
import { siteConfig, useRssHeadLink } from "katanakit-js";

useRssHeadLink(siteConfig);
// <link rel="alternate" type="application/rss+xml" title="My Site" href="/rss.xml" />
```

Use it when you render the rest of the head by hand but still want feed readers
to discover the feed.

### useApplySeoTag(seo, head?)

Applies a `SeoTagResult` to a DOM head (Vanilla / SPA). It removes every node
marked with `data-katanakit-seo` from a previous call, then appends the fresh
`tags`, marking them with the same attribute. Defaults to `document.head`;
when `document` is unavailable it is a no-op, so it is safe to call from shared
code.

```ts
import { useApplySeoTag, useSeoMeta } from "katanakit-js";

function renderPageMeta() {
  useApplySeoTag(useSeoMeta({ title: "Dashboard" }));
}
```

On the server, keep using `seo.html` / `seo.tags`; this helper is only for
client-side navigation.

### useSeoTag(config, meta) — deprecated

The legacy entry point: `useSeoTag(siteConfig, { title, description, ... })`.
It still works and maps the old `SeoMeta` shape onto `useSeoMeta` — notably
`publishedTime` → `articlePublishedTime`, `modifiedTime` →
`articleModifiedTime`, `tags` → `articleTag`, `url` → `url` + `ogUrl`, and
`noindex` → `robots: "noindex, nofollow"`. `useSeoTags` is an alias.

```ts
import { siteConfig, useSeoTag } from "katanakit-js";

// Deprecated — legacy shape and positional config.
const { html } = useSeoTag(siteConfig, {
  title: "My Post",
  description: "A great post",
  ogType: "article",
  publishedTime: "2026-10-01",
  modifiedTime: "2026-10-05",
  tags: ["css", "grid"],
  noindex: false,
});
```

Migrate to the registered-config pattern and the flat object:

```ts
// Before (deprecated)
useSeoTag(config, { title: "Post", publishedTime: "2026-10-01", tags: ["css"] });

// After
defineSeoMetaConfig(config);
useSeoMeta({
  title: "Post",
  ogType: "article",
  articlePublishedTime: "2026-10-01",
  articleTag: ["css"],
});
```

The new API drops the positional `config` argument entirely: register once with
[`defineSeoMetaConfig()`](#defineseometaconfigconfig), then pass only page
fields. `useSeoTag` remains exported for backward compatibility but receives no
new features.

## Real use cases

### Astro: render the head fragment

Register the config in a shared module, then let a layout call `useSeoMeta`
per page and render `seo.html` with a Fragment. Astro owns the static head
tags, the service owns the dynamic ones.

```astro
---
// src/layouts/BaseLayout.astro
import { useSeoMeta } from "katanakit-js";

interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;

const seo = useSeoMeta({
  title,
  description,
  canonical: Astro.url.href,
  ogUrl: Astro.url.href,
  ogType: "website",
});
---

<!doctype html>
<html lang={seo.lang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <Fragment set:html={seo.html} />
  </head>
  <body>
    <slot />
  </body>
</html>
```

### VitePress: `transformHead`

This is the exact pattern the KatanaKit docs use: register once at module
scope, then map the `tags` array to VitePress `HeadConfig` tuples inside
`transformHead`. VitePress already owns `<title>`, so the `title` node is
skipped. Open Graph and Twitter/X cards are emitted by the same helper call.

```ts
// docs/.vitepress/config.ts
import { defineConfig, type HeadConfig } from "vitepress";
import { defineSeoMetaConfig, useSeoMeta } from "katanakit-js";

defineSeoMetaConfig({
  site: "https://docs.example.com",
  title: "My Docs",
  description: "Documentation for My Project",
  lang: "en",
  author: "My Team",
  ogImage: "https://docs.example.com/og.png",
  rss: { enabled: false, path: "/rss.xml", limit: 20 },
  seo: { noindex: false, canonical: true, openGraph: true, twitterCard: false, jsonLd: false },
});

export default defineConfig({
  // …site config…

  transformHead({ pageData, title }) {
    const { tags } = useSeoMeta({
      title,
      description: pageData.description || "Documentation for My Project",
      keywords: "docs, my project",
      viewport: "width=device-width, initial-scale=1.0",
      canonical: `https://docs.example.com/${pageData.relativePath}`,
      ogUrl: `https://docs.example.com/${pageData.relativePath}`,
    });

    const head: HeadConfig[] = [];
    for (const node of tags) {
      // VitePress already owns <title>; everything else is injected here.
      if (node.tag === "title") continue;
      head.push([node.tag, node.attrs ?? {}, node.text ?? ""]);
    }

    return head;
  },
});
```

### Express and SSR: inject into a template

Server-render the head fragment and splice it into an HTML placeholder. The
helper is pure, so there is no shared state to worry about between requests.

```ts
import express from "express";
import { defineSeoMetaConfig, useSeoMeta } from "katanakit-js";

defineSeoMetaConfig({
  site: "https://myblog.com",
  title: "My Blog",
  description: "Notes on software",
  lang: "en",
  author: "Ada",
  ogImage: "/og.png",
  rss: { enabled: true, path: "/rss.xml", limit: 20 },
  seo: { noindex: false, canonical: true, openGraph: true, twitterCard: false, jsonLd: true },
});

const app = express();

const template = `<!doctype html>
<html>
  <head><!--seo--></head>
  <body><div id="app"></div></body>
</html>`;

app.get("/posts/:slug", async (req, res) => {
  const post = await findPost(req.params.slug);
  if (!post) return res.status(404).send("Not found");

  const seo = useSeoMeta({
    title: post.title,
    description: post.excerpt,
    canonical: `https://myblog.com/posts/${post.slug}/`,
    ogType: "article",
    articlePublishedTime: post.publishedAt,
  });

  res.type("html").send(template.replace("<!--seo-->", seo.html));
});
```

### RSS autodiscovery

When `rss.enabled` is `true`, `useSeoMeta` appends the discovery link to
`tags` automatically, so feed readers and browsers can find the feed from any
page:

```html
<link rel="alternate" type="application/rss+xml" title="My Blog" href="/rss.xml" />
```

If a framework renders the head without the fragment, call
[`useRssHeadLink()`](#userssheadlinkconfig) with the same config and inject the
result yourself. Generating the feed body is a separate concern — see
[RSS](/guides/services/rss).

## Related

- [Astro adapter](/guides/services/astro-adapter) — the Astro-specific entry points, including SEO re-exports.
- [RSS](/guides/services/rss) — build the feed body that the autodiscovery link points to.
- [NestJS adapter](/guides/nestjs) — wire the toolkit into a Nest application.
- [API Reference](/api/) — every export, generated from source.
