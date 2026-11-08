[katanakit-js](../index.md) / usePrefersReducedMotion

# Function: usePrefersReducedMotion()

```ts
function usePrefersReducedMotion(): boolean;
```

Defined in: [infrastructure/viewport/viewport.service.ts:71](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/viewport/viewport.service.ts#L71)

Checks whether the user prefers reduced motion.

## Returns

`boolean`

`true` if `prefers-reduced-motion: reduce` is active.

## Example

```ts
const smooth = !usePrefersReducedMotion();
```
