[katanakit-js](../index.md) / IRssService

# Interface: IRssService

Defined in: [types/rss/types.ts:18](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/rss/types.ts#L18)

Contract of the RSS facade.

## Methods

### onCreateRssEndpoint()

```ts
onCreateRssEndpoint(config): (context) => Promise<Response>;
```

Defined in: [types/rss/types.ts:24](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/rss/types.ts#L24)

Generates an Astro GET endpoint handler for the RSS feed.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | `Omit`\<\{ `customData?`: `string`; `description`: `string`; `items`: \{ `author?`: `string`; `categories?`: `string`[]; `content?`: `string`; `customData?`: `string`; `description?`: `string`; `link`: `string`; `pubDate`: `string` \| `Date`; `title`: `string`; \}[]; `language?`: `string`; `lastBuildDate?`: `boolean`; `site`: `string`; `title`: `string`; `trailingSlash?`: `boolean`; `xmlPath?`: `string`; `xslUrl?`: `string`; \}, `"items"`\> & \{ `items`: \| \{ `author?`: `string`; `categories?`: `string`[]; `content?`: `string`; `customData?`: `string`; `description?`: `string`; `link`: `string`; `pubDate`: `string` \| `Date`; `title`: `string`; \}[] \| (() => \| \{ `author?`: `string`; `categories?`: `string`[]; `content?`: `string`; `customData?`: `string`; `description?`: `string`; `link`: `string`; `pubDate`: `string` \| `Date`; `title`: `string`; \}[] \| `Promise`\<\{ `author?`: `string`; `categories?`: `string`[]; `content?`: `string`; `customData?`: `string`; `description?`: `string`; `link`: `string`; `pubDate`: `string` \| `Date`; `title`: `string`; \}[]\>); \} |

#### Returns

(`context`) => `Promise`\<`Response`\>

***

### onCreateRssEndpointFromConfig()

```ts
onCreateRssEndpointFromConfig(siteConfig, items): (context) => Promise<Response>;
```

Defined in: [types/rss/types.ts:28](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/rss/types.ts#L28)

Convenience: creates an RSS endpoint from a SiteConfig.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `siteConfig` | [`SiteConfig`](SiteConfig.md) |
| `items` | \| \{ `author?`: `string`; `categories?`: `string`[]; `content?`: `string`; `customData?`: `string`; `description?`: `string`; `link`: `string`; `pubDate`: `string` \| `Date`; `title`: `string`; \}[] \| (() => \| \{ `author?`: `string`; `categories?`: `string`[]; `content?`: `string`; `customData?`: `string`; `description?`: `string`; `link`: `string`; `pubDate`: `string` \| `Date`; `title`: `string`; \}[] \| `Promise`\<\{ `author?`: `string`; `categories?`: `string`[]; `content?`: `string`; `customData?`: `string`; `description?`: `string`; `link`: `string`; `pubDate`: `string` \| `Date`; `title`: `string`; \}[]\>) |

#### Returns

(`context`) => `Promise`\<`Response`\>

***

### onGenerateRss()

```ts
onGenerateRss(config): RssResult;
```

Defined in: [types/rss/types.ts:20](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/rss/types.ts#L20)

Generates the RSS XML string from a config.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | \{ `customData?`: `string`; `description`: `string`; `items`: \{ `author?`: `string`; `categories?`: `string`[]; `content?`: `string`; `customData?`: `string`; `description?`: `string`; `link`: `string`; `pubDate`: `string` \| `Date`; `title`: `string`; \}[]; `language?`: `string`; `lastBuildDate?`: `boolean`; `site`: `string`; `title`: `string`; `trailingSlash?`: `boolean`; `xmlPath?`: `string`; `xslUrl?`: `string`; \} | - |
| `config.customData?` | `string` | Custom XML to inject into the `<channel>` element. |
| `config.description?` | `string` | Description of the feed. |
| `config.items?` | \{ `author?`: `string`; `categories?`: `string`[]; `content?`: `string`; `customData?`: `string`; `description?`: `string`; `link`: `string`; `pubDate`: `string` \| `Date`; `title`: `string`; \}[] | Feed items. |
| `config.language?` | `string` | Language code (default: "en"). |
| `config.lastBuildDate?` | `boolean` | Whether to include the `<lastBuildDate>` (default: true). |
| `config.site?` | `string` | Base URL of the site (e.g. "https://example.com"). |
| `config.title?` | `string` | Title of the feed (e.g. "My Blog"). |
| `config.trailingSlash?` | `boolean` | Trailing slash behavior for item links (default: true). |
| `config.xmlPath?` | `string` | Output path (default: "/rss.xml"). |
| `config.xslUrl?` | `string` | XSL stylesheet URL for browser rendering (optional). |

#### Returns

[`RssResult`](../type-aliases/RssResult.md)

***

### onRssLinkTag()

```ts
onRssLinkTag(config): string;
```

Defined in: [types/rss/types.ts:22](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/rss/types.ts#L22)

Generates an HTML `<link>` tag for the RSS feed.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | `Pick`\<[`RssConfig`](../type-aliases/RssConfig.md), `"title"` \| `"xmlPath"`\> |

#### Returns

`string`
