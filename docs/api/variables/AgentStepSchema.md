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

Defined in: [schemas/core.schema.ts:184](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/core.schema.ts#L184)

One round of tool execution inside the agent loop.
