[katanakit-js](../index.md) / AiProviderConfigSchema

# Variable: AiProviderConfigSchema

```ts
const AiProviderConfigSchema: ZodObject<{
  apiKey: ZodString;
  baseUrl: ZodString;
  model: ZodString;
  systemPrompt: ZodOptional<ZodString>;
}, $strip>;
```

Defined in: [schemas/ai.schema.ts:32](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/ai.schema.ts#L32)

Provider configuration for an OpenAI-compatible chat/agent endpoint.
