[katanakit-js](../index.md) / onSetDataAttribute

# Function: onSetDataAttribute()

```ts
function onSetDataAttribute(
   target, 
   key, 
   value
): void;
```

Defined in: [infrastructure/dom/dom.service.ts:336](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/dom/dom.service.ts#L336)

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
onSetDataAttribute("tr.row", "status", "active");
```
