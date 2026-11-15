[katanakit-js](../index.md) / useCreateMemoryStore

# Function: useCreateMemoryStore()

```ts
function useCreateMemoryStore(): ConversationStore;
```

Defined in: [core/services/assistant.service.ts:19](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/assistant.service.ts#L19)

Creates a fresh in-memory conversation store.
Useful in tests or when you want an isolated store per process.

## Returns

[`ConversationStore`](../interfaces/ConversationStore.md)

A [ConversationStore](../interfaces/ConversationStore.md) backed by a Map.
