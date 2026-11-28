[katanakit-js](../index.md) / onMatchesMedia

# Function: onMatchesMedia()

```ts
function onMatchesMedia(query): boolean;
```

Defined in: [infrastructure/viewport/viewport.service.ts:56](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/viewport/viewport.service.ts#L56)

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
if (onMatchesMedia("(prefers-reduced-motion: reduce)")) {
  // disable animations
}
```
