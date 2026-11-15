[katanakit-js](../index.md) / useIsNode

# Function: useIsNode()

```ts
function useIsNode(): boolean;
```

Defined in: [infrastructure/filesystem/path.service.ts:27](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/filesystem/path.service.ts#L27)

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
