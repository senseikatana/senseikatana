[katanakit-js](../index.md) / useIsAtTop

# Function: useIsAtTop()

```ts
function useIsAtTop(threshold?): boolean;
```

Defined in: [infrastructure/viewport/viewport.service.ts:134](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/viewport/viewport.service.ts#L134)

Checks whether the page is scrolled to (or near) the top.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `threshold?` | `number` | `0` | Pixel tolerance (default: `0`). |

## Returns

`boolean`

`true` if `scrollY <= threshold`.
