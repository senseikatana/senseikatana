---
title: 'POS System'
description: 'Punt de venda configurable per domini, amb nucli hexagonal i transaccions atòmiques.'
sector: 'Retail / punt de venda'
year: '2026'
repoUrl: 'https://github.com/senseikatana/pos-system'
role: 'Arquitectura i desenvolupament full-stack'
stack: ['Nuxt', 'Vue', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind']
challenge: 'Un punt de venda que servís igual per a ferreteria, retail i electrònica, sense fer un fork del codi per client.'
solution: 'Nucli de domini agnòstic, ports i adaptadors, Prisma amb transaccions atòmiques, RBAC i esdeveniments de domini. Escàner de codi de barres i compte corrent.'
outcome: 'Un core configurable per metadades de producte i unitats, amb vendes, deute de clients i tancament de caixa a la mateixa transacció.'
featured: true
order: 3
draft: false
---

## Context

Cada negoci en diu una cosa diferent: unitat, quilo, caixa, metre. Un POS tancat obliga a duplicar el projecte per cada sector.

## Decisió

El domini no sap res de Vue ni de Prisma. Els casos d'ús orquestren ports, i la infraestructura implementa aquests ports amb Prisma. El cobrament, el descompte d'estoc i el deute del client passen en una transacció atòmica.

## Detalls tècnics

- Arquitectura hexagonal amb ports i adaptadors.
- RBAC per a administrador i caixer, verificat al servidor.
- Esdeveniments de domini per a venda completada i estoc baix.
- Estratègies de pagament intercanviables: efectiu, targeta i compte corrent.

## Què vaig aprendre

La configurabilitat real no és als formularis: és al model. Si el producte pot descriure les seves unitats i metadades, el POS no necessita un `if` per sector.
