---
title: Assistant (Kitt)
description: Wire a provider-agnostic AI assistant — one-shot chat, tool-calling agents and sessions over REST.
---

# Assistant (Kitt)

Kitt is the toolkit's zero-dependency, provider-agnostic assistant, built on
the OpenAI-compatible protocol (it works with DashScope, OpenAI and any
compatible endpoint). It uses native `fetch`, so no SDK is required, and every
fallible call returns a Safe Result that never throws.

Three levels, pick the one you need:

- **One-shot chat** — `useChat()` answers a single conversation turn.
- **Tool-calling agent** — `useRunAgent()` runs an autonomous loop that can
  read, write and execute through the tools you hand it.
- **Session-aware bots** — `useInitAssistant()` + `useReply()` add sessions over
  the REST channel (below).

## When to use Kitt — and when not

Kitt stays small (zero dependencies) because it does one thing well: chat
completions with tool calls against any OpenAI-compatible endpoint.

| Need | Use instead |
| --- | --- |
| Streaming token-by-token | [Vercel AI SDK](https://sdk.vercel.ai) |
| RAG with embeddings | [LangChain.js](https://js.langchain.com) |
| Multi-agent orchestration | [CrewAI](https://github.com/crewAIInc/crewAI) |
| Full chatbot framework | [Botpress](https://botpress.com) |

## 1. Configure the provider

```ts
import { useInitAgent } from "katanakit-js";

// Register once. apiKey falls back to process.env.DASHSCOPE_API_KEY.
useInitAgent({ model: "qwen3.8-max" });
```

The Kitt preset is exported as sensible defaults: `KITT_SYSTEM_PROMPT`,
`kittPreset`, `KITT_BASE_URL` and `KITT_DEFAULT_MODEL` (`qwen3.8-max`).
Override any of them per call: `useInitAgent({ systemPrompt, model, baseUrl })`.

## 2. One-shot chat

```ts
import { useChat } from "katanakit-js";

const review = await useChat([
	{ role: "user", content: "Summarize the benefits of solar energy in three bullet points." },
]);
if (review.ok) console.log(review.data);
```

## 3. Tool-calling agent

Each tool is `{ name, description, parameters (JSON Schema), execute(input) }`.
The agent loops until it answers or `maxSteps` is reached:

```ts
import { useRunAgent } from "katanakit-js";
import fs from "node:fs/promises";

const result = await useRunAgent("Fix the type errors in src/", {
	tools: [
		{
			name: "readFile",
			description: "Returns file contents",
			parameters: { type: "object", properties: { path: { type: "string" } } },
			execute: ({ path }) => fs.readFile(path, "utf8"),
		},
	],
	maxSteps: 12,
});
```

## 4. Sessions

```ts
import { useInitAssistant, useReply } from "katanakit-js";

useInitAssistant({
	// apiKey      — process.env.DASHSCOPE_API_KEY
	// baseUrl     — KITT_BASE_URL
	// model       — "qwen3.8-max"
	// systemPrompt — KITT_SYSTEM_PROMPT
	// store       — in-memory (useCreateMemoryStore)
	// tools       — AiTool[]
	// maxSteps    — number
});

const result = await useReply(undefined, "What are your hours?");
if (result.ok) {
	console.log(result.data.reply, result.data.sessionId);
} else {
	console.error(result.error.message);
}
```

`useReply(sessionId | undefined, text)` creates a session when `sessionId` is
omitted; pass `result.data.sessionId` on later turns. Also on the main barrel:

| Helper | Signature |
| --- | --- |
| `useCreateSession` | `(channel?) => Promise<string>` |
| `useGetHistory` | `(sessionId) => Promise<AiMessage[]>` |
| `useResetSession` | `(sessionId) => Promise<void>` |
| `useCreateMemoryStore` | `() => ConversationStore` |

## 5. REST channel

`katanakit-js/adapters/assistant` mounts on Express, so it declares `express`
(`>=5`), `cors` (`>=2.8`) and `express-rate-limit` (`>=8`) as optional peer
dependencies. Install the ones you use — the assistant itself needs none of
them for the in-process helpers above.

```ts
import { useStartAssistant, useCreateAssistantRouter } from "katanakit-js/adapters/assistant";

useStartAssistant(); // port?, host?, mountPath = "/assistant", options?
// or mount useCreateAssistantRouter() on an existing Express app
```

| Method | Path | Body | Response |
| --- | --- | --- | --- |
| `POST` | `/assistant/chat` | `{ sessionId?, message }` | `{ ok, data: { reply, sessionId }, error }` |
| `GET` | `/assistant/sessions/:id` | — | `{ sessionId, messages }` or `404` |
| `DELETE` | `/assistant/sessions/:id` | — | `204` or `404` |

The endpoints are **public by default**. In production, pass an auth guard
(applied to every route). Unknown session ids return `404`, and `useReply`
rejects a `sessionId` that does not exist.

```ts
useStartAssistant(3000, "localhost", "/assistant", {
	guard: (req, res, next) =>
		req.header("authorization") === `Bearer ${process.env.ASSISTANT_API_KEY}`
			? next()
			: res.status(401).end(),
});
```

```bash
curl -X POST http://localhost:3000/assistant/chat \
  -H 'Content-Type: application/json' \
  -d '{"message":"What are your hours?"}'
```

`POST /chat` is rate-limited by default (20 req/min per IP). Override through the router options:

```ts
app.use(
	"/assistant",
	useCreateAssistantRouter({
		rateLimit: rateLimit({ windowMs: 60_000, max: 30 }),
	}),
);
```

## 6. Persistence

Memory by default (`useCreateMemoryStore()`); history is lost on process
restart. For a database, install the optional Prisma peer — it is not part of
the core package:

```bash
bun add @prisma/orm-postgres
```

With `DATABASE_URL` set (Bun reads `.env`; on Node run `node --env-file=.env`),
use Prisma — the `Conversation` and `Message` models ship in
`dist/prisma/schema.prisma` (source: `src/prisma/schema.prisma`):

```ts
import { useInitAssistant } from "katanakit-js";
import { useCreatePrismaStore, PrismaConversationStore } from "katanakit-js/prisma";

useInitAssistant({ store: useCreatePrismaStore() });
// or: { store: PrismaConversationStore }
```

If your app owns the database, copy that schema into your project, then run
`prisma contract emit` and `prisma db init` there.

## 7. Try it in this repo

[`examples/assistant/`](https://github.com/senseikatana/katanakit-js/tree/main/examples/assistant)
is a generic digital assistant with two demo tools: `readFile` on
`knowledge-base.md` and `saveNote` to `notes.jsonl`. Copy `.env` keys from
[`.env.example`](https://github.com/senseikatana/katanakit-js/blob/main/.env.example):

```dotenv
DASHSCOPE_API_KEY=
PORT=3000
KITT_CHANNEL=rest
DATABASE_URL=
```

```bash
KITT_CHANNEL=rest bun run examples/assistant/demo.ts
# POST http://localhost:3000/assistant/chat  { "message": "What are your hours?" }
```

Swap the system prompt, the knowledge base and the tool `execute()` functions
for your product FAQ, CRM or ticket system — keep the
`{ name, description, parameters, execute }` shape.

## Related

- [Express Server](/guides/services/express-server) — the reference server the REST channel mounts on.
