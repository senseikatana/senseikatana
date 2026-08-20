# DESIGN.md — Finanzas App

## 1. Design Tokens (CSS Custom Properties)

Defined in `src/index.css:1-20` under `:root`:

```css
:root {
  /* Brand */
  --primary: #1a3a5c;
  --primary-light: #2c5f8a;
  --blue: #2980b9;
  --blue-light: #d6eaf8;

  /* Semantic — State */
  --green: #27ae60;
  --green-light: #d5f5e3;
  --red: #e74c3c;
  --red-light: #fadbd8;
  --orange: #f39c12;
  --orange-light: #fdebd0;

  /* Neutral */
  --gray: #95a5a6;
  --gray-light: #f2f3f4;
  --white: #ffffff;
  --text: #1a1a1a;
  --text-light: #7f8c8d;
  --border: #e0e0e0;

  /* Layout */
  --shadow: 0 2px 8px rgba(0,0,0,0.08);
  --radius: 8px;
}
```

### Usage Rules
- **Always use tokens** — no hardcoded hex values in new code
- **Semantic mapping**:
  - `--green` / `--green-light` → positive, income, success, savings
  - `--red` / `--red-light` → negative, expenses, danger, debt
  - `--orange` / `--orange-light` → warning, variable, attention
  - `--blue` / `--blue-light` → info, fixed, neutral actions
  - `--primary` → brand, sidebar, primary text
  - `--text` / `--text-light` → body / secondary text
  - `--border` → dividers, input borders
  - `--shadow` / `--radius` → elevation, corners

---

## 2. Component Anatomy & Naming (BEM-ish)

### Core Blocks

| Block | Description | Modifier Pattern |
|-------|-------------|------------------|
| `.app` | Root flex container | — |
| `.sidebar` | Fixed left nav | `.open` |
| `.main` | Content area | `.sidebar-active` |
| `.card` | White container, shadow, radius | — |
| `.card-header` | Title + action row | — |
| `.card-title` | H3 equivalent | — |
| `.table-wrapper` | Overflow-x auto | — |
| `.stats-grid` | Responsive grid of `.stat-card` | — |
| `.stat-card` | KPI tile | — |
| `.stat-label` / `.stat-value` | KPI parts | `.stat-positive` `.stat-negative` `.stat-neutral` |
| `.form-group` | Label + input | — |
| `.form-row` | Flex gap wrap | — |
| `.btn` | Base button | `.btn-primary` `.btn-green` `.btn-red` `.btn-ghost` `.btn-sm` `.btn-icon` |
| `.badge` | Inline tag | `.badge-green` `.badge-red` `.badge-orange` `.badge-blue` |
| `.progress-bar` / `.progress-fill` | Progress indicator | `.progress-green` `.progress-orange` `.progress-red` |
| `.modal-overlay` / `.modal-content` | Modal system | — |
| `.menu-toggle-btn` | Hamburger (mobile) | — |
| `.sidebar-backdrop` | Mobile overlay | — |
| `.subscription-grid` / `.sub-card` | Subscription tiles | — |
| `.goal-card` | Savings goal tile | — |
| `.empty-state` / `.empty-state-icon` / `.empty-state-text` | Empty states | — |

### Naming Conventions
- **Blocks**: kebab-case, noun (`.card`, `.stat-card`)
- **Elements**: `__` not used; nested classes via descendant (`.card-header`, `.card-title`)
- **Modifiers**: semantic suffix (`.btn-primary`, `.text-red`, `.stat-positive`)
- **Utilities**: `.text-right`, `.text-center`, `.text-green`, `.text-red`, `.text-orange`, `.text-muted`

---

## 3. Color Semantics (Hard Rules)

| Purpose | Token | Example Usage |
|---------|-------|---------------|
| Income / Positive / Success | `--green` / `--green-light` | Income totals, savings progress, "paid" badges |
| Expense / Negative / Danger | `--red` / `--red-light` | Expense totals, debt, over-budget rows |
| Variable / Warning | `--orange` / `--orange-light` | Variable expenses, near-limit budget |
| Fixed / Info / Neutral | `--blue` / `--blue-light` | Fixed expenses, subscriptions, primary actions |
| Primary Brand | `--primary` / `--primary-light` | Sidebar, logo, primary buttons |
| Text Primary | `--text` | Body copy |
| Text Secondary | `--text-light` | Labels, hints, timestamps |
| Borders / Dividers | `--border` | Table borders, input borders, card separators |

**Never** use `--blue` for positive or `--green` for negative. The semantic mapping is intentional for financial clarity.

---

## 4. Layout Patterns

### App Shell
```jsx
<div className="app">
  {sidebarClosed && <button className="menu-toggle-btn" />}
  <aside className={`sidebar ${open ? 'open' : ''}`}>...</aside>
  <main className={`main ${open ? 'sidebar-active' : ''}`}>...</main>
  {open && <div className="sidebar-backdrop" />}
</div>
```

### Responsive Breakpoint
- **481px** — sidebar switches from fixed (desktop) to off-canvas drawer (mobile)
- Media queries in `index.css:131-136, 347-368`

### Card Pattern
```jsx
<div className="card">
  <div className="card-header">
    <span className="card-title">Título</span>
    <button className="btn btn-primary">Acción</button>
  </div>
  {/* content */}
</div>
```

### Table Pattern
```jsx
<div className="table-wrapper">
  <table>
    <thead><tr><th>Col</th>...</tr></thead>
    <tbody>...</tbody>
    <tfoot><tr style={{background:'var(--blue-light)'}}>...</tr></tfoot>
  </table>
</div>
```

### Form Pattern
```jsx
<div className="form-group">
  <label>Label</label>
  <input type="text" ... />
</div>
<div className="form-row">
  <div className="form-group">...</div>
  <div className="form-group">...</div>
</div>
```

### Modal Pattern
```jsx
<Modal isOpen={open} onClose={close} title="Título">
  <form onSubmit={handle}>
    <div className="form-group">...</div>
    <div className="modal-footer">
      <button className="btn btn-ghost" type="button">Cancelar</button>
      <button className="btn btn-primary" type="submit">Guardar</button>
    </div>
  </form>
</Modal>
```

---

## 5. Special Component Patterns

### Budget.jsx — Inline Editing Table
- **No modal** — inputs directly in `<td>`
- Row highlight via inline style: `background: real > planned ? statusColor : ''`
- Status icons: `✅` (under), `⚠️` (≤10% over), `❌` (>10% over)
- Aggregates 3 arrays: `fixedExpenses` + `variableExpenses` (period-filtered) + `dailyRegister` (period-filtered)

### Categories.jsx — Tabbed CRUD with Cross-Array Rename
- **Tabs**: Ingresos / Gastos Fijos / Gastos Variables (state `activeTab`)
- Inline edit mode per row (`editingCat` state)
- **Rename propagates** to all related arrays:
  - `income` → `incomeCategories` + `income` items
  - `fixed` → `fixedCategories` + `fixedExpenses` items
  - `expense` → `expenseCategories` + `variableExpenses` + `dailyRegister` + `budget`
- **Delete** reassigns to "Otros" (creates if missing), confirms with count
- "Otros" protected from edit/delete

---

## 6. Status Indicators (Consistent Icons)

| State | Icon | Color Token | Usage |
|-------|------|-------------|-------|
| Success / Under budget / Paid | ✅ | `--green` | Budget rows, checkboxes |
| Warning / Near limit | ⚠️ | `--orange` | Budget rows 0-10% over |
| Danger / Over budget / Unpaid | ❌ | `--red` | Budget rows >10% over, unpaid |
| Active subscription | 🟢 badge | `--green` | Subscriptions grid |
| Inactive subscription | 🔴 badge | `--red` | Subscriptions grid |
| Savings progress ≥75% | `progress-green` | `--green` | Goal cards |
| Savings progress 40-74% | `progress-orange` | `--orange` | Goal cards |
| Savings progress <40% | `progress-red` | `--red` | Goal cards |

---

## 7. Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| `≤480px` | Sidebar off-canvas (260px), hamburger visible, `.main` full-width, stats-grid 2-col, form-row stacked, table font 12px |
| `>480px` | Sidebar fixed 240px, `.main` margin-left 240px, stats-grid auto-fit minmax(180px) |

---

## 8. Accessibility Baseline

- All interactive elements: native `<button>`, `<a>`, `<input>`, `<select>`
- Focus visible via `:focus` (blue ring in `index.css:220-223`)
- Color contrast: tokens meet WCAG AA on white
- **Gap**: icon-only buttons (✏️ ✕ 🗑️) need `aria-label` — add in new components

---

## 9. New Component Guidelines (AI Assistant)

### Assistant Widget
- Floating button: fixed bottom-right, `--primary` bg, `--white` icon, `--shadow`, `z-index: 200`
- Panel: slide-up from bottom (mobile) / slide-left from right (desktop), max-h 70vh, `--white` bg, `--shadow`
- Messages: user right-aligned (`--blue-light`), assistant left-aligned (`--gray-light`)
- Streaming: append chunks to last assistant message, show cursor while streaming
- Quick-action chips: `.btn btn-ghost btn-sm` below input, horizontal scroll on mobile

### Chat Input
- Fixed bottom in panel, `textarea` auto-grow (max 120px), send on Enter, Shift+Enter newline
- Disabled while streaming

---

## 10. Migration Checklist for New Code

- [ ] Use only design tokens — no raw colors
- [ ] Follow BEM-ish class names matching existing blocks
- [ ] Reuse `.card`, `.table-wrapper`, `.btn`, `.badge`, `.form-group`, `.modal-*`
- [ ] Respect 481px breakpoint
- [ ] Add `aria-label` to icon-only buttons
- [ ] Semantic colors per Section 3
- [ ] Test mobile (≤480px) and desktop