[katanakit-js](../index.md) / useSessionExists

# Function: useSessionExists()

```ts
function useSessionExists(sessionId): Promise<boolean>;
```

Defined in: [core/services/assistant.service.ts:298](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/assistant.service.ts#L298)

Checks whether a conversation session exists.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `sessionId` | `string` | The conversation session id. |

## Returns

`Promise`\<`boolean`\>

`true` when the session exists.

## Example

```ts
const exists = await useSessionExists(sessionId);
```
