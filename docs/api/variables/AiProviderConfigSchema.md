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

Defined in: [schemas/ai.schema.ts:32](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/ai.schema.ts#L32)

Provider configuration for an OpenAI-compatible chat/agent endpoint.
