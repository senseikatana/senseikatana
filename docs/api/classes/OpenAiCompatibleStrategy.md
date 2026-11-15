[katanakit-js](../index.md) / OpenAiCompatibleStrategy

# Class: OpenAiCompatibleStrategy

Defined in: [core/services/agent.service.ts:174](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/agent.service.ts#L174)

Estrategia por defecto: proveedor compatible con OpenAI
(`POST /chat/completions` con Bearer token). Cubre DashScope en modo
compatible, OpenAI, Azure OpenAI y la mayoría de endpoints self-hosted.

## Example

```ts
const strategy = new OpenAiCompatibleStrategy();
const response = await strategy.requestCompletion(config, messages, {});
```

## Implements

- [`IAiProviderStrategy`](../interfaces/IAiProviderStrategy.md)

## Constructors

### Constructor

```ts
new OpenAiCompatibleStrategy(): OpenAiCompatibleStrategy;
```

#### Returns

`OpenAiCompatibleStrategy`

## Methods

### requestCompletion()

```ts
requestCompletion(
   config, 
   messages, 
   options
): Promise<ChatCompletionResponse>;
```

Defined in: [core/services/agent.service.ts:179](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/agent.service.ts#L179)

Performs a raw `chat/completions` request against the provider.
Throws AiHttpError on non-2xx responses.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | \{ `apiKey`: `string`; `baseUrl`: `string`; `model`: `string`; `systemPrompt?`: `string`; \} | - |
| `config.apiKey?` | `string` | - |
| `config.baseUrl?` | `string` | - |
| `config.model?` | `string` | - |
| `config.systemPrompt?` | `string` | Default system prompt. |
| `messages` | \{ `content`: `string` \| `null`; `name?`: `string`; `role`: `"system"` \| `"user"` \| `"assistant"` \| `"tool"`; `tool_call_id?`: `string`; `tool_calls?`: \{ `function`: \{ `arguments`: `string`; `name`: `string`; \}; `id`: `string`; `type`: `"function"`; \}[]; \}[] | - |
| `options` | `RequestOptions` | - |

#### Returns

`Promise`\<`ChatCompletionResponse`\>

#### Implementation of

[`IAiProviderStrategy`](../interfaces/IAiProviderStrategy.md).[`requestCompletion`](../interfaces/IAiProviderStrategy.md#requestcompletion)
