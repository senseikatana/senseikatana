[katanakit-js](../index.md) / useInitAssistant

# Function: useInitAssistant()

```ts
function useInitAssistant(config?): void;
```

Defined in: [core/services/assistant.service.ts:268](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/assistant.service.ts#L268)

Configures the assistant: provider (Kitt) plus an optional conversation store.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config?` | [`AssistantInitConfig`](../interfaces/AssistantInitConfig.md) | Assistant configuration. |

## Returns

`void`

## Example

```ts
import { useInitAssistant } from "katanakit-js";

useInitAssistant({ model: "qwen3.8-max" });
```
