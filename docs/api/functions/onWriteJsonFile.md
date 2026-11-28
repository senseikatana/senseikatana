[katanakit-js](../index.md) / onWriteJsonFile

# Function: onWriteJsonFile()

```ts
function onWriteJsonFile(
   path, 
   data, 
   options?
): Promise<FilesystemResult<string>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:299](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/filesystem.service.ts#L299)

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
await onWriteJsonFile("data/books.json", books);
```
