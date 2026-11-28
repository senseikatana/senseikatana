[katanakit-js](../index.md) / useCopyToClipboard

# Function: useCopyToClipboard()

```ts
function useCopyToClipboard(text): Promise<boolean>;
```

Defined in: [core/services/utils.service.ts:548](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/utils.service.ts#L548)

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
