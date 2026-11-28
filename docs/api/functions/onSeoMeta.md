[katanakit-js](../index.md) / onSeoMeta

# Function: onSeoMeta()

```ts
function onSeoMeta<OmitKeys>(opts, defaults?): SeoTagResult;
```

Defined in: [config/seo.service.ts:65](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo.service.ts#L65)

SEO helper: one flat object in → one flat object out (+ html/tags).

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-omitkeys"></a> `OmitKeys` *extends* \| keyof SeoMeta \| keyof SeoSocial \| `"site"` \| `"siteTitle"` \| `"lang"` \| `"rss"` \| `"seo"` \| `"nav"` | `never` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `opts` | `Omit`\<[`SeoMetaOptions`](../type-aliases/SeoMetaOptions.md), `OmitKeys`\> |
| `defaults?` | [`SiteConfig`](../interfaces/SiteConfig.md) |

## Returns

[`SeoTagResult`](../type-aliases/SeoTagResult.md)

## Example

```ts
const seo = onSeoMeta({
  site: "https://example.com",
  siteTitle: "My Site",
  title: "Home",
  description: "…",
  ogImage: "https://example.com/image.png",
});
// seo.title, seo.site, seo.ogImage — once each
// seo.html / seo.tags — head injection
```
