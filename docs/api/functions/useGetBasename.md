[katanakit-js](../index.md) / useGetBasename

# Function: useGetBasename()

```ts
function useGetBasename(filePath, suffix?): Promise<string>;
```

Defined in: [infrastructure/filesystem/path.service.ts:133](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/filesystem/path.service.ts#L133)

Returns the last portion of a path (file name).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filePath` | `string` | The path to inspect. |
| `suffix?` | `string` | Optional suffix to strip (e.g. `".json"`). |

## Returns

`Promise`\<`string`\>

The base name.

## Example

```ts
await useGetBasename("/data/books.json");        // "books.json"
await useGetBasename("/data/books.json", ".json"); // "books"
```
