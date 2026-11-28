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

Defined in: [schemas/ai.schema.ts:29](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/ai.schema.ts#L29)

Provider configuration for an OpenAI-compatible chat/agent endpoint.
