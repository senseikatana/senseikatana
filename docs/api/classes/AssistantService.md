[katanakit-js](../index.md) / AssistantService

# Class: AssistantService

Defined in: [core/services/assistant.service.ts:104](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/assistant.service.ts#L104)

AssistantService - Singleton para el asistente conversacional.

Aplica el patrón Singleton: una única instancia mantiene el store de
conversaciones, las herramientas y el presupuesto de pasos del agente.
El store es intercambiable (Strategy implícita: in-memory por defecto,
Prisma u otro persistente vía `useInitAssistant`), y la lógica de completado
delega en [AgentService](AgentService.md).

## Example

```ts
const assistant = AssistantService.getInstance();
assistant.useInitAssistant({ model: "qwen3.8-max" });
const result = await assistant.useReply(undefined, "Hello!");
```

## Implements

- [`IAssistantService`](../interfaces/IAssistantService.md)

## Methods

### useCreateSession()

```ts
useCreateSession(channel?): Promise<string>;
```

Defined in: [core/services/assistant.service.ts:165](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/assistant.service.ts#L165)

Creates a new conversation session.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `channel?` | `string` | Optional free-form channel tag (e.g. `"rest"`). |

#### Returns

`Promise`\<`string`\>

The new session id.

#### Implementation of

[`IAssistantService`](../interfaces/IAssistantService.md).[`useCreateSession`](../interfaces/IAssistantService.md#usecreatesession)

***

### useGetHistory()

```ts
useGetHistory(sessionId): Promise<{
  content: string | null;
  name?: string;
  role: "system" | "user" | "assistant" | "tool";
  tool_call_id?: string;
  tool_calls?: {
     function: {
        arguments: string;
        name: string;
     };
     id: string;
     type: "function";
  }[];
}[]>;
```

Defined in: [core/services/assistant.service.ts:185](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/assistant.service.ts#L185)

Returns the full message history of a session, oldest first.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `sessionId` | `string` | The conversation session id. |

#### Returns

`Promise`\<\{
  `content`: `string` \| `null`;
  `name?`: `string`;
  `role`: `"system"` \| `"user"` \| `"assistant"` \| `"tool"`;
  `tool_call_id?`: `string`;
  `tool_calls?`: \{
     `function`: \{
        `arguments`: `string`;
        `name`: `string`;
     \};
     `id`: `string`;
     `type`: `"function"`;
  \}[];
\}[]\>

The accumulated messages.

#### Implementation of

[`IAssistantService`](../interfaces/IAssistantService.md).[`useGetHistory`](../interfaces/IAssistantService.md#usegethistory)

***

### useInitAssistant()

```ts
useInitAssistant(config?): void;
```

Defined in: [core/services/assistant.service.ts:146](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/assistant.service.ts#L146)

Configures the assistant: provider (Kitt) plus an optional conversation store.

Defaults mirror `useInitAgent`: `apiKey` falls back to
`process.env.DASHSCOPE_API_KEY`, and `baseUrl`/`model`/`systemPrompt` fall
back to the Kitt preset. The default store is in-memory; pass
`{ store }` to persist conversations (e.g. a Prisma-backed store).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`AssistantInitConfig`](../interfaces/AssistantInitConfig.md) | Assistant configuration. |

#### Returns

`void`

#### Example

```ts
AssistantService.getInstance().useInitAssistant({ model: "qwen3.8-max" });
```

#### Implementation of

[`IAssistantService`](../interfaces/IAssistantService.md).[`useInitAssistant`](../interfaces/IAssistantService.md#useinitassistant)

***

### useReply()

```ts
useReply(
   sessionId, 
   text, 
   options?
): Promise<AssistantResult>;
```

Defined in: [core/services/assistant.service.ts:214](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/assistant.service.ts#L214)

Sends a user message within a conversation and returns the assistant reply.
If no `sessionId` is provided, a new session is created. The user message and
the assistant reply are persisted only on success.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `sessionId` | `string` \| `undefined` | Existing session id, or `undefined` to start a new one. |
| `text` | `string` | The user's message. |
| `options` | [`AssistantReplyOptions`](../interfaces/AssistantReplyOptions.md) | Optional completion options. |

#### Returns

`Promise`\<[`AssistantResult`](../type-aliases/AssistantResult.md)\>

An [AssistantResult](../type-aliases/AssistantResult.md) with the reply and session id.

#### Example

```ts
const result = await AssistantService.getInstance().useReply(undefined, "Hello!");
if (result.ok) console.log(result.data.reply);
```

#### Implementation of

[`IAssistantService`](../interfaces/IAssistantService.md).[`useReply`](../interfaces/IAssistantService.md#usereply)

***

### useResetSession()

```ts
useResetSession(sessionId): Promise<void>;
```

Defined in: [core/services/assistant.service.ts:194](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/assistant.service.ts#L194)

Deletes a conversation session and its messages.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `sessionId` | `string` | The conversation session id to reset. |

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`IAssistantService`](../interfaces/IAssistantService.md).[`useResetSession`](../interfaces/IAssistantService.md#useresetsession)

***

### useSessionExists()

```ts
useSessionExists(sessionId): Promise<boolean>;
```

Defined in: [core/services/assistant.service.ts:175](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/assistant.service.ts#L175)

Checks whether a conversation session exists.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `sessionId` | `string` | The conversation session id. |

#### Returns

`Promise`\<`boolean`\>

`true` when the session exists.

#### Implementation of

[`IAssistantService`](../interfaces/IAssistantService.md).[`useSessionExists`](../interfaces/IAssistantService.md#usesessionexists)

***

### getInstance()

```ts
static getInstance(): AssistantService;
```

Defined in: [core/services/assistant.service.ts:124](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/assistant.service.ts#L124)

Obtiene la instancia única del AssistantService (Singleton).

#### Returns

`AssistantService`

La instancia única de AssistantService.
