[katanakit-js](../index.md) / useRunAgent

# Function: useRunAgent()

```ts
function useRunAgent(goal, options?): Promise<AgentResult>;
```

Defined in: [core/services/agent.service.ts:559](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/agent.service.ts#L559)

Runs the tool-calling agent loop against a goal until it emits a final
answer or exhausts `maxSteps`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `goal` | `string` | The natural-language objective. |
| `options?` | [`AgentRunOptions`](../interfaces/AgentRunOptions.md) | Tools, step budget and completion options. |

## Returns

`Promise`\<[`AgentResult`](../type-aliases/AgentResult.md)\>

An `AgentResult` with the final message and executed steps.

## Example

```ts
import { useRunAgent } from "katanakit-js";

const result = await useRunAgent("Fix the type errors reported by tsc");
```
