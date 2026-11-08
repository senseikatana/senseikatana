---
title: 'Empresa Plana'
description: "Web pública i panell intern sobre un mateix model de dades: l'equip publica, la web serveix estàtic."
client: 'Empresa Plana'
sector: 'Transport i logística'
year: '2026'
liveUrl: 'https://empresaplana.cat'
repoUrl: 'https://github.com/senseikatana/empresaplana.cat'
role: 'Disseny tècnic i implementació full-stack'
stack: ['Astro', 'TypeScript', 'Prisma', 'InsForge', 'Cloudflare', 'Tailwind']
challenge: 'La web pública i la gestió interna vivien en dos mons: contingut duplicat, canvis a mà i cap font única de veritat.'
solution: 'Lloc Astro amb i18n ES/CA i un panell privat sobre el mateix model de dades (Prisma + InsForge). Autenticació, gestió de contingut i desplegament a Cloudflare.'
outcome: "Un sol model per a web i back-office: l'equip publica des del panell i la web serveix contingut estàtic, sense recompilar a mà."
featured: true
order: 1
draft: false
---

## Context

Empresa Plana necessitava una web corporativa amb contingut en català i castellà, i alhora una eina interna perquè l'equip pogués editar aquest contingut sense dependre de desenvolupament.

## Decisió

En lloc de dues aplicacions amb dues bases de dades, el projecte usa un únic esquema de Prisma. El panell escriu; la web llegeix i genera estàtic. Els idiomes són rutes, no còpies del contingut.

## Detalls tècnics

- Rutes amb prefix d'idioma i `hreflang` consistent.
- Autenticació i sessions al servidor, no al client.
- Migracions versionades i seeds reproduïbles.
- Desplegament a Cloudflare amb build estàtic.

## Què vaig aprendre

El panell i la web comparteixen més del que sembla. Quan el model de dades és el mateix, la meitat dels bugs de sincronització desapareixen abans d'existir.
