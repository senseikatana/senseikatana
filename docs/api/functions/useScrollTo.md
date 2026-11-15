[katanakit-js](../index.md) / useScrollTo

# Function: useScrollTo()

```ts
function useScrollTo(
   x?, 
   y?, 
   behavior?
): void;
```

Defined in: [infrastructure/viewport/viewport.service.ts:160](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/viewport/viewport.service.ts#L160)

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
useScrollTo(0, 500); // scroll to 500px from top
```
