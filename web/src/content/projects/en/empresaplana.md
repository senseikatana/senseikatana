---
title: 'Empresa Plana'
description: 'Public site and internal panel over the same data model: the team publishes, the site serves static.'
client: 'Empresa Plana'
sector: 'Transport and logistics'
year: '2026'
liveUrl: 'https://empresaplana.cat'
repoUrl: 'https://github.com/senseikatana/empresaplana.cat'
role: 'Technical design and full-stack implementation'
stack: ['Astro', 'TypeScript', 'Prisma', 'InsForge', 'Cloudflare', 'Tailwind']
challenge: 'The public site and internal management lived in two worlds: duplicated content, manual changes and no single source of truth.'
solution: 'Astro site with ES/CA i18n and a private panel over the same data model (Prisma + InsForge). Authentication, content management and deployment on Cloudflare.'
outcome: 'A single model for site and back office: the team publishes from the panel and the site serves static content, with no manual rebuild.'
featured: true
order: 1
draft: false
---

## Context

Empresa Plana needed a corporate site with content in Catalan and Spanish, and at the same time an internal tool so the team could edit that content without depending on development.

## Decision

Instead of two applications with two databases, the project uses a single Prisma schema. The panel writes; the site reads and generates static output. Languages are routes, not copies of the content.

## Technical details

- Language-prefixed routes and consistent `hreflang`.
- Authentication and sessions on the server, not on the client.
- Versioned migrations and reproducible seeds.
- Deployment on Cloudflare with a static build.

## What I learned

The panel and the site share more than it seems. When the data model is the same, half of the synchronisation bugs disappear before they exist.
