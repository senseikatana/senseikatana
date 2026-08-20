# AGENTS.md

## Quick Commands

```bash
bun dev          # Start Vite dev server (port 5173)
bun run build    # Build production output to dist/
bun run lint     # Run oxlint (not ESLint)

# Firebase Emulators (local dev + AI assistant)
cd functions && npm install      # One-time, installs firebase-functions
firebase emulators:start         # Start Functions + Firestore + Auth emulators
```

## Architecture

- **React 19 SPA** — single-page app, no router library, views managed by `activeView` state in `src/App.jsx`
- **Backend**: Firebase Auth (Google + email/password) + Firestore (single doc: `users/{uid}/appData/current`) + Firebase Functions (proxy to NVIDIA NIM)
- **AI Assistant**: callable HTTP function `assistantChat` (SSE streaming, Gen 2, region europe-west1) → NVIDIA API (GLM-5.2 default, DeepSeek V4 Pro fallback)
- **Data sync**: `useFirestoreData` hook mirrors `useLocalStorage` signature `[data, setData, meta]`, 500ms debounce, auto-migrates from localStorage on first login
- **JSX files** — components use `.jsx` extension, not `.tsx`
- **Package manager**: Bun (`bun.lock` present)

## Data Model

- `src/data/defaultData.js` defines `defaultData` (initial state shape) and `sampleData`
- Categories are hardcoded arrays: `INCOME_CATEGORIES`, `FIXED_CATEGORIES`, `EXPENSE_CATEGORIES`
- Custom hook `src/hooks/useLocalStorage.js` wraps `useState` + localStorage sync (legacy, replaced by `useFirestoreData`)
- Firestore: `src/firebase/firestore.js` — helpers `fetchUserData`, `saveUserData`, `subscribeUserData`, `normalizeData`

## Key Conventions

- Linter is **oxlint**, not ESLint — no `.eslintrc`, no `eslint.config.js`
- No test framework configured — no test commands to run
- Spanish UI labels; English code and variable names
- Currency symbol defaults to `€`
- Month names in Spanish (enero–diciembre) from `defaultData.js`
- All data operations use functional `setData(prev => ...)` form for consistency with Firestore sync

## Gotchas

- `tsconfig.json` exists but project uses JSX files — TypeScript strict mode is set but no `.ts`/`.tsx` files exist
- `vite.config.js` is plain JS, not TS
- No CI workflows — no `.github/workflows/`
- `RENDER_DEPLOYMENT.md` documents Render static site deploy (build command: `npm run build`, publish dir: `dist`)
- `firebase.json` is configured for local emulation; production deploy uses Render for hosting + Firebase for backend
- Functions are TypeScript (`functions/src/*.ts`) compiled to `functions/lib/`
- `.env` is gitignored; use `.env.example` as template
- For local development with emulator: set `VITE_USE_EMULATORS=true` in `.env`
- Production assistant URL: set `VITE_ASSISTANT_API_URL` if not using Firebase Hosting rewrite

## Files of Interest

- `src/App.jsx` — app shell, auth gating, sidebar nav, assistant widget
- `src/components/AuthGate.jsx` — Google + email/password login UI (wraps app)
- `src/components/Assistant.jsx` — AI assistant floating widget with SSE streaming chat
- `src/hooks/useFirestoreData.js` — Firestore-backed data hook with migration
- `src/hooks/useAuth.js` — auth state hook
- `src/firebase/config.js` — Firebase initialization (client SDK)
- `src/firebase/auth.js` — auth helpers
- `src/firebase/firestore.js` — Firestore CRUD + normalizeData
- `src/lib/financialSummary.js` — builds compact financial summary string for AI context
- `functions/src/index.ts` — assistantChat HTTP function (SSE streaming)