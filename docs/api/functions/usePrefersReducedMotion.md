[katanakit-js](../index.md) / usePrefersReducedMotion

# Function: usePrefersReducedMotion()

```ts
function usePrefersReducedMotion(): boolean;
```

Defined in: [infrastructure/viewport/viewport.service.ts:71](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/viewport/viewport.service.ts#L71)

Checks whether the user prefers reduced motion.

## Returns

`boolean`

`true` if `prefers-reduced-motion: reduce` is active.

## Example

```ts
const smooth = !usePrefersReducedMotion();
```
