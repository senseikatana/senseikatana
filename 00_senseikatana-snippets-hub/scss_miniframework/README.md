# Katana Kami — SCSS Mini Framework

A lightweight, modular SCSS framework for rapid UI development.
Design-token driven, fully typed-friendly, zero-runtime overhead.

---

## Quick Start

```bash
npm install -D sass
```

```scss
// main.scss — importa todo y genera utilities
@use "reset";
@use "functions" as f;
@Use "variables" as v;
@Use "breakpoints" as bp;
@Use "colors" as c;
@Use "grid" as g;
@Use "utils";

// Genera tokens CSS en :root
@include v.k-generate-css-tokens();

// Genera variables CSS de colores y clases de utilidad
@include c.generate-css-vars();
@include c.all-utilities();

// Genera todas las utilities (margin, padding, flex, grid, sizing, etc.)
@include utils.generate-all-utilities();
```

Compile:

```bash
npx sass src/scss/main.scss dist/css/main.css --watch
```

---

## File Structure

```
src/scss/
  _functions.scss        # Unit conversion (rem, px, to-unit, strip-unit), fluid sizing
  _variables.scss        # Design tokens, access functions, CSS token generator
  _breakpoints.scss      # Breakpoint mixins (generic + named aliases + feature queries)
  _colors.scss           # Color palettes, CSS var generation, utility classes, themes
  _grid.scss             # Grid system mixins (auto-fit, subgrid, masonry, etc.)
  _flex.scss             # Flexbox layout mixins (flex-container, flex-center, etc.)
  _reset.scss            # Modern reset (+ custom properties en :root)
  _theme.scss            # Theme hook (por completar)
  _apply.scss            # Registro de utilidades para @apply
  partials/_utils.scss   # Fachada → re-exporta partials/utils/
  partials/utils/
    _index.scss          # Índice + @mixin generate-all-utilities()
    _core.scss           # Mixins genéricos (vars CSS, centrado, generadores)
    _maps.scss           # Tokens: sizing, spacing, flex, efectos, texto, layout
    _spacing.scss        # p-* y .gap (activo por defecto)
    _sizing.scss         # w/h/min/max (ópt-in)
    _flex.scss           # flex-, items-, justify-, gap-* (ópt-in)
    _effects.scss        # .shadow, .rounded + shadow/radius/z/transition (ópt-in)
    _layout.scss         # display, position, overflow, texto (ópt-in)
  components/
    _index.scss          # Estilos personalizados usando @apply (ejemplos)
  main.scss              # Entry point — imports all modules and includes generators
```

---

## `_functions.scss`

Utility functions for unit conversion, color manipulation, and fluid sizing.

| Function | Description | Example |
|----------|-------------|---------|
| `rem($size)` | Converts px to rem (base 10) | `f.rem(16)` → `1.6rem` |
| `px($size)` | Converts rem to px | `f.px(1.6)` → `16px` |
| `strip-unit($value)` | Removes unit from a number | `f.strip-unit(16px)` → `16` |
| `to-unit($value, $unit)` | Converts to specified unit | `f.to-unit(16, "rem")` |
| `tint($color, $amount)` | Mixes color with white | `f.tint(#3498db, 20%)` |
| `shade($color, $amount)` | Mixes color with black | `f.shade(#3498db, 20%)` |
| `complement($color)` | Returns complementary color | `f.complement(#ff0000)` |
| `contrast($color, $light, $dark)` | Returns best contrast color | `f.contrast(#3498db)` |
| `fluid($min, $max, $min-vw, $max-vw)` | Generates `clamp()` for fluid sizing | `f.fluid(16px, 24px)` |

```scss
@use "functions" as f;

.element {
  font-size: f.rem(16);          // 1.6rem
  width: f.fluid(320px, 1200px);  // clamp(320px, ..., 1200px)
}
```

---

## `_variables.scss`

Centralized design tokens. All maps are `!default` so you can override before importing.
The CSS custom property prefix is `$k-prefix: "k"` (emits `--k-*` variables).

### Maps

| Token | Map Name | Keys |
|-------|----------|------|
| Font families | `$font-families` | `sans-serif`, `serif`, `monospace` |
| Shadows | `$shadow-sizes` | `none`, `sm`, `default`, `md`, `lg`, `xl`, `2xl`, `inner` |
| Containers | `$container-sizes` | `xs` … `3xl` (px values) |
| Breakpoints | `$breakpoint-sizes` | `xs` … `3xl` (px values) |
| Spacing | `$spacing-sizes` | `0`, `px`, `0.5` … `96` (rem) |
| Radius | `$radius-sizes` | `none`, `sm`, `default`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full` |
| Z-index | `$z-layers` | `auto`, `0`–`50`, `dropdown`, `sticky`, `fixed`, `modal`, `popover`, `tooltip` |
| Durations | `$transition-durations` | `75`, `100`, `150`, `200`, `300`, `500`, `700`, `1000` (ms) |
| Easings | `$transition-easings` | `linear`, `in`, `out`, `in-out` |

### Access Functions

```scss
@Use "variables" as v;

v.k-font-family("sans-serif")  // font stack
v.k-shadow("md")               // shadow value
v.k-container("xl")            // container max-width
v.k-breakpoint("md")           // breakpoint value
v.k-spacing(4)                 // 1rem
v.k-radius("lg")               // 0.5rem
v.k-z("modal")                 // z-index value
v.k-duration(200)              // 200ms
v.k-ease("out")                // cubic-bezier
```

### CSS Custom Property Generator

```scss
@include v.k-generate-css-tokens();
```

Emits all tokens as `:root` CSS variables:

```css
:root {
  --k-font-sans-serif: ui-sans-serif, system-ui, ...;
  --k-spacing-4: 1rem;
  --k-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), ...;
  --k-radius-lg: 0.5rem;
  /* ... */
}
```

---

## `_breakpoints.scss`

Responsive mixins powered by `$breakpoints` (mobile-first).

### Maps

| Key | Value |
|-----|-------|
| `xs` | `0` (mobile-first baseline) |
| `sm` | `640px` |
| `md` | `768px` |
| `lg` | `1024px` |
| `xl` | `1280px` |
| `2xl` | `1536px` (mixin alias: `xxl`) |
| `3xl` | `1920px` (mixin alias: `xxxl`) |

> **Note:** Mixin names `xxl` and `xxxl` map to breakpoint keys `"2xl"` and `"3xl"` because SCSS mixin names cannot start with a digit.

### Generic Mixin

```scss
@include bp.breakpoint($from, $direction: up, $to: null)
```

| Direction | Behavior |
|-----------|----------|
| `up` | `min-width` (default) |
| `down` | `max-width` (anti-overlap: `−0.02px`) |
| `only` | Between `$from` and next breakpoint |
| `between` | Between `$from` and `$to` |

### Named Aliases

```scss
@include bp.xs { … }        // 0 and up
@include bp.sm { … }        // 640px and up
@include bp.md { … }        // 768px and up
@include bp.lg { … }        // 1024px and up
@include bp.xl { … }        // 1280px and up
@include bp.xxl { … }       // 1536px and up
@include bp.xxxl { … }      // 1920px and up

@include bp.sm-down { … }   // below 640px
@include bp.md-down { … }   // below 768px
```

### Feature Queries

```scss
@include bp.portrait       // orientation: portrait
@include bp.landscape      // orientation: landscape
@include bp.reduced-motion // prefers-reduced-motion: reduce
@include bp.hoverable      // hover: hover + fine pointer
@include bp.touch          // hover: none + coarse pointer
@include bp.dark-mode      // prefers-color-scheme: dark
@include bp.light-mode     // prefers-color-scheme: light
```

---

## `_colors.scss`

Color system with 6 palettes + 4 special colors.

### Palettes

Each palette has 5 numeric shades: `100`, `200`, `300`, `400`, `500`.

| Palette | Purpose |
|---------|---------|
| `neutral` | Grayscale |
| `info` | Blue |
| `amber` | Warm amber |
| `danger` | Red/critical |
| `success` | Green |
| `warning` | Yellow/amber |

**Special:** `white`, `black`, `transparent`, `current`

### Access Functions

```scss
@Use "colors" as c;

c.get-color("info", 300)        // Info shade 300
c.get-color("info", 500, 0.5)   // With alpha
c.get-color("white")            // Special color (no shade)
c.get("info")                   // Alias for shade 500
c.alpha("info", 300, 0.5)       // With custom alpha
```

### Generators

```scss
// Emit CSS custom properties for colors
@include c.generate-css-vars();

// Emit utility classes
@include c.text-utilities();           // .text-info-300, .text-gray-100, .text-white
@include c.bg-utilities();             // .bg-info-500, .bg-neutral-100, .bg-black
@include c.border-utilities();         // .border-info-300, .border-white
@include c.hover-utilities();          // .hover-bg-info-300:hover, .hover-text-info-500:hover

// Or everything at once
@include c.all-utilities();

// Theme (dark mode) with automatic inversion
@include c.theme("dark");
```

### CSS Variable Access

Color CSS variables are available on `:root`:

```css
:root {
  --info-300: hsl(217, 91%, 60%);
  --neutral-500: hsl(220, 13%, 6%);
  --white: white;
  --black: black;
}
```

Use in custom CSS: `background: var(--info-300);`

---

## `_grid.scss`

Modern CSS Grid mixins with zero bloat.

| Mixin | Description |
|-------|-------------|
| `grid-responsive($min, $mode, $max, $gap)` | Auto-fill or auto-fit columns |
| `grid-autofill($min, $max, $gap)` | Alias for auto-fill |
| `grid-autofit($min, $max, $gap)` | Alias for auto-fit |
| `grid-container($cols, $gap, …)` | Fixed column grid with alignment |
| `grid-gap($value, $var-name)` | Gap via CSS custom property |
| `grid-span($cols, $rows)` | Span N columns/rows |
| `grid-place($col-start, $col-end, …)` | Explicit placement |
| `grid-breakpoint-columns($map, $gap, …)` | Responsive column counts |
| `grid-center($gap)` | Center content on both axes |
| `subgrid($axis)` | Subgrid support |
| `grid-masonry($axis, $gap)` | Masonry layout (experimental) |
| `grid-fixed-columns($col-width, $gap)` | Fixed-width column repeat |

```scss
@Use "grid" as g;

.cards {
  @include g.grid-autofill(280px, $gap: 1.5rem);
}

.dashboard {
  @include g.grid-container(12, 2rem);
}
```

---

## `_utils.scss`

Sistema de utilidades modularizado. `partials/_utils.scss` es solo una fachada que
re-exporta las piezas de `partials/utils/`:

| Módulo | Contenido | Estado |
|--------|-----------|--------|
| `core` | Mixins genéricos (`vars-list`, `vars-map`, centrado, `utils-classes`, `utils-classes-hover`) | mixins |
| `maps` | Tokens: `$sizing-map`, `$spacing-map`, `$flex-*`, `$shadow-map`, `$radius-map`, `$z-layers-map`, transiciones, opacidad, texto, layout | datos |
| `spacing` | `.p-{n}` + `.gap` | **activo al importar** |
| `sizing` | `get-sizing-classes()` → `w/h/min/max` | ópt-in |
| `flex` | `generate-flex-utilities()` → `flex-*`, `items-*`, `justify-*`, `gap-*` | ópt-in |
| `effects` | `.shadow`, `.rounded` + `generate-effects-utilities()` → `shadow-*`, `rounded-*`, `z-*`, `duration-*`, `ease-*`, `opacity-*` | base activa + ópt-in |
| `layout` | `generate-layout-utilities()` → display, position, overflow, texto | ópt-in |

Genera todas las utilidades ópt-in con `@include utils.generate-all-utilities();`.

### Margin & Padding

Classes `.m-{n}`, `.p-{n}`, and directional variants (`mt`, `mr`, `mb`, `ml`, `mx`, `my`, `pt`, `pr`, `pb`, `pl`, `px`, `py`) for each value in `$spacing-sizes`.

**Note:** Numeric keys with dots use hyphens: `0.5` → `.m-0-5`, `.p-0-5`.

### Gap

`.gap-{n}`, `.gap-x-{n}`, `.gap-y-{n}` for each spacing value.

### Sizing

`.w-{n}`, `.h-{n}`, `.min-w-{n}`, `.min-h-{n}`, `.max-w-{n}`, `.max-h-{n}`.
Also: `.w-full`, `.w-screen`, `.h-full`, `.h-screen`, `.mx-auto`.

### Border Radius

`.rounded-none`, `.rounded-sm`, `.rounded-default`, `.rounded-md`, `.rounded-lg`, `.rounded-xl`, `.rounded-2xl`, `.rounded-3xl`, `.rounded-full`.

### Shadows

`.shadow-none`, `.shadow-sm`, `.shadow-default`, `.shadow-md`, `.shadow-lg`, `.shadow-xl`, `.shadow-2xl`, `.shadow-inner`.

### Z-Index

`.z-auto`, `.z-0`, `.z-10` … `.z-tooltip`.

### Display

`.block`, `.inline`, `.inline-block`, `.flex`, `.inline-flex`, `.grid`, `.inline-grid`, `.hidden`.

### Flexbox

`.flex-row`, `.flex-col`, `.flex-wrap`, `.flex-nowrap`, `.items-{start|center|end|stretch}`, `.justify-{start|center|end|between|around|evenly}`, `.flex-1`, `.flex-2`.

### Position

`.static`, `.relative`, `.absolute`, `.fixed`, `.sticky`.

### Text

`.text-left`, `.text-center`, `.text-right`, `.text-justify`, `.text-{n}` (font size).

### Font Weight

`.font-normal`, `.font-medium`, `.font-semibold`, `.font-bold`.

### Grid Columns

`.grid-cols-1` … `.grid-cols-12`, `.col-span-1` … `.col-span-12`.

### Overflow

`.overflow-auto`, `.overflow-hidden`, `.overflow-visible`, `.overflow-scroll`, `.overflow-x-auto`, etc.

### Border Width

`.border`, `.border-0`, `.border-2`, `.border-4`, `.border-8`, and directional variants (`.border-t-2`, `.border-l-4`, etc.).

### Color Utilities (from `_colors.scss`)

`.text-{palette}-{shade}`, `.bg-{palette}-{shade}`, `.border-{palette}-{shade}` for all palettes and shades.
Plus: `.text-white`, `.text-black`, `.text-transparent`, `.text-current`.
Hover variants: `.hover-text-{palette}-{shade}`, `.hover-bg-{palette}-{shade}`.

---

## Overriding Tokens

Override any map **before** importing the framework:

```scss
// _config.scss
$k-prefix: "myapp" !default;

$spacing-sizes: (
  4: 1.5rem,
  // ...
);

@use "variables" as v;
@use "utils";

@include utils.generate-all-utilities();
```

---

## Complete Example

```scss
@use "reset";
@Use "functions" as f;
@Use "variables" as v;
@Use "breakpoints" as bp;
@Use "colors" as c;
@Use "grid" as g;
@Use "utils";

@include v.k-generate-css-tokens();
@include c.generate-css-vars();
@include c.all-utilities();
@include utils.generate-all-utilities();

.hero {
  @include g.grid-autofill(300px, $gap: 2rem);
}

.btn-primary {
  background: c.get-color("info", 500);
  padding: v.k-spacing(3) v.k-spacing(5);
  border-radius: v.k-radius("default");
  box-shadow: v.k-shadow("sm");

  &:hover {
    background: c.get-color("info", 300);
  }
}
```

---

## Development

```bash
bun run dev:css    # Watch + compile SCSS → dist/css/main.css
bun run lint       # Run stylelint with --fix
```

## License

MIT — Copy, paste, build.
