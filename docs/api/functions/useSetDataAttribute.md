[katanakit-js](../index.md) / useSetDataAttribute

# Function: useSetDataAttribute()

```ts
function useSetDataAttribute(
   target, 
   key, 
   value
): void;
```

Defined in: [infrastructure/dom/dom.service.ts:336](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/dom/dom.service.ts#L336)

Sets a `data-*` attribute on the target element.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` \| `HTMLElement` | A CSS selector string or an HTMLElement instance. |
| `key` | `string` | The data key (without the `data-` prefix). |
| `value` | `string` | The value to set. |

## Returns

`void`

## Example

```ts
useSetDataAttribute("tr.row", "status", "active");
```
