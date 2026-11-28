[katanakit-js](../index.md) / onRemoveDir

# Function: onRemoveDir()

```ts
function onRemoveDir(path, options?): Promise<FilesystemResult<string>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:494](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/filesystem.service.ts#L494)

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
await onRemoveDir("data/cache");
```
