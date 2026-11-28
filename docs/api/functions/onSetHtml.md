[katanakit-js](../index.md) / onSetHtml

# Function: onSetHtml()

```ts
function onSetHtml(target, html): void;
```

Defined in: [infrastructure/dom/dom.service.ts:421](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/dom/dom.service.ts#L421)

Sets `innerHTML` on the target element.

**XSS risk:** this is an HTML injection sink. Never pass unsanitized
user input. Prefer [onSetText](onSetText.md) for plain text, or sanitize with
a trusted library (e.g. DOMPurify) before calling this function.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` \| `Element` | A CSS selector string or an Element instance. |
| `html` | `string` | The HTML string to set. |

## Returns

`void`

## Example

```ts
// Safe — trusted static markup
onSetHtml("#banner", "<strong>Hello</strong>");

// Unsafe — do NOT do this with user content
// onSetHtml("#out", userInput);
```
