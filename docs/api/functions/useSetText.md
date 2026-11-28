[katanakit-js](../index.md) / useSetText

# Function: useSetText()

```ts
function useSetText(target, text): void;
```

Defined in: [infrastructure/dom/dom.service.ts:437](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/dom/dom.service.ts#L437)

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
useSetText("#greeting", "Hello, world!");
```
