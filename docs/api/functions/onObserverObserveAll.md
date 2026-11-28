[katanakit-js](../index.md) / onObserverObserveAll

# Function: onObserverObserveAll()

```ts
function onObserverObserveAll(key, selector): void;
```

Defined in: [infrastructure/observer/observer.service.ts:137](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/observer/observer.service.ts#L137)

Observes all elements matching a CSS selector under an existing observer key.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The observer key created via [onObserverCreate](onObserverCreate.md). |
| `selector` | `string` | A CSS selector string matching all elements to observe. |

## Returns

`void`

## Example

```ts
onObserverObserveAll("images", "img.lazy");
```
