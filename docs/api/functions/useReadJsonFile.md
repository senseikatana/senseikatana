[katanakit-js](../index.md) / useReadJsonFile

# Function: useReadJsonFile()

```ts
function useReadJsonFile<T>(path, schema?): Promise<FilesystemResult<T>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:282](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/filesystem/filesystem.service.ts#L282)

Reads and parses a JSON file, optionally validating it with a Zod schema.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-t"></a> `T` | `unknown` | Expected parsed (and validated) shape. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | File path. |
| `schema?` | `ZodType`\<`T`, `unknown`, `$ZodTypeInternals`\<`T`, `unknown`\>\> | Optional Zod schema; invalid shapes fail with `ERR_VALIDATION`. |

## Returns

`Promise`\<[`FilesystemResult`](../type-aliases/FilesystemResult.md)\<`T`\>\>

Safe Result with the parsed data, or `ERR_INVALID_JSON` / `ERR_VALIDATION`.

## Example

```ts
import { z } from "zod";

const BookSchema = z.object({ title: z.string() });
const result = await useReadJsonFile("data/books.json", BookSchema);
```
