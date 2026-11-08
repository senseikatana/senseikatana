[katanakit-js](../index.md) / useSeoMeta

# Function: useSeoMeta()

```ts
function useSeoMeta<OmitKeys>(opts, defaults?): SeoTagResult;
```

Defined in: [config/seo.service.ts:55](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo.service.ts#L55)

SEO helper: one flat object in → one flat object out (+ html/tags).

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `OmitKeys` *extends* keyof SeoMetaFlat \| `"site"` \| `"siteTitle"` \| `"lang"` \| `"rss"` \| `"seo"` \| `"nav"` | `never` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `opts` | [`UseSeoMetaOptions`](../type-aliases/UseSeoMetaOptions.md)\<`OmitKeys`\> |
| `defaults` | [`SiteConfig`](../interfaces/SiteConfig.md) |

## Returns

[`SeoTagResult`](../type-aliases/SeoTagResult.md)

## Example

```ts
const seo = useSeoMeta({
  site: "https://example.com",
  siteTitle: "My Site",
  title: "Home",
  description: "…",
  ogImage: "https://example.com/image.png",
});
// seo.title, seo.site, seo.ogImage — once each
// seo.html / seo.tags — head injection
```
