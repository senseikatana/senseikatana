[katanakit-js](../index.md) / onFileExists

# Function: onFileExists()

```ts
function onFileExists(path): Promise<boolean>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:376](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/filesystem.service.ts#L376)

Checks whether a path exists and is accessible.
Never throws: returns `false` for missing paths and non-Node runtimes.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | Path to check. |

## Returns

`Promise`\<`boolean`\>

`true` when the path exists.

## Example

```ts
if (await onFileExists("data/books.json")) {
  // read it
}
```
