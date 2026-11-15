[katanakit-js](../index.md) / useReadFileBuffer

# Function: useReadFileBuffer()

```ts
function useReadFileBuffer(path): Promise<FilesystemResult<Uint8Array<ArrayBufferLike>>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:156](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/filesystem/filesystem.service.ts#L156)

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
const result = await useReadFileBuffer("assets/logo.png");
if (result.ok) upload(result.data);
```
