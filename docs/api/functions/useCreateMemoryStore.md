[katanakit-js](../index.md) / useCreateMemoryStore

# Function: useCreateMemoryStore()

```ts
function useCreateMemoryStore(): ConversationStore;
```

Defined in: [core/services/assistant.service.ts:19](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/assistant.service.ts#L19)

Creates a fresh in-memory conversation store.
Useful in tests or when you want an isolated store per process.

## Returns

[`ConversationStore`](../interfaces/ConversationStore.md)

A [ConversationStore](../interfaces/ConversationStore.md) backed by a Map.
