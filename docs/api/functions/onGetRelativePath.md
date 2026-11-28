[katanakit-js](../index.md) / onGetRelativePath

# Function: onGetRelativePath()

```ts
function onGetRelativePath(from, to): Promise<string>;
```

Defined in: [infrastructure/filesystem/path.service.ts:115](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/path.service.ts#L115)

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
await onGetRelativePath("/app/src", "/app/data/books.json"); // "../data/books.json"
```
