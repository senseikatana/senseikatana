<script setup lang="ts">
import { profiles } from '~~/data/profiles'

const profile = profiles.find(p => p.lang === 'es')!
const resumeSlug = profile.slug
</script>

<template>
  <UContainer class="py-12">
    <div class="mb-10">
      <h1 class="text-3xl font-bold text-white-50 mb-2">Sobre mí</h1>
      <p class="text-white-400">{{ profile.title }}</p>
    </div>

    <div class="grid md:grid-cols-2 gap-10">
      <div class="space-y-6">
        <p class="text-lg text-white-200 leading-relaxed">
          Hola, soy {{ profile.name }}. Vivo en {{ profile.location }}.
        </p>

        <p class="text-white-400 leading-relaxed">
          {{ profile.summary }}
        </p>

        <p v-if="profile.note" class="text-sm text-white-500">
          {{ profile.note }}
        </p>

        <div class="flex flex-wrap gap-3 pt-2">
          <UButton to="/hola">
            CV digital
          </UButton>
          <UButton :to="`/es/resume/${resumeSlug}`" variant="outline" class="border-dark-600 text-white-300">
            Resume completo
          </UButton>
          <UButton to="/contact" variant="ghost" class="text-sky-400">
            Contacto
          </UButton>
        </div>
      </div>

      <div class="space-y-6">
        <UCard class="bg-dark-800/60 border-dark-700/50">
          <h3 class="font-semibold text-white-100 mb-4">Hard skills</h3>
          <div class="flex flex-wrap gap-2">
            <UBadge v-for="skill in profile.hardSkills" :key="skill" color="primary" variant="soft">
              {{ skill }}
            </UBadge>
          </div>
        </UCard>

        <UCard class="bg-dark-800/60 border-dark-700/50">
          <h3 class="font-semibold text-white-100 mb-4">Soft skills</h3>
          <ul class="space-y-3">
            <li
              v-for="skill in profile.softSkills"
              :key="skill"
              class="flex items-center gap-2 text-white-400"
            >
              <UIcon name="i-lucide-chevron-right" class="text-sky-400 text-sm" />
              {{ skill }}
            </li>
          </ul>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>
