[katanakit-js](../index.md) / useCopyToClipboard

# Function: useCopyToClipboard()

```ts
function useCopyToClipboard(text): Promise<boolean>;
```

Defined in: [core/services/utils.service.ts:548](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/utils.service.ts#L548)

Copies text to the clipboard (browser only).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `text` | `string` |

## Returns

`Promise`\<`boolean`\>

## Example

```ts
const ok = await useCopyToClipboard("Hello, world!");
```
