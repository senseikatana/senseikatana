[katanakit-js](../index.md) / useIsAtTop

# Function: useIsAtTop()

```ts
function useIsAtTop(threshold?): boolean;
```

Defined in: [infrastructure/viewport/viewport.service.ts:134](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/viewport/viewport.service.ts#L134)

Checks whether the page is scrolled to (or near) the top.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `threshold?` | `number` | `0` | Pixel tolerance (default: `0`). |

## Returns

`boolean`

`true` if `scrollY <= threshold`.
