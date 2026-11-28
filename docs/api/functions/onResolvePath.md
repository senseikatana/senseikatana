[katanakit-js](../index.md) / onResolvePath

# Function: onResolvePath()

```ts
function onResolvePath(...segments): Promise<string>;
```

Defined in: [infrastructure/filesystem/path.service.ts:82](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/path.service.ts#L82)

Resolves a sequence of path segments into an absolute path.
Relative segments resolve against `process.cwd()`; if the first
segment is absolute (like a `onGetDirname` result), cwd is ignored.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`segments` | `string`[] | Path segments to resolve. |

## Returns

`Promise`\<`string`\>

The resolved absolute path.

## Example

```ts
const base = await onGetDirname(import.meta.url);
const file = await onResolvePath(base, "../data/books.json");
```
