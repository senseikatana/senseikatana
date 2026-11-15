[katanakit-js](../index.md) / useResolvePath

# Function: useResolvePath()

```ts
function useResolvePath(...segments): Promise<string>;
```

Defined in: [infrastructure/filesystem/path.service.ts:82](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/filesystem/path.service.ts#L82)

Resolves a sequence of path segments into an absolute path.
Relative segments resolve against `process.cwd()`; if the first
segment is absolute (like a `useGetDirname` result), cwd is ignored.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`segments` | `string`[] | Path segments to resolve. |

## Returns

`Promise`\<`string`\>

The resolved absolute path.

## Example

```ts
const base = await useGetDirname(import.meta.url);
const file = await useResolvePath(base, "../data/books.json");
```
