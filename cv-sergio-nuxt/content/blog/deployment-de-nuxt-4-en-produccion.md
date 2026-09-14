---
title: Deployment de Nuxt 4 en Produccion
description: Guia paso a paso para deployar una aplicacion Nuxt 4 en Vercel, Railway o un VPS con Docker.
date: '2025-07-20'
tags: ['deployment', 'nuxt', 'docker', 'vercel', 'devops']
author: Sergio Esteban
published: true
---

# Deployment de Nuxt 4 en Produccion

Construir una aplicacion es solo la mitad del trabajo. Deployarla correctamente es lo que diferencia un proyecto profesional de uno amateur.

## Opciones de deployment

### 1. Vercel (Recomendado para empezar)

Vercel tiene soporte nativo para Nuxt. Es la opcion mas simple:

```bash
# Instalar CLI
npm i -g vercel

# Deploy
vercel
```

Configuracion en `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  nitro: {
    preset: 'vercel'
  }
})
```

### 2. Railway

Railway es excelente para apps con backend:

```toml
# railway.toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "node .output/server/index.mjs"
```

### 3. Docker (VPS)

Para control total, Docker es la mejor opcion:

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
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

## Variables de entorno

Nunca hardcodees secrets en el codigo:

```bash
# .env.production
STRIPE_SECRET_KEY=sk_live_xxx
DATABASE_URL=postgresql://...
SITE_URL=https://senseikatana.com
```

## Checklist de deployment

- [ ] Variables de entorno configuradas
- [ ] Build sin errores (`bun run build`)
- [ ] Tests pasando (`bun run test`)
- [ ] Lint limpio (`bun run lint`)
- [ ] SEO meta tags configurados
- [ ] Sitemap generado
- [ ] Analytics configurado
- [ ] Error tracking (Sentry, etc.)
- [ ] SSL/HTTPS activo
- [ ] Redirects de dominio configurados

## Monitoreo

Una vez en produccion, necesitas monitorear:

1. **Uptime**: UptimeRobot, Better Stack
2. **Errores**: Sentry, LogRocket
3. **Performance**: Vercel Analytics, Web Vitals
4. **Logs**: Railway Logs, Vercel Logs

## Rollback

Si algo sale mal, necesitas poder revertir rapido:

```bash
# Vercel
vercel rollback

# Railway
railway rollback

# Docker
docker-compose down
docker-compose up -d --build
```

## Conclusión

El deployment es un proceso que debe ser repetible y confiable. Automatizalo tanto como puedas con CI/CD y ten siempre un plan de rollback.

En el proximo post voy a cubrir como integrar Stripe para pagos en tu aplicacion Nuxt.
