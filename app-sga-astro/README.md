# ESINSA WMS System (Warehouse Management System)

## Overview
A custom Warehouse Management System (WMS) built for **Esinsa Gaskets** (Tarragona, Spain).
This system streamlines inventory management, generates unique NUT codes, manages warehouse locations (racks & levels), and prints A4 labels with barcodes. It replaces manual Excel-based operations with a robust, server-side Node.js solution optimized for industrial environments.

## Tech Stack
- **Framework**: Astro (Server-Side Rendering via Node.js Adapter).
- **ORM**: Drizzle (SQLite for fast, lightweight local data persistence).
- **Validation**: Zod (for strict runtime type safety).
- **Cloud Integration**: Google Sheets API (for master data management and legacy Excel synchronization).
- **PDF Generation**: `@react-pdf/renderer` & `bwip-js` (generate A4 labels with Code128 barcodes directly on the server).
- **Authentication**: Auth.js (`@auth/core`) + Drizzle Adapter (OAuth 2.0 / OpenID Connect).
- **UI & UX**: Built-in Theme Switcher (Dark/Light) and Native i18n Multi-language support (Spanish, English, Catalan).
- **Design Principles**: SOLID Architecture (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion).

## Core Features
1.  **Unique Material Code Generation (NUT):**
    *   Automatically generates `NUTxxxxxxxx` codes.
    *   Fills gaps in the sequence (e.g., if `NUT0004002` is deleted, the system will reuse `0004002`).
    *   Configurable padding and start numbers.
2.  **Warehouse Location Management:**
    *   Manages physical storage racks using a standard nomenclature: `[Aisle]-[Rack]-[Level]-[Position]` (e.g., `A-3-02-2`).
    *   Enforces Esinsa's specific height constraints (Levels must be between 0 and 6).
    *   Links products to specific physical locations.
3.  **A4 Label Printing:**
    *   Generates a downloadable PDF on demand.
    *   Includes the NUT code, Rack location code, and a high-resolution Code128 barcode.
    *   Requires no MS Office/Excel to print; opens directly in Adobe Reader/Microsoft Edge.
4.  **Bidirectional Google Sheets Sync:**
    *   **Export:** Push all products from the local Drizzle database to a Google Sheet.
    *   **Import:** Read a Google Sheet (e.g., where the boss manages master lists) and update the local database.
    *   Smart Import: If a row lacks a `NUT Code`, the system auto-generates one (`generateNutCode()`).
5.  **Inventory Movements (Traceability):**
    *   Tracks every stock change (Reception, Picking, Transfers).
    *   Stores historical logs to audit warehouse activity.
6.  **Product Catalog:**
    *   Stores product descriptions, categories (Juntas, Tornillería), sub-categories (Metálicas, Hexagonales), and manufacturer brands (e.g., novus - a Flexitallic brand).
7.  **Authentication & Authorization (OAuth):**
    *   Securely manages warehouse staff access via OAuth (Google, GitHub, or custom providers).
    *   Session persistence using Drizzle database tables.
    *   Role-based middleware protection to secure all internal API endpoints.
8.  **Theme Switcher (Dark/Light Mode):**
    *   Fully responsive UI with a built-in toggle to switch between Dark Mode and Light Mode.
    *   Persistent preference saved in the user's browser `localStorage`.
9.  **Multi-Language Support (i18n):**
    *   Built-in internationalization (Spanish, English, Catalan).
    *   URL-based language routing (e.g., `/es/dashboard`, `/en/dashboard`, `/ca/dashboard`).
    *   Translates all UI components, labels, and A4 PDF headers dynamically based on the selected locale.

## Directory Structure

```shell

├── public/ # Static assets (favicon, images, fonts)
│ └── locales/ # (Optional) Additional static i18n assets
├── src/
│ ├── components/ # Reusable UI components (ThemeToggle, Header, etc.)
│ ├── layouts/ # Astro layout components (MainLayout, etc.)
│ ├── pages/ # Application pages and API endpoints
│ │ ├── api/ # Server-Side API Routes
│ │ │ ├── print-a4.ts # POST: Returns A4 PDF
│ │ │ ├── sync-sheets.ts # POST: Syncs Google Sheets with DB
│ │ │ ├── products.ts # CRUD endpoints for master products
│ │ │ ├── locations.ts # CRUD endpoints for warehouse racks
│ │ │ └── auth/ # OAuth endpoints (callback, signin, signout)
│ │ ├── [lang]/ # i18n dynamic route
│ │ │ ├── dashboard.astro # Protected main dashboard
│ │ │ └── api/ # (Optional) i18n protected APIs
│ │ └── index.astro # Landing page (Sign-in/out)
│ ├── lib/ # Pure utilities, validations, and helpers
│ │ ├── validations.ts # Zod schemas
│ │ ├── nut-generator.ts # Generates unique NUT codes
│ │ ├── google-sheets.ts # Authenticated Google API client
│ │ └── auth.ts # Auth.js configuration (Providers & Adapter)
│ ├── services/ # Business logic layer (SOLID)
│ │ ├── sheet-sync.service.ts
│ │ ├── pdf-generator.service.ts
│ │ └── location.service.ts
│ ├── db/ # Database client and schemas
│ │ ├── index.ts # Drizzle client initialization
│ │ └── schema.ts # Tables, relationships & Drizzle ORM definitions
│ ├── i18n/ # Translation files
│ │ ├── config.ts # i18n configuration (locales, default)
│ │ └── locales/ # Dictionary files
│ │ ├── es.json # Spanish translations
│ │ ├── en.json # English translations
│ │ └── ca.json # Catalan translations
│ ├── styles/ # Global CSS with CSS variables for theming
│ │ ├── global.css # Tailwind or base CSS
│ │ └── theme.css # Dark & Light mode variable definitions
│ └── middleware.ts # Astro middleware (Handles Auth sessions & i18n routing)
├── drizzle.config.ts # Drizzle migrations and schema config
├── astro.config.mjs # Astro framework configuration (Adapter, i18n)
├── .env.local # Environment variables (Google keys, Auth secrets)
└── package.json # Project dependencies

```
## Folder Structure:

```
src/
├── types/
│   └── index.ts
├── lib/
│   ├── validations.ts
│   ├── nut-generator.ts
│   └── google-sheets.ts
├── db/
│   ├── index.ts       # Instancia de Drizzle (ej. `better-sqlite3`)
│   └── schema.ts
├── services/
│   ├── sheet-sync.service.ts
│   └── pdf-generator.service.ts
└── pages/
    └── api/            # <--- Aquí van los endpoints en Astro
        ├── print-a4.ts
        └── sync-sheets.ts
```

---

## Setup & Installation
1.  **Clone the repo & install dependencies:**
    `bun install`
2.  **Environment Variables** (Create `.env.local`):
    - `GOOGLE_SHEETS_CLIENT_EMAIL`
    - `GOOGLE_SHEETS_PRIVATE_KEY`
    - `SHEET_ID`
    - `AUTH_SECRET` (Required for Auth.js)
    - `AUTH_GOOGLE_ID` (If using Google OAuth)
    - `AUTH_GOOGLE_SECRET` (If using Google OAuth)
3.  **Run database migrations:**
    `bunx drizzle-kit push`
4.  **Run development server:**
    `bun run dev`
