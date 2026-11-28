[katanakit-js](../index.md) / onAppend

# Function: onAppend()

```ts
function onAppend(target, child): void;
```

Defined in: [infrastructure/dom/dom.service.ts:455](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/dom/dom.service.ts#L455)

Appends a child element to the target parent.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` \| `Element` | A CSS selector string or an Element instance (the parent). |
| `child` | `string` \| `Element` | A CSS selector string or an Element instance (the child). |

## Returns

`void`

## Example

```ts
const item = onCreateElement("li");
onSetText(item, "New item");
onAppend("ul.list", item);
```
