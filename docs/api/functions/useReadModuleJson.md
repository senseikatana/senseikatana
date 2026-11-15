[katanakit-js](../index.md) / useReadModuleJson

# Function: useReadModuleJson()

```ts
function useReadModuleJson<T>(
   importMetaUrl, 
   relativePath, 
   schema?
): Promise<FilesystemResult<T>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:557](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/filesystem/filesystem.service.ts#L557)

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
const result = await useReadModuleJson<Book[]>(import.meta.url, "../data/books.json");
if (result.ok) initBooks(result.data);
```
