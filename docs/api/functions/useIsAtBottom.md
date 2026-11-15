[katanakit-js](../index.md) / useIsAtBottom

# Function: useIsAtBottom()

```ts
function useIsAtBottom(threshold?): boolean;
```

Defined in: [infrastructure/viewport/viewport.service.ts:142](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/viewport/viewport.service.ts#L142)

Checks whether the page is scrolled to (or near) the bottom.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `threshold?` | `number` | `50` | Pixel tolerance from the bottom (default: `50`). |

## Returns

`boolean`

`true` if within `threshold` pixels of the bottom.
