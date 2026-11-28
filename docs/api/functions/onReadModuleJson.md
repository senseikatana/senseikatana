[katanakit-js](../index.md) / onReadModuleJson

# Function: onReadModuleJson()

```ts
function onReadModuleJson<T>(
   importMetaUrl, 
   relativePath, 
   schema?
): Promise<FilesystemResult<T>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:554](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/filesystem.service.ts#L554)

Reads and parses a JSON file resolved from the caller's module directory,
optionally validating it with a Zod schema.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-t"></a> `T` | `unknown` | Expected parsed (and validated) shape. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `importMetaUrl` | `string` | Your module's `import.meta.url`. |
| `relativePath` | `string` | Path relative to that module. |
| `schema?` | `ZodType`\<`T`, `unknown`, `$ZodTypeInternals`\<`T`, `unknown`\>\> | Optional Zod schema for runtime validation. |

## Returns

`Promise`\<[`FilesystemResult`](../type-aliases/FilesystemResult.md)\<`T`\>\>

Safe Result with the parsed data.

## Example

```ts
const result = await onReadModuleJson<Book[]>(import.meta.url, "../data/books.json");
if (result.ok) initBooks(result.data);
```
