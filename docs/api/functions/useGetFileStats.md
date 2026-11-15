[katanakit-js](../index.md) / useGetFileStats

# Function: useGetFileStats()

```ts
function useGetFileStats(path): Promise<FilesystemResult<{
  accessedAt: number;
  createdAt: number;
  isDirectory: boolean;
  isFile: boolean;
  isSymbolicLink: boolean;
  modifiedAt: number;
  size: number;
}>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:403](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/filesystem/filesystem.service.ts#L403)

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
const result = await useGetFileStats("assets/logo.png");
if (result.ok) console.log(result.data.size);
```
