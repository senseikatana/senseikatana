---
title: Desplegament de Nuxt 4 en producció
description: Guia pas a pas per desplegar una aplicació Nuxt 4 a Vercel, Railway o un VPS amb Docker.
date: '2025-07-20'
tags: ['desplegament', 'nuxt', 'docker', 'vercel', 'devops']
author: Sergio Jurado Casado
published: true
---

# Desplegament de Nuxt 4 en producció

Construir una aplicació és només la meitat de la feina. Desplegar-la correctament és el que diferencia un projecte professional d'un d'aficionat.

## Opcions de desplegament

### 1. Vercel (recomanat per començar)

Vercel té suport natiu per a Nuxt. És l'opció més simple:

```bash
# Instal·lar la CLI
npm i -g vercel

# Desplegar
vercel
```

Configuració a `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  nitro: {
    preset: 'vercel',
  },
});
```

### 2. Railway

Railway és excel·lent per a apps amb backend:

```toml
# railway.toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "node .output/server/index.mjs"
```

### 3. Docker (VPS)

Per a control total, Docker és la millor opció:

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install
COPY . .
RUN bun run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.output ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

```yaml
# docker-compose.yml
services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

## Variables d'entorn

No escriguis mai secrets al codi:

```bash
# .env.production
STRIPE_SECRET_KEY=sk_live_xxx
DATABASE_URL=postgresql://...
SITE_URL=https://senseikatana.com
```

## Checklist de desplegament

- [ ] Variables d'entorn configurades
- [ ] Build sense errors (`bun run build`)
- [ ] Tests passant (`bun run test`)
- [ ] Lint net (`bun run lint`)
- [ ] SEO meta tags configurades
- [ ] Sitemap generat
- [ ] Analytics configurat
- [ ] Error tracking (Sentry, etc.)
- [ ] SSL/HTTPS actiu
- [ ] Redireccions de domini configurades

## Monitoratge

Un cop en producció, necessites monitorar:

1. **Uptime**: UptimeRobot, Better Stack
2. **Errors**: Sentry, LogRocket
3. **Rendiment**: Vercel Analytics, Web Vitals
4. **Logs**: Railway Logs, Vercel Logs

## Rollback

Si alguna cosa va malament, necessites poder revertir ràpid:

```bash
# Vercel
vercel rollback

# Railway
railway rollback

# Docker
docker-compose down
docker-compose up -d --build
```

## Conclusió

El desplegament és un procés que ha de ser repetible i fiable. Automatitza tant com puguis amb CI/CD i tingues sempre un pla de rollback.

Al proper post cobriré com integrar Stripe per a pagaments a la teva aplicació Nuxt.
