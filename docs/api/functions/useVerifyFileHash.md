[katanakit-js](../index.md) / useVerifyFileHash

# Function: useVerifyFileHash()

```ts
function useVerifyFileHash(
   path, 
   expected, 
   algorithm?
): Promise<FilesystemResult<boolean>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:204](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/filesystem/filesystem.service.ts#L204)

Verifies a file checksum against an expected value (case-insensitive).

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `path` | `string` | `undefined` | File path. |
| `expected` | `string` | `undefined` | Expected hex digest (from a `.sha256` sidecar, release page, …). |
| `algorithm?` | `"md5"` \| `"sha1"` \| `"sha256"` \| `"sha512"` | `"sha256"` | Algorithm used for both values (default: `"sha256"`). |

## Returns

`Promise`\<[`FilesystemResult`](../type-aliases/FilesystemResult.md)\<`boolean`\>\>

Safe Result with `true` when the digests match.

## Example

```ts
const check = await useVerifyFileHash("image.iso", "e3b0c442…");
if (check.ok && !check.data) throw new Error("checksum mismatch");
```
