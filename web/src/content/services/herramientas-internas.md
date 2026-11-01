---
title: 'Herramientas internas'
description: 'Paneles, ERP, WMS y POS que reemplazan planillas paralelas y procesos que solo entiende una persona.'
icon: 'i-lucide-panels-top-left'
order: 2
featured: true
draft: false
stack: ['Nuxt', 'Vue', 'FastAPI', 'Prisma', 'PostgreSQL']
deliverables:
  - 'Modelo de datos y reglas de negocio'
  - 'Roles y permisos (RBAC)'
  - 'Auditoría y trazabilidad de cambios'
  - 'Reportes, cierres y exportaciones'
  - 'Migración de datos existentes'
---

## Qué problema resuelve

Cuando el stock vive en tres Excels y el cierre de caja se calcula a mano, el sistema real es la memoria de una persona. Eso no escala y no se audita.

Construyo herramientas internas para almacén, logística, retail y back-office: una sola fuente de verdad, permisos por rol y trazabilidad de quién hizo qué.

## Cómo lo abordo

- **Dominio separado de la interfaz**: las reglas de negocio no viven en un componente.
- **Transacciones atómicas**: una venta descuenta stock, registra deuda y emite ticket, o no pasa nada.
- **Roles explícitos**: administrador y operador ven cosas distintas, y el servidor lo verifica.
- **Migración incluida**: los datos que ya existen se importan y se validan, no se piden de nuevo.

## Para quién no es

No es para quien necesita un ERP estándar instalado mañana. Si un producto de mercado cubre el 90% del proceso, conviene empezar por ahí.
