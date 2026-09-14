<script setup lang="ts">
import { profiles } from '~~/data/profiles'

const route = useRoute()
const lang = route.params.lang as string
const slug = route.params.slug as string

const profile = computed(() => profiles.find(p => p.slug === slug && p.lang === lang))

if (!profile.value) {
  throw createError({ statusCode: 404, message: 'Profile not found' })
}

const skillLevelColor = (level: string) => {
  const colors: Record<string, string> = {
    beginner: 'text-white-500',
    intermediate: 'text-sky-400',
    advanced: 'text-emerald-400',
    expert: 'text-yellow-400',
  }
  return colors[level] || 'text-white-500'
}

useSeoMeta({
  title: `${profile.value.name} - ${profile.value.title}`,
  description: profile.value.summary,
})
</script>

<template>
  <UContainer v-if="profile" class="py-12">
    <div class="mb-10">
      <h1 class="text-3xl font-bold text-white-50">{{ profile.name }}</h1>
      <p class="text-xl text-sky-400 mt-1">{{ profile.title }}</p>
      <div class="flex flex-wrap gap-4 mt-3 text-sm text-white-400">
        <span class="flex items-center gap-1.5">
          <UIcon name="i-lucide-mail" class="text-xs" />
          {{ profile.email }}
        </span>
        <span class="flex items-center gap-1.5">
          <UIcon name="i-lucide-map-pin" class="text-xs" />
          {{ profile.location }}
        </span>
      </div>
    </div>

    <div class="space-y-10">
      <section>
        <h2 class="text-xl font-semibold text-white-100 mb-4 flex items-center gap-2">
          <UIcon name="i-lucide-user" class="text-sky-400" />
          {{ lang === 'es' ? 'Resumen' : 'Summary' }}
        </h2>
        <p class="text-white-300 leading-relaxed">{{ profile.summary }}</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white-100 mb-6 flex items-center gap-2">
          <UIcon name="i-lucide-briefcase" class="text-sky-400" />
          {{ lang === 'es' ? 'Experiencia' : 'Experience' }}
        </h2>
        <div class="space-y-8">
          <div v-for="exp in profile.experience" :key="exp.company" class="relative pl-6 border-l-2 border-teal-700/50">
            <div class="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-teal-500 border-2 border-dark-900" />
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
              <h3 class="font-semibold text-white-100">{{ exp.role }}</h3>
              <span class="text-sm text-white-500">{{ exp.period }}</span>
            </div>
            <p class="text-sky-400 text-sm mb-2">{{ exp.company }}</p>
            <p class="text-white-300 text-sm leading-relaxed">{{ exp.description }}</p>
            <div class="flex flex-wrap gap-1.5 mt-3">
              <UBadge v-for="tech in exp.technologies" :key="tech" color="primary" variant="soft" size="sm">
                {{ tech }}
              </UBadge>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white-100 mb-4 flex items-center gap-2">
          <UIcon name="i-lucide-graduation-cap" class="text-sky-400" />
          {{ lang === 'es' ? 'Educacion' : 'Education' }}
        </h2>
        <div class="space-y-4">
          <div v-for="edu in profile.education" :key="edu.institution" class="p-4 bg-dark-800/40 rounded-lg border border-dark-700/30">
            <h3 class="font-semibold text-white-100">{{ edu.degree }}</h3>
            <p class="text-sky-400 text-sm">{{ edu.institution }}</p>
            <span class="text-sm text-white-500">{{ edu.period }}</span>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white-100 mb-4 flex items-center gap-2">
          <UIcon name="i-lucide-code-2" class="text-sky-400" />
          {{ lang === 'es' ? 'Habilidades' : 'Skills' }}
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div v-for="skill in profile.skills" :key="skill.name" class="p-3 bg-dark-800/40 rounded-lg border border-dark-700/30 text-center">
            <p class="font-medium text-sm text-white-200">{{ skill.name }}</p>
            <p :class="skillLevelColor(skill.level)" class="text-xs capitalize mt-1">
              {{ skill.level }}
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white-100 mb-4 flex items-center gap-2">
          <UIcon name="i-lucide-languages" class="text-sky-400" />
          {{ lang === 'es' ? 'Idiomas' : 'Languages' }}
        </h2>
        <div class="flex flex-wrap gap-4">
          <div v-for="language in profile.languages" :key="language.name" class="flex items-center gap-2 px-4 py-2 bg-dark-800/40 rounded-lg border border-dark-700/30">
            <span class="font-medium text-white-200">{{ language.name }}</span>
            <span class="text-white-500 text-sm">({{ language.level }})</span>
          </div>
        </div>
      </section>
    </div>

    <div class="mt-12 pt-8 border-t border-dark-700/50 flex flex-col sm:flex-row justify-between gap-3">
      <UButton :to="`/${lang === 'es' ? 'en' : 'es'}/resume/${slug}`" variant="outline" class="border-dark-600 text-white-300">
        {{ lang === 'es' ? 'View in English' : 'Ver en Espanol' }}
      </UButton>
      <UButton to="/" variant="ghost" icon="i-lucide-arrow-left" class="text-white-400 hover:text-white-100">
        Back to Home
      </UButton>
    </div>
  </UContainer>
</template>
