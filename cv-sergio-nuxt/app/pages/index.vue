<script setup lang="ts">
import { site } from '~~/data/site'

const { locale, t } = useI18n()
const localePath = useLocalePath()

const { data } = await useAsyncData('home-resume', () =>
  queryCollection('resume').where('lang', '=', locale.value).first(),
  { watch: [locale] },
)

const resume = computed(() => data.value as {
  name: string
  title: string
  summary: string
  linkedin: string
  pdfUrl: string
  hardSkills: string[]
} | null)

const socials = [
  { icon: 'i-simple-icons-linkedin', to: site.linkedin, label: 'LinkedIn' },
]
</script>

<template>
  <div v-if="resume">
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-950" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-sky-900)_0%,_transparent_50%)] opacity-20" />

      <UContainer class="relative py-24 lg:py-32">
        <div class="flex flex-col lg:flex-row items-center gap-16">
          <div class="flex-1 max-w-2xl">
            <div class="inline-block px-3 py-1 mb-6 rounded-full bg-sky-900/30 border border-sky-800/40 text-sky-300 text-xs font-medium tracking-wide uppercase">
              {{ resume.title }}
            </div>

            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white-50">
              {{ resume.name }}
            </h1>

            <p class="text-lg md:text-xl text-white-400 mb-8 leading-relaxed">
              {{ resume.summary }}
            </p>

            <div class="flex flex-wrap gap-2 mb-10">
              <span
                v-for="tag in $tm('home.tags')"
                :key="tag"
                class="font-mono text-xs text-sky-300/80 bg-sky-900/20 border border-sky-800/30 px-3 py-1.5 rounded-full"
              >
                {{ tag }}
              </span>
            </div>

            <div class="flex flex-wrap gap-3">
              <UButton :to="localePath('/about')" size="lg" class="px-8">
                {{ t('home.ctaCv') }}
              </UButton>
              <a
                :href="resume.pdfUrl"
                download
                class="inline-flex items-center gap-2 h-11 px-8 rounded-md border border-white-200/20 text-white-200 hover:bg-white-50/5 text-sm font-medium transition-colors"
              >
                <UIcon name="i-lucide-download" class="size-5" />
                {{ t('home.ctaPdf') }}
              </a>
              <UButton :to="localePath('/contact')" variant="ghost" size="lg" class="px-8 text-white-300">
                {{ t('home.ctaContact') }}
              </UButton>
            </div>

            <div class="flex gap-3 mt-8">
              <UButton
                v-for="s in socials"
                :key="s.icon"
                :icon="s.icon"
                color="neutral"
                variant="ghost"
                size="sm"
                :to="s.to"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="s.label"
                class="text-white-400 hover:text-white-100"
              />
            </div>
          </div>

          <div class="flex-shrink-0">
            <img
              src="/cv/sergio-jurado.jpg"
              :alt="resume.name"
              class="w-56 h-72 lg:w-72 lg:h-96 object-cover rounded-2xl border-2 border-teal-800/40 shadow-2xl shadow-teal-900/20"
            >
          </div>
        </div>
      </UContainer>
    </section>

    <section class="py-20 bg-dark-900">
      <UContainer>
        <h2 class="text-3xl font-bold text-white-50 mb-12 text-center">{{ t('home.hardSkillsTitle') }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div
            v-for="skill in resume.hardSkills"
            :key="skill"
            class="text-center p-5 bg-dark-800/50 border border-dark-700/30 rounded-xl hover:border-teal-700/40 hover:bg-dark-800 transition-all duration-200"
          >
            <span class="font-medium text-sm text-white-200">{{ skill }}</span>
          </div>
        </div>
      </UContainer>
    </section>

    <section class="py-16 bg-dark-950">
      <UContainer>
        <div class="text-center max-w-2xl mx-auto">
          <h2 class="text-2xl md:text-3xl font-bold text-white-50 mb-4">
            {{ t('home.availabilityTitle') }}
          </h2>
          <p class="text-white-400 mb-8">
            {{ t('home.availabilitySubtitle') }}
          </p>
          <div class="flex flex-wrap justify-center gap-3">
            <UButton :to="localePath('/about')" size="lg" class="px-8">
              {{ t('home.ctaCv') }}
            </UButton>
            <UButton :to="localePath('/contact')" variant="outline" size="lg" class="px-8 border-dark-600 text-white-300">
              {{ t('home.ctaContact') }}
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
