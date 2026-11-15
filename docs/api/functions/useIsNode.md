[katanakit-js](../index.md) / useIsNode

# Function: useIsNode()

```ts
function useIsNode(): boolean;
```

Defined in: [infrastructure/filesystem/path.service.ts:27](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/filesystem/path.service.ts#L27)

Checks whether the code runs in a Node.js-compatible runtime
(Node, Bun or Deno). Returns `false` in browsers and edge runtimes.

## Returns

`boolean`

`true` when `process.versions.node` is available.

## Example

```ts
import { useIsNode } from "katanakit-js";

if (useIsNode()) {
  // safe to use node:fs / node:path
}
```
