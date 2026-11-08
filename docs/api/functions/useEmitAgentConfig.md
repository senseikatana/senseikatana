[katanakit-js](../index.md) / useEmitAgentConfig

# Function: useEmitAgentConfig()

```ts
function useEmitAgentConfig(agentId, input): SafeResult<AgentConfigOutput>;
```

Defined in: [core/services/agentconfig.service.ts:289](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/agentconfig.service.ts#L289)

Emits agent configuration. See [AgentConfigService.useEmitAgentConfig](../classes/AgentConfigService.md#useemitagentconfig).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `agentId` | `string` |
| `input` | [`AgentConfigInput`](../interfaces/AgentConfigInput.md) |

## Returns

[`SafeResult`](../type-aliases/SafeResult.md)\<[`AgentConfigOutput`](../interfaces/AgentConfigOutput.md)\>
