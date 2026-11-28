[katanakit-js](../index.md) / onGetResolved

# Function: onGetResolved()

```ts
function onGetResolved(): "light" | "dark";
```

Defined in: [infrastructure/theme/theme.service.ts:168](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/theme/theme.service.ts#L168)

Returns the resolved theme (`"light"` or `"dark"`), accounting for system
preference when mode is `"system"`.

## Returns

`"light"` \| `"dark"`

The resolved color scheme.

## Example

```ts
const scheme = onGetResolved(); // "light" or "dark"
```
