[katanakit-js](../index.md) / useGetDirname

# Function: useGetDirname()

```ts
function useGetDirname(importMetaUrl): Promise<string>;
```

Defined in: [infrastructure/filesystem/path.service.ts:63](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/filesystem/path.service.ts#L63)

Resolves the directory of a module from its `import.meta.url`.

Unlike `import.meta.dirname`, this works for any module you pass in,
so a consumer's app resolves its own paths — never KatanaKit's `dist/`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `importMetaUrl` | `string` | Your module's `import.meta.url`. |

## Returns

`Promise`\<`string`\>

The absolute directory that contains the module.

## Example

```ts
import { useGetDirname } from "katanakit-js";

const dir = await useGetDirname(import.meta.url);
// "<project>/src/features/books"
```
