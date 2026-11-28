[katanakit-js](../index.md) / onGetScrollPosition

# Function: onGetScrollPosition()

```ts
function onGetScrollPosition(): {
  x: number;
  y: number;
};
```

Defined in: [infrastructure/viewport/viewport.service.ts:105](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/viewport/viewport.service.ts#L105)

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
const { x, y } = onGetScrollPosition();
```
