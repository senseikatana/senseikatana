[katanakit-js](../index.md) / useInitAgent

# Function: useInitAgent()

```ts
function useInitAgent(config?): void;
```

Defined in: [core/services/agent.service.ts:518](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/agent.service.ts#L518)

Registers the AI provider for the Kitt assistant.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config?` | `Partial`\<[`AiProviderConfig`](../type-aliases/AiProviderConfig.md)\> | Partial provider configuration. |

## Returns

`void`

## Example

```ts
import { useInitAgent } from "katanakit-js";

useInitAgent({ apiKey: process.env.DASHSCOPE_API_KEY });
```
