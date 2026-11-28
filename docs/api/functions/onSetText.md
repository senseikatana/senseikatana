[katanakit-js](../index.md) / onSetText

# Function: onSetText()

```ts
function onSetText(target, text): void;
```

Defined in: [infrastructure/dom/dom.service.ts:437](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/dom/dom.service.ts#L437)

Sets the `textContent` of the target element (safe for user input).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` \| `Element` | A CSS selector string or an Element instance. |
| `text` | `string` | The plain text to set. |

## Returns

`void`

## Example

```ts
onSetText("#greeting", "Hello, world!");
```
