[katanakit-js](../index.md) / onGetBasename

# Function: onGetBasename()

```ts
function onGetBasename(filePath, suffix?): Promise<string>;
```

Defined in: [infrastructure/filesystem/path.service.ts:133](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/path.service.ts#L133)

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
await onGetBasename("/data/books.json");        // "books.json"
await onGetBasename("/data/books.json", ".json"); // "books"
```
