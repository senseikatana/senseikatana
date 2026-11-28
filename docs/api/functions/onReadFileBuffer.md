[katanakit-js](../index.md) / onReadFileBuffer

# Function: onReadFileBuffer()

```ts
function onReadFileBuffer(path): Promise<FilesystemResult<Uint8Array<ArrayBufferLike>>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:153](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/filesystem.service.ts#L153)

Reads a file as raw bytes (no encoding).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | File path. |

## Returns

`Promise`\<[`FilesystemResult`](../type-aliases/FilesystemResult.md)\<`Uint8Array`\<`ArrayBufferLike`\>\>\>

Safe Result with the contents as a `Uint8Array`.

## Example

```ts
const result = await onReadFileBuffer("assets/logo.png");
if (result.ok) upload(result.data);
```
