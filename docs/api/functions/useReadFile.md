[katanakit-js](../index.md) / useReadFile

# Function: useReadFile()

```ts
function useReadFile(path, encoding?): Promise<FilesystemResult<string>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:137](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/filesystem/filesystem.service.ts#L137)

Reads a text file.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `path` | `string` | `undefined` | File path (relative paths resolve against `process.cwd()`). |
| `encoding` | \| `"utf-8"` \| `"utf8"` \| `"ascii"` \| `"base64"` \| `"base64url"` \| `"hex"` \| `"latin1"` \| `"binary"` \| `"ucs2"` \| `"ucs-2"` \| `"utf16le"` \| `"utf-16le"` | `"utf8"` | Text encoding (default: `"utf8"`). |

## Returns

`Promise`\<[`FilesystemResult`](../type-aliases/FilesystemResult.md)\<`string`\>\>

Safe Result with the file contents as a string.

## Example

```ts
import { useReadFile } from "katanakit-js";

const result = await useReadFile("data/books.json");
if (result.ok) console.log(result.data);
```
