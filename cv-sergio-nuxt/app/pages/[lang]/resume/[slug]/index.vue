<script setup lang="ts">
import { profiles } from '~~/data/profiles'

const route = useRoute()
const lang = route.params.lang as string
const slug = route.params.slug as string

const profile = computed(() => profiles.find(p => p.slug === slug && p.lang === lang))

if (!profile.value) {
  throw createError({ statusCode: 404, message: 'Profile not found' })
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
          <UIcon name="i-lucide-phone" class="text-xs" />
          {{ profile.phone }}
        </span>
        <span class="flex items-center gap-1.5">
          <UIcon name="i-lucide-map-pin" class="text-xs" />
          {{ profile.location }}
        </span>
      </div>
      <p v-if="profile.note" class="text-sm text-white-500 mt-3">{{ profile.note }}</p>
    </div>

    <div class="space-y-10">
      <section>
        <h2 class="text-xl font-semibold text-white-100 mb-4 flex items-center gap-2">
          <UIcon name="i-lucide-user" class="text-sky-400" />
          {{ lang === 'es' ? 'Perfil profesional' : 'Professional profile' }}
        </h2>
        <p class="text-white-300 leading-relaxed">{{ profile.summary }}</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white-100 mb-6 flex items-center gap-2">
          <UIcon name="i-lucide-briefcase" class="text-sky-400" />
          {{ lang === 'es' ? 'Experiencia profesional' : 'Work experience' }}
        </h2>
        <div class="space-y-8">
          <div
            v-for="exp in profile.experience"
            :key="`${exp.company}-${exp.period}`"
            class="relative pl-6 border-l-2 border-teal-700/50"
          >
            <div class="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-teal-500 border-2 border-dark-900" />
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
              <h3 class="font-semibold text-white-100">{{ exp.role }}</h3>
              <span class="text-sm text-white-500">{{ exp.period }}</span>
            </div>
            <p class="text-sky-400 text-sm mb-2">{{ exp.company }}</p>
            <p class="text-white-300 text-sm leading-relaxed mb-2">{{ exp.description }}</p>
            <ul class="space-y-1.5">
              <li
                v-for="item in exp.highlights"
                :key="item"
                class="flex gap-2 text-sm text-white-400"
              >
                <UIcon name="i-lucide-check" class="text-teal-400 mt-0.5 shrink-0" />
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white-100 mb-4 flex items-center gap-2">
          <UIcon name="i-lucide-graduation-cap" class="text-sky-400" />
          {{ lang === 'es' ? 'Formación académica' : 'Education' }}
        </h2>
        <div class="space-y-4">
          <div
            v-for="edu in profile.education"
            :key="`${edu.degree}-${edu.period}`"
            class="p-4 bg-dark-800/40 rounded-lg border border-dark-700/30"
          >
            <h3 class="font-semibold text-white-100">{{ edu.degree }}</h3>
            <p class="text-sky-400 text-sm">{{ edu.institution }}</p>
            <span class="text-sm text-white-500">{{ edu.period }}</span>
            <p v-if="edu.note" class="text-sm text-white-500 mt-1">{{ edu.note }}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white-100 mb-4 flex items-center gap-2">
          <UIcon name="i-lucide-heart" class="text-sky-400" />
          Soft skills
        </h2>
        <div class="flex flex-wrap gap-2">
          <UBadge v-for="skill in profile.softSkills" :key="skill" color="primary" variant="soft">
            {{ skill }}
          </UBadge>
        </div>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white-100 mb-4 flex items-center gap-2">
          <UIcon name="i-lucide-wrench" class="text-sky-400" />
          Hard skills
        </h2>
        <div class="flex flex-wrap gap-2">
          <UBadge v-for="skill in profile.hardSkills" :key="skill" color="info" variant="soft">
            {{ skill }}
          </UBadge>
        </div>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white-100 mb-4 flex items-center gap-2">
          <UIcon name="i-lucide-languages" class="text-sky-400" />
          {{ lang === 'es' ? 'Idiomas' : 'Languages' }}
        </h2>
        <div class="flex flex-wrap gap-4">
          <div
            v-for="language in profile.languages"
            :key="language.name"
            class="flex items-center gap-2 px-4 py-2 bg-dark-800/40 rounded-lg border border-dark-700/30"
          >
            <span class="font-medium text-white-200">{{ language.name }}</span>
            <span class="text-white-500 text-sm">({{ language.level }})</span>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white-100 mb-4 flex items-center gap-2">
          <UIcon name="i-lucide-info" class="text-sky-400" />
          {{ lang === 'es' ? 'Información adicional' : 'Additional information' }}
        </h2>
        <ul class="space-y-2">
          <li
            v-for="item in profile.additional"
            :key="item"
            class="flex gap-2 text-white-300 text-sm"
          >
            <UIcon name="i-lucide-circle-check" class="text-emerald-400 mt-0.5 shrink-0" />
            {{ item }}
          </li>
        </ul>
      </section>
    </div>

    <div class="mt-12 pt-8 border-t border-dark-700/50 flex flex-col sm:flex-row sm:justify-between gap-3">
      <div class="flex flex-wrap gap-3">
        <UButton
          :href="profile.pdfUrl"
          download="CV_sergiojurado_photo_2026.pdf"
          icon="i-lucide-download"
        >
          {{ lang === 'es' ? 'Descargar PDF' : 'Download PDF' }}
        </UButton>
        <UButton to="/hola" variant="outline" class="border-dark-600 text-white-300">
          {{ lang === 'es' ? 'Versión digital /hola' : 'Digital version /hola' }}
        </UButton>
      </div>
      <div class="flex flex-wrap gap-3">
        <UButton :to="`/${lang === 'es' ? 'en' : 'es'}/resume/${slug}`" variant="outline" class="border-dark-600 text-white-300">
          {{ lang === 'es' ? 'View in English' : 'Ver en Español' }}
        </UButton>
        <UButton to="/" variant="ghost" icon="i-lucide-arrow-left" class="text-white-400 hover:text-white-100">
          {{ lang === 'es' ? 'Inicio' : 'Home' }}
        </UButton>
      </div>
    </div>
  </UContainer>
</template>
