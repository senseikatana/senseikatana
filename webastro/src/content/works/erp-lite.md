---
title: 'ERP-Lite'
description: 'ERP multiempresa con API FastAPI y front Nuxt: ventas, compras, almacén y transporte en un solo sistema.'
sector: 'ERP / operaciones'
year: '2026'
repoUrl: 'https://github.com/senseikatana/erp-lite-dashboard'
role: 'Arquitectura y desarrollo full-stack'
stack: ['FastAPI', 'Python', 'Nuxt', 'TypeScript', 'PostgreSQL', 'Docker']
challenge: 'Varias empresas, un solo ERP: ventas, compras, almacén y transporte sin mezclar datos entre sociedades.'
solution: 'API FastAPI con SQLAlchemy y JWT, front Nuxt con Pinia e i18n. Docker Compose para desarrollo y migraciones versionadas.'
outcome: 'Base multiempresa con módulos separados y un front único para operaciones de venta, compra y stock.'
featured: true
order: 2
draft: false
---

## Contexto

Un ERP ligero para grupos con varias sociedades. Cada empresa tiene su catálogo, sus clientes y su stock, pero comparten la misma aplicación y el mismo despliegue.

## Decisión

El backend expone recursos por empresa y el aislamiento se aplica en la capa de datos, no en la interfaz. El front no conoce la base de datos: consume la API y representa el estado.

## Detalles técnicos

- Autenticación JWT y permisos por rol.
- SQLAlchemy con sesiones por request.
- Migraciones versionadas y datos de ejemplo.
- `docker-compose` para levantar API y front en un comando.

## Qué aprendí

Multiempresa no es un campo `tenant_id` en cada tabla. Es una decisión de diseño que tiene que estar en las consultas, en los índices y en los tests.
