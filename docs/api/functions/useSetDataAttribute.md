[katanakit-js](../index.md) / useSetDataAttribute

# Function: useSetDataAttribute()

```ts
function useSetDataAttribute(
   target, 
   key, 
   value
): void;
```

Defined in: [infrastructure/dom/dom.service.ts:336](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/dom/dom.service.ts#L336)

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
