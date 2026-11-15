[katanakit-js](../index.md) / useInitAssistant

# Function: useInitAssistant()

```ts
function useInitAssistant(config?): void;
```

Defined in: [core/services/assistant.service.ts:268](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/assistant.service.ts#L268)

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
