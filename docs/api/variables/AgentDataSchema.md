[katanakit-js](../index.md) / AgentDataSchema

# Variable: AgentDataSchema

```ts
const AgentDataSchema: ZodObject<{
  finalMessage: ZodString;
  steps: ZodArray<ZodObject<{
     toolCalls: ZodArray<ZodObject<{
        function: ZodObject<{
           arguments: ZodString;
           name: ZodString;
        }, $strip>;
        id: ZodString;
        type: ZodLiteral<"function">;
     }, $strip>>;
     toolResults: ZodArray<ZodUnknown>;
  }, $strip>>;
}, $strip>;
```

Defined in: [schemas/core.schema.ts:199](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/core.schema.ts#L199)

Payload returned by a successful `useRunAgent` call.
