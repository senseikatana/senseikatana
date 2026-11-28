[katanakit-js](../index.md) / useSessionExists

# Function: useSessionExists()

```ts
function useSessionExists(sessionId): Promise<boolean>;
```

Defined in: [core/services/assistant.service.ts:298](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/assistant.service.ts#L298)

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
