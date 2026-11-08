---
title: Benvingut al meu blog
description: Primer post del meu nou blog construït amb Nuxt Content v3.
date: '2025-01-08'
tags: ['nuxt', 'vue', 'introducció']
author: Sergio Jurado Casado
published: true
---

# Benvingut al meu blog

Aquest és el meu primer post fent servir **Nuxt Content v3**. La nova versió porta millores increïbles en rendiment i experiència de desenvolupament.

## Per què Nuxt Content?

Nuxt Content és el mòdul de CMS basat en fitxers per a Nuxt. Permet escriure contingut en Markdown, YAML, JSON o CSV i renderitzar-lo com a pàgines web.

### Característiques principals

- **Zero-config**: Funciona out of the box
- **Type-safe**: Definicions d'esquema amb Zod
- **Rendiment**: Millorat significativament a la v3
- **SEO**: Meta tags automàtiques

## Codi d'exemple

```vue
<script setup>
const { data: posts } = await useAsyncData('blog', () => queryCollection('blog').all());
</script>

<template>
  <div v-for="post in posts" :key="post._path">
    <h2>{{ post.title }}</h2>
  </div>
</template>
```

## Propers posts

Als propers posts cobriré:

1. Arquitectura hexagonal amb Nuxt
2. Testing amb Vitest
3. Desplegament a Vercel
4. Patrons de disseny a Vue 3

Mantingueu-vos atents!
