[katanakit-js](../index.md) / onHasClass

# Function: onHasClass()

```ts
function onHasClass(target, className): boolean;
```

Defined in: [infrastructure/dom/dom.service.ts:215](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/dom/dom.service.ts#L215)

Checks whether the target element has a given CSS class.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` \| `Element` | A CSS selector string or an Element instance. |
| `className` | `string` | The class name to check. |

## Returns

`boolean`

`true` if the class exists, `false` otherwise.

## Example

```ts
if (onHasClass(".btn", "disabled")) {
  // button is disabled
}
```
