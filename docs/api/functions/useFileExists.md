[katanakit-js](../index.md) / useFileExists

# Function: useFileExists()

```ts
function useFileExists(path): Promise<boolean>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:379](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/filesystem/filesystem.service.ts#L379)

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
if (await useFileExists("data/books.json")) {
  // read it
}
```
