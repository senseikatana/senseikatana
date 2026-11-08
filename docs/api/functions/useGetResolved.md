[katanakit-js](../index.md) / useGetResolved

# Function: useGetResolved()

```ts
function useGetResolved(): "light" | "dark";
```

Defined in: [infrastructure/theme/theme.service.ts:173](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/theme/theme.service.ts#L173)

Returns the resolved theme (`"light"` or `"dark"`), accounting for system
preference when mode is `"system"`.

## Returns

`"light"` \| `"dark"`

The resolved color scheme.

## Example

```ts
const scheme = useGetResolved(); // "light" or "dark"
```
