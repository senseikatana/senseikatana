[katanakit-js](../index.md) / onReadModuleFile

# Function: onReadModuleFile()

```ts
function onReadModuleFile(
   importMetaUrl, 
   relativePath, 
   encoding?
): Promise<FilesystemResult<string>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:527](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/filesystem.service.ts#L527)

Reads a file resolved from the caller's module directory — the
`__dirname` + relative path pattern, without `__dirname`.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `importMetaUrl` | `string` | `undefined` | Your module's `import.meta.url`. |
| `relativePath` | `string` | `undefined` | Path relative to that module (e.g. `"../data/books.json"`). |
| `encoding?` | \| `"utf8"` \| `"utf-8"` \| `"ascii"` \| `"base64"` \| `"base64url"` \| `"hex"` \| `"latin1"` \| `"binary"` \| `"ucs2"` \| `"ucs-2"` \| `"utf16le"` \| `"utf-16le"` | `"utf8"` | Text encoding (default: `"utf8"`). |

## Returns

`Promise`\<[`FilesystemResult`](../type-aliases/FilesystemResult.md)\<`string`\>\>

Safe Result with the file contents as a string.

## Example

```ts
const css = await onReadModuleFile(import.meta.url, "./theme.css");
```
