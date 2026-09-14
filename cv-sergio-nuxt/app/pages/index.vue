<script setup lang="ts">
import { products, externalPlatformLabel } from '~~/data/products'
import { profiles } from '~~/data/profiles'

const resumeSlug = profiles.find(p => p.lang === 'es')?.slug ?? 'fullstack'

const socials = [
  { icon: 'i-simple-icons-github', to: 'https://github.com/senseikatana', label: 'GitHub' },
  { icon: 'i-simple-icons-linkedin', to: 'https://linkedin.com/in/sergioesteban', label: 'LinkedIn' },
]

const tags = ['#VUE', '#NUXT', '#TYPESCRIPT', '#NODEJS', '#CLEAN-ARCHITECTURE']

const techStack = [
  { name: 'Vue.js', icon: 'i-simple-icons-vuedotjs' },
  { name: 'Nuxt', icon: 'i-simple-icons-nuxtdotjs' },
  { name: 'TypeScript', icon: 'i-simple-icons-typescript' },
  { name: 'Node.js', icon: 'i-simple-icons-nodedotjs' },
  { name: 'PostgreSQL', icon: 'i-simple-icons-postgresql' },
  { name: 'Docker', icon: 'i-simple-icons-docker' },
  { name: 'AWS', icon: 'i-simple-icons-amazonwebservices' },
  { name: 'Tailwind CSS', icon: 'i-simple-icons-tailwindcss' },
]

const featuredProducts = computed(() => products.filter(p => p.featured))
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-950" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-sky-900)_0%,_transparent_50%)] opacity-20" />

      <UContainer class="relative py-24 lg:py-32">
        <div class="flex flex-col lg:flex-row items-center gap-16">
          <div class="flex-1 max-w-2xl">
            <div class="inline-block px-3 py-1 mb-6 rounded-full bg-sky-900/30 border border-sky-800/40 text-sky-300 text-xs font-medium tracking-wide uppercase">
              Full Stack Developer
            </div>

            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white-50">
              Sergio Esteban
            </h1>

            <p class="text-lg md:text-xl text-white-400 mb-8 leading-relaxed">
              Building modern web experiences with clean code, solid architecture, and a focus on what matters.
            </p>

            <div class="flex flex-wrap gap-2 mb-10">
              <span
                v-for="tag in tags"
                :key="tag"
                class="font-mono text-xs text-sky-300/80 bg-sky-900/20 border border-sky-800/30 px-3 py-1.5 rounded-full"
              >
                {{ tag }}
              </span>
            </div>

            <div class="flex flex-wrap gap-3">
              <UButton :to="`/es/resume/${resumeSlug}`" size="lg" class="px-8">
                View Resume
              </UButton>
              <UButton to="/contact" variant="outline" size="lg" class="px-8 border-white-200/20 text-white-200 hover:bg-white-50/5">
                Get in Touch
              </UButton>
            </div>

            <div class="flex gap-3 mt-8">
              <UButton
                v-for="s in socials"
                :key="s.icon"
                :icon="s.icon"
                color="gray"
                variant="ghost"
                size="sm"
                :to="s.to"
                target="_blank"
                :aria-label="s.label"
                class="text-white-400 hover:text-white-100"
              />
            </div>
          </div>

          <div class="flex-shrink-0">
            <div class="w-56 h-56 lg:w-72 lg:h-72 rounded-full bg-dark-800 border-2 border-teal-800/40 shadow-2xl shadow-teal-900/20 flex items-center justify-center">
              <UIcon name="i-lucide-user" class="text-6xl lg:text-7xl text-teal-600/50" />
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Featured Products -->
    <section class="py-20 bg-dark-950">
      <UContainer>
        <div class="flex items-end justify-between mb-12">
          <div>
            <h2 class="text-3xl font-bold text-white-50 mb-2">Featured Resources</h2>
            <p class="text-white-400">Tools and templates to accelerate your workflow</p>
          </div>
          <UButton to="/store" variant="ghost" class="text-sky-400 hover:text-sky-300 hidden md:flex">
            View all &rarr;
          </UButton>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <UCard
            v-for="product in featuredProducts"
            :key="product.slug"
            class="bg-dark-800/60 border-dark-700/50 hover:border-teal-700/40 transition-all duration-300 group"
          >
            <template #header>
              <div class="aspect-video bg-dark-900 rounded-t-lg flex items-center justify-center">
                <UIcon name="i-lucide-shopping-bag" class="text-4xl text-dark-600 group-hover:text-teal-600 transition-colors" />
              </div>
            </template>

            <h3 class="font-semibold mb-2 text-white-100">
              <NuxtLink :to="`/store/${product.slug}`" class="hover:text-sky-300 transition-colors">
                {{ product.name }}
              </NuxtLink>
            </h3>
            <p class="text-white-400 text-sm mb-4 line-clamp-2">{{ product.description }}</p>

            <div class="flex items-center justify-between">
              <span class="text-xl font-bold text-white-100">
                ${{ product.price.toFixed(2) }}
              </span>
              <UButton
                v-if="product.externalUrl"
                :to="product.externalUrl"
                target="_blank"
                size="sm"
                color="gray"
                variant="ghost"
                class="text-sky-400"
                icon="i-lucide-external-link"
              >
                Ver en {{ externalPlatformLabel(product.externalPlatform) }}
              </UButton>
              <UButton v-else :to="`/store/${product.slug}`" size="sm" color="gray" variant="ghost" class="text-sky-400">
                View Details
              </UButton>
            </div>
          </UCard>
        </div>

        <div class="text-center mt-10 md:hidden">
          <UButton to="/store" variant="outline" class="border-dark-600 text-white-300">
            View All Resources &rarr;
          </UButton>
        </div>
      </UContainer>
    </section>

    <!-- Tech Stack -->
    <section class="py-20 bg-dark-900">
      <UContainer>
        <h2 class="text-3xl font-bold text-white-50 mb-12 text-center">Tech Stack</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div
            v-for="tech in techStack"
            :key="tech.name"
            class="text-center p-5 bg-dark-800/50 border border-dark-700/30 rounded-xl hover:border-teal-700/40 hover:bg-dark-800 transition-all duration-200 group"
          >
            <UIcon :name="tech.icon" class="text-2xl mb-2 text-dark-500 group-hover:text-teal-400 transition-colors" />
            <span class="font-medium text-sm text-white-200">{{ tech.name }}</span>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- CTA Banner -->
    <section class="py-16 bg-dark-950">
      <UContainer>
        <div class="text-center max-w-2xl mx-auto">
          <h2 class="text-2xl md:text-3xl font-bold text-white-50 mb-4">
            Let's build something great together
          </h2>
          <p class="text-white-400 mb-8">
            Open to freelance work, collaborations, and interesting projects.
          </p>
          <div class="flex flex-wrap justify-center gap-3">
            <UButton to="/contact" size="lg" class="px-8">
              Get in Touch
            </UButton>
            <UButton :to="`/es/resume/${resumeSlug}`" variant="outline" size="lg" class="px-8 border-dark-600 text-white-300">
              See My Work
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
