[katanakit-js](../index.md) / onScrollTo

# Function: onScrollTo()

```ts
function onScrollTo(
   x?, 
   y?, 
   behavior?
): void;
```

Defined in: [infrastructure/viewport/viewport.service.ts:160](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/viewport/viewport.service.ts#L160)

Scrolls the window to a specific position, respecting `prefers-reduced-motion`.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `x?` | `number` | `0` | Horizontal scroll target (default: `0`). |
| `y?` | `number` | `0` | Vertical scroll target (default: `0`). |
| `behavior?` | `ScrollBehavior` | `"smooth"` | Scroll behavior (default: `"smooth"`). |

## Returns

`void`

## Example

```ts
onScrollTo(0, 500); // scroll to 500px from top
```
