[katanakit-js](../index.md) / onReadJsonFile

# Function: onReadJsonFile()

```ts
function onReadJsonFile<T>(path, schema?): Promise<FilesystemResult<T>>;
```

Defined in: [infrastructure/filesystem/filesystem.service.ts:279](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/filesystem.service.ts#L279)

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
const result = await onReadJsonFile("data/books.json", BookSchema);
```
