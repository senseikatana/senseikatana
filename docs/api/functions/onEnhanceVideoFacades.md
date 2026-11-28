[katanakit-js](../index.md) / onEnhanceVideoFacades

# Function: onEnhanceVideoFacades()

```ts
function onEnhanceVideoFacades(root?): () => void;
```

Defined in: [infrastructure/media/media.service.ts:16](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/media/media.service.ts#L16)

Hydrates click-to-play facades rendered by `onBuildVideoEmbed`.
SSR-safe: no-op outside the browser, no side effects on import.
Call once per page (Astro/React/Vue/MDX `useEffect` or inline script).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `root?` | `ParentNode` | Scope element or document (defaults to `document`). |

## Returns

Cleanup function removing the delegated listener.

() => `void`

## Example

```ts
onEnhanceVideoFacades(); // click on [data-video-facade] swaps in the iframe
```
