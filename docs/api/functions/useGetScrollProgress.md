[katanakit-js](../index.md) / useGetScrollProgress

# Function: useGetScrollProgress()

```ts
function useGetScrollProgress(): number;
```

Defined in: [infrastructure/viewport/viewport.service.ts:121](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/viewport/viewport.service.ts#L121)

Returns the vertical scroll progress as a value between `0` (top) and `1` (bottom).

## Returns

`number`

A number in `[0, 1]`.

## Example

```ts
const progress = useGetScrollProgress();
progressBar.style.width = `${progress * 100}%`;
```
