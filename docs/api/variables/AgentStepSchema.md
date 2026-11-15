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

Defined in: [schemas/core.schema.ts:193](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/core.schema.ts#L193)

One round of tool execution inside the agent loop.
