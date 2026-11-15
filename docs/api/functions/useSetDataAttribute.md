[katanakit-js](../index.md) / useSetDataAttribute

# Function: useSetDataAttribute()

```ts
function useSetDataAttribute(
   target, 
   key, 
   value
): void;
```

Defined in: [infrastructure/dom/dom.service.ts:336](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/dom/dom.service.ts#L336)

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
