[katanakit-js](../index.md) / useTerminate

# Function: useTerminate()

```ts
function useTerminate(key): void;
```

Defined in: [infrastructure/worker/worker.service.ts:241](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/worker/worker.service.ts#L241)

Terminates a specific Worker pool and rejects any in-flight tasks.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The pool key to terminate. |

## Returns

`void`

## Example

```ts
useTerminate("heavy");
```
