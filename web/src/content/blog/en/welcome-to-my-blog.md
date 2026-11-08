---
title: Welcome to My Blog
description: First post of my new blog built with Nuxt Content v3.
date: '2025-01-08'
tags: ['nuxt', 'vue', 'introduction']
author: Sergio Jurado Casado
published: true
---

# Welcome to My Blog

This is my first post using **Nuxt Content v3**. The new version brings incredible improvements in performance and developer experience.

## Why Nuxt Content?

Nuxt Content is the file-based CMS module for Nuxt. It lets you write content in Markdown, YAML, JSON or CSV and render it as web pages.

### Main features

- **Zero-config**: It works out of the box
- **Type-safe**: Schema definitions with Zod
- **Performance**: Significantly improved in v3
- **SEO**: Automatic meta tags

## Example code

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

## Upcoming posts

In the next posts I will cover:

1. Hexagonal architecture with Nuxt
2. Testing with Vitest
3. Deployment on Vercel
4. Design patterns in Vue 3

Stay tuned!
