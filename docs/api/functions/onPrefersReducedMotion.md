[katanakit-js](../index.md) / onPrefersReducedMotion

# Function: onPrefersReducedMotion()

```ts
function onPrefersReducedMotion(): boolean;
```

Defined in: [infrastructure/viewport/viewport.service.ts:71](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/viewport/viewport.service.ts#L71)

Checks whether the user prefers reduced motion.

## Returns

`boolean`

`true` if `prefers-reduced-motion: reduce` is active.

## Example

```ts
const smooth = !onPrefersReducedMotion();
```
