---
title: Deploying Nuxt 4 to Production
description: A step-by-step guide to deploying a Nuxt 4 application on Vercel, Railway or a VPS with Docker.
date: '2025-07-20'
tags: ['deployment', 'nuxt', 'docker', 'vercel', 'devops']
author: Sergio Jurado Casado
published: true
---

# Deploying Nuxt 4 to Production

Building an application is only half the work. Deploying it correctly is what separates a professional project from an amateur one.

## Deployment options

### 1. Vercel (recommended to start)

Vercel has native support for Nuxt. It is the simplest option:

```bash
# Install the CLI
npm i -g vercel

# Deploy
vercel
```

Configuration in `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  nitro: {
    preset: 'vercel',
  },
});
```

### 2. Railway

Railway is excellent for apps with a backend:

```toml
# railway.toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "node .output/server/index.mjs"
```

### 3. Docker (VPS)

For full control, Docker is the best option:

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

## Environment variables

Never hardcode secrets in the code:

```bash
# .env.production
STRIPE_SECRET_KEY=sk_live_xxx
DATABASE_URL=postgresql://...
SITE_URL=https://senseikatana.com
```

## Deployment checklist

- [ ] Environment variables configured
- [ ] Build without errors (`bun run build`)
- [ ] Tests passing (`bun run test`)
- [ ] Clean lint (`bun run lint`)
- [ ] SEO meta tags configured
- [ ] Sitemap generated
- [ ] Analytics configured
- [ ] Error tracking (Sentry, etc.)
- [ ] SSL/HTTPS active
- [ ] Domain redirects configured

## Monitoring

Once in production, you need to monitor:

1. **Uptime**: UptimeRobot, Better Stack
2. **Errors**: Sentry, LogRocket
3. **Performance**: Vercel Analytics, Web Vitals
4. **Logs**: Railway Logs, Vercel Logs

## Rollback

If something goes wrong, you need to be able to revert quickly:

```bash
# Vercel
vercel rollback

# Railway
railway rollback

# Docker
docker-compose down
docker-compose up -d --build
```

## Conclusion

Deployment is a process that must be repeatable and reliable. Automate as much as you can with CI/CD and always have a rollback plan.

In the next post I will cover how to integrate Stripe for payments in your Nuxt application.
