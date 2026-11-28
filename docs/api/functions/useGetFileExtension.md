[katanakit-js](../index.md) / useGetFileExtension

# Function: useGetFileExtension()

```ts
function useGetFileExtension(filePath): Promise<string>;
```

Defined in: [infrastructure/filesystem/path.service.ts:149](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/filesystem/path.service.ts#L149)

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
