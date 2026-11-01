---
title: RSS
description: "RSS 2.0 across the toolkit: Astro feed endpoints, head autodiscovery and YouTube channel feed helpers — every function explained."
---

# RSS

RSS in KatanaKit is **not a singleton core service**. There is no `RssService`
class and no `getInstance()` call: the surface is split into three independent
pieces that share one set of types.

- **Astro endpoints** — `useAstroGenerateRss()`, `useAstroRssLinkTag()`,
  `useAstroCreateRssEndpoint()` and `useAstroCreateRssEndpointFromConfig()` build
  the RSS 2.0 XML, the `<head>` advertising tag and the `GET` handler for
  `src/pages/rss.xml.ts`. They live on the
  [`katanakit-js/adapters/astro`](/guides/services/astro-adapter#rss-endpoints)
  subpath.
- **Head autodiscovery** — `useRssHeadLink()` (package root) emits the
  `<link rel="alternate" type="application/rss+xml">` tag from a `SiteConfig`,
  in any framework. It is the framework-agnostic counterpart of
  `useAstroRssLinkTag()`.
- **YouTube feeds** — `useBuildYoutubeRssUrl()` and `useParseYoutubeRss()` build
  the keyless YouTube channel feed URL and parse its Atom entries into
  normalized videos, with no API key and zero quota cost.

All three share the `RssConfig`, `RssItem` and `RssResult` types described in the
[type reference](#type-reference). Pick the entry point by what you need to
produce:

| You need to…                                     | Use                                                        |
| ------------------------------------------------ | ---------------------------------------------------------- |
| Serve a full feed from an Astro route            | `useAstroCreateRssEndpointFromConfig()`                    |
| Generate an RSS 2.0 XML string anywhere          | `useAstroGenerateRss()`                                    |
| Advertise an existing feed in `<head>`           | `useRssHeadLink()`                                         |
| Display a channel's latest YouTube videos        | `useBuildYoutubeRssUrl()` + `useParseYoutubeRss()`         |

## Quick example

An Astro feed endpoint that reads its metadata from `siteConfig` (no duplicated
title/description) and maps a content collection:

```ts
// src/pages/rss.xml.ts
import { useAstroCreateRssEndpointFromConfig } from "katanakit-js/adapters/astro";
import { siteConfig } from "katanakit-js";
import { getCollection } from "astro:content";

export const GET = useAstroCreateRssEndpointFromConfig(siteConfig, async () => {
  const posts = await getCollection("blog");

  return posts
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .slice(0, siteConfig.rss.limit)
    .map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/blog/${post.slug}/`,
      description: post.data.description,
    }));
});
```

The endpoint is only half of the integration: readers and crawlers find
`/rss.xml` through the autodiscovery tag. `useRssHeadLink(siteConfig)` produces
it from the same config, so the route and the tag never drift apart.

## Type reference

### RssConfig

`RssConfig` is inferred from `RssConfigSchema` and is the shared input for
`useAstroGenerateRss()` and the endpoint helpers.

| Field           | Type        | Default      | Notes                                                                              |
| --------------- | ----------- | ------------ | ---------------------------------------------------------------------------------- |
| `title`         | `string`    | —            | Required. Feed title, escaped into `<title>`.                                       |
| `description`   | `string`    | —            | Required by the type; may be empty. Channel description.                            |
| `site`          | `string`    | —            | Required. Base URL; a single trailing slash is trimmed.                             |
| `items`         | `RssItem[]` | —            | May be empty — a channel without items is still valid RSS 2.0.                      |
| `xmlPath`       | `string?`   | `"/rss.xml"` | Path used in the `<atom:link rel="self">` element. Not an output file path.          |
| `language`      | `string?`   | `"en"`       | Written into `<language>`.                                                           |
| `customData`    | `string?`   | —            | Raw XML injected inside `<channel>`; `]]>` sequences are neutralized first.          |
| `xslUrl`        | `string?`   | —            | When present, adds an `<?xml-stylesheet …?>` processing instruction.                 |
| `lastBuildDate` | `boolean?`  | `true`       | Adds `<lastBuildDate>` with the current UTC time. Disable for reproducible builds.   |
| `trailingSlash` | `boolean?`  | —            | Declared in the schema but **not read by the Astro builder** — links are emitted as-is. |

### RssItem

One entry per `<item>` element. Optional fields are simply omitted from the
output when absent.

| Field        | Type             | Notes                                                                                              |
| ------------ | ---------------- | -------------------------------------------------------------------------------------------------- |
| `title`      | `string`         | Required. Escaped with the XML entity set (`&`, `<`, `>`, `"`, `'`).                                |
| `pubDate`    | `Date \| string` | Required. Formatted as RFC-822 via `toUTCString()`. Strings go through `new Date()` first.           |
| `link`       | `string`         | Required. Starting with `http` → used as-is; anything else gets `site` prefixed.                    |
| `description`| `string?`        | Optional excerpt. Escaped.                                                                          |
| `content`    | `string?`        | Optional full HTML. Wrapped in `CDATA`; any `]]>` is split so it cannot break out of the section.    |
| `categories` | `string[]?`      | Optional. One escaped `<category>` element per entry.                                               |
| `author`     | `string?`        | Optional. Escaped.                                                                                  |
| `customData` | `string?`        | Optional raw XML per item (for example an `<enclosure>`), with `]]>` sanitized before insertion.     |

Two link gotchas are worth knowing before you map a collection:

- The absolute check is only `link.startsWith("http")` — a protocol-relative
  URL (`//cdn.example.com/…`) or a `mailto:` would be treated as relative and
  prefixed with `site`.
- `pubDate` strings are **not validated**. An unparseable string produces
  `<pubDate>Invalid Date</pubDate>` instead of failing the build, so validate
  dates upstream.

```ts
import type { RssConfig } from "katanakit-js";

const config = {
  title: "My Blog",
  description: "Posts about TypeScript",
  site: "https://example.com",
  items: [
    {
      title: "Hello",
      pubDate: new Date(),
      link: "/blog/hello/",
      categories: ["typescript"],
    },
  ],
} satisfies RssConfig;
```

### RssResult

`RssResult` is a Safe Result — a discriminated union that never throws and
narrows cleanly on the `ok` flag:

```ts
type RssResult =
  | { data: string; error: null; ok: true }
  | { data: null; error: { message: string; details?: unknown }; ok: false };
```

```ts
import { useAstroGenerateRss } from "katanakit-js/adapters/astro";
import type { RssResult } from "katanakit-js";

const result: RssResult = useAstroGenerateRss(config);

if (result.ok) {
  result.data; // full RSS 2.0 XML string
} else {
  result.error.message; // "RSS config requires 'title' and 'site'."
}
```

Failure modes:

- `{ message: "RSS config requires 'title' and 'site'." }` when either required
  field is falsy.
- `{ message: "Failed to generate RSS feed.", details: … }` for anything thrown
  while assembling the XML.

## Astro endpoint pipeline

The Astro layer covers the feed end to end. Import the four helpers from the
adapter subpath:

```ts
import {
  useAstroGenerateRss,
  useAstroRssLinkTag,
  useAstroCreateRssEndpoint,
  useAstroCreateRssEndpointFromConfig,
} from "katanakit-js/adapters/astro";
```

| Helper                                 | Layer                  | Returns                                                |
| -------------------------------------- | ---------------------- | ------------------------------------------------------ |
| `useAstroGenerateRss()`                | RSS 2.0 XML builder    | `RssResult` (XML string or error)                      |
| `useAstroRssLinkTag()`                 | `<head>` advertising   | `<link … />` string                                    |
| `useAstroCreateRssEndpoint()`          | Astro `GET` handler    | `(context) => Promise<Response>`                       |
| `useAstroCreateRssEndpointFromConfig()` | Astro `GET` handler   | `(context) => Promise<Response>` from a `SiteConfig`   |

The sections below summarize each layer; the full parameter tables, defaults,
failure modes and response headers live on the
[Astro adapter page](/guides/services/astro-adapter#rss-endpoints) and are not
duplicated here.

### useAstroGenerateRss(config)

The pure core: takes an `RssConfig` and returns the complete RSS 2.0 document as
a Safe Result. Call it directly when you manage the `Response` yourself — a
Cloudflare Worker, a prerender script or a test. The builder escapes every text
node, wraps `content` in `CDATA` (splitting `]]>` sequences), sanitizes
channel-level and item-level `customData` against `]]>` injection, and emits
`guid` as the resolved absolute link with `isPermaLink="true"`. The `site`
trailing slash is trimmed, so relative links resolve predictably.

Full contract: [`useAstroGenerateRss(config)`](/guides/services/astro-adapter#useastrogeneraterssconfig).

### useAstroRssLinkTag(config)

Returns the standalone `<link rel="alternate" type="application/rss+xml">` tag
from `{ title, xmlPath }`, defaulting `xmlPath` to `"/rss.xml"`. It is the
Astro-only equivalent of `useRssHeadLink()`: same output shape, but it takes the
two fields directly instead of a `SiteConfig`. Render it in Astro with
`set:html` so the tag itself is not escaped.

Full contract: [`useAstroRssLinkTag(config)`](/guides/services/astro-adapter#useastrorsslinktagconfig).

### useAstroCreateRssEndpoint(config)

Creates the `GET` handler for `src/pages/rss.xml.ts`. `items` accepts a static
array or a sync/async factory, which is the hook for fetching collections and
remote CMS data. The site URL resolves from `config.site` first, then the Astro
request context (`context.site`); without either, the handler responds `500`
with `{ "error": "RSS feed requires a 'site' URL." }`. On success it returns the
XML with `Content-Type: application/xml; charset=utf-8` and a fixed one-hour
`Cache-Control` — build the `Response` yourself around `useAstroGenerateRss()`
if you need another policy.

Full contract: [`useAstroCreateRssEndpoint(config)`](/guides/services/astro-adapter#useastrocreaterssendpointconfig).

### useAstroCreateRssEndpointFromConfig(siteConfig, items)

The zero-duplication variant used in the [quick example](#quick-example): it
maps `siteConfig.rss.title`, `siteConfig.rss.description`, `siteConfig.site`,
`siteConfig.rss.path` and `siteConfig.lang` onto the config above. Two
`siteConfig.rss` fields are **not enforced**: `enabled` (gate the route
yourself) and `limit` (slice items in the factory). Use
`useAstroCreateRssEndpoint()` when the feed needs `customData` or `xslUrl`
overrides that do not belong in `SiteConfig`.

Full contract: [`useAstroCreateRssEndpointFromConfig(siteConfig, items)`](/guides/services/astro-adapter#useastrocreaterssendpointfromconfigsiteconfig-items).

## Head autodiscovery

### useRssHeadLink(config)

Returns the serialized RSS autodiscovery tag for a `SiteConfig`, or an empty
string when the feed is disabled — so it is safe to inject unconditionally.

| Input                  | Type      | Default      | Notes                                                         |
| ---------------------- | --------- | ------------ | ------------------------------------------------------------- |
| `config`               | `SiteConfig` | —         | Fail-fast: a null config or a missing `rss` block throws.     |
| `config.rss.enabled`   | `boolean` | —            | `false` → returns `""`.                                       |
| `config.rss.path`      | `string`  | `"/rss.xml"` | Written verbatim into `href`; not resolved against `site`.     |
| `config.rss.title`     | `string?` | `config.title` | Attribute value, escaped (`&`, `"`, `<`, `>`).             |
| `config.rss.description` | `string?` | —        | Not used to build the tag.                                    |
| `config.rss.limit`     | `number`  | —            | Not used to build the tag.                                    |

```ts
import { siteConfig, useRssHeadLink } from "katanakit-js";

useRssHeadLink(siteConfig);
// <link rel="alternate" type="application/rss+xml" title="My Site" href="/rss.xml" />
```

Returns the tag as a plain string. Note that `href` is emitted exactly as
configured, so `path: "/feed.xml"` points at the current origin; use an absolute
URL if the feed lives on another host. The link title is double-quoted and
attribute-escaped, but single quotes are not, which is fine for the
double-quoted attribute the serializer always emits.

Edge cases:

- A missing `rss` block throws
  `[Seo] SiteConfig.rss is required (useRssHeadLink). Pass rss: { enabled, path, limit }.`
  instead of silently producing a feedless page.
- A `null`/`undefined` config throws `[Seo] SiteConfig is required …`.
- Disabled feeds return `""` (never `null`), so `head.includes(rssLink)` checks
  and template injection stay simple.
- `useSeoMeta()` already appends this exact tag when `rss.enabled` is `true`,
  and `useHeadTags()` includes it. Only call `useRssHeadLink()` directly when
  you are assembling the head yourself, to avoid duplicate `<link>` tags.
  `useGenerateMetaTags()` deliberately strips the RSS link.

**Real use case** — a custom server-rendered `<head>`: `useHeadTags()` combines
the per-page metas and the autodiscovery link in one call, so an Express or
router-based SSR app advertises the feed without template duplication:

```ts
import express from "express";
import { siteConfig, useHeadTags } from "katanakit-js";

const app = express();

app.get("/", (_req, res) => {
  const head = useHeadTags(siteConfig, {
    title: "Home",
    description: "Latest posts",
  });

  res.type("html").send(`<!doctype html><html><head>${head}</head><body>…</body></html>`);
});
```

## YouTube feeds

YouTube publishes a public Atom feed per channel at
`https://www.youtube.com/feeds/videos.xml`, with roughly the latest 15 videos
and basic metadata. Two helpers cover it: one builds the URL, one parses the
response. Neither needs an API key, and neither touches the YouTube Data API
quota.

### useBuildYoutubeRssUrl(channelId)

Builds the keyless channel feed URL with `URLSearchParams`, so the id is
encoded safely.

```ts
import { useBuildYoutubeRssUrl } from "katanakit-js";

useBuildYoutubeRssUrl("UC_x5XG1OV2P6uZZ5FSM9Ttw");
// https://www.youtube.com/feeds/videos.xml?channel_id=UC_x5XG1OV2P6uZZ5FSM9Ttw
```

Takes the channel id (`UC…`), not a handle or a vanity URL — the feed endpoint
does not resolve handles. There is no runtime validation: an empty string still
produces a syntactically valid URL (`?channel_id=`), and the request will simply
come back without entries.

**Real use case** — a build-time "latest videos" strip: fetch the URL once at
build time, parse it with `useParseYoutubeRss()`, and ship static markup. If you
prefer a Safe Result over two manual steps, `useGetChannelVideosRss()` wraps the
fetch plus parse (register it with `useInitYoutube()` first; an empty `apiKey`
is fine for the keyless feed):

```ts
import { useGetChannelVideosRss, useInitYoutube } from "katanakit-js";

useInitYoutube({ apiKey: "", channelId: "UC_x5XG1OV2P6uZZ5FSM9Ttw" });

const result = await useGetChannelVideosRss();
if (result.ok) renderLatest(result.data);
```

### useParseYoutubeRss(xml)

Parses the channel feed into `YoutubeVideoNormalized[]`. It is pure and
SSR-safe: a regex pass over `<entry>` blocks, no `DOMParser`, no network.

```ts
import { useBuildYoutubeRssUrl, useParseYoutubeRss } from "katanakit-js";

const response = await fetch(useBuildYoutubeRssUrl("UC_x5XG1OV2P6uZZ5FSM9Ttw"));
const videos = useParseYoutubeRss(await response.text());

videos.slice(0, 6).forEach((video) => {
  console.log(video.title, video.thumbnail);
});
```

Each returned video carries:

| Field           | Type                                       | Source                                              |
| --------------- | ------------------------------------------ | --------------------------------------------------- |
| `id`            | `string`                                   | `<yt:videoId>`                                      |
| `title`         | `string`                                   | `<title>`, entities decoded                         |
| `description`   | `string`                                   | `<media:description>`                               |
| `publishedAt`   | `string`                                   | `<published>`                                       |
| `channelTitle`  | `string?`                                  | `<author><name>`                                    |
| `thumbnails`    | `{ default, medium, high }`                | Derived from the video id (`i.ytimg.com`)           |
| `thumbnail`     | `string`                                   | `thumbnails.high` shortcut                          |
| `url`           | `string`                                   | `https://www.youtube.com/watch?v=…`                 |
| `embedUrl`      | `string`                                   | Privacy-enhanced `youtube-nocookie` embed           |
| `durationSeconds` | `number?`                                | Not provided by the feed — enrich separately        |
| `viewCount`     | `number?`                                  | Not provided by the feed — enrich separately        |

Returns the videos newest-first, exactly as the feed serves them. The entity
decoding is a single pass with `&amp;` handled last, so a double-encoded
`&amp;lt;` stays as `&lt;` rather than collapsing into `<`.

Edge cases:

- Invalid or non-feed XML returns `[]` — the parser never throws.
- Entries without a `<yt:videoId>` are skipped.
- Missing optional tags (`<title>`, `<media:description>`, `<published>`,
  `<author>`) fall back to empty strings; `channelTitle` stays `undefined`.
- The parser expects the exact tag names YouTube emits and does no XML
  validation. If the feed format changes, you get fewer (or zero) results
  instead of an error.
- The feed has no `durationSeconds` or `viewCount`. When you have an API key,
  pass the ids to `useGetVideoDetails()` (up to 50) to enrich them.

**Real use case** — an SSR "shorts/latest videos" section: parse the feed on the
server, enrich ids with `useGetVideoDetails()`, and render posters from
`thumbnail` linking to `url`. Because the feed URL is keyless, local development
and preview builds work without any YouTube credentials.

## Related

- [Astro Adapter](/guides/services/astro-adapter#rss-endpoints) — full parameter
  tables, failure modes and response headers for the four RSS helpers.
- [SEO](/guides/services/seo) — `SiteConfig`, `useSeoMeta()` and the head
  pipeline that embeds the autodiscovery link.
- [API Reference](/api/) — every export on this page, generated from source.
