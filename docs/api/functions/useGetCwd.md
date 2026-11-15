[katanakit-js](../index.md) / useGetCwd

# Function: useGetCwd()

```ts
function useGetCwd(): string | null;
```

Defined in: [infrastructure/filesystem/path.service.ts:167](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/filesystem/path.service.ts#L167)

Returns the current working directory of the process (where the
command was launched), or `null` outside a Node-compatible runtime.
Use it for project-relative paths; use [useGetDirname](useGetDirname.md) for
file-relative paths.

## Returns

`string` \| `null`

The cwd, or `null` in browsers/edge runtimes.

## Example

```ts
const cwd = useGetCwd(); // "/app" when launched from the project root
```
