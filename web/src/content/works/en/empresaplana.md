---
title: 'Empresa Plana'
description: 'Public site and internal panel over the same data model: the team publishes, the site serves static HTML.'
client: 'Empresa Plana'
sector: 'Transport and logistics'
year: '2026'
liveUrl: 'https://empresaplana.cat'
role: 'Technical design and full-stack implementation'
stack: ['Astro', 'TypeScript', 'Prisma', 'InsForge', 'Cloudflare', 'Tailwind']
challenge: 'The public site and internal management lived in two worlds: duplicated content, manual edits and no single source of truth.'
solution: 'An Astro site with ES/CA i18n and a private panel on the same data model (Prisma + InsForge), with authentication, content management and Cloudflare deployment.'
outcome: 'One model for site and back office: the team publishes from the panel and the site serves static content without manual rebuilds.'
featured: true
order: 1
draft: false
---

## Context

Empresa Plana needed a corporate site with Catalan and Spanish content, plus an internal tool so the team could edit that content without waiting on development.

## Decision

Instead of two applications with two databases, the project uses a single Prisma schema. The panel writes; the site reads and generates static HTML. Languages are routes, not copies of the content.

## Technical details

- Language-prefixed routes and consistent `hreflang`.
- Authentication and sessions on the server, not in the client.
- Versioned migrations and reproducible seeds.
- Cloudflare deployment with a static build.

## What I learned

The panel and the site share more than it seems. When the data model is the same, half of the synchronisation bugs disappear before they exist.
