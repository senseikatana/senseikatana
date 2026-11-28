[katanakit-js](../index.md) / useHasClass

# Function: useHasClass()

```ts
function useHasClass(target, className): boolean;
```

Defined in: [infrastructure/dom/dom.service.ts:215](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/dom/dom.service.ts#L215)

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
