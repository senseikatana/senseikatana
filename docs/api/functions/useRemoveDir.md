[katanakit-js](../index.md) / useRemoveDir

# Function: useRemoveDir()

```ts
function useRemoveDir(path, options?): Promise<FilesystemResult<string>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:497](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/filesystem/filesystem.service.ts#L497)

Removes a directory tree. Recursive by default; `force: false`
surfaces `ENOENT` instead of ignoring missing paths.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | Directory path to remove. |
| `options?` | \{ `force?`: `boolean`; `recursive?`: `boolean`; \} | `recursive` (default `true`) and `force` (default `false`). |
| `options.force?` | `boolean` | - |
| `options.recursive?` | `boolean` | - |

## Returns

`Promise`\<[`FilesystemResult`](../type-aliases/FilesystemResult.md)\<`string`\>\>

Safe Result with the removed path.

## Example

```ts
await useRemoveDir("data/cache");
```
