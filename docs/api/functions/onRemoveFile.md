[katanakit-js](../index.md) / onRemoveFile

# Function: onRemoveFile()

```ts
function onRemoveFile(path): Promise<FilesystemResult<string>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:474](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/filesystem.service.ts#L474)

Removes a file.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | File path to remove. |

## Returns

`Promise`\<[`FilesystemResult`](../type-aliases/FilesystemResult.md)\<`string`\>\>

Safe Result with the removed path.

## Example

```ts
await onRemoveFile("data/cache/books.json");
```
