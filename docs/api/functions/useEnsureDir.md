[katanakit-js](../index.md) / useEnsureDir

# Function: useEnsureDir()

```ts
function useEnsureDir(path): Promise<FilesystemResult<string>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:358](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/filesystem/filesystem.service.ts#L358)

Creates a directory (and any missing parents).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | Directory path to ensure. |

## Returns

`Promise`\<[`FilesystemResult`](../type-aliases/FilesystemResult.md)\<`string`\>\>

Safe Result with the directory path.

## Example

```ts
await useEnsureDir("data/cache/books");
```
