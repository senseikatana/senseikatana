[katanakit-js](../index.md) / onGetFileExtension

# Function: onGetFileExtension()

```ts
function onGetFileExtension(filePath): Promise<string>;
```

Defined in: [infrastructure/filesystem/path.service.ts:149](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/path.service.ts#L149)

Returns the extension of a path, including the leading dot.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filePath` | `string` | The path to inspect. |

## Returns

`Promise`\<`string`\>

The extension (`""` when there is none).

## Example

```ts
await onGetFileExtension("/data/books.json"); // ".json"
```
