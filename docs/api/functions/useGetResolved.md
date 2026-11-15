[katanakit-js](../index.md) / useGetResolved

# Function: useGetResolved()

```ts
function useGetResolved(): "light" | "dark";
```

Defined in: [infrastructure/theme/theme.service.ts:173](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/theme/theme.service.ts#L173)

Returns the resolved theme (`"light"` or `"dark"`), accounting for system
preference when mode is `"system"`.

## Returns

`"light"` \| `"dark"`

The resolved color scheme.

## Example

```ts
const scheme = useGetResolved(); // "light" or "dark"
```
