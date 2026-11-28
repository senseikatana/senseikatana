[katanakit-js](../index.md) / onAppendFile

# Function: onAppendFile()

```ts
function onAppendFile(
   path, 
   data, 
   options?
): Promise<FilesystemResult<string>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:252](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/filesystem.service.ts#L252)

Appends text or bytes to a file, creating it when missing.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | Destination file path. |
| `data` | `string` \| `Uint8Array`\<`ArrayBufferLike`\> | Text or bytes to append. |
| `options?` | \{ `encoding?`: \| `"utf8"` \| `"utf-8"` \| `"ascii"` \| `"base64"` \| `"base64url"` \| `"hex"` \| `"latin1"` \| `"binary"` \| `"ucs2"` \| `"ucs-2"` \| `"utf16le"` \| `"utf-16le"`; `flag?`: `string`; `mode?`: `number`; \} | Encoding, mode and flag overrides. |
| `options.encoding?` | \| `"utf8"` \| `"utf-8"` \| `"ascii"` \| `"base64"` \| `"base64url"` \| `"hex"` \| `"latin1"` \| `"binary"` \| `"ucs2"` \| `"ucs-2"` \| `"utf16le"` \| `"utf-16le"` | - |
| `options.flag?` | `string` | - |
| `options.mode?` | `number` | - |

## Returns

`Promise`\<[`FilesystemResult`](../type-aliases/FilesystemResult.md)\<`string`\>\>

Safe Result with the written path.

## Example

```ts
await onAppendFile("logs/app.log", "request handled\n");
```
