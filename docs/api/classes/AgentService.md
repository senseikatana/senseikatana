[katanakit-js](../index.md) / AgentService

# Class: AgentService

Defined in: [core/services/agent.service.ts:258](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/agent.service.ts#L258)

AgentService - Singleton facade con Strategy Pattern.

Centraliza el registro del proveedor AI y el bucle de completions,
delegando la llamada HTTP en una [IAiProviderStrategy](../interfaces/IAiProviderStrategy.md)
intercambiable. Por defecto usa [OpenAiCompatibleStrategy](OpenAiCompatibleStrategy.md).

## Example

```ts
// Configurar el proveedor
AgentService.getInstance().useInitAgent({ apiKey: process.env.DASHSCOPE_API_KEY });

// Cambiar de estrategia en runtime (p. ej. un mock en tests)
AgentService.getInstance().useSetStrategy(new OpenAiCompatibleStrategy());
```

## Methods

### useChat()

```ts
useChat(messages, options?): Promise<AiResult<string>>;
```

Defined in: [core/services/agent.service.ts:373](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/agent.service.ts#L373)

Sends a single chat completion and returns the assistant text as a Safe Result.

Use this for review / questioning (single-shot). For autonomous multi-step
work with tools, use [useRunAgent](../functions/useRunAgent.md).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `messages` | \{ `content`: `string` \| `null`; `name?`: `string`; `role`: `"system"` \| `"user"` \| `"assistant"` \| `"tool"`; `tool_call_id?`: `string`; `tool_calls?`: \{ `function`: \{ `arguments`: `string`; `name`: `string`; \}; `id`: `string`; `type`: `"function"`; \}[]; \}[] | Conversation messages (a system prompt is prepended if absent). |
| `options` | [`AiChatOptions`](../interfaces/AiChatOptions.md) | Optional completion options. |

#### Returns

`Promise`\<[`AiResult`](../type-aliases/AiResult.md)\<`string`\>\>

A `AiResult` with the assistant text.

#### Example

```ts
import { useChat } from "katanakit-js";

const result = await useChat([
  { role: "user", content: "Summarize the benefits of solar energy in three bullet points." },
]);
if (result.ok) console.log(result.data);
```

***

### useGetStrategy()

```ts
useGetStrategy(): IAiProviderStrategy;
```

Defined in: [core/services/agent.service.ts:304](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/agent.service.ts#L304)

Returns the currently active provider strategy.

#### Returns

[`IAiProviderStrategy`](../interfaces/IAiProviderStrategy.md)

***

### useInitAgent()

```ts
useInitAgent(config?): void;
```

Defined in: [core/services/agent.service.ts:334](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/agent.service.ts#L334)

Registers the AI provider for the Kitt assistant.

`apiKey` falls back to `process.env.DASHSCOPE_API_KEY`; `baseUrl`, `model`
and `systemPrompt` fall back to the [kittPreset](../variables/kittPreset.md) defaults.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | `Partial`\<[`AiProviderConfig`](../type-aliases/AiProviderConfig.md)\> | Partial provider configuration. |

#### Returns

`void`

#### Example

```ts
import { useInitAgent } from "katanakit-js";

useInitAgent({
  apiKey: process.env.DASHSCOPE_API_KEY,
  model: "qwen3.8-max",
});
```

***

### useRunAgent()

```ts
useRunAgent(goal, options?): Promise<AgentResult>;
```

Defined in: [core/services/agent.service.ts:423](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/agent.service.ts#L423)

Runs the tool-calling agent loop against a goal until it emits a final
answer or exhausts `maxSteps`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `goal` | `string` | The natural-language objective. |
| `options` | [`AgentRunOptions`](../interfaces/AgentRunOptions.md) | Tools, step budget and completion options. |

#### Returns

`Promise`\<[`AgentResult`](../type-aliases/AgentResult.md)\>

An `AgentResult` with the final message and executed steps.

#### Example

```ts
import { useRunAgent } from "katanakit-js";

const result = await useRunAgent("Fix the type errors reported by tsc", {
  tools: [
    {
      name: "runCommand",
      description: "Runs a shell command and returns its output",
      parameters: { type: "object", properties: { command: { type: "string" } } },
      execute: (input) => shell.run(input.command),
    },
  ],
  maxSteps: 12,
});
```

***

### useSetStrategy()

```ts
useSetStrategy(strategy): void;
```

Defined in: [core/services/agent.service.ts:299](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/agent.service.ts#L299)

Intercambia la estrategia de proveedor en runtime (Strategy Pattern).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `strategy` | [`IAiProviderStrategy`](../interfaces/IAiProviderStrategy.md) | La nueva estrategia a utilizar. |

#### Returns

`void`

***

### create()

```ts
static create(strategy?): AgentService;
```

Defined in: [core/services/agent.service.ts:290](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/agent.service.ts#L290)

Crea una instancia NO-singleton con una estrategia específica.
Útil para tests o para aislar varios proveedores.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `strategy?` | [`IAiProviderStrategy`](../interfaces/IAiProviderStrategy.md) | Estrategia a inyectar. |

#### Returns

`AgentService`

Una nueva instancia de AgentService.

***

### getInstance()

```ts
static getInstance(): AgentService;
```

Defined in: [core/services/agent.service.ts:276](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/agent.service.ts#L276)

Obtiene la instancia única del AgentService (Singleton).

#### Returns

`AgentService`

La instancia única de AgentService.
