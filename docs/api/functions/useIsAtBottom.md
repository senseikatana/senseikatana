[katanakit-js](../index.md) / useIsAtBottom

# Function: useIsAtBottom()

```ts
function useIsAtBottom(threshold?): boolean;
```

Defined in: [infrastructure/viewport/viewport.service.ts:142](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/viewport/viewport.service.ts#L142)

Checks whether the page is scrolled to (or near) the bottom.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `threshold` | `number` | `50` | Pixel tolerance from the bottom (default: `50`). |

## Returns

`boolean`

`true` if within `threshold` pixels of the bottom.
