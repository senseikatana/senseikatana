[katanakit-js](../index.md) / AgentStepSchema

# Variable: AgentStepSchema

```ts
const AgentStepSchema: ZodObject<{
  toolCalls: ZodArray<ZodObject<{
     function: ZodObject<{
        arguments: ZodString;
        name: ZodString;
     }, $strip>;
     id: ZodString;
     type: ZodLiteral<"function">;
  }, $strip>>;
  toolResults: ZodArray<ZodUnknown>;
}, $strip>;
```

Defined in: [schemas/core.schema.ts:193](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/core.schema.ts#L193)

One round of tool execution inside the agent loop.
