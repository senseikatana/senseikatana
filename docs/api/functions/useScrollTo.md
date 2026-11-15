[katanakit-js](../index.md) / useScrollTo

# Function: useScrollTo()

```ts
function useScrollTo(
   x?, 
   y?, 
   behavior?
): void;
```

Defined in: [infrastructure/viewport/viewport.service.ts:160](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/viewport/viewport.service.ts#L160)

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
