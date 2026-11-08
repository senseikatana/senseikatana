[katanakit-js](../index.md) / IAiProviderStrategy

# Interface: IAiProviderStrategy

Defined in: [core/services/agent.service.ts:136](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/agent.service.ts#L136)

Estrategia de proveedor AI - Strategy Pattern.

Define el contrato que toda implementación de proveedor de completions debe
cumplir. El [AgentService](../classes/AgentService.md) delega la llamada HTTP en una estrategia
concreta, permitiendo intercambiar proveedores (DashScope, OpenAI,
self-hosted, mock en tests) sin tocar el bucle del agente.

## Methods

### requestCompletion()

```ts
requestCompletion(
   config, 
   messages, 
   options
): Promise<ChatCompletionResponse>;
```

Defined in: [core/services/agent.service.ts:146](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/agent.service.ts#L146)

Performs a single `chat/completions` request against the provider.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | \{ `apiKey`: `string`; `baseUrl`: `string`; `model`: `string`; `systemPrompt?`: `string`; \} | Provider configuration (baseUrl, model, apiKey). |
| `config.apiKey` | `string` | - |
| `config.baseUrl` | `string` | - |
| `config.model` | `string` | - |
| `config.systemPrompt?` | `string` | Default system prompt. |
| `messages` | \{ `content`: `string` \| `null`; `name?`: `string`; `role`: `"system"` \| `"user"` \| `"assistant"` \| `"tool"`; `tool_call_id?`: `string`; `tool_calls?`: \{ `function`: \{ `arguments`: `string`; `name`: `string`; \}; `id`: `string`; `type`: `"function"`; \}[]; \}[] | Conversation messages. |
| `options` | `RequestOptions` | Sampling options, tools and abort signal. |

#### Returns

`Promise`\<`ChatCompletionResponse`\>

The parsed provider response.

#### Throws

On non-2xx responses or transport failures.
