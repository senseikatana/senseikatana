---
title: Astro Adapter
description: "Typed static paths, pagination routes, collection lookups and RSS 2.0 endpoints for Astro content projects — every helper explained."
---

# Astro Adapter

`src/adapters/astro/` turns Astro's repetitive content plumbing into pure `use*`
functions. Instead of hand-writing `params`/`props` objects for every dynamic
route, you describe the transformation once and get back data shaped exactly the
way `getStaticPaths()` and endpoint handlers expect:

- **Typed static paths** — turn collection entries or plain values into
  `{ params, props }` objects with a single generic (`TParam`) driving the
  shape of the dynamic segment.
- **Pagination routes** — slice any list into pages, with `currentPage` and
  `totalPages` ready for a pager component.
- **Collection queries** — find entries by slug/id/custom key and extract unique
  values (tags, categories, authors) without ad-hoc `Set` juggling.
- **RSS 2.0 endpoints** — build XML, the `<link>` tag and the full `GET`
  handler for `src/pages/rss.xml.ts`, with escaping and CDATA handled for you.

Like the other framework adapters, this is a **function module**: there is no
`AstroService.getInstance()` to call. Import the helpers directly, either from
the dedicated subpath or from the main barrel:

```ts
// Astro-only helpers (paths, pagination, RSS)
import { useAstroPathsFrom } from "katanakit-js/adapters/astro";

// SEO helpers re-exported by the adapter — also available on the main barrel
import { useSeoMeta, siteConfig } from "katanakit-js";
```

::: tip Import paths
The path, collection, pagination and RSS helpers are **only** published on
`katanakit-js/adapters/astro`. The SEO helpers that the adapter re-exports are
the same framework-agnostic functions documented under
[SEO](/guides/services/seo), and they are also importable from
`katanakit-js`.
:::

The adapter declares **no Astro peer dependency**: it has zero Astro imports at
runtime and only types itself against the contract Astro calls — the
`getStaticPaths()` return shape and an endpoint `GET` handler returning a
`Response`. Any Astro version that exposes `getCollection` from
`astro:content` and the standard endpoint API works. On the TypeScript side,
every path helper returns the local `AstroPath` shape:

```ts
interface AstroPath<TParam extends string = string, TProps = unknown> {
  params: Record<TParam, string | undefined>;
  props: TProps;
}
```

`params` values are always strings (or `undefined` for the root of a paginated
route); all fallible helpers follow the project's Safe Result convention
(`{ data, error, ok }`) and never throw.

## Quick example

A dynamic blog route that pre-renders every collection entry and forwards its
data as props:

```astro
---
// src/pages/blog/[slug].astro
import { getCollection } from "astro:content";
import { useAstroGetStaticPaths } from "katanakit-js/adapters/astro";

export async function getStaticPaths() {
  const result = await useAstroGetStaticPaths(getCollection, "blog", {
    param: "slug",
    valueFrom: (entry) => entry.slug ?? entry.id,
    propsFrom: (entry) => entry.data as { title: string; date: string },
  });

  if (!result.ok) {
    console.error(result.error.message, result.error.details);
    return [];
  }

  return result.data;
}

const { title, date } = Astro.props;
---
<article>
  <h1>{title}</h1>
  <time datetime={date}>{date}</time>
</article>
```

From here, read on for the complete reference: every helper, its defaults, its
return shape and the edge cases that bite at build time.

## Typed static paths

Every static route in Astro needs the same boilerplate: map a collection to
`params`, then decide what travels as `props`. These three helpers cover the
full range, from a raw array you already have to a collection fetched from
`astro:content`.

### useAstroPathsFrom(items, options?)

```ts
function useAstroPathsFrom<T, TParam extends string = "slug", TProps = T>(
  items: T[],
  options?: PathsOptions<T, TParam, TProps>,
): AstroPath<TParam, TProps>[];
```

Converts a plain array into Astro paths. It is the foundation the other helpers
are built on, and the one to reach for when the source is not an Astro
collection (a CMS response, a local JSON file, the result of a filter).

| Option       | Type                                | Default                           | Purpose                                                                            |
| ------------ | ----------------------------------- | --------------------------------- | ---------------------------------------------------------------------------------- |
| `param`      | `TParam` (`string`)                 | `"slug"`                          | Name of the dynamic segment in the route file (`[slug].astro` → `"slug"`).         |
| `valueFrom`  | `(item: T) => string \| number`     | `item.slug ?? item.id ?? ""`      | Value placed in `params[param]`; always stringified with `String()`.               |
| `propsFrom`  | `(item: T) => TProps`               | `item` (the item itself)          | Value placed in `props`, available as `Astro.props` in the page.                   |
| `paramsFrom` | `(item: T) => Record<string, string>` | —                               | Builds the whole `params` record; when present it **overrides** `param`/`valueFrom`. |

Return shape: one entry per item, `{ params: { [param]: String(valueFrom(item)) }, props: propsFrom(item) }`.

Edge cases worth knowing before you ship:

- **Empty array in, empty array out.** No error, no placeholder page.
- **The default `valueFrom` is forgiving to a fault.** If an item has neither
  `slug` nor `id`, the param becomes an empty string. Astro warns about exactly
  this (`undefined expected for an optional param, but got empty string`) and a
  single-segment `[slug].astro` cannot match it, so the page is never generated.
  For any shape that is not a collection entry, always pass `valueFrom`.
- **`propsFrom` defaults to the item, not `item.data`.** Collection entries have
  `data` nested; pass `propsFrom` when you want only the frontmatter.
- **`String()` coercion means numbers are safe** as route values, but the
  original number is lost from `params`.
- **`paramsFrom` unlocks multi-segment routes** such as
  `src/pages/[category]/[slug].astro`, but the returned record is cast to
  `Record<TParam, …>`: pick the primary segment for `TParam` and keep the rest
  in the same literal object.

```ts
import { useAstroPathsFrom } from "katanakit-js/adapters/astro";

const products = [
  { slug: "mug", title: "Katana Mug", price: 18 },
  { slug: "tee", title: "Katana Tee", price: 32 },
];

const paths = useAstroPathsFrom(products, {
  param: "slug",
  valueFrom: (product) => product.slug,
  propsFrom: (product) => ({ title: product.title, price: product.price }),
});
// [
//   { params: { slug: "mug" }, props: { title: "Katana Mug", price: 18 } },
//   { params: { slug: "tee" }, props: { title: "Katana Tee", price: 32 } },
// ]
```

For a multi-segment route, `paramsFrom` builds the full record:

```ts
const paths = useAstroPathsFrom(products, {
  paramsFrom: (product) => ({ category: product.category, slug: product.slug }),
  propsFrom: (product) => product,
});
// [{ params: { category: "kitchen", slug: "mug" }, props: { ... } }, ...]
```

**Real use case** — filtering before generating: drafts should never produce a
route, and doing the filter at the source is cheaper than branching inside the
page:

```ts
export async function getStaticPaths() {
  const posts = await getCollection("blog");
  const published = posts.filter((post) => !post.data.draft);

  return useAstroPathsFrom(published, {
    param: "slug",
    valueFrom: (post) => post.slug ?? post.id,
    propsFrom: (post) => post.data,
  });
}
```

### useAstroPathsFromValues(values, param?)

```ts
function useAstroPathsFromValues<TParam extends string = "slug">(
  values: (string | number)[],
  param?: TParam,
): AstroPath<TParam, string | number>[];
```

The shortcut for routes whose pages need no payload beyond the value itself:
tags, categories, authors, years, letters. It maps each value to a path whose
`props` **is the original value** — unlike `useAstroPathsFrom`, `props` keeps
the `number` type for numeric inputs.

- `param` defaults to `"slug"`; pass the segment name that matches the file
  (`[tag].astro` → `"tag"`).
- Params are always strings, so `2` emits `{ year: "2" }`.
- **Duplicates are preserved.** The helper does not dedupe; feed it the output
  of [`useAstroExtractUniqueValues()`](#useastroextractuniquevaluesitems-keyfrom)
  when uniqueness matters.
- Empty array → empty paths array.

```ts
import { useAstroPathsFromValues } from "katanakit-js/adapters/astro";

const years = [2024, 2025, 2026];

export async function getStaticPaths() {
  return useAstroPathsFromValues(years, "year");
}
// [
//   { params: { year: "2024" }, props: 2024 },
//   { params: { year: "2025" }, props: 2025 },
//   { params: { year: "2026" }, props: 2026 },
// ]
```

**Real use case** — an archive page per year where the page simply coerces
`Astro.props` back to a number for the query, avoiding any string parsing of
`Astro.params`.

### useAstroGetStaticPaths(getCollectionFn, collectionName, options?)

```ts
async function useAstroGetStaticPaths<
  TData = unknown,
  TParam extends string = "slug",
  TProps = CollectionEntryLike<TData>,
>(
  getCollectionFn: (collection: string) => Promise<CollectionEntryLike<TData>[]>,
  collectionName: string,
  options?: PathsOptions<CollectionEntryLike<TData>, TParam, TProps>,
): Promise<AstroServiceResult<AstroPath<TParam, TProps>[]>>;
```

The Safe Result wrapper around the previous two steps: it calls
`getCollectionFn(collectionName)`, converts the entries with
`useAstroPathsFrom()` and returns the result instead of letting a build-time
error escape the route module. Pass Astro's `getCollection` directly as the
first argument — the adapter never imports `astro:content` itself.

Success:

```ts
{ data: AstroPath<TParam, TProps>[], error: null, ok: true }
```

Failure (the `getCollection` call threw, e.g. the collection folder does not
exist or is malformed):

```ts
{
  data: null,
  error: {
    message: 'Error generating routes for collection "blog"',
    collectionName: "blog",
    details: "<original error message or String(error)>",
  },
  ok: false,
}
```

`options` is forwarded verbatim, so the same defaults and edge cases from
`useAstroPathsFrom()` apply. In particular, **the default `props` is the whole
collection entry** (`TProps` defaults to `CollectionEntryLike<TData>`), not
`entry.data` — always pass `propsFrom` if the page expects frontmatter fields at
the top level.

```astro
---
// src/pages/blog/[slug].astro
import { getCollection } from "astro:content";
import { useAstroGetStaticPaths } from "katanakit-js/adapters/astro";

export async function getStaticPaths() {
  const result = await useAstroGetStaticPaths(getCollection, "blog", {
    param: "slug",
    valueFrom: (entry) => entry.slug ?? entry.id,
    propsFrom: (entry) => entry.data as { title: string },
  });

  if (!result.ok) {
    // Missing folder, typo in the collection name, invalid frontmatter…
    console.error(`[blog] ${result.error.message}`, result.error.details);
    return [];
  }

  return result.data;
}
---
```

**Real use case** — CI-friendly builds: returning `[]` on failure lets the rest
of the site build while the error is logged with the collection name, instead of
aborting the whole Astro pipeline with an opaque stack trace.

## Collections & lookup

Once a collection is fetched, these two helpers answer the questions that come
up while rendering: "where is the entry with this slug?" and "what are all the
distinct values across this field?".

### useAstroFindEntry(items, value, keyFrom?)

```ts
function useAstroFindEntry<T>(
  items: T[],
  value: string,
  keyFrom?: (item: T) => string | number,
): T | null;
```

Finds the **first** item whose key equals `value` and returns `null` when there
is no match — never `undefined`, never a throw. The default key extractor reads
`item.slug ?? item.id ?? ""`, so collection entries work with no configuration.
Pass `keyFrom` for anything else: a frontmatter field, a computed slug, a
numeric id.

Comparison happens after `String()`, so numeric keys in items match string
arguments. On a collection with duplicate keys, the first match wins — ordering
is the order of the input array.

```ts
import { useAstroFindEntry } from "katanakit-js/adapters/astro";

const posts = await getCollection("blog");
const post = useAstroFindEntry(posts, "hello-world");

if (!post) {
  throw new Error("Post not found");
}

console.log(post.data.title);
```

With a custom key:

```ts
const author = useAstroFindEntry(authors, "ada", (entry) => entry.data.handle);
```

**Real use case** — related posts: resolve a list of slugs stored in another
entry's frontmatter into full entries while filtering out the dangling ones:

```ts
const related = (post.data.related ?? [])
  .map((slug) => useAstroFindEntry(posts, slug))
  .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
```

### useAstroExtractUniqueValues(items, keyFrom)

```ts
function useAstroExtractUniqueValues<T, V>(items: T[], keyFrom: (item: T) => V | V[]): V[];
```

Returns the distinct values produced by `keyFrom` across all items, in
**first-seen order**. The extractor may return a single value or an array, which
is what makes this helper a natural fit for tags and categories stored as
arrays in frontmatter.

Implementation is `[...new Set(items.flatMap(keyFrom))]`, which carries two
consequences:

- **Order is stable**: the first occurrence defines the position.
- **Dedup is by `Set` semantics (SameValueZero)**: primitives compare by value,
  but object values dedupe by reference, not deep equality. Map objects to a
  primitive first (`(item) => item.tag.slug`).

Empty input → empty array.

```ts
import { useAstroExtractUniqueValues } from "katanakit-js/adapters/astro";

const posts = [
  { title: "A", tags: ["typescript", "astro"] },
  { title: "B", tags: ["typescript", "vue"] },
  { title: "C", tags: [] },
];

const tags = useAstroExtractUniqueValues(posts, (post) => post.tags);
// ["typescript", "astro", "vue"]
```

**Real use case** — a tag index with no duplicated routes: extract the unique
tags, then hand them to `useAstroPathsFromValues()` in one line:

```ts
export async function getStaticPaths() {
  const posts = await getCollection("blog");
  const tags = useAstroExtractUniqueValues(posts, (post) => post.data.tags);

  return useAstroPathsFromValues(tags, "tag");
}
```

## Pagination

### useAstroGeneratePagination(items, pageSize?, param?)

```ts
function useAstroGeneratePagination<T, TParam extends string = "page">(
  items: T[],
  pageSize?: number,
  param?: TParam,
): AstroPath<TParam, PaginationProps<T>>[];
```

Slices a list into pages and returns one path per page. No Astro runtime
involvement: you get plain `AstroPath` objects, so the layout, the URL scheme
and the pager markup stay under your control.

| Option     | Type     | Default  | Purpose                                      |
| ---------- | -------- | -------- | -------------------------------------------- |
| `items`    | `T[]`    | —        | Full, already-sorted list to paginate.       |
| `pageSize` | `number` | `10`     | Items per page. Must be a positive integer.  |
| `param`    | `TParam` | `"page"` | Dynamic segment that carries the page number. |

Every returned entry has:

```ts
{
  params: { [param]: currentPage === 1 ? undefined : String(currentPage) },
  props: { items: T[], currentPage: number, totalPages: number },
}
```

Key behaviors:

- `totalPages = Math.max(1, Math.ceil(items.length / pageSize))` — **an empty
  list still produces one page** (`currentPage: 1`, `items: []`, `totalPages: 1`).
- **Page 1 emits `undefined`, not `"1"`.** That makes the first page live at the
  collection root (`/blog`) instead of `/blog/1`. This only works with a rest
  parameter route (`[...page].astro`); a single-segment `[page].astro` cannot
  match an empty segment, so with that file name page 1 would never resolve —
  filter or transform the first entry if you prefer `/blog/1`.
- The original array is never mutated: each `items` value is a fresh `slice()`.
- `props` is plain data, safe to pass across Astro's build boundary.
- `pageSize` is not validated. `0` (or a negative number) makes the page count
  non-finite and `Array.from` throws a `RangeError` while generating paths.
  Guard it upstream if the value is user-configurable.

```astro
---
// src/pages/blog/[...page].astro
import { getCollection } from "astro:content";
import { useAstroGeneratePagination } from "katanakit-js/adapters/astro";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  const sorted = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );

  return useAstroGeneratePagination(sorted, 10, "page");
}

const { items, currentPage, totalPages } = Astro.props;

const pageUrl = (page: number) => (page === 1 ? "/blog" : `/blog/${page}`);
---
<ul>
  {items.map((post) => <li><a href={`/blog/${post.slug}/`}>{post.data.title}</a></li>)}
</ul>

<nav>
  {currentPage > 1 && <a href={pageUrl(currentPage - 1)}>Previous</a>}
  <span>{currentPage} / {totalPages}</span>
  {currentPage < totalPages && <a href={pageUrl(currentPage + 1)}>Next</a>}
</nav>
```

**Real use case** — a paginated archive whose page size comes from
`siteConfig.rss.limit`-style configuration: compute the slice in
`getStaticPaths()` and the exact same `props` feed both the list and the pager,
with no second source of truth to keep in sync.

## RSS endpoints

The RSS helpers cover the three layers of an Astro feed: the XML itself, the
`<link>` tag that advertises it in `<head>`, and the endpoint handler that
serves it at `/rss.xml`. They are the Astro-facing counterparts of the
framework-agnostic helpers documented under [RSS](/guides/services/rss).

### useAstroGenerateRss(config)

```ts
function useAstroGenerateRss(config: RssConfig): RssResult;
// RssResult = SafeResult<string, { message: string; details?: unknown }>
```

Builds a complete **RSS 2.0** document as a string. It is the pure function at
the core of the endpoint helpers; call it directly when you need the XML but
manage the `Response` yourself (a Cloudflare Worker, a prerender script).

Configuration (`RssConfig`):

| Field           | Type        | Default      | Notes                                                                          |
| --------------- | ----------- | ------------ | ------------------------------------------------------------------------------ |
| `title`         | `string`    | —            | Required. Feed title.                                                          |
| `description`   | `string`    | —            | Required. Channel description.                                                 |
| `site`          | `string`    | —            | Required. Base URL; a trailing slash is trimmed.                               |
| `items`         | `RssItem[]` | —            | May be empty; the channel is still valid.                                      |
| `xmlPath`       | `string`    | `"/rss.xml"` | Path used in the `<atom:link rel="self">` element.                             |
| `language`      | `string`    | `"en"`       | Emitted in `<language>`.                                                       |
| `customData`    | `string`    | —            | Raw XML injected inside `<channel>`; sanitized before insertion.               |
| `xslUrl`        | `string`    | —            | When present, adds an `<?xml-stylesheet …?>` processing instruction.           |
| `lastBuildDate` | `boolean`   | `true`       | Adds `<lastBuildDate>` with the current UTC time.                              |
| `trailingSlash` | `boolean`   | —            | Present in the type, **not applied** by the builder — links are emitted as-is. |

Each `RssItem`:

| Field        | Type               | Notes                                                                     |
| ------------ | ------------------ | ------------------------------------------------------------------------- |
| `title`      | `string`           | Required. Escaped.                                                        |
| `pubDate`    | `Date \| string`   | Required. Emitted as RFC-822 via `toUTCString()`; strings must parse.     |
| `link`       | `string`           | Required. Absolute (`http…`) or relative; relative links get `site` prefixed. |
| `description`| `string`           | Optional excerpt. Escaped.                                                |
| `content`    | `string`           | Optional full HTML, wrapped in `CDATA`.                                   |
| `categories` | `string[]`         | Optional. One `<category>` element per entry.                             |
| `author`     | `string`           | Optional.                                                                 |
| `customData` | `string`           | Optional raw XML per item (for example an `<enclosure>`), sanitized.      |

Safety and formatting guarantees:

- Text nodes escape `&`, `<`, `>`, `"` and `'` (`escapeXml`).
- `content` is wrapped in `CDATA` and `]]>` sequences are split so they cannot
  break out of the section.
- `customData` (channel and item level) is sanitized against `]]>` injection
  before being injected raw.
- `guid` is the resolved absolute link with `isPermaLink="true"`.

The result is a discriminated union, so a missing required field surfaces as
data rather than an exception:

```ts
import { useAstroGenerateRss } from "katanakit-js/adapters/astro";

const result = useAstroGenerateRss({
  title: "My Blog",
  description: "Posts about TypeScript",
  site: "https://example.com",
  items: [{ title: "Hello", pubDate: new Date(), link: "/blog/hello/" }],
});

if (!result.ok) {
  console.error(result.error.message, result.error.details);
} else {
  console.log(result.data); // full XML string
}
```

Failure modes:

- `{ message: "RSS config requires 'title' and 'site'." }` when either required
  field is falsy.
- `{ message: "Failed to generate RSS feed.", details: … }` for anything thrown
  during XML assembly.

A minimal output (abridged) looks like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>My Blog</title>
    <link>https://example.com</link>
    <description>Posts about TypeScript</description>
    <language>en</language>
    <atom:link href="https://example.com/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>Mon, 05 Oct 2026 10:00:00 GMT</lastBuildDate>
    <item>
      <title>Hello</title>
      <link>https://example.com/blog/hello/</link>
      <guid isPermaLink="true">https://example.com/blog/hello/</guid>
      <pubDate>Sun, 04 Oct 2026 09:00:00 GMT</pubDate>
    </item>
  </channel>
</rss>
```

**Real use case** — a full-content feed: put the already-rendered HTML in
`content` and let CDATA carry it untouched, or use `customData` on an item to
emit a podcast `<enclosure>`:

```ts
const result = useAstroGenerateRss({
  title: "Katana FM",
  description: "A podcast about TypeScript",
  site: "https://example.com",
  items: episodes.map((episode) => ({
    title: episode.title,
    pubDate: episode.date,
    link: `/episodes/${episode.slug}/`,
    content: episode.html,
    customData: `<enclosure url="${episode.audio}" type="audio/mpeg" length="${episode.bytes}" />`,
  })),
});
```

### useAstroRssLinkTag(config)

```ts
function useAstroRssLinkTag(config: Pick<RssConfig, "title" | "xmlPath">): string;
```

Returns the `<link>` tag that advertises the feed to readers and crawlers:

```html
<link rel="alternate" type="application/rss+xml" title="My Blog" href="/rss.xml" />
```

- `xmlPath` defaults to `"/rss.xml"`, matching `useAstroGenerateRss()`.
- The title is escaped with the same XML escaping used by the feed builder.
- It is a plain string, so render it in Astro with `set:html` to avoid escaping
  the tag itself.

```astro
---
// src/layouts/BaseLayout.astro
import { useAstroRssLinkTag } from "katanakit-js/adapters/astro";
import { siteConfig } from "katanakit-js";

const rssLink = useAstroRssLinkTag({
  title: siteConfig.title,
  xmlPath: siteConfig.rss.path,
});
---
<head>
  <Fragment set:html={rssLink} />
</head>
```

**Real use case** — conditional advertisement: only emit the tag when the feed
is enabled, so disabling `rss.enabled` in the site config cleanly removes both
the tag and (if you gate the endpoint the same way) the route:

```ts
const rssLink = siteConfig.rss.enabled
  ? useAstroRssLinkTag({ title: siteConfig.title, xmlPath: siteConfig.rss.path })
  : "";
```

### useAstroCreateRssEndpoint(config)

```ts
function useAstroCreateRssEndpoint(
  config: Omit<RssConfig, "items"> & {
    items: RssItem[] | (() => RssItem[] | Promise<RssItem[]>);
  },
): (context: { site?: URL | string }) => Promise<Response>;
```

Creates the `GET` handler for an Astro endpoint. Drop it into
`src/pages/rss.xml.ts` and Astro serves the feed. The `items` field accepts
either a static array or a factory — sync or async — which is the hook for
fetching collections and remote CMS data at build time.

Site resolution order: `config.site` first, then the request context
(`context.site`, which Astro fills from your `site` config), then an error
response. The context parameter is intentionally minimal
(`{ site?: URL | string }`), so you can call the handler in tests with a plain
object; Astro's full `APIContext` is structurally compatible.

Responses:

| Scenario                    | Status | Body / headers                                                                                   |
| --------------------------- | ------ | ------------------------------------------------------------------------------------------------ |
| Feed generated              | `200`  | XML with `Content-Type: application/xml; charset=utf-8` and `Cache-Control: public, max-age=3600` |
| Missing site URL            | `500`  | `{ "error": "RSS feed requires a 'site' URL." }` as `application/json`                            |
| `useAstroGenerateRss` fails | `500`  | `{ "error": "<message>" }` as `application/json`                                                  |
| Unexpected throw            | `500`  | `{ "error": "<message or 'Unknown error generating RSS.'>" }` as `application/json`               |

The cache header is fixed at one hour — if you need a different policy, build
the `Response` yourself around `useAstroGenerateRss()`.

```ts
// src/pages/rss.xml.ts
import { useAstroCreateRssEndpoint } from "katanakit-js/adapters/astro";
import { getCollection } from "astro:content";

export const GET = useAstroCreateRssEndpoint({
  title: "My Blog",
  description: "Posts about TypeScript",
  site: "https://example.com",
  items: async () => {
    const posts = await getCollection("blog");
    return posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/blog/${post.slug}/`,
      description: post.data.description,
      categories: post.data.tags,
    }));
  },
});
```

**Real use case** — remote content: because the factory is awaited, the same
handler drives feeds backed by a CMS. Under Astro's static output the factory
runs once at build time, so the feed is a static asset; under on-demand
rendering it runs per request. Either way the adapter never caches the items
itself — only the HTTP response advertises the one-hour cache.

### useAstroCreateRssEndpointFromConfig(siteConfig, items)

```ts
function useAstroCreateRssEndpointFromConfig(
  siteConfig: SiteConfig,
  items: RssItem[] | (() => RssItem[] | Promise<RssItem[]>),
): (context: { site?: URL | string }) => Promise<Response>;
```

The zero-duplication variant: instead of repeating title/description/site in
the endpoint, it reads them from your `SiteConfig`.

| Handler field  | Source                                        |
| -------------- | --------------------------------------------- |
| `title`        | `siteConfig.rss.title ?? siteConfig.title`     |
| `description`  | `siteConfig.rss.description ?? siteConfig.description` |
| `site`         | `siteConfig.site`                              |
| `xmlPath`      | `siteConfig.rss.path`                          |
| `language`     | `siteConfig.lang`                              |
| `customData`   | Not set — pass the config directly for that    |
| `xslUrl`       | Not set — pass the config directly for that    |

Two fields in `siteConfig.rss` are **not enforced**: `enabled` and `limit`.
The helper always creates a working handler, and it does not truncate items.
Respect them yourself — gate the route on `enabled` and slice to `limit` inside
the factory:

```ts
// src/pages/rss.xml.ts
import { useAstroCreateRssEndpointFromConfig } from "katanakit-js/adapters/astro";
import { siteConfig } from "katanakit-js";
import { getCollection } from "astro:content";

export const GET = useAstroCreateRssEndpointFromConfig(siteConfig, async () => {
  const posts = await getCollection("blog");
  const published = posts.filter((post) => !post.data.draft);

  return published
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

**Real use case** — a blog whose feed metadata already lives in one place:
`siteConfig` powers the SEO tags, the RSS `<link>` tag and the feed endpoint,
so changing the site title or description updates all three in one commit. Use
`useAstroCreateRssEndpoint()` instead when the feed needs per-feed overrides
(`customData`, `xslUrl`) that live outside `SiteConfig`.

## SEO re-exports

The adapter's third module is a convenience layer over the framework-agnostic
SEO helpers, so an Astro project can import everything from one subpath. It
re-exports:

- **Functions** — `useApplySeoTag`, `useGenerateMetaTags`, `useHeadTags`,
  `useRssHeadLink`, `useSeoMeta`, `useSeoTag`, `useSeoTags`, `useTitle`.
- **Types** — `SeoMeta`, `SeoMetaFlat`, `SeoMetaInput`, `SeoTagNode`,
  `SeoTagResult`, `SeoTagsResult`, `UseSeoMetaBase`, `UseSeoMetaOptions`.
- **Site configuration** — `SiteConfig` and the default `siteConfig`.

These are the same implementations documented in [SEO](/guides/services/seo);
this page intentionally does not duplicate their contracts. In Astro, the
typical flow is to call `useSeoMeta()` in the frontmatter of a layout and pass
the generated tag HTML into `<head>` with `set:html`.

## Related

- [RSS](/guides/services/rss) — the framework-agnostic generation and parsing
  helpers behind the Astro endpoints.
- [SEO](/guides/services/seo) — the meta/tag helpers re-exported by this
  adapter, with their full options and fail-fast rules.
- [Framework Adapters](/guides/framework-adapters) — the query/reactivity
  adapters for React, Solid, Svelte, Angular, Vue and Nuxt.
- [API Reference](/api/) — every export, generated from source.
