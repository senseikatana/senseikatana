---
title: 'POS System'
description: 'Point of sale configurable per business domain, with a hexagonal core and atomic transactions.'
sector: 'Retail / point of sale'
year: '2026'
repoUrl: 'https://github.com/senseikatana/pos-system'
role: 'Architecture and full-stack development'
stack: ['Nuxt', 'Vue', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind']
challenge: 'A point of sale that worked the same for hardware, retail and electronics, without forking the code per client.'
solution: 'Agnostic domain core, ports and adapters, Prisma with atomic transactions, RBAC and domain events. Barcode scanner and store credit.'
outcome: 'A core configurable through product metadata and units, with sales, customer debt and cash closing in the same transaction.'
featured: true
order: 3
draft: false
---

## Context

Every business calls the same thing differently: unit, kilo, box, metre. A closed POS forces you to duplicate the project for every industry.

## Decision

The domain knows nothing about Vue or Prisma. Use cases orchestrate ports, and the infrastructure implements those ports with Prisma. Payment, stock deduction and customer debt happen in a single atomic transaction.

## Technical details

- Hexagonal architecture with ports and adapters.
- RBAC for administrator and cashier, verified on the server.
- Domain events for completed sale and low stock.
- Interchangeable payment strategies: cash, card and store credit.

## What I learned

Real configurability is not in the forms: it is in the model. If the product can describe its units and metadata, the POS does not need an `if` per industry.
