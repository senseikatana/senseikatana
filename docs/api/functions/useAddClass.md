[katanakit-js](../index.md) / useAddClass

# Function: useAddClass()

```ts
function useAddClass(target, className): void;
```

Defined in: [infrastructure/dom/dom.service.ts:153](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/dom/dom.service.ts#L153)

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
