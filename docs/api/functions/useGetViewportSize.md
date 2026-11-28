[katanakit-js](../index.md) / useGetViewportSize

# Function: useGetViewportSize()

```ts
function useGetViewportSize(): {
  height: number;
  width: number;
};
```

Defined in: [infrastructure/viewport/viewport.service.ts:38](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/viewport/viewport.service.ts#L38)

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
const { width, height } = useGetViewportSize();
if (width < 768) { // mobile
```
