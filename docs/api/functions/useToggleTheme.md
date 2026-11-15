[katanakit-js](../index.md) / useToggleTheme

# Function: useToggleTheme()

```ts
function useToggleTheme(): void;
```

Defined in: [infrastructure/theme/theme.service.ts:203](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/theme/theme.service.ts#L203)

Toggles between `"light"` and `"dark"` (ignores `"system"`).

## Returns

`void`

## Example

```ts
useToggleTheme(); // light -> dark, dark -> light
```
