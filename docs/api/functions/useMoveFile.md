[katanakit-js](../index.md) / useMoveFile

# Function: useMoveFile()

```ts
function useMoveFile(source, destination): Promise<FilesystemResult<string>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:456](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/filesystem/filesystem.service.ts#L456)

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
await useMoveFile("data/draft.json", "data/books.json");
```
