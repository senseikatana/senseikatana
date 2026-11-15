[katanakit-js](../index.md) / useResetSession

# Function: useResetSession()

```ts
function useResetSession(sessionId): Promise<void>;
```

Defined in: [core/services/assistant.service.ts:327](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/assistant.service.ts#L327)

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
