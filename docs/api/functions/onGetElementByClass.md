[katanakit-js](../index.md) / onGetElementByClass

# Function: onGetElementByClass()

```ts
function onGetElementByClass<T>(className): T | null;
```

Defined in: [infrastructure/dom/dom.service.ts:92](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/dom/dom.service.ts#L92)

Finds the first element matching a class name.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-t"></a> `T` *extends* `HTMLElement` | `HTMLElement` | The expected HTMLElement subtype. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `className` | `string` | A class name, with or without a leading `.`. |

## Returns

`T` \| `null`

The matching element, or `null`.

## Example

```ts
const card = onGetElementByClass(".card");
const card2 = onGetElementByClass("card"); // equivalent
```
