[katanakit-js](../index.md) / useJoinPath

# Function: useJoinPath()

```ts
function useJoinPath(...segments): Promise<string>;
```

Defined in: [infrastructure/filesystem/path.service.ts:98](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/filesystem/path.service.ts#L98)

Joins path segments without resolving against `process.cwd()`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`segments` | `string`[] | Path segments to join. |

## Returns

`Promise`\<`string`\>

The joined (possibly relative) path.

## Example

```ts
await useJoinPath("data", "books.json"); // "data/books.json"
```
