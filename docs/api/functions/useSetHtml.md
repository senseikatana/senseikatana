[katanakit-js](../index.md) / useSetHtml

# Function: useSetHtml()

```ts
function useSetHtml(target, html): void;
```

Defined in: [infrastructure/dom/dom.service.ts:421](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/dom/dom.service.ts#L421)

Sets `innerHTML` on the target element.

**XSS risk:** this is an HTML injection sink. Never pass unsanitized
user input. Prefer [useSetText](useSetText.md) for plain text, or sanitize with
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
useSetHtml("#banner", "<strong>Hello</strong>");

// Unsafe — do NOT do this with user content
// useSetHtml("#out", userInput);
```
