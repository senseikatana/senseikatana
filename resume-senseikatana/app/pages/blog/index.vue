<script setup lang="ts">
const { locale, t } = useI18n()
const localePath = useLocalePath()

/*
 * Los posts viven en `content/blog/*.md`, así que su `path` es `/blog/<slug>`
 * sin prefijo de idioma. Los enlaces SÍ necesitan `localePath`, o en `/ca` y
 * `/en` el `NuxtLink` caería en la ruta del idioma por defecto.
 */
const { data: posts } = await useAsyncData('blog-list', () =>
  queryCollection('blog')
    .where('published', '=', true)
    .order('date', 'DESC')
    .all(),
)

useSeoMeta({
  title: () => t('blog.title'),
})
</script>

<template>
  <div>
    <!-- ── Cabecera ─────────────────────────────────────────────────────── -->
    <section class="relative overflow-hidden border-b border-dark-700/60">
      <div class="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-950 to-dark-950" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_40%,oklch(0.6748_0.2116_38.6/0.13)_0%,transparent_50%)]" />
      <div class="scanline absolute inset-0" />

      <UContainer class="relative py-20 lg:py-24">
        <div class="reveal max-w-3xl">
          <SectionMarker :label="t('blog.eyebrow')" />
          <h1 class="font-display text-6xl leading-[0.85] md:text-8xl">
            {{ t('blog.title') }}<span class="text-forge-500">.</span>
          </h1>
          <p class="mt-5 text-lg text-white-400">
            {{ t('blog.subtitle') }}
          </p>
        </div>
      </UContainer>
    </section>

    <!-- ── Listado ──────────────────────────────────────────────────────── -->
    <section class="py-16 lg:py-20">
      <UContainer>
        <div
          v-if="posts?.length"
          class="reveal-stagger grid gap-5 md:grid-cols-2"
        >
          <NuxtLink
            v-for="post in posts"
            :key="post.id"
            :to="localePath(post.path)"
            class="card-forge group flex flex-col p-6 transition-colors hover:border-forge-500/60"
          >
            <div class="mb-4 flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.15em]">
              <span class="text-forge-500">
                {{ new Date(post.date).toLocaleDateString(locale) }}
              </span>
              <UIcon
                name="i-lucide-arrow-up-right"
                class="size-4 text-white-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-forge-500"
              />
            </div>

            <h2 class="mb-3 font-display text-2xl leading-tight text-white-50 transition-colors group-hover:text-forge-500">
              {{ post.title }}
            </h2>

            <p class="mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-white-400">
              {{ post.description }}
            </p>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="rounded-full border border-dark-600 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white-400"
              >
                {{ tag }}
              </span>
            </div>
          </NuxtLink>
        </div>

        <div
          v-else
          class="py-24 text-center"
        >
          <UIcon
            name="i-lucide-file-text"
            class="mx-auto mb-4 size-10 text-dark-600"
          />
          <p class="text-white-400">
            {{ t('blog.empty') }}
          </p>
        </div>
      </UContainer>
    </section>
  </div>
</template>