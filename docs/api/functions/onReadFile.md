[katanakit-js](../index.md) / onReadFile

# Function: onReadFile()

```ts
function onReadFile(path, encoding?): Promise<FilesystemResult<string>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:134](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/filesystem.service.ts#L134)

Reads a text file.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `path` | `string` | `undefined` | File path (relative paths resolve against `process.cwd()`). |
| `encoding?` | \| `"utf8"` \| `"utf-8"` \| `"ascii"` \| `"base64"` \| `"base64url"` \| `"hex"` \| `"latin1"` \| `"binary"` \| `"ucs2"` \| `"ucs-2"` \| `"utf16le"` \| `"utf-16le"` | `"utf8"` | Text encoding (default: `"utf8"`). |

## Returns

`Promise`\<[`FilesystemResult`](../type-aliases/FilesystemResult.md)\<`string`\>\>

Safe Result with the file contents as a string.

## Example

```ts
import { onReadFile } from "katanakit-js";

const result = await onReadFile("data/books.json");
if (result.ok) console.log(result.data);
```
