[katanakit-js](../index.md) / useToggleTheme

# Function: useToggleTheme()

```ts
function useToggleTheme(): void;
```

Defined in: [infrastructure/theme/theme.service.ts:203](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/theme/theme.service.ts#L203)

Toggles between `"light"` and `"dark"` (ignores `"system"`).

## Returns

`void`

## Example

```ts
useToggleTheme(); // light -> dark, dark -> light
```
