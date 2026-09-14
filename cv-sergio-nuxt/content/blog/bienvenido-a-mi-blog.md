---
title: Bienvenido a mi Blog
description: Primer post de mi nuevo blog construido con Nuxt Content v3.
date: '2025-01-08'
tags: ['nuxt', 'vue', 'introduccion']
author: Sergio Esteban
published: true
---

# Bienvenido a mi Blog

Este es mi primer post usando **Nuxt Content v3**. La nueva versión trae mejoras increíbles en rendimiento y developer experience.

## ¿Por qué Nuxt Content?

Nuxt Content es el módulo de CMS basado en archivos para Nuxt. Permite escribir contenido en Markdown, YAML, JSON o CSV y renderizarlo como páginas web.

### Características principales

- **Zero-config**: Funciona out of the box
- **Type-safe**: Definiciones de esquema con Zod
- **Rendimiento**: Mejorado significativamente en v3
- **SEO**: Meta tags automáticos

## Código de ejemplo

```vue
<script setup>
const { data: posts } = await useAsyncData('blog', () =>
  queryCollection('blog').all()
)
</script>

<template>
  <div v-for="post in posts" :key="post._path">
    <h2>{{ post.title }}</h2>
  </div>
</template>
```

## Próximos posts

En los próximos posts voy a cubrir:

1. Arquitectura hexagonal con Nuxt
2. Testing con Vitest
3. Deployment en Vercel
4. Patrones de diseño en Vue 3

¡Stay tuned!
