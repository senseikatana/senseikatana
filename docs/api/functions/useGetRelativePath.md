[katanakit-js](../index.md) / useGetRelativePath

# Function: useGetRelativePath()

```ts
function useGetRelativePath(from, to): Promise<string>;
```

Defined in: [infrastructure/filesystem/path.service.ts:115](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/filesystem/path.service.ts#L115)

Computes the relative path from `from` to `to`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `from` | `string` | Origin path. |
| `to` | `string` | Destination path. |

## Returns

`Promise`\<`string`\>

The relative path between both.

## Example

```ts
await useGetRelativePath("/app/src", "/app/data/books.json"); // "../data/books.json"
```
