[katanakit-js](../index.md) / useGetScrollPosition

# Function: useGetScrollPosition()

```ts
function useGetScrollPosition(): {
  x: number;
  y: number;
};
```

Defined in: [infrastructure/viewport/viewport.service.ts:105](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/viewport/viewport.service.ts#L105)

Returns the current scroll position as `{ x, y }`.

## Returns

```ts
{
  x: number;
  y: number;
}
```

A [ScrollPosition](../type-aliases/ScrollPosition.md) object.

### x

```ts
x: number;
```

### y

```ts
y: number;
```

## Example

```ts
const { x, y } = useGetScrollPosition();
```
