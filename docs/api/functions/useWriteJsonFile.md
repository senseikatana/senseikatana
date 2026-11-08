[katanakit-js](../index.md) / useWriteJsonFile

# Function: useWriteJsonFile()

```ts
function useWriteJsonFile(
   path, 
   data, 
   options?
): Promise<FilesystemResult<string>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:302](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/filesystem/filesystem.service.ts#L302)

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
