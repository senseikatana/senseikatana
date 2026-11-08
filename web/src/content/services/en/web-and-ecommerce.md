---
title: 'Web and e-commerce'
description: 'Sites and stores that load fast, index well and do not depend on a plugin to work.'
icon: 'i-lucide-monitor'
order: 1
featured: true
draft: false
stack: ['Nuxt', 'Astro', 'Next', 'TypeScript', 'Stripe', 'Cloudflare']
deliverables:
  - 'Information architecture and routes'
  - 'Implementation in Nuxt, Astro or Next'
  - 'Catalogue, checkout and Stripe payments'
  - 'ES/CA/EN i18n and technical SEO'
  - 'Deploy and CI on Cloudflare or Vercel'
---

## What problem it solves

A slow website or a catalogue edited by hand costs sales every day. It also costs time: every change goes through someone who "knows how to touch" the store.

I build sites and stores where content and catalogue have a clear model, performance is part of the design and deployment does not depend on a local machine.

## How I approach it

- **Content first**: routes, collections and metadata before choosing components.
- **Performance as a requirement**: load budget, optimised images and static HTML when the case allows it.
- **Checkout without surprises**: prices and quantities are validated on the server, never on the client.
- **Technical SEO**: canonical, `hreflang`, sitemap and structured data from the first deploy.

## Real cases

### Empresa Plana — public site and internal panel over a single data model

Empresa Plana needed to publish in Spanish and Catalan and, at the same time, let their team edit content without depending on development. Instead of two applications with two databases, the site and the panel share a single schema.

- **Implementation**: public site in Astro, private panel on Prisma and InsForge, static deploy on Cloudflare.
- **What it solves**: the team publishes from the panel; the site reads and serves static HTML, with no manual rebuild.
- **Technical base**: language-prefixed routes, consistent `hreflang`, canonical, sitemap and structured data.

[See the full case ->](/projects/empresaplana)

### Store example: a small catalogue with server-validated checkout

The pattern I use for short-catalogue stores, such as decoration, food or crafts:

- Catalogue as typed content: product, variants, price, stock and availability in an explicit model.
- Static product pages, regenerated when the catalogue changes.
- Checkout with Stripe and price, stock and shipping validation on the server, never on the client.
- Panel to edit products and availability without touching code or waiting for a deploy.

It is an architecture example, not a client: the real scope is defined after the diagnosis.

## Solutions we can build

- **Corporate site with a content panel**: Astro or Nuxt with a typed content model and editing without deploy.
- **Catalogue and store**: product, variants, stock and prices in a clear model, with Stripe validated on the server.
- **Migration from WordPress or WooCommerce**: content, catalogue and redirects so you do not lose rankings.
- **Real multilingual**: routes per language, `hreflang`, per-locale sitemap and translatable content.
- **Performance and technical SEO**: load budget, optimised images, static HTML and structured data.
- **Integrations**: ERP, CRM, shipping, invoicing and payments connected with explicit contracts.

## Design and brand, as a team

When the project needs visual identity, art direction or UX beyond implementation, I work with **Bella Romeu** at [Daath Design Studio](https://daathdesign.com/#capabilities). She leads brand and design; I make sure it reaches production without losing intent: components, tokens, accessibility and performance.

If the project is only about identity or communication, I can also refer it directly to the studio.

## Who it is not for

It is not for someone looking for a closed template with forty plugins. If the business fits in a product page and a form, there are cheaper options than custom development.
