[katanakit-js](../index.md) / useToggleTheme

# Function: useToggleTheme()

```ts
function useToggleTheme(): void;
```

Defined in: [infrastructure/theme/theme.service.ts:203](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/theme/theme.service.ts#L203)

Toggles between `"light"` and `"dark"` (ignores `"system"`).

## Returns

`void`

## Example

```ts
useToggleTheme(); // light -> dark, dark -> light
```
