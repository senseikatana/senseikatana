[katanakit-js](../index.md) / onGetFileStats

# Function: onGetFileStats()

```ts
function onGetFileStats(path): Promise<FilesystemResult<{
  accessedAt: number;
  createdAt: number;
  isDirectory: boolean;
  isFile: boolean;
  isSymbolicLink: boolean;
  modifiedAt: number;
  size: number;
}>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:400](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/filesystem.service.ts#L400)

Returns a portable stats subset for a file or directory.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | Path to inspect (follows symlinks). |

## Returns

`Promise`\<[`FilesystemResult`](../type-aliases/FilesystemResult.md)\<\{
  `accessedAt`: `number`;
  `createdAt`: `number`;
  `isDirectory`: `boolean`;
  `isFile`: `boolean`;
  `isSymbolicLink`: `boolean`;
  `modifiedAt`: `number`;
  `size`: `number`;
\}\>\>

Safe Result with size, type flags and epoch-ms timestamps.

## Example

```ts
const result = await onGetFileStats("assets/logo.png");
if (result.ok) console.log(result.data.size);
```
