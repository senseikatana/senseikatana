[katanakit-js](../index.md) / useEnhanceVideoFacades

# Function: useEnhanceVideoFacades()

```ts
function useEnhanceVideoFacades(root?): () => void;
```

Defined in: [infrastructure/media/media.service.ts:16](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/media/media.service.ts#L16)

Hydrates click-to-play facades rendered by `useBuildVideoEmbed`.
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
useEnhanceVideoFacades(); // click on [data-video-facade] swaps in the iframe
```
