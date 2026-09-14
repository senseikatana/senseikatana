<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-list', () =>
  queryCollection('blog')
    .where('published', '=', true)
    .order('date', 'DESC')
    .all()
)
</script>

<template>
  <UContainer class="py-12">
    <div class="mb-10">
      <h1 class="text-3xl font-bold text-white-50 mb-2">Blog</h1>
      <p class="text-white-400">Thoughts on development, architecture, and tech</p>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <UCard
        v-for="post in posts"
        :key="post.id"
        class="bg-dark-800/60 border-dark-700/50 hover:border-teal-700/40 transition-all duration-300"
      >
        <template #header>
          <h2 class="text-xl font-semibold text-white-100">
            <NuxtLink :to="post._path" class="hover:text-sky-300 transition-colors">
              {{ post.title }}
            </NuxtLink>
          </h2>
        </template>

        <p class="text-white-400 mb-4 line-clamp-3">{{ post.description }}</p>

        <div class="flex flex-wrap gap-2">
          <UBadge v-for="tag in post.tags" :key="tag" color="info" variant="soft" size="sm">
            {{ tag }}
          </UBadge>
        </div>

        <template #footer>
          <div class="flex items-center justify-between text-sm text-white-500">
            <span>{{ post.author }}</span>
            <time>{{ new Date(post.date).toLocaleDateString('es-AR') }}</time>
          </div>
        </template>
      </UCard>
    </div>

    <div v-if="!posts?.length" class="text-center py-16 text-white-400">
      <UIcon name="i-lucide-file-text" class="text-4xl mb-4 text-dark-500" />
      <p>No hay posts publicados aun.</p>
    </div>
  </UContainer>
</template>
