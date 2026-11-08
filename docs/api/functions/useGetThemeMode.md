[katanakit-js](../index.md) / useGetThemeMode

# Function: useGetThemeMode()

```ts
function useGetThemeMode(): "system" | "light" | "dark";
```

Defined in: [infrastructure/theme/theme.service.ts:160](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/theme/theme.service.ts#L160)

Returns the current theme mode (may be `"system"`).

## Returns

`"system"` \| `"light"` \| `"dark"`

The active [ThemeMode](../type-aliases/ThemeMode.md).

## Example

```ts
const current = useGetThemeMode(); // "light" | "dark" | "system"
```
