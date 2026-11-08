[katanakit-js](../index.md) / useInitAssistant

# Function: useInitAssistant()

```ts
function useInitAssistant(config?): void;
```

Defined in: [core/services/assistant.service.ts:268](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/assistant.service.ts#L268)

Configures the assistant: provider (Kitt) plus an optional conversation store.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`AssistantInitConfig`](../interfaces/AssistantInitConfig.md) | Assistant configuration. |

## Returns

`void`

## Example

```ts
import { useInitAssistant } from "katanakit-js";

useInitAssistant({ model: "qwen3.8-max" });
```
