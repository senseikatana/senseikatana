---
name: Mediterranean Horizon
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#434652'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#747783'
  outline-variant: '#c4c6d4'
  surface-tint: '#335ab1'
  primary: '#002563'
  on-primary: '#ffffff'
  primary-container: '#013990'
  on-primary-container: '#87a8ff'
  inverse-primary: '#b2c5ff'
  secondary: '#00696f'
  on-secondary: '#ffffff'
  secondary-container: '#78f5ff'
  on-secondary-container: '#007076'
  tertiary: '#3f2200'
  on-tertiary: '#ffffff'
  tertiary-container: '#5d3500'
  on-tertiary-container: '#f3940f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#b2c5ff'
  on-primary-fixed: '#001847'
  on-primary-fixed-variant: '#134198'
  secondary-fixed: '#78f5ff'
  secondary-fixed-dim: '#57d8e2'
  on-secondary-fixed: '#002022'
  on-secondary-fixed-variant: '#004f54'
  tertiary-fixed: '#ffdcbd'
  tertiary-fixed-dim: '#ffb86d'
  on-tertiary-fixed: '#2c1600'
  on-tertiary-fixed-variant: '#693c00'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
  deep-navy: '#013990'
  coastal-teal: '#13AEB8'
  energetic-orange: '#EB8E02'
  surface-gray: '#F1F3F5'
  text-main: '#1A1C1E'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
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
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  button:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The visual identity of the design system balances the heritage of a long-standing transportation provider with a modern, efficient digital experience. The aesthetic is **Corporate / Modern** with a touch of **Mediterranean** warmth, evoking feelings of reliability, safety, and the excitement of travel. 

The design narrative is built on "Efficient Mobility." This is achieved through a structured, information-first layout that prioritizes ease of booking and schedule lookup. Visuals should feature high-quality photography of scenic coastal routes and the modern fleet, grounded by a sophisticated navy blue palette. The interface uses generous whitespace and a "Rounded" shape language to feel approachable and accessible to a wide demographic, from daily commuters to international tourists.

## Colors

The color palette is anchored by **Deep Navy Blue**, representing the brand's established authority and professionalism. **Coastal Teal** is used as a secondary highlight to bring a modern, Mediterranean freshness to the UI, particularly in supportive icons or secondary progress indicators.

**Energetic Orange** is the dedicated action color. It is reserved exclusively for primary Calls to Action (CTAs), booking confirmations, and urgent service alerts to ensure high visibility and immediate user recognition. Backgrounds should remain predominantly white or very light gray (`#F8F9FA`) to maintain a clean, breezy feel that allows photography and key actions to stand out.

## Typography

This design system utilizes **Geist** for its exceptional legibility and technical precision. The typographic scale is designed for clarity in high-utility environments.

- **Headlines:** Use Bold (700) or Semi-bold (600) weights to establish a strong hierarchy. Major section titles should use all-caps for a more authoritative, "directory-style" look.
- **Body Text:** Primarily set in 16px for optimal readability across devices. 18px is reserved for hero descriptions or introductory paragraphs.
- **Labels:** Use a slightly smaller font size with increased letter spacing and uppercase styling to differentiate metadata (like schedules or bus numbers) from interactive text.

## Layout & Spacing

The layout follows a **12-column fluid grid** for desktop and a **4-column grid** for mobile. The philosophy is "structured density," ensuring information is accessible without being overwhelming.

- **Desktop:** 48px side margins with 24px gutters. Content is centered in a max-width container of 1280px.
- **Mobile:** 16px side margins. Cards and search inputs should span the full width of the screen to maximize touch targets.
- **Rhythm:** Use an 8px base unit for all internal component spacing and stack-based vertical spacing (8px for related items, 32px for new sections).

## Elevation & Depth

Visual hierarchy is communicated through **Ambient Shadows** and **Tonal Layering**. 

The background is kept flat and light. Interactive cards and the booking engine use extra-diffused, low-opacity shadows (e.g., `0px 4px 20px rgba(1, 57, 144, 0.08)`) to create a subtle lift. This "soft depth" mimics the quality of Mediterranean sunlight—bright but not harsh. 

Navigational elements like the top header should remain flat to anchor the page, while modals and cookie banners use a semi-transparent backdrop blur (12px) to focus the user’s attention on legal or critical information.

## Shapes

The shape language is consistently **Rounded**, reflecting a friendly and accessible service. 

- **Standard Elements:** Buttons, input fields, and small tags use a 0.5rem (8px) radius.
- **Containers:** Service cards and the hero booking module use a 1rem (16px) radius to create a distinct, modern look. 
- **Icons:** Should follow a similar soft-cornered aesthetic; avoid sharp 90-degree angles in custom iconography.

## Components

### Buttons
Primary action buttons (e.g., "SEARCH", "BOOK NOW") utilize the **Energetic Orange** background with white text. They should have a minimum height of 48px for touch accessibility. Secondary actions use the **Deep Navy** or a subtle outline style.

### Cards
Service and route cards should feature a top-aligned image with a 16px corner radius. The content area below the image uses `body-md` for descriptions and a bold `label-md` for pricing. Use a subtle 1px border (`#E9ECEF`) combined with the ambient shadow defined in Elevation.

### Input Fields
Search and booking inputs should have a clean, white background with a 1px border. On focus, the border transitions to **Coastal Teal** with a soft glow. Use clear icons (e.g., calendar, map pin) to aid rapid scanning.

### Navigation
The header is clean and functional. Use **Deep Navy** for the active state of navigation links. A utility bar above the main nav should house language switching and contact numbers in a smaller, secondary font weight.

### Chips & Tags
Use for status (e.g., "Direct", "Last Seats"). These should have a pill-shape and use low-saturation versions of the brand colors (e.g., light teal background with dark teal text) to avoid competing with primary buttons.