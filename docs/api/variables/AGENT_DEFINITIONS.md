[katanakit-js](../index.md) / AGENT\_DEFINITIONS

# Variable: AGENT\_DEFINITIONS

```ts
const AGENT_DEFINITIONS: readonly AgentDefinition[];
```

Defined in: [core/services/agentconfig.service.ts:22](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/agentconfig.service.ts#L22)

The agent registry: every coding tool whose configuration this kit can
generate. Adding a tool means adding one entry here plus one emitter — the
dispatch, masking policy and CLI surface pick it up automatically.

Only tools whose config contract has been checked against their published
docs belong here; a guessed field name is a broken config on someone's disk.
