# 📦 apify-manager v1.0.0 (Portable Edition)

**"The .AppImage of API Management"** — Drop it in, configure it, run it anywhere.

This is the inaugural release of `apify-manager`. It is designed as a **zero-dependency**, functional utility to centralize API endpoint management across any JavaScript runtime.

## 🚀 Why "Portable"?
Just like a Linux AppImage contains everything needed to run an app, this module contains everything needed to manage your APIs:
- **No `node_modules` bloat**: Pure TypeScript functions.
- **No Framework Lock-in**: Works in Astro (SSR), React (CSR), Node.js (Backend), or Deno.
- **Self-Healing Config**: Automatically trims whitespace from your JSON keys (fixing common copy-paste errors).

## ✨ Features
- **`buildApiUrl`**: Safe URL construction with `encodeURIComponent` and native `URL` API.
- **`fetchApi`**: Typed fetch wrapper for non-React environments.
- **`useApiUrl`**: Optimized React hook with `useMemo`.
- **Dynamic Params**: Supports `:id` path replacement and query merging.

## 📥 Installation (The "AppImage" Way)
1. Download the source files below.
2. Copy the `core/` folder into your project (e.g., `src/lib/apify-manager`).
3. Create your `apis.json`.
4. Import and use. No build step required for the core logic.

## 🛠️ Usage Example (Astro)
```typescript
import { fetchApi } from '@/lib/apify-manager/core/apiManager';

export const getStaticPaths = async () => {
  const data = await fetchApi('pokeapi', 'pokemonList');
  return data.map(p => ({ params: { id: p.id } }));
};