[katanakit-js](../index.md) / onSetTempTitle

# Function: onSetTempTitle()

```ts
function onSetTempTitle(tempTitle, durationMs?): void;
```

Defined in: [infrastructure/viewport/viewport.service.ts:371](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/viewport/viewport.service.ts#L371)

Temporarily changes the document title, restoring the original after `durationMs`.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `tempTitle` | `string` | `undefined` | The temporary title to display. |
| `durationMs?` | `number` | `3000` | How long to show it (default: `3000`). |

## Returns

`void`

## Example

```ts
onSetTempTitle("(2) New messages!", 5000);
// title reverts after 5 seconds
```
