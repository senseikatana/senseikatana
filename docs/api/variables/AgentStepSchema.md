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

Defined in: [schemas/core.schema.ts:193](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/core.schema.ts#L193)

One round of tool execution inside the agent loop.
