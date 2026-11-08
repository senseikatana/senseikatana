[katanakit-js](../index.md) / useReadDir

# Function: useReadDir()

```ts
function useReadDir(path, options?): Promise<FilesystemResult<{
  isDirectory: boolean;
  isFile: boolean;
  name: string;
  path: string;
}[]>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:327](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/filesystem/filesystem.service.ts#L327)

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
const result = await useReadDir("content", { recursive: true });
if (result.ok) result.data.filter((entry) => entry.isFile);
```
