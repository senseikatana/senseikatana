[katanakit-js](../index.md) / useGetResolved

# Function: useGetResolved()

```ts
function useGetResolved(): "light" | "dark";
```

Defined in: [infrastructure/theme/theme.service.ts:173](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/theme/theme.service.ts#L173)

Returns the resolved theme (`"light"` or `"dark"`), accounting for system
preference when mode is `"system"`.

## Returns

`"light"` \| `"dark"`

The resolved color scheme.

## Example

```ts
const scheme = useGetResolved(); // "light" or "dark"
```
