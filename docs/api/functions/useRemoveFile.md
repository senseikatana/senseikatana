[katanakit-js](../index.md) / useRemoveFile

# Function: useRemoveFile()

```ts
function useRemoveFile(path): Promise<FilesystemResult<string>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:477](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/filesystem/filesystem.service.ts#L477)

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
await useRemoveFile("data/cache/books.json");
```
