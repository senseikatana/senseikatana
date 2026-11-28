[katanakit-js](../index.md) / onReadDir

# Function: onReadDir()

```ts
function onReadDir(path, options?): Promise<FilesystemResult<{
  isDirectory: boolean;
  isFile: boolean;
  name: string;
  path: string;
}[]>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:324](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/filesystem.service.ts#L324)

Lists a directory with type flags resolved per entry.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | Directory path. |
| `options?` | \{ `recursive?`: `boolean`; \} | `recursive: true` walks nested directories. |
| `options.recursive?` | `boolean` | - |

## Returns

`Promise`\<[`FilesystemResult`](../type-aliases/FilesystemResult.md)\<\{
  `isDirectory`: `boolean`;
  `isFile`: `boolean`;
  `name`: `string`;
  `path`: `string`;
\}[]\>\>

Safe Result with `{ name, path, isFile, isDirectory }` entries.

## Example

```ts
const result = await onReadDir("content", { recursive: true });
if (result.ok) result.data.filter((entry) => entry.isFile);
```
