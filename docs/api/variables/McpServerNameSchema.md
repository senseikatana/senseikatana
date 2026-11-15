[katanakit-js](../index.md) / McpServerNameSchema

# Variable: McpServerNameSchema

```ts
const McpServerNameSchema: ZodString;
```

Defined in: [schemas/keyvault.schema.ts:54](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/keyvault.schema.ts#L54)

MCP server name. Restricted to characters that survive OpenCode's tool-name
normalization (`<server>_<tool>`, everything else becomes `_`), so two
differently-spelled names can never collapse into the same tool prefix.
