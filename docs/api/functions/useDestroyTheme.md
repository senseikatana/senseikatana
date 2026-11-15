[katanakit-js](../index.md) / useDestroyTheme

# Function: useDestroyTheme()

```ts
function useDestroyTheme(): void;
```

Defined in: [infrastructure/theme/theme.service.ts:232](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/theme/theme.service.ts#L232)

Cleans up the media-query listener. Call this when the theme system is
no longer needed (e.g. during teardown in tests).

## Returns

`void`

## Example

```ts
useDestroyTheme();
```
