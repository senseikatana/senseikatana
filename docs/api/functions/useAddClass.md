[katanakit-js](../index.md) / useAddClass

# Function: useAddClass()

```ts
function useAddClass(target, className): void;
```

Defined in: [infrastructure/dom/dom.service.ts:153](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/dom/dom.service.ts#L153)

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
