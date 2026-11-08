[katanakit-js](../index.md) / useHasClass

# Function: useHasClass()

```ts
function useHasClass(target, className): boolean;
```

Defined in: [infrastructure/dom/dom.service.ts:215](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/dom/dom.service.ts#L215)

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
if (useHasClass(".btn", "disabled")) {
  // button is disabled
}
```
