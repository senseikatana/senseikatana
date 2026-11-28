[katanakit-js](../index.md) / onGetScrollProgress

# Function: onGetScrollProgress()

```ts
function onGetScrollProgress(): number;
```

Defined in: [infrastructure/viewport/viewport.service.ts:121](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/viewport/viewport.service.ts#L121)

Returns the vertical scroll progress as a value between `0` (top) and `1` (bottom).

## Returns

`number`

A number in `[0, 1]`.

## Example

```ts
const progress = onGetScrollProgress();
progressBar.style.width = `${progress * 100}%`;
```
