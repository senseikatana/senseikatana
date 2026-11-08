[katanakit-js](../index.md) / useReadModuleJson

# Function: useReadModuleJson()

```ts
function useReadModuleJson<T>(
   importMetaUrl, 
   relativePath, 
   schema?
): Promise<FilesystemResult<T>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:557](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/filesystem/filesystem.service.ts#L557)

Reads and parses a JSON file resolved from the caller's module directory,
optionally validating it with a Zod schema.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `T` | `unknown` | Expected parsed (and validated) shape. |

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
