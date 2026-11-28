[katanakit-js](../index.md) / onCopyToClipboard

# Variable: onCopyToClipboard

```ts
onCopyToClipboard: (text) => Promise<boolean>;
```

Defined in: [core/services/utils.service.ts:412](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L412)

Copies text to the clipboard (browser only). Returns `false` on failure
or in non-browser environments (SSR).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `text` | `string` | The text to copy. |

## Returns

`Promise`\<`boolean`\>

`true` if the text was copied, `false` otherwise.

## Example

```ts
const ok = await copyToClipboard("Hello, world!");
console.log(ok); // true (in a browser with clipboard API)
```
