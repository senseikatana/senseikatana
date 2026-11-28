[katanakit-js](../index.md) / SeoSocial

# Type Alias: SeoSocial

```ts
type SeoSocial = {
  articleAuthor?: readonly string[] | null;
  articleModifiedTime?: string | null;
  articlePublishedTime?: string | null;
  articleSection?: string | null;
  articleTag?: readonly string[] | null;
  ogDescription?: string | null;
  ogImage?: string | SeoImage | readonly SeoImage[] | null;
  ogImageAlt?: string | null;
  ogImageHeight?: string | number | null;
  ogImageSecureUrl?: string | null;
  ogImageType?: string | null;
  ogImageUrl?: string | null;
  ogImageWidth?: string | number | null;
  ogLocale?: string | null;
  ogSiteName?: string | null;
  ogTitle?: string | null;
  ogType?: string | null;
  ogUrl?: string | null;
  twitterCard?: "summary" | "summary_large_image" | null;
  twitterCreator?: string | null;
  twitterDescription?: string | null;
  twitterImage?: string | null;
  twitterImageAlt?: string | null;
  twitterSite?: string | null;
  twitterTitle?: string | null;
};
```

Defined in: [config/seo-meta.types.ts:45](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L45)

Open Graph, article and Twitter/X fields.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="articleauthor"></a> `articleAuthor?` | readonly `string`[] \| `null` | [config/seo-meta.types.ts:60](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L60) |
| <a id="articlemodifiedtime"></a> `articleModifiedTime?` | `string` \| `null` | [config/seo-meta.types.ts:61](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L61) |
| <a id="articlepublishedtime"></a> `articlePublishedTime?` | `string` \| `null` | [config/seo-meta.types.ts:62](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L62) |
| <a id="articlesection"></a> `articleSection?` | `string` \| `null` | [config/seo-meta.types.ts:63](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L63) |
| <a id="articletag"></a> `articleTag?` | readonly `string`[] \| `null` | [config/seo-meta.types.ts:64](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L64) |
| <a id="ogdescription"></a> `ogDescription?` | `string` \| `null` | [config/seo-meta.types.ts:48](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L48) |
| <a id="ogimage"></a> `ogImage?` | `string` \| `SeoImage` \| readonly `SeoImage`[] \| `null` | [config/seo-meta.types.ts:52](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L52) |
| <a id="ogimagealt"></a> `ogImageAlt?` | `string` \| `null` | [config/seo-meta.types.ts:58](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L58) |
| <a id="ogimageheight"></a> `ogImageHeight?` | `string` \| `number` \| `null` | [config/seo-meta.types.ts:57](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L57) |
| <a id="ogimagesecureurl"></a> `ogImageSecureUrl?` | `string` \| `null` | [config/seo-meta.types.ts:54](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L54) |
| <a id="ogimagetype"></a> `ogImageType?` | `string` \| `null` | [config/seo-meta.types.ts:55](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L55) |
| <a id="ogimageurl"></a> `ogImageUrl?` | `string` \| `null` | [config/seo-meta.types.ts:53](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L53) |
| <a id="ogimagewidth"></a> `ogImageWidth?` | `string` \| `number` \| `null` | [config/seo-meta.types.ts:56](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L56) |
| <a id="oglocale"></a> `ogLocale?` | `string` \| `null` | [config/seo-meta.types.ts:50](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L50) |
| <a id="ogsitename"></a> `ogSiteName?` | `string` \| `null` | [config/seo-meta.types.ts:51](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L51) |
| <a id="ogtitle"></a> `ogTitle?` | `string` \| `null` | [config/seo-meta.types.ts:47](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L47) |
| <a id="ogtype"></a> `ogType?` | `string` \| `null` | [config/seo-meta.types.ts:49](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L49) |
| <a id="ogurl"></a> `ogUrl?` | `string` \| `null` | [config/seo-meta.types.ts:46](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L46) |
| <a id="twittercard"></a> `twitterCard?` | `"summary"` \| `"summary_large_image"` \| `null` | [config/seo-meta.types.ts:66](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L66) |
| <a id="twittercreator"></a> `twitterCreator?` | `string` \| `null` | [config/seo-meta.types.ts:72](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L72) |
| <a id="twitterdescription"></a> `twitterDescription?` | `string` \| `null` | [config/seo-meta.types.ts:68](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L68) |
| <a id="twitterimage"></a> `twitterImage?` | `string` \| `null` | [config/seo-meta.types.ts:69](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L69) |
| <a id="twitterimagealt"></a> `twitterImageAlt?` | `string` \| `null` | [config/seo-meta.types.ts:70](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L70) |
| <a id="twittersite"></a> `twitterSite?` | `string` \| `null` | [config/seo-meta.types.ts:71](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L71) |
| <a id="twittertitle"></a> `twitterTitle?` | `string` \| `null` | [config/seo-meta.types.ts:67](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo-meta.types.ts#L67) |
