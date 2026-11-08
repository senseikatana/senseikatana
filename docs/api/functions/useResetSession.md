[katanakit-js](../index.md) / useResetSession

# Function: useResetSession()

```ts
function useResetSession(sessionId): Promise<void>;
```

Defined in: [core/services/assistant.service.ts:327](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/assistant.service.ts#L327)

Deletes a conversation session and its messages.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `sessionId` | `string` | The conversation session id to reset. |

## Returns

`Promise`\<`void`\>

## Example

```ts
await useResetSession(sessionId);
```
