---
title: Shared UI
description: Cross-feature Tailwind primitives — buttons, forms, feedback, navigation, data display, layout and app shells.
---

# Shared UI

**330 components** for the layer every feature builds with: primitives, form
controls, feedback, navigation, data display, layout and application shells.
See the [catalog](./catalog.md) for every category and folder.

## Primitives

<TailwindShowcase
  src="shared/primitives/buttons/primary-buttons"
  label="Primary buttons"
  category="Shared / Primitives / Buttons"
  :height="220"
/>

<TailwindShowcase
  src="shared/primitives/badges/basic-badges"
  label="Basic badges"
  category="Shared / Primitives / Badges"
  :height="180"
/>

## Forms

<TailwindShowcase
  src="shared/forms/input-groups/input-with-add-on"
  label="Input with add-on"
  category="Shared / Forms / Input Groups"
  :height="240"
/>

## Data display

<TailwindShowcase
  src="shared/data-display/tables/simple"
  label="Simple table"
  category="Shared / Data Display / Tables"
  :height="360"
/>

<TailwindShowcase
  src="shared/data-display/stats/simple"
  label="Simple stats"
  category="Shared / Data Display / Stats"
  :height="200"
/>

## Navigation

<TailwindShowcase
  src="shared/navigation/breadcrumbs/simple-with-chevrons"
  label="Breadcrumbs with chevrons"
  category="Shared / Navigation / Breadcrumbs"
  :height="160"
/>

## Feedback

<TailwindShowcase
  src="shared/feedback/alerts/with-description"
  label="Alert with description"
  category="Shared / Feedback / Alerts"
  :height="200"
/>

<TailwindShowcase
  src="shared/feedback/modals/centered-with-single-action"
  label="Centered modal"
  category="Shared / Feedback / Modals"
  :height="360"
/>

## Application shells

<TailwindShowcase
  src="shared/shells/sidebar/light-sidebar"
  label="Light sidebar shell"
  category="Shared / Shells / Sidebar"
  :height="560"
/>

::: tip Shared is still feature-aware
`shared/` holds UI that more than one feature composes. A component that only
makes sense inside one capability — a checkout form, an order summary, a
pricing table — lives in that feature folder instead.
:::
