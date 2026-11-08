---
title: 'ERP-Lite'
description: 'Multi-company ERP with a FastAPI backend and Nuxt front end: sales, purchasing, warehouse and transport in a single system.'
sector: 'ERP / operations'
year: '2026'
repoUrl: 'https://github.com/senseikatana/erp-lite-dashboard'
role: 'Architecture and full-stack development'
stack: ['FastAPI', 'Python', 'Nuxt', 'TypeScript', 'PostgreSQL', 'Docker']
challenge: 'Several companies, one ERP: sales, purchasing, warehouse and transport without mixing data between legal entities.'
solution: 'FastAPI API with SQLAlchemy and JWT, Nuxt front end with Pinia and i18n. Docker Compose for development and versioned migrations.'
outcome: 'Multi-company base with separate modules and a single front end for sales, purchasing and stock operations.'
featured: true
order: 2
draft: false
---

## Context

A lightweight ERP for groups with several companies. Each company has its own catalogue, customers and stock, but they share the same application and deployment.

## Decision

The backend exposes resources per company and isolation is enforced in the data layer, not in the interface. The front end does not know the database: it consumes the API and represents state.

## Technical details

- JWT authentication and role-based permissions.
- SQLAlchemy with per-request sessions.
- Versioned migrations and sample data.
- `docker-compose` to start API and front end with one command.

## What I learned

Multi-company is not a `tenant_id` field on every table. It is a design decision that has to be in the queries, the indexes and the tests.
