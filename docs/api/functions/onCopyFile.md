[katanakit-js](../index.md) / onCopyFile

# Function: onCopyFile()

```ts
function onCopyFile(
   source, 
   destination, 
   options?
): Promise<FilesystemResult<string>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:429](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/filesystem.service.ts#L429)

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
await onCopyFile("data/books.json", "backup/books.json");
```
