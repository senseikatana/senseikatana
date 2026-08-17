---
name: Mediterranean Modernist
colors:
  surface: '#fff8f5'
  surface-dim: '#e1d8d4'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf2ed'
  surface-container: '#f5ece7'
  surface-container-high: '#efe6e2'
  surface-container-highest: '#e9e1dc'
  on-surface: '#1e1b18'
  on-surface-variant: '#56423d'
  inverse-surface: '#34302c'
  inverse-on-surface: '#f8efea'
  outline: '#89726c'
  outline-variant: '#dcc1ba'
  surface-tint: '#9d422b'
  primary: '#9a4029'
  on-primary: '#ffffff'
  primary-container: '#b9583e'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb4a1'
  secondary: '#645e49'
  on-secondary: '#ffffff'
  secondary-container: '#e8dfc5'
  on-secondary-container: '#68634d'
  tertiary: '#316558'
  on-tertiary: '#ffffff'
  tertiary-container: '#4a7e71'
  on-tertiary-container: '#f4fffa'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd2'
  primary-fixed-dim: '#ffb4a1'
  on-primary-fixed: '#3c0800'
  on-primary-fixed-variant: '#7e2c16'
  secondary-fixed: '#ebe2c8'
  secondary-fixed-dim: '#cec6ad'
  on-secondary-fixed: '#1f1c0b'
  on-secondary-fixed-variant: '#4c4733'
  tertiary-fixed: '#b7eedd'
  tertiary-fixed-dim: '#9cd1c2'
  on-tertiary-fixed: '#00201a'
  on-tertiary-fixed-variant: '#194f43'
  background: '#fff8f5'
  on-background: '#1e1b18'
  surface-variant: '#e9e1dc'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 20px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system is built on the intersection of **High-Contrast Minimalism** and **Warm Hospitality**. It departs from cold, corporate aesthetics to embrace a "Mediterranean Sunset" vibe—evoking trust through precision while inviting users through warmth.

The visual direction uses expansive whitespace (Warm Sand) and bold, earthy accents to create a sense of place and reliability. It balances the efficiency of a mobility platform with the refined touch of a premium lifestyle brand. The emotional response should be one of "calm capability"—knowing that while the tech is sophisticated, the experience is human-centric.

Key style pillars:
- **Lush Minimalism:** High-quality Geist typography paired with generous padding and warm neutral surfaces.
- **Organic Precision:** Sharp layouts tempered by a rich, terracotta-driven color story.
- **Architectural Clarity:** Strong use of hierarchy and depth to guide the user through complex mobility flows with ease.

## Colors

The palette is inspired by the sun-drenched coast, prioritizing legibility and a "tactile" digital feel.

- **Deep Terracotta (#C05D43):** The primary brand anchor. Used for primary actions, branding, and high-emphasis signals. It provides a grounded, sophisticated alternative to traditional reds or oranges.
- **Warm Sand (#F4EBD0):** The primary surface color. It replaces "stark white" to reduce eye strain and provide a premium, paper-like quality to the interface.
- **Seafoam Green (#A3D9C9):** The accent and success color. Used for progress indicators, secondary highlights, and positive feedback loops.
- **Ink (#2D2926):** The primary neutral for text and iconography, providing high contrast against the Warm Sand background.

## Typography

This design system utilizes **Geist** exclusively to maintain a technical, precise edge within its warm environment. The type scale is optimized for high readability in mobility contexts (checking schedules, booking trips).

- **Headlines:** Set with tighter letter-spacing and heavier weights to feel impactful and authoritative.
- **Body Text:** Uses a slightly increased line height to ensure the Warm Sand background "breathes" through the text.
- **Labels:** Uppercase styles should be used sparingly for "overlines" or small category tags to inject a modern, editorial feel.

## Layout & Spacing

The layout philosophy follows a **Fluid-Fixed Hybrid**. Content is centered within a maximum width of 1280px for desktop, while utilizing a fluid 12-column grid.

- **Rhythm:** An 8px linear scale governs all padding and margins to ensure technical precision.
- **Mobile:** A 4-column grid with 16px margins. Primary actions (like booking buttons) should be anchored to the bottom of the screen or full-width to accommodate thumb-driven mobility usage.
- **Desktop:** Generous "macro-spacing" (80px+) between major sections to emphasize the premium, lifestyle nature of the brand.

## Elevation & Depth

To maintain a modern look, this design system avoids heavy shadows, instead opting for **Tonal Layering** and **Soft Ambient Occlusion**.

- **Surface Tiers:**
  - `Level 0`: Warm Sand (#F4EBD0) - Base background.
  - `Level 1`: Pure White (#FFFFFF) - Card backgrounds and input fields. This creates a subtle "lift" without needing a shadow.
  - `Level 2`: Soft Tint - Use 5% Terracotta opacity on white for hover states or active card selections.
- **Shadows:** When necessary for floating elements (e.g., Modals), use a "Sun-baked Shadow": a very soft, multi-layered blur with a slight Terracotta tint (`rgba(192, 93, 67, 0.08)`) instead of pure black.

## Shapes

The shape language is **Soft (0.25rem - 0.75rem)**. This provides a clean, modern structure that feels approachable but maintains the "Plana" (Flat) architectural heritage.

- **Standard Elements:** Buttons and small inputs use a 4px (0.25rem) radius.
- **Containers:** Large cards and modals use an 8px (0.5rem) or 12px (0.75rem) radius to feel more welcoming.
- **Avoidance:** No full circles or pill-shapes except for status indicators (chips). Square corners should be avoided to prevent the UI from feeling too "industrial."

## Components

- **Buttons:** Primary buttons are solid Deep Terracotta with white text. Secondary buttons use a Seafoam Green background with Deep Terracotta text for high-contrast visibility. All buttons feature a 4px corner radius.
- **Inputs:** Fields use a Pure White background with a subtle 1px border in a darkened version of Warm Sand. On focus, the border shifts to Deep Terracotta.
- **Cards:** Use a white background on the Sand surface. Borders are unnecessary; use the "Level 1" elevation principle. Padding should be generous (min 24px).
- **Chips/Badges:** Use Seafoam Green at 20% opacity with a Deep Terracotta label for a refined, modern status indicator.
- **Navigation:** Top-level navigation should be minimal, utilizing Geist's Medium weight. The active state is indicated by a 2px Terracotta underline, rather than a color change.
- **Mobility Features:** Trip cards and maps should use Seafoam Green for routes and Deep Terracotta for waypoints to ensure visual distinction and accessibility.