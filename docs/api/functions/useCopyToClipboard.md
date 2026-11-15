[katanakit-js](../index.md) / useCopyToClipboard

# Function: useCopyToClipboard()

```ts
function useCopyToClipboard(text): Promise<boolean>;
```

Defined in: [core/services/utils.service.ts:548](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/utils.service.ts#L548)

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
