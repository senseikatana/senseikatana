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

Defined in: [schemas/ai.schema.ts:32](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/ai.schema.ts#L32)

Provider configuration for an OpenAI-compatible chat/agent endpoint.
