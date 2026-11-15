[katanakit-js](../index.md) / useMatchesMedia

# Function: useMatchesMedia()

```ts
function useMatchesMedia(query): boolean;
```

Defined in: [infrastructure/viewport/viewport.service.ts:56](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/viewport/viewport.service.ts#L56)

Tests a CSS media query against the current viewport.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `query` | `string` | A CSS media query string (e.g. `"(min-width: 768px)"`). |

## Returns

`boolean`

`true` if the query matches.

## Example

```ts
if (useMatchesMedia("(prefers-reduced-motion: reduce)")) {
  // disable animations
}
```
