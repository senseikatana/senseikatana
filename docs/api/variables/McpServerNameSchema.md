[katanakit-js](../index.md) / McpServerNameSchema

# Variable: McpServerNameSchema

```ts
const McpServerNameSchema: ZodString;
```

Defined in: [schemas/keyvault.schema.ts:54](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/keyvault.schema.ts#L54)

MCP server name. Restricted to characters that survive OpenCode's tool-name
normalization (`<server>_<tool>`, everything else becomes `_`), so two
differently-spelled names can never collapse into the same tool prefix.
