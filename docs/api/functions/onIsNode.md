[katanakit-js](../index.md) / onIsNode

# Function: onIsNode()

```ts
function onIsNode(): boolean;
```

Defined in: [infrastructure/filesystem/path.service.ts:27](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/path.service.ts#L27)

Checks whether the code runs in a Node.js-compatible runtime
(Node, Bun or Deno). Returns `false` in browsers and edge runtimes.

## Returns

`boolean`

`true` when `process.versions.node` is available.

## Example

```ts
import { onIsNode } from "katanakit-js";

if (onIsNode()) {
  // safe to use node:fs / node:path
}
```
