[katanakit-js](../index.md) / useReadModuleFile

# Function: useReadModuleFile()

```ts
function useReadModuleFile(
   importMetaUrl, 
   relativePath, 
   encoding?
): Promise<FilesystemResult<string>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:530](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/filesystem/filesystem.service.ts#L530)

Reads a file resolved from the caller's module directory — the
`__dirname` + relative path pattern, without `__dirname`.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `importMetaUrl` | `string` | `undefined` | Your module's `import.meta.url`. |
| `relativePath` | `string` | `undefined` | Path relative to that module (e.g. `"../data/books.json"`). |
| `encoding` | \| `"utf-8"` \| `"utf8"` \| `"ascii"` \| `"base64"` \| `"base64url"` \| `"hex"` \| `"latin1"` \| `"binary"` \| `"ucs2"` \| `"ucs-2"` \| `"utf16le"` \| `"utf-16le"` | `"utf8"` | Text encoding (default: `"utf8"`). |

## Returns

`Promise`\<[`FilesystemResult`](../type-aliases/FilesystemResult.md)\<`string`\>\>

Safe Result with the file contents as a string.

## Example

```ts
const css = await useReadModuleFile(import.meta.url, "./theme.css");
```
