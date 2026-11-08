[katanakit-js](../index.md) / useObserverObserveAll

# Function: useObserverObserveAll()

```ts
function useObserverObserveAll(key, selector): void;
```

Defined in: [infrastructure/observer/observer.service.ts:137](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/observer/observer.service.ts#L137)

Observes all elements matching a CSS selector under an existing observer key.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The observer key created via [useObserverCreate](useObserverCreate.md). |
| `selector` | `string` | A CSS selector string matching all elements to observe. |

## Returns

`void`

## Example

```ts
useObserverObserveAll("images", "img.lazy");
```
