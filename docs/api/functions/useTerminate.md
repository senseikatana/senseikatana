[katanakit-js](../index.md) / useTerminate

# Function: useTerminate()

```ts
function useTerminate(key): void;
```

Defined in: [infrastructure/worker/worker.service.ts:241](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/worker/worker.service.ts#L241)

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
