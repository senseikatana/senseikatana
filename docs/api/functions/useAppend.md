[katanakit-js](../index.md) / useAppend

# Function: useAppend()

```ts
function useAppend(target, child): void;
```

Defined in: [infrastructure/dom/dom.service.ts:455](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/dom/dom.service.ts#L455)

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
const item = useCreateElement("li");
useSetText(item, "New item");
useAppend("ul.list", item);
```
