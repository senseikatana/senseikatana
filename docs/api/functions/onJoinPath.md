[katanakit-js](../index.md) / onJoinPath

# Function: onJoinPath()

```ts
function onJoinPath(...segments): Promise<string>;
```

Defined in: [infrastructure/filesystem/path.service.ts:98](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/path.service.ts#L98)

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
await onJoinPath("data", "books.json"); // "data/books.json"
```
