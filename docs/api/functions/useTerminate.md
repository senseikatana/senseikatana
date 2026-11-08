[katanakit-js](../index.md) / useTerminate

# Function: useTerminate()

```ts
function useTerminate(key): void;
```

Defined in: [infrastructure/worker/worker.service.ts:241](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/worker/worker.service.ts#L241)

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
