[katanakit-js](../index.md) / onHashFile

# Function: onHashFile()

```ts
function onHashFile(path, algorithm?): Promise<FilesystemResult<string>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:170](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/filesystem.service.ts#L170)

Streams a file and returns its checksum as a lowercase hex digest.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `path` | `string` | `undefined` | File path. |
| `algorithm?` | `"md5"` \| `"sha1"` \| `"sha256"` \| `"sha512"` | `"sha256"` | `"md5" \| "sha1" \| "sha256" \| "sha512"` (default: `"sha256"`). |

## Returns

`Promise`\<[`FilesystemResult`](../type-aliases/FilesystemResult.md)\<`string`\>\>

Safe Result with the hex digest.

## Example

```ts
const result = await onHashFile("image.iso"); // sha256
const md5 = await onHashFile("image.iso", "md5");
```
