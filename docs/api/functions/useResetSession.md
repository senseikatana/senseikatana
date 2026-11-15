[katanakit-js](../index.md) / useResetSession

# Function: useResetSession()

```ts
function useResetSession(sessionId): Promise<void>;
```

Defined in: [core/services/assistant.service.ts:327](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/assistant.service.ts#L327)

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
