[katanakit-js](../index.md) / onIsAtBottom

# Function: onIsAtBottom()

```ts
function onIsAtBottom(threshold?): boolean;
```

Defined in: [infrastructure/viewport/viewport.service.ts:142](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/viewport/viewport.service.ts#L142)

Checks whether the page is scrolled to (or near) the bottom.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `threshold?` | `number` | `50` | Pixel tolerance from the bottom (default: `50`). |

## Returns

`boolean`

`true` if within `threshold` pixels of the bottom.
