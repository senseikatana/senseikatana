[katanakit-js](../index.md) / useIsAtTop

# Function: useIsAtTop()

```ts
function useIsAtTop(threshold?): boolean;
```

Defined in: [infrastructure/viewport/viewport.service.ts:134](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/viewport/viewport.service.ts#L134)

Checks whether the page is scrolled to (or near) the top.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `threshold` | `number` | `0` | Pixel tolerance (default: `0`). |

## Returns

`boolean`

`true` if `scrollY <= threshold`.
