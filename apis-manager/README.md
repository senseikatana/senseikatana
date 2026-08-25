# Universal API Manager

A lightweight, framework-agnostic API URL builder and fetch utility. Designed to work seamlessly across React, Next.js, Astro, Svelte, Remix, and vanilla JavaScript/TypeScript environments.

## ✨ Key Features

- **Framework Agnostic Core**: Pure TypeScript functions with zero dependencies.
- **Whitespace Resilience**: Automatically normalizes JSON keys/values at runtime (handles `"key "` → `"key"`).
- **Safe URL Construction**: Uses native `URL` API + `encodeURIComponent` to prevent injection and double-slash bugs.
- **Smart Query Merging**: Combines JSON-defined defaults with runtime overrides automatically.
- **Strict Typing**: Shared types between core and framework adapters.
- **Functional Architecture**: No classes, no side effects, fully tree-shakeable.

## 📦 Installation

Copy the `src/core/` directory into your project. No npm package required.

## 🚀 Quick Start

### 1. Configure Your APIs (`config/apis.json`)

```json
{
  "pokeapi": {
    "baseUri": "https://pokeapi.co/api/v2",
    "endpoints": {
      "pokemonById": "/pokemon/:id/"
    }
  },
  "secondaryApi": {
    "baseUri": "https://another-service.com/api",
    "endpoints": {
      "filteredItems": "/items"
    },
    "defaultQueryParams": {
      "filteredItems": { "limit": 10 }
    }
  }
}

```