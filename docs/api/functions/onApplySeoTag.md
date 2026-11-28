[katanakit-js](../index.md) / onApplySeoTag

# Function: onApplySeoTag()

```ts
function onApplySeoTag(seo, head?): void;
```

Defined in: [config/seo.service.ts:281](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/config/seo.service.ts#L281)

Applies tags from a [SeoTagResult](../type-aliases/SeoTagResult.md) into `document.head` (Vanilla / SPA).
No-op when `document` is unavailable (SSR).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `seo` | [`SeoTagResult`](../type-aliases/SeoTagResult.md) |
| `head?` | `ParentNode` \| `null` |

## Returns

`void`
