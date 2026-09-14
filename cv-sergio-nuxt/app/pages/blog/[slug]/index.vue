<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: post } = await useAsyncData(`blog-${slug}`, () =>
  queryCollection('blog')
    .where('_path', '=', `/blog/${slug}`)
    .first()
)

if (!post.value) {
  throw createError({ statusCode: 404, message: 'Post no encontrado' })
}

useSeoMeta({
  title: post.value.title,
  description: post.value.description,
})
</script>

<template>
  <UContainer v-if="post" class="py-12">
    <article class="max-w-3xl mx-auto">
      <header class="mb-10">
        <h1 class="text-4xl font-bold text-white-50 mb-4">{{ post.title }}</h1>
        <div class="flex items-center gap-4 text-white-400 text-sm">
          <span class="flex items-center gap-1.5">
            <UIcon name="i-lucide-user" class="text-xs" />
            {{ post.author }}
          </span>
          <span class="flex items-center gap-1.5">
            <UIcon name="i-lucide-calendar" class="text-xs" />
            <time>{{ new Date(post.date).toLocaleDateString('es-AR') }}</time>
          </span>
        </div>
        <div class="flex flex-wrap gap-2 mt-4">
          <UBadge v-for="tag in post.tags" :key="tag" color="info" variant="soft" size="sm">
            {{ tag }}
          </UBadge>
        </div>
      </header>

      <div class="prose prose-invert max-w-none">
        <ContentRenderer :value="post" />
      </div>

      <div class="mt-12 pt-8 border-t border-dark-700/50">
        <UButton to="/blog" variant="ghost" icon="i-lucide-arrow-left" class="text-white-400 hover:text-white-100">
          Volver al Blog
        </UButton>
      </div>
    </article>
  </UContainer>
</template>
