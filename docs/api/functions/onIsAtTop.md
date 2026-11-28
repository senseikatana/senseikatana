[katanakit-js](../index.md) / onIsAtTop

# Function: onIsAtTop()

```ts
function onIsAtTop(threshold?): boolean;
```

Defined in: [infrastructure/viewport/viewport.service.ts:134](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/viewport/viewport.service.ts#L134)

Checks whether the page is scrolled to (or near) the top.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `threshold?` | `number` | `0` | Pixel tolerance (default: `0`). |

## Returns

`boolean`

`true` if `scrollY <= threshold`.
