[katanakit-js](../index.md) / useFileExists

# Function: useFileExists()

```ts
function useFileExists(path): Promise<boolean>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:379](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/filesystem/filesystem.service.ts#L379)

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
