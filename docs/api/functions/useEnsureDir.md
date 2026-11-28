[katanakit-js](../index.md) / useEnsureDir

# Function: useEnsureDir()

```ts
function useEnsureDir(path): Promise<FilesystemResult<string>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:358](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/filesystem/filesystem.service.ts#L358)

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
