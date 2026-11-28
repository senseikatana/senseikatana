[katanakit-js](../index.md) / AssistantService

# Class: AssistantService

Defined in: [core/services/assistant.service.ts:104](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/assistant.service.ts#L104)

AssistantService - Singleton para el asistente conversacional.

Aplica el patrón Singleton: una única instancia mantiene el store de
conversaciones, las herramientas y el presupuesto de pasos del agente.
El store es intercambiable (Strategy implícita: in-memory por defecto,
Prisma u otro persistente vía `initAssistant`), y la lógica de completado
delega en [AgentService](AgentService.md).

## Example

```ts
const assistant = AssistantService.getInstance();
assistant.initAssistant({ model: "qwen3.8-max" });
const result = await assistant.reply(undefined, "Hello!");
```

## Implements

- [`IAssistantService`](../interfaces/IAssistantService.md)

## Methods

### createSession()

```ts
createSession(channel?): Promise<string>;
```

Defined in: [core/services/assistant.service.ts:163](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/assistant.service.ts#L163)

Creates a new conversation session.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `channel?` | `string` | Optional free-form channel tag (e.g. `"rest"`). |

#### Returns

`Promise`\<`string`\>

The new session id.

#### Implementation of

[`IAssistantService`](../interfaces/IAssistantService.md).[`createSession`](../interfaces/IAssistantService.md#createsession)

***

### getHistory()

```ts
getHistory(sessionId): Promise<{
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

Defined in: [core/services/assistant.service.ts:183](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/assistant.service.ts#L183)

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

[`IAssistantService`](../interfaces/IAssistantService.md).[`getHistory`](../interfaces/IAssistantService.md#gethistory)

***

### initAssistant()

```ts
initAssistant(config?): void;
```

Defined in: [core/services/assistant.service.ts:144](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/assistant.service.ts#L144)

Configures the assistant: provider (Kitt) plus an optional conversation store.

Defaults mirror `onInitAgent`: `apiKey` falls back to
`process.env.DASHSCOPE_API_KEY`, and `baseUrl`/`model`/`systemPrompt` fall
back to the Kitt preset. The default store is in-memory; pass
`{ store }` to persist conversations (e.g. a Prisma-backed store).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config?` | [`AssistantInitConfig`](../interfaces/AssistantInitConfig.md) | Assistant configuration. |

#### Returns

`void`

#### Example

```ts
AssistantService.getInstance().initAssistant({ model: "qwen3.8-max" });
```

#### Implementation of

[`IAssistantService`](../interfaces/IAssistantService.md).[`initAssistant`](../interfaces/IAssistantService.md#initassistant)

***

### reply()

```ts
reply(
   sessionId, 
   text, 
   options?
): Promise<AssistantResult>;
```

Defined in: [core/services/assistant.service.ts:212](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/assistant.service.ts#L212)

Sends a user message within a conversation and returns the assistant reply.
If no `sessionId` is provided, a new session is created. The user message and
the assistant reply are persisted only on success.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `sessionId` | `string` \| `undefined` | Existing session id, or `undefined` to start a new one. |
| `text` | `string` | The user's message. |
| `options?` | [`AssistantReplyOptions`](../interfaces/AssistantReplyOptions.md) | Optional completion options. |

#### Returns

`Promise`\<[`AssistantResult`](../type-aliases/AssistantResult.md)\>

An [AssistantResult](../type-aliases/AssistantResult.md) with the reply and session id.

#### Example

```ts
const result = await AssistantService.getInstance().reply(undefined, "Hello!");
if (result.ok) console.log(result.data.reply);
```

#### Implementation of

[`IAssistantService`](../interfaces/IAssistantService.md).[`reply`](../interfaces/IAssistantService.md#reply)

***

### resetSession()

```ts
resetSession(sessionId): Promise<void>;
```

Defined in: [core/services/assistant.service.ts:192](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/assistant.service.ts#L192)

Deletes a conversation session and its messages.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `sessionId` | `string` | The conversation session id to reset. |

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`IAssistantService`](../interfaces/IAssistantService.md).[`resetSession`](../interfaces/IAssistantService.md#resetsession)

***

### sessionExists()

```ts
sessionExists(sessionId): Promise<boolean>;
```

Defined in: [core/services/assistant.service.ts:173](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/assistant.service.ts#L173)

Checks whether a conversation session exists.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `sessionId` | `string` | The conversation session id. |

#### Returns

`Promise`\<`boolean`\>

`true` when the session exists.

#### Implementation of

[`IAssistantService`](../interfaces/IAssistantService.md).[`sessionExists`](../interfaces/IAssistantService.md#sessionexists)

***

### getInstance()

```ts
static getInstance(): AssistantService;
```

Defined in: [core/services/assistant.service.ts:122](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/assistant.service.ts#L122)

Obtiene la instancia única del AssistantService (Singleton).

#### Returns

`AssistantService`

La instancia única de AssistantService.
