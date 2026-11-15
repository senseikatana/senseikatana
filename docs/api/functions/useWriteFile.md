[katanakit-js](../index.md) / useWriteFile

# Function: useWriteFile()

```ts
function useWriteFile(
   path, 
   data, 
   options?
): Promise<FilesystemResult<string>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:231](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/filesystem/filesystem.service.ts#L231)

Writes (or overwrites) a file, creating it when missing.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | Destination file path. |
| `data` | `string` \| `Uint8Array`\<`ArrayBufferLike`\> | Text or bytes to write. |
| `options?` | \{ `encoding?`: \| `"utf-8"` \| `"utf8"` \| `"ascii"` \| `"base64"` \| `"base64url"` \| `"hex"` \| `"latin1"` \| `"binary"` \| `"ucs2"` \| `"ucs-2"` \| `"utf16le"` \| `"utf-16le"`; `flag?`: `string`; `mode?`: `number`; \} | Encoding, mode and flag overrides. |
| `options.encoding?` | \| `"utf-8"` \| `"utf8"` \| `"ascii"` \| `"base64"` \| `"base64url"` \| `"hex"` \| `"latin1"` \| `"binary"` \| `"ucs2"` \| `"ucs-2"` \| `"utf16le"` \| `"utf-16le"` | - |
| `options.flag?` | `string` | - |
| `options.mode?` | `number` | - |

## Returns

`Promise`\<[`FilesystemResult`](../type-aliases/FilesystemResult.md)\<`string`\>\>

Safe Result with the written path.

## Example

```ts
const result = await useWriteFile("logs/app.log", "started\n");
```
