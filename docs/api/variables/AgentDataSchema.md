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

Defined in: [schemas/core.schema.ts:190](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/core.schema.ts#L190)

Payload returned by a successful `onRunAgent` call.
