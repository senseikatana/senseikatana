[katanakit-js](../index.md) / createMemoryStore

# Function: createMemoryStore()

```ts
function createMemoryStore(): ConversationStore;
```

Defined in: [core/services/assistant.service.ts:19](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/assistant.service.ts#L19)

Creates a fresh in-memory conversation store.
Useful in tests or when you want an isolated store per process.

## Returns

[`ConversationStore`](../interfaces/ConversationStore.md)

A [ConversationStore](../interfaces/ConversationStore.md) backed by a Map.
