[katanakit-js](../index.md) / useCreateSession

# Function: useCreateSession()

```ts
function useCreateSession(channel?): Promise<string>;
```

Defined in: [core/services/assistant.service.ts:283](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/assistant.service.ts#L283)

Creates a new conversation session.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `channel?` | `string` | Optional free-form channel tag (e.g. `"rest"`). |

## Returns

`Promise`\<`string`\>

The new session id.

## Example

```ts
const sessionId = await useCreateSession("rest");
```
