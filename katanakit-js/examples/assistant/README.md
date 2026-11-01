# Kitt digital assistant (generic demo)

Copy this folder into another project, swap the knowledge base and tools, and keep the same wiring.

## 1. Install in another project

```bash
npm install katanakit-js express dotenv
```

```ts
import { useInitAssistant, useReply } from "katanakit-js";
import { useStartAssistant } from "katanakit-js/adapters/assistant";
```

## 2. Environment

```env
DASHSCOPE_API_KEY=sk-...
PORT=3000
# Optional persistence
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
```

## 3. Run from this repo

```bash
bun run examples/assistant/demo.ts
# POST http://localhost:3000/assistant/chat  { "message": "What are your hours?" }
```

## 4. Tools in this demo

| Tool       | What it does                                                |
| ---------- | ----------------------------------------------------------- |
| `readFile` | Reads `knowledge-base.md` (edit that file for your product) |
| `saveNote` | Appends a JSON line to `notes.jsonl`                        |

Replace both `execute` functions with your CRM, database or ticket system. Keep the `{ name, description, parameters, execute }` shape.
