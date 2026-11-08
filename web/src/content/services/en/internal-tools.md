---
title: 'Internal tools'
description: 'Dashboards, ERP, WMS and POS that replace parallel spreadsheets and processes only one person understands.'
icon: 'i-lucide-panels-top-left'
order: 2
featured: true
draft: false
stack: ['Nuxt', 'Vue', 'FastAPI', 'Prisma', 'PostgreSQL']
deliverables:
  - 'Data model and business rules'
  - 'Roles and permissions (RBAC)'
  - 'Audit and change traceability'
  - 'Reports, closings and exports'
  - 'Migration of existing data'
---

## What problem it solves

When stock lives in three spreadsheets and the cash closing is calculated by hand, the real system is one person's memory. That does not scale and cannot be audited.

I build internal tools for warehouse, logistics, retail and back office: a single source of truth, role-based permissions and traceability of who did what.

## How I approach it

- **Domain separated from the interface**: business rules do not live in a component.
- **Atomic transactions**: a sale deducts stock, records debt and issues a receipt, or nothing happens.
- **Explicit roles**: administrator and operator see different things, and the server verifies it.
- **Migration included**: existing data is imported and validated, not requested again.

## Who it is not for

It is not for someone who needs a standard ERP installed tomorrow. If a market product covers 90% of the process, it is worth starting there.
