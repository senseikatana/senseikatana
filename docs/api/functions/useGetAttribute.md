[katanakit-js](../index.md) / useGetAttribute

# Function: useGetAttribute()

```ts
function useGetAttribute(target, attr): string | null;
```

Defined in: [infrastructure/dom/dom.service.ts:231](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/dom/dom.service.ts#L231)

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
