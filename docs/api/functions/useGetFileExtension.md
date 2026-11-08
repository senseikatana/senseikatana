[katanakit-js](../index.md) / useGetFileExtension

# Function: useGetFileExtension()

```ts
function useGetFileExtension(filePath): Promise<string>;
```

Defined in: [infrastructure/filesystem/path.service.ts:149](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/filesystem/path.service.ts#L149)

Returns the extension of a path, including the leading dot.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filePath` | `string` | The path to inspect. |

## Returns

`Promise`\<`string`\>

The extension (`""` when there is none).

## Example

```ts
await useGetFileExtension("/data/books.json"); // ".json"
```
