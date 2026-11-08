[katanakit-js](../index.md) / useReadFileBuffer

# Function: useReadFileBuffer()

```ts
function useReadFileBuffer(path): Promise<FilesystemResult<Uint8Array<ArrayBufferLike>>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:156](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/filesystem/filesystem.service.ts#L156)

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
