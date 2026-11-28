[katanakit-js](../index.md) / onGetViewportSize

# Function: onGetViewportSize()

```ts
function onGetViewportSize(): {
  height: number;
  width: number;
};
```

Defined in: [infrastructure/viewport/viewport.service.ts:38](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/viewport/viewport.service.ts#L38)

Returns the current viewport dimensions.

## Returns

```ts
{
  height: number;
  width: number;
}
```

A [ViewportSize](../type-aliases/ViewportSize.md) object with `width` and `height` (or `{0, 0}` in SSR).

### height

```ts
height: number;
```

### width

```ts
width: number;
```

## Example

```ts
const { width, height } = onGetViewportSize();
if (width < 768) { // mobile
```
