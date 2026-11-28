[katanakit-js](../index.md) / useSetTempTitle

# Function: useSetTempTitle()

```ts
function useSetTempTitle(tempTitle, durationMs?): void;
```

Defined in: [infrastructure/viewport/viewport.service.ts:375](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/viewport/viewport.service.ts#L375)

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
useSetTempTitle("(2) New messages!", 5000);
// title reverts after 5 seconds
```
