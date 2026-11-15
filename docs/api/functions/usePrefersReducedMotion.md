[katanakit-js](../index.md) / usePrefersReducedMotion

# Function: usePrefersReducedMotion()

```ts
function usePrefersReducedMotion(): boolean;
```

Defined in: [infrastructure/viewport/viewport.service.ts:71](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/viewport/viewport.service.ts#L71)

Checks whether the user prefers reduced motion.

## Returns

`boolean`

`true` if `prefers-reduced-motion: reduce` is active.

## Example

```ts
const smooth = !usePrefersReducedMotion();
```
