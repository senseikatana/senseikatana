[katanakit-js](../index.md) / onGetDirname

# Function: onGetDirname()

```ts
function onGetDirname(importMetaUrl): Promise<string>;
```

Defined in: [infrastructure/filesystem/path.service.ts:63](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/path.service.ts#L63)

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
import { onGetDirname } from "katanakit-js";

const dir = await onGetDirname(import.meta.url);
// "<project>/src/features/books"
```
