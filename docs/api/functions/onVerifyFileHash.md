[katanakit-js](../index.md) / onVerifyFileHash

# Function: onVerifyFileHash()

```ts
function onVerifyFileHash(
   path, 
   expected, 
   algorithm?
): Promise<FilesystemResult<boolean>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:201](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/filesystem.service.ts#L201)

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
const check = await onVerifyFileHash("image.iso", "e3b0c442…");
if (check.ok && !check.data) throw new Error("checksum mismatch");
```
