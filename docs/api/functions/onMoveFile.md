[katanakit-js](../index.md) / onMoveFile

# Function: onMoveFile()

```ts
function onMoveFile(source, destination): Promise<FilesystemResult<string>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:453](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/filesystem.service.ts#L453)

Moves (renames) a file or directory.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `source` | `string` | Source path. |
| `destination` | `string` | Destination path. |

## Returns

`Promise`\<[`FilesystemResult`](../type-aliases/FilesystemResult.md)\<`string`\>\>

Safe Result with the destination path.

## Example

```ts
await onMoveFile("data/draft.json", "data/books.json");
```
