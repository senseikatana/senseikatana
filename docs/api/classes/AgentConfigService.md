[katanakit-js](../index.md) / AgentConfigService

# Class: AgentConfigService

Defined in: [core/services/agentconfig.service.ts:77](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/agentconfig.service.ts#L77)

AgentConfigService — Singleton facade for per-agent configuration emission.

Applies the **Singleton** pattern (one shared instance via
[AgentConfigService.getInstance](#getinstance)) and the **Facade** pattern: unknown
agents and invalid input resolve to `{ data, error, ok }`, nothing throws.

The emitters mirror the two boxes every agent-setup UI shows: **auto
configuration** ([AgentConfigFile](../interfaces/AgentConfigFile.md) — the file the tool reads) and
**manual connection** ([AgentConfigManualEntry](../interfaces/AgentConfigManualEntry.md) — the env names and
endpoint to paste by hand). Secret masking is policy, not presentation:
emitted values are masked unless the caller passes `reveal: true`, so a
preview can be logged or pasted into a chat without leaking anything.

## Example

```ts
import { emitAgentConfig } from "katanakit-js";

const result = emitAgentConfig("opencode", {
  provider: "openai",
  secret: "sk-…",
  mcpServers: [],
});
if (result.ok) console.log(result.data.files[0].content);
```

## Methods

### agentDefinitions()

```ts
agentDefinitions(): AgentDefinition[];
```

Defined in: [core/services/agentconfig.service.ts:96](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/agentconfig.service.ts#L96)

Lists the supported agents.

#### Returns

[`AgentDefinition`](../interfaces/AgentDefinition.md)[]

The agent registry.

***

### emitAgentConfig()

```ts
emitAgentConfig(agentId, input): SafeResult<AgentConfigOutput>;
```

Defined in: [core/services/agentconfig.service.ts:118](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/agentconfig.service.ts#L118)

Emits the auto-configuration file and the manual connection entries for
one agent.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `agentId` | `string` | The agent to configure. |
| `input` | [`AgentConfigInput`](../interfaces/AgentConfigInput.md) | Provider, secret, optional env var name, base URL and MCP servers. |

#### Returns

[`SafeResult`](../type-aliases/SafeResult.md)\<[`AgentConfigOutput`](../interfaces/AgentConfigOutput.md)\>

`{ data, error, ok }` — `error.status = 404` for unknown agents.

***

### findAgent()

```ts
findAgent(agentId): AgentDefinition | undefined;
```

Defined in: [core/services/agentconfig.service.ts:106](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/agentconfig.service.ts#L106)

Finds an agent definition by id.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `agentId` | `string` | The agent id, e.g. `opencode`. |

#### Returns

[`AgentDefinition`](../interfaces/AgentDefinition.md) \| `undefined`

The definition, or `undefined`.

***

### getInstance()

```ts
static getInstance(): AgentConfigService;
```

Defined in: [core/services/agentconfig.service.ts:84](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/agentconfig.service.ts#L84)

Returns the shared instance (Singleton).

#### Returns

`AgentConfigService`
