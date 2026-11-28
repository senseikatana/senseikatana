[katanakit-js](../index.md) / useObserverObserveAll

# Function: useObserverObserveAll()

```ts
function useObserverObserveAll(key, selector): void;
```

Defined in: [infrastructure/observer/observer.service.ts:137](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/observer/observer.service.ts#L137)

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
