---
title: 'ERP-Lite'
description: 'ERP multiempresa amb API FastAPI i front Nuxt: vendes, compres, magatzem i transport en un sol sistema.'
sector: 'ERP / operacions'
year: '2026'
repoUrl: 'https://github.com/senseikatana/erp-lite-dashboard'
role: 'Arquitectura i desenvolupament full-stack'
stack: ['FastAPI', 'Python', 'Nuxt', 'TypeScript', 'PostgreSQL', 'Docker']
challenge: 'Diverses empreses, un sol ERP: vendes, compres, magatzem i transport sense barrejar dades entre societats.'
solution: 'API FastAPI amb SQLAlchemy i JWT, front Nuxt amb Pinia i i18n. Docker Compose per a desenvolupament i migracions versionades.'
outcome: 'Base multiempresa amb mòduls separats i un front únic per a operacions de venda, compra i estoc.'
featured: true
order: 2
draft: false
---

## Context

Un ERP lleuger per a grups amb diverses societats. Cada empresa té el seu catàleg, els seus clients i el seu estoc, però comparteixen la mateixa aplicació i el mateix desplegament.

## Decisió

El backend exposa recursos per empresa i l'aïllament s'aplica a la capa de dades, no a la interfície. El front no coneix la base de dades: consumeix l'API i representa l'estat.

## Detalls tècnics

- Autenticació JWT i permisos per rol.
- SQLAlchemy amb sessions per request.
- Migracions versionades i dades d'exemple.
- `docker-compose` per aixecar API i front en una comanda.

## Què vaig aprendre

Multiempresa no és un camp `tenant_id` a cada taula. És una decisió de disseny que ha de ser a les consultes, als índexs i als tests.
