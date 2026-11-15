[katanakit-js](../index.md) / useGetThemeMode

# Function: useGetThemeMode()

```ts
function useGetThemeMode(): "system" | "light" | "dark";
```

Defined in: [infrastructure/theme/theme.service.ts:160](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/theme/theme.service.ts#L160)

Returns the current theme mode (may be `"system"`).

## Returns

`"system"` \| `"light"` \| `"dark"`

The active [ThemeMode](../type-aliases/ThemeMode.md).

## Example

```ts
const current = useGetThemeMode(); // "light" | "dark" | "system"
```
