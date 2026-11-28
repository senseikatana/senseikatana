[katanakit-js](../index.md) / onCreateMemoryStore

# Variable: onCreateMemoryStore

```ts
const onCreateMemoryStore: () => ConversationStore = createMemoryStore;
```

Defined in: [core/services/assistant.service.ts:290](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/assistant.service.ts#L290)

Creates a fresh in-memory conversation store.
Useful in tests or when you want an isolated store per process.

## Returns

[`ConversationStore`](../interfaces/ConversationStore.md)

A [ConversationStore](../interfaces/ConversationStore.md) backed by a Map.
