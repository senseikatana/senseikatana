[katanakit-js](../index.md) / SeoMetaFlat

# Interface: SeoMetaFlat

Defined in: [config/seo-meta.types.ts:48](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L48)

Flat meta: HTML head essentials, Open Graph and optional Twitter/X cards.

## Extends

- [`SeoMetaArticle`](SeoMetaArticle.md)

## Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="articleauthor"></a> `articleAuthor?` | readonly `string`[] | - | [`SeoMetaArticle`](SeoMetaArticle.md).[`articleAuthor`](SeoMetaArticle.md#articleauthor) | [config/seo-meta.types.ts:38](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L38) |
| <a id="articlemodifiedtime"></a> `articleModifiedTime?` | `string` | - | [`SeoMetaArticle`](SeoMetaArticle.md).[`articleModifiedTime`](SeoMetaArticle.md#articlemodifiedtime) | [config/seo-meta.types.ts:39](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L39) |
| <a id="articlepublishedtime"></a> `articlePublishedTime?` | `string` | - | [`SeoMetaArticle`](SeoMetaArticle.md).[`articlePublishedTime`](SeoMetaArticle.md#articlepublishedtime) | [config/seo-meta.types.ts:40](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L40) |
| <a id="articlesection"></a> `articleSection?` | `string` | - | [`SeoMetaArticle`](SeoMetaArticle.md).[`articleSection`](SeoMetaArticle.md#articlesection) | [config/seo-meta.types.ts:41](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L41) |
| <a id="articletag"></a> `articleTag?` | readonly `string`[] | - | [`SeoMetaArticle`](SeoMetaArticle.md).[`articleTag`](SeoMetaArticle.md#articletag) | [config/seo-meta.types.ts:42](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L42) |
| <a id="author"></a> `author?` | `string` | Meta author. | - | [config/seo-meta.types.ts:63](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L63) |
| <a id="canonical"></a> `canonical?` | `string` | Explicit canonical URL → `<link rel="canonical">`. Prefer this over `url` when you know the preferred address. | - | [config/seo-meta.types.ts:68](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L68) |
| <a id="charset"></a> `charset?` | `string` | - | - | [config/seo-meta.types.ts:74](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L74) |
| <a id="description"></a> `description?` | `string` | Page summary → `<meta name="description">`. Prefer this for the page; use `ogDescription` only to override the share preview. | - | [config/seo-meta.types.ts:59](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L59) |
| <a id="keywords"></a> `keywords?` | `string` | Meta keywords (legacy; optional). | - | [config/seo-meta.types.ts:61](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L61) |
| <a id="ogdescription"></a> `ogDescription?` | `string` | Open Graph description (`og:description`). Defaults to `description` when omitted. | - | [config/seo-meta.types.ts:90](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L90) |
| <a id="ogimage"></a> `ogImage?` | \| `string` \| [`SeoArrayable`](../type-aliases/SeoArrayable.md)\<[`SeoOgImageObject`](SeoOgImageObject.md)\> | - | - | [config/seo-meta.types.ts:97](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L97) |
| <a id="ogimagealt"></a> `ogImageAlt?` | `string` | - | - | [config/seo-meta.types.ts:103](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L103) |
| <a id="ogimageheight"></a> `ogImageHeight?` | `string` \| `number` | - | - | [config/seo-meta.types.ts:102](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L102) |
| <a id="ogimagesecureurl"></a> `ogImageSecureUrl?` | `string` | - | - | [config/seo-meta.types.ts:99](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L99) |
| <a id="ogimagetype"></a> `ogImageType?` | `string` | - | - | [config/seo-meta.types.ts:100](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L100) |
| <a id="ogimageurl"></a> `ogImageUrl?` | `string` | - | - | [config/seo-meta.types.ts:98](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L98) |
| <a id="ogimagewidth"></a> `ogImageWidth?` | `string` \| `number` | - | - | [config/seo-meta.types.ts:101](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L101) |
| <a id="oglocale"></a> `ogLocale?` | `string` | - | - | [config/seo-meta.types.ts:92](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L92) |
| <a id="ogsitename"></a> `ogSiteName?` | `string` | Open Graph site name (`og:site_name`). Defaults to `siteTitle` when omitted. | - | [config/seo-meta.types.ts:96](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L96) |
| <a id="ogtitle"></a> `ogTitle?` | `string` | Open Graph title (`og:title`). Defaults to the resolved page `title` when omitted. | - | [config/seo-meta.types.ts:86](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L86) |
| <a id="ogtype"></a> `ogType?` | `string` | - | - | [config/seo-meta.types.ts:91](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L91) |
| <a id="ogurl"></a> `ogUrl?` | `string` | Open Graph page URL (`og:url`). Falls back to `canonical` → `url` → `site`. | - | [config/seo-meta.types.ts:82](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L82) |
| <a id="robots"></a> `robots?` | `string` \| [`SeoRobotsObject`](SeoRobotsObject.md) | - | - | [config/seo-meta.types.ts:76](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L76) |
| <a id="title"></a> `title?` | `string` | Page document title → `<title>`. Not the site brand (`siteTitle`). When both differ, the helper usually renders `"Page | Brand"`. | - | [config/seo-meta.types.ts:54](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L54) |
| <a id="twittercard"></a> `twitterCard?` | `"summary"` \| `"summary_large_image"` | Twitter/X card size; defaults to `summary_large_image` when an image is available. | - | [config/seo-meta.types.ts:106](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L106) |
| <a id="twittercreator"></a> `twitterCreator?` | `string` | Twitter/X creator handle, e.g. `"@katanakit"`. | - | [config/seo-meta.types.ts:118](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L118) |
| <a id="twitterdescription"></a> `twitterDescription?` | `string` | Twitter/X description; defaults to the resolved Open Graph description. | - | [config/seo-meta.types.ts:110](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L110) |
| <a id="twitterimage"></a> `twitterImage?` | `string` | Twitter/X image URL; defaults to the resolved Open Graph image. | - | [config/seo-meta.types.ts:112](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L112) |
| <a id="twitterimagealt"></a> `twitterImageAlt?` | `string` | Alt text for the Twitter/X image. | - | [config/seo-meta.types.ts:114](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L114) |
| <a id="twittersite"></a> `twitterSite?` | `string` | Twitter/X site handle, e.g. `"@katanakit"`. | - | [config/seo-meta.types.ts:116](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L116) |
| <a id="twittertitle"></a> `twitterTitle?` | `string` | Twitter/X title; defaults to the resolved Open Graph title. | - | [config/seo-meta.types.ts:108](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L108) |
| <a id="url"></a> `url?` | `string` | Absolute page URL. Fallback for canonical / `og:url` when those are omitted (resolution order: `ogUrl` → `canonical` → `url` → `site`). | - | [config/seo-meta.types.ts:73](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L73) |
| <a id="viewport"></a> `viewport?` | `string` \| `Record`\<`string`, `string` \| `number` \| `undefined`\> | - | - | [config/seo-meta.types.ts:75](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L75) |
