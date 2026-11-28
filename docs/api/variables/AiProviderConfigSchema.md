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

Defined in: [schemas/ai.schema.ts:32](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/ai.schema.ts#L32)

Provider configuration for an OpenAI-compatible chat/agent endpoint.
