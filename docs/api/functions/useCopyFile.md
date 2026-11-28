[katanakit-js](../index.md) / useCopyFile

# Function: useCopyFile()

```ts
function useCopyFile(
   source, 
   destination, 
   options?
): Promise<FilesystemResult<string>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:432](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/filesystem/filesystem.service.ts#L432)

Copies a file. Existing destinations are overwritten unless
`overwrite: false` is passed (`COPYFILE_EXCL`).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `source` | `string` | Source file path. |
| `destination` | `string` | Destination file path. |
| `options?` | \{ `overwrite?`: `boolean`; \} | Set `overwrite: false` to fail when the target exists. |
| `options.overwrite?` | `boolean` | - |

## Returns

`Promise`\<[`FilesystemResult`](../type-aliases/FilesystemResult.md)\<`string`\>\>

Safe Result with the destination path.

## Example

```ts
await useCopyFile("data/books.json", "backup/books.json");
```
