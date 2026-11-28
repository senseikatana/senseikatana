[katanakit-js](../index.md) / onEnsureDir

# Function: onEnsureDir()

```ts
function onEnsureDir(path): Promise<FilesystemResult<string>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:355](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/filesystem.service.ts#L355)

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
await onEnsureDir("data/cache/books");
```
