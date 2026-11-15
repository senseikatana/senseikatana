[katanakit-js](../index.md) / useAddClass

# Function: useAddClass()

```ts
function useAddClass(target, className): void;
```

Defined in: [infrastructure/dom/dom.service.ts:153](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/dom/dom.service.ts#L153)

Adds one or more CSS classes to the target element.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` \| `Element` | A CSS selector string or an Element instance. |
| `className` | `string` | The class name to add. |

## Returns

`void`

## Example

```ts
useAddClass("#header", "sticky");
useAddClass(myElement, "visible");
```
