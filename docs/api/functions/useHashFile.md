[katanakit-js](../index.md) / useHashFile

# Function: useHashFile()

```ts
function useHashFile(path, algorithm?): Promise<FilesystemResult<string>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:173](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/filesystem/filesystem.service.ts#L173)

Streams a file and returns its checksum as a lowercase hex digest.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `path` | `string` | `undefined` | File path. |
| `algorithm` | `"md5"` \| `"sha1"` \| `"sha256"` \| `"sha512"` | `"sha256"` | `"md5" | "sha1" | "sha256" | "sha512"` (default: `"sha256"`). |

## Returns

`Promise`\<[`FilesystemResult`](../type-aliases/FilesystemResult.md)\<`string`\>\>

Safe Result with the hex digest.

## Example

```ts
const result = await useHashFile("image.iso"); // sha256
const md5 = await useHashFile("image.iso", "md5");
```
