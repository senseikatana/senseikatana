[katanakit-js](../index.md) / useGetAttribute

# Function: useGetAttribute()

```ts
function useGetAttribute(target, attr): string | null;
```

Defined in: [infrastructure/dom/dom.service.ts:231](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/dom/dom.service.ts#L231)

Gets the value of an attribute from the target element.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` \| `Element` | A CSS selector string or an Element instance. |
| `attr` | `string` | The attribute name. |

## Returns

`string` \| `null`

The attribute value, or `null` if not present or element not found.

## Example

```ts
const href = useGetAttribute("a.link", "href");
```
