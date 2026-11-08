[katanakit-js](../index.md) / useJoinPath

# Function: useJoinPath()

```ts
function useJoinPath(...segments): Promise<string>;
```

Defined in: [infrastructure/filesystem/path.service.ts:98](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/filesystem/path.service.ts#L98)

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
