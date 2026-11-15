[katanakit-js](../index.md) / useWriteJsonFile

# Function: useWriteJsonFile()

```ts
function useWriteJsonFile(
   path, 
   data, 
   options?
): Promise<FilesystemResult<string>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:302](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/filesystem/filesystem.service.ts#L302)

Serializes data to JSON and writes it to a file (pretty-printed by default).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | Destination file path. |
| `data` | `unknown` | Value to serialize (`JSON.stringify` rules apply). |
| `options?` | \{ `pretty?`: `boolean`; \} | Set `pretty: false` for compact output. |
| `options.pretty?` | `boolean` | - |

## Returns

`Promise`\<[`FilesystemResult`](../type-aliases/FilesystemResult.md)\<`string`\>\>

Safe Result with the written path.

## Example

```ts
await useWriteJsonFile("data/books.json", books);
```
