[katanakit-js](../index.md) / useGetResolved

# Function: useGetResolved()

```ts
function useGetResolved(): "light" | "dark";
```

Defined in: [infrastructure/theme/theme.service.ts:173](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/theme/theme.service.ts#L173)

Returns the resolved theme (`"light"` or `"dark"`), accounting for system
preference when mode is `"system"`.

## Returns

`"light"` \| `"dark"`

The resolved color scheme.

## Example

```ts
const scheme = useGetResolved(); // "light" or "dark"
```
