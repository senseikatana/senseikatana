[katanakit-js](../index.md) / usePrefersReducedMotion

# Function: usePrefersReducedMotion()

```ts
function usePrefersReducedMotion(): boolean;
```

Defined in: [infrastructure/viewport/viewport.service.ts:71](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/viewport/viewport.service.ts#L71)

Checks whether the user prefers reduced motion.

## Returns

`boolean`

`true` if `prefers-reduced-motion: reduce` is active.

## Example

```ts
const smooth = !usePrefersReducedMotion();
```
