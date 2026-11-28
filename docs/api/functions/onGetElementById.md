[katanakit-js](../index.md) / onGetElementById

# Function: onGetElementById()

```ts
function onGetElementById<T>(id): T | null;
```

Defined in: [infrastructure/dom/dom.service.ts:74](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/dom/dom.service.ts#L74)

Finds an element by its `id` attribute.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-t"></a> `T` *extends* `HTMLElement` | `HTMLElement` | The expected HTMLElement subtype. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | The element id (without `#`). |

## Returns

`T` \| `null`

The matching element, or `null`.

## Example

```ts
const btn = onGetElementById<HTMLButtonElement>("submit-btn");
```
