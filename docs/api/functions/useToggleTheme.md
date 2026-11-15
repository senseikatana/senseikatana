[katanakit-js](../index.md) / useToggleTheme

# Function: useToggleTheme()

```ts
function useToggleTheme(): void;
```

Defined in: [infrastructure/theme/theme.service.ts:203](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/theme/theme.service.ts#L203)

Toggles between `"light"` and `"dark"` (ignores `"system"`).

## Returns

`void`

## Example

```ts
useToggleTheme(); // light -> dark, dark -> light
```
