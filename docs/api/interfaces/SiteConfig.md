[katanakit-js](../index.md) / SiteConfig

# Interface: SiteConfig

Defined in: [config/site.config.ts:12](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/site.config.ts#L12)

Site-wide configuration for KatanaKit SEO / RSS helpers.
Framework-agnostic — reuse in Vanilla, Astro, Vue/React SPAs, Express, etc.

Prefer defining your own `siteConfig` in the consuming app.
This default is only a demo / fallback for [useSeoMeta](../functions/useSeoMeta.md).

Do not import `useSeoMeta` here — that creates a circular dependency
(`seo.service` imports `siteConfig` as defaults).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="author"></a> `author` | `string` | Author name for RSS and meta tags. | [config/site.config.ts:22](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/site.config.ts#L22) |
| <a id="description"></a> `description` | `string` | Default meta description. | [config/site.config.ts:18](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/site.config.ts#L18) |
| <a id="lang"></a> `lang` | `string` | Language code (e.g. "en", "es"). | [config/site.config.ts:20](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/site.config.ts#L20) |
| <a id="nav"></a> `nav?` | \{ `external?`: `boolean`; `href`: `string`; `label`: `string`; \}[] | - | [config/site.config.ts:42](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/site.config.ts#L42) |
| <a id="ogimage"></a> `ogImage?` | `string` | Social/OG image URL (absolute or relative to public/). | [config/site.config.ts:24](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/site.config.ts#L24) |
| <a id="rss"></a> `rss` | \{ `description?`: `string`; `enabled`: `boolean`; `limit`: `number`; `path`: `string`; `title?`: `string`; \} | - | [config/site.config.ts:27](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/site.config.ts#L27) |
| `rss.description?` | `string` | - | [config/site.config.ts:31](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/site.config.ts#L31) |
| `rss.enabled` | `boolean` | - | [config/site.config.ts:28](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/site.config.ts#L28) |
| `rss.limit` | `number` | - | [config/site.config.ts:32](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/site.config.ts#L32) |
| `rss.path` | `string` | - | [config/site.config.ts:29](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/site.config.ts#L29) |
| `rss.title?` | `string` | - | [config/site.config.ts:30](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/site.config.ts#L30) |
| <a id="seo"></a> `seo` | \{ `canonical`: `boolean`; `jsonLd`: `boolean`; `noindex`: `boolean`; `openGraph`: `boolean`; `twitterCard`: `boolean`; \} | - | [config/site.config.ts:34](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/site.config.ts#L34) |
| `seo.canonical` | `boolean` | - | [config/site.config.ts:36](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/site.config.ts#L36) |
| `seo.jsonLd` | `boolean` | - | [config/site.config.ts:40](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/site.config.ts#L40) |
| `seo.noindex` | `boolean` | - | [config/site.config.ts:35](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/site.config.ts#L35) |
| `seo.openGraph` | `boolean` | - | [config/site.config.ts:37](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/site.config.ts#L37) |
| `seo.twitterCard` | `boolean` | Enables Twitter/X card metadata in `useSeoMeta`. | [config/site.config.ts:39](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/site.config.ts#L39) |
| <a id="site"></a> `site` | `string` | Base URL of the site (no trailing slash). | [config/site.config.ts:14](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/site.config.ts#L14) |
| <a id="title"></a> `title` | `string` | Site brand title (not the page `<title>` — that is `title` on useSeoMeta). | [config/site.config.ts:16](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/site.config.ts#L16) |
| <a id="twitter"></a> `twitter?` | `string` | Twitter/X account handle used for the `twitter:site` card field. | [config/site.config.ts:26](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/site.config.ts#L26) |
