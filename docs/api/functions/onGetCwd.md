[katanakit-js](../index.md) / onGetCwd

# Function: onGetCwd()

```ts
function onGetCwd(): string | null;
```

Defined in: [infrastructure/filesystem/path.service.ts:167](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/filesystem/path.service.ts#L167)

Returns the current working directory of the process (where the
command was launched), or `null` outside a Node-compatible runtime.
Use it for project-relative paths; use [onGetDirname](onGetDirname.md) for
file-relative paths.

## Returns

`string` \| `null`

The cwd, or `null` in browsers/edge runtimes.

## Example

```ts
const cwd = onGetCwd(); // "/app" when launched from the project root
```
