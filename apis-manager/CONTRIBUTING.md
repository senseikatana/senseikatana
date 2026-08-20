
---

## 2. `CONTRIBUTING.md` (en inglés, con llamado a la colaboración)

```markdown
# Contributing to apify-manager

Welcome! 👋 We're glad you're here.

`apify-manager` aims to be the simplest, most robust way to manage API endpoints in JavaScript, without the overhead of heavy libraries. It is designed to be **framework‑agnostic**, **type‑safe**, and **zero‑dependency**.

## How You Can Help

We are looking for contributors to expand the "Universal" promise:

### 1. Build Adapters for Other Frameworks

The core is pure TypeScript. We need thin wrappers for:

- [ ] **Vue 3** – a `useApiUrl` composable
- [ ] **SolidJS** – a reactive resource creator
- [ ] **Svelte** – a store‑based implementation
- [ ] **Deno / Fresh** – a standard‑library compatible version
- [ ] **Angular** – a service or pipe

### 2. Improve the Core

- Add support for **GraphQL** endpoint mapping
- Add **request caching** strategies (e.g., `stale-while-revalidate`)
- Improve **error handling** with custom error classes and retries
- Add **interceptors** for auth headers, logging, etc.

### 3. Documentation & Examples

- Create a "Real World" example repo (e.g., an Astro + React hybrid app)
- Translate the README into other languages (Spanish, French, Portuguese, etc.)
- Write a blog post or tutorial

## Development Rules (the "Contract")

1. **Functional First** – Use exported functions, never classes.
2. **Zero Dependencies** – The `core/` folder must never import external packages (only standard Web APIs like `URL`, `fetch`, `encodeURIComponent`).
3. **English Only** – All code comments, variable names, and documentation must be in English to ensure global accessibility.
4. **Safety** – Always use `encodeURIComponent` for dynamic segments. Never concatenate strings manually for URLs.
5. **Tests** – If you add a feature, please add tests (we use Vitest or similar).

## Getting Started

1. Fork the repository.
2. Clone it locally.
3. Since there are no dependencies, just start editing the `.ts` files.
4. Run `tsc --noEmit` to check types.

## Questions?

Open an issue or start a discussion. We're friendly!

**Let's make API management boring again (in a good way).**