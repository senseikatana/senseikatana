[katanakit-js](../index.md) / McpServerSchema

# Variable: McpServerSchema

```ts
const McpServerSchema: ZodObject<{
  command: ZodOptional<ZodArray<ZodString>>;
  disabled: ZodOptional<ZodBoolean>;
  environment: ZodOptional<ZodRecord<ZodString, ZodString>>;
  headers: ZodOptional<ZodRecord<ZodString, ZodString>>;
  name: ZodString;
  type: ZodEnum<{
     local: "local";
     remote: "remote";
  }>;
  url: ZodOptional<ZodString>;
}, $strip>;
```

Defined in: [schemas/keyvault.schema.ts:66](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/keyvault.schema.ts#L66)

One MCP server. Mirrors the OpenCode `mcp.servers` contract: a `local`
server runs a command over stdio, a `remote` server is an absolute
Streamable HTTP URL. Credential values use `{env:NAME}` substitution — the
vault keeps the real secret, config files keep the reference.
