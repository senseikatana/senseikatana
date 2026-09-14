<script setup lang="ts">
interface ResumeExperience {
  company: string
  role: string
  period: string
  description: string
  highlights: string[]
}

interface ResumeEducation {
  institution: string
  degree: string
  period: string
  note?: string
}

interface Resume {
  name: string
  title: string
  summary: string
  email: string
  phone: string
  location: string
  linkedin: string
  note?: string
  pdfUrl: string
  experience: ResumeExperience[]
  education: ResumeEducation[]
  softSkills: string[]
  hardSkills: string[]
  languages: { name: string; level: string }[]
  additional: string[]
}

const { locale, t } = useI18n()

const { data } = await useAsyncData(`resume-${locale.value}`, () =>
  queryCollection('resume').where('lang', '=', locale.value).first(),
)

const resume = computed(() => data.value as Resume | null)

const sections = computed(() => [
  { id: 'perfil', icon: 'i-lucide-user', title: t('about.sections.perfil'), label: '01' },
  { id: 'experiencia', icon: 'i-lucide-briefcase', title: t('about.sections.experiencia'), label: '02' },
  { id: 'formacion', icon: 'i-lucide-graduation-cap', title: t('about.sections.formacion'), label: '03' },
  { id: 'skills', icon: 'i-lucide-sparkles', title: t('about.sections.skills'), label: '04' },
  { id: 'extra', icon: 'i-lucide-info', title: t('about.sections.extra'), label: '05' },
])

useSeoMeta({
  title: () => (resume.value ? `${resume.value.name} — ${resume.value.title}` : 'CV'),
  description: () => resume.value?.summary,
})
</script>

<template>
  <div v-if="resume">
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-950" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-rose-900)_0%,_transparent_45%)] opacity-25" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-teal-900)_0%,_transparent_40%)] opacity-25" />

      <UContainer class="relative py-20 lg:py-28">
        <div class="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
          <div class="flex-1 max-w-2xl">
            <p class="font-mono text-sm text-sky-300/90 tracking-wide mb-4">
              {{ t('about.eyebrow') }}
            </p>

            <h1 class="text-4xl md:text-6xl font-bold tracking-tight text-white-50 mb-4">
              {{ t('nav.about') }}, {{ resume.name }}
            </h1>

            <p class="text-lg md:text-xl text-sky-300 mb-4">
              {{ resume.title }}
            </p>

            <p class="text-white-400 max-w-2xl leading-relaxed mb-8">
              {{ t('about.intro') }}
            </p>

            <div class="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white-400 mb-10">
              <span class="flex items-center gap-1.5">
                <UIcon name="i-lucide-map-pin" class="text-teal-400" />
                {{ resume.location }}
              </span>
              <a :href="`tel:${resume.phone.replace(/\s/g, '')}`" class="flex items-center gap-1.5 hover:text-white-100 transition-colors">
                <UIcon name="i-lucide-phone" class="text-teal-400" />
                {{ resume.phone }}
              </a>
              <a :href="`mailto:${resume.email}`" class="flex items-center gap-1.5 hover:text-white-100 transition-colors">
                <UIcon name="i-lucide-mail" class="text-teal-400" />
                {{ resume.email }}
              </a>
              <a :href="resume.linkedin" target="_blank" rel="noopener" class="flex items-center gap-1.5 hover:text-white-100 transition-colors">
                <UIcon name="i-simple-icons-linkedin" class="text-teal-400" />
                LinkedIn
              </a>
            </div>

            <p v-if="resume.note" class="text-sm text-white-500 mb-8">
              {{ resume.note }}
            </p>

            <div class="flex flex-wrap gap-3">
              <a
                :href="resume.pdfUrl"
                download
                class="inline-flex items-center gap-2 h-11 px-8 rounded-md bg-rose-500 hover:bg-rose-400 text-white text-sm font-medium transition-colors"
              >
                <UIcon name="i-lucide-download" class="size-5" />
                {{ t('about.ctaPdf') }}
              </a>
              <UButton
                href="#perfil"
                variant="outline"
                size="lg"
                class="px-8 border-white-200/20 text-white-200 hover:bg-white-50/5"
              >
                {{ t('about.ctaReadWeb') }}
              </UButton>
            </div>
          </div>

          <div class="shrink-0">
            <img
              src="/cv/sergio-jurado.jpg"
              :alt="resume.name"
              class="w-48 h-64 md:w-56 md:h-72 object-cover rounded-2xl border border-teal-800/40 shadow-2xl shadow-teal-900/20"
            >
          </div>
        </div>
      </UContainer>
    </section>

    <nav
      class="sticky top-16 z-40 py-3 bg-dark-950/90 backdrop-blur-md border-y border-dark-800/60 supports-[backdrop-filter]:bg-dark-950/75"
      aria-label="Secciones del CV"
    >
      <UContainer>
        <div class="flex flex-nowrap gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <a
            v-for="section in sections"
            :key="section.id"
            :href="`#${section.id}`"
            class="inline-flex shrink-0 items-center gap-2 px-4 py-2 rounded-lg border border-dark-700/50 bg-dark-900/70 text-sm text-white-300 hover:border-teal-700/50 hover:text-sky-300 transition-colors"
          >
            <span class="font-mono text-xs text-rose-400">{{ section.label }}</span>
            <UIcon :name="section.icon" class="text-sky-400" />
            {{ section.title }}
          </a>
        </div>
      </UContainer>
    </nav>

    <section id="perfil" class="py-20 bg-dark-900 scroll-mt-40">
      <UContainer class="max-w-3xl">
        <h2 class="text-3xl font-bold text-white-50 mb-6 flex items-center gap-3">
          <UIcon name="i-lucide-user" class="text-rose-400" />
          {{ t('about.perfilTitle') }}
        </h2>
        <p class="text-lg text-white-300 leading-relaxed">
          {{ resume.summary }}
        </p>
      </UContainer>
    </section>

    <section id="experiencia" class="py-20 bg-dark-950 scroll-mt-40">
      <UContainer class="max-w-3xl">
        <h2 class="text-3xl font-bold text-white-50 mb-3 flex items-center gap-3">
          <UIcon name="i-lucide-briefcase" class="text-rose-400" />
          {{ t('about.experienciaTitle') }}
        </h2>
        <p class="text-white-400 mb-10">
          {{ t('about.experienciaSubtitle') }}
        </p>

        <div class="space-y-10">
          <article
            v-for="exp in resume.experience"
            :key="`${exp.company}-${exp.period}`"
            class="relative pl-6 border-l-2 border-teal-700/50"
          >
            <div class="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-teal-500 border-2 border-dark-950" />
            <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
              <h3 class="text-xl font-semibold text-white-100">{{ exp.role }}</h3>
              <span class="text-sm text-white-500 font-mono">{{ exp.period }}</span>
            </div>
            <p class="text-sky-400 text-sm mb-2">{{ exp.company }}</p>
            <p class="text-white-400 text-sm mb-3">{{ exp.description }}</p>
            <ul class="space-y-2">
              <li
                v-for="item in exp.highlights"
                :key="item"
                class="flex gap-2 text-white-300 text-sm leading-relaxed"
              >
                <UIcon name="i-lucide-check" class="text-teal-400 mt-0.5 shrink-0" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </article>
        </div>
      </UContainer>
    </section>

    <section id="formacion" class="py-20 bg-dark-900 scroll-mt-40">
      <UContainer class="max-w-3xl">
        <h2 class="text-3xl font-bold text-white-50 mb-10 flex items-center gap-3">
          <UIcon name="i-lucide-graduation-cap" class="text-rose-400" />
          {{ t('about.formacionTitle') }}
        </h2>

        <div class="space-y-4">
          <div
            v-for="edu in resume.education"
            :key="`${edu.degree}-${edu.period}`"
            class="px-4 py-4 rounded-lg border border-dark-700/40 bg-dark-800/40"
          >
            <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 class="font-semibold text-white-100">{{ edu.degree }}</h3>
              <span class="text-xs text-white-500 font-mono">{{ edu.period }}</span>
            </div>
            <p class="text-sky-400 text-sm mt-1">{{ edu.institution }}</p>
            <p v-if="edu.note" class="text-white-500 text-sm mt-1">{{ edu.note }}</p>
          </div>
        </div>
      </UContainer>
    </section>

    <section id="skills" class="py-20 bg-dark-950 scroll-mt-40">
      <UContainer class="max-w-3xl">
        <h2 class="text-3xl font-bold text-white-50 mb-10 flex items-center gap-3">
          <UIcon name="i-lucide-sparkles" class="text-rose-400" />
          {{ t('about.skillsTitle') }}
        </h2>

        <div class="grid md:grid-cols-2 gap-10 mb-12">
          <div>
            <h3 class="text-lg font-semibold text-white-100 mb-4">{{ t('about.softSkills') }}</h3>
            <ul class="space-y-3">
              <li
                v-for="skill in resume.softSkills"
                :key="skill"
                class="flex gap-2 text-sm text-white-300"
              >
                <UIcon name="i-lucide-heart" class="text-rose-400 mt-0.5 shrink-0" />
                {{ skill }}
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-white-100 mb-4">{{ t('about.hardSkills') }}</h3>
            <ul class="space-y-3">
              <li
                v-for="skill in resume.hardSkills"
                :key="skill"
                class="flex gap-2 text-sm text-white-300"
              >
                <UIcon name="i-lucide-wrench" class="text-sky-400 mt-0.5 shrink-0" />
                {{ skill }}
              </li>
            </ul>
          </div>
        </div>

        <h3 class="text-lg font-semibold text-white-100 mb-4 flex items-center gap-2">
          <UIcon name="i-lucide-languages" class="text-sky-400" />
          {{ t('about.languages') }}
        </h3>
        <div class="flex flex-wrap gap-3">
          <div
            v-for="language in resume.languages"
            :key="language.name"
            class="px-4 py-2 rounded-lg border border-dark-700/40 bg-dark-800/40 text-sm"
          >
            <span class="text-white-200 font-medium">{{ language.name }}</span>
            <span class="text-white-500"> · {{ language.level }}</span>
          </div>
        </div>
      </UContainer>
    </section>

    <section id="extra" class="py-20 bg-dark-900 scroll-mt-40">
      <UContainer class="max-w-3xl">
        <h2 class="text-3xl font-bold text-white-50 mb-6 flex items-center gap-3">
          <UIcon name="i-lucide-info" class="text-rose-400" />
          {{ t('about.extraTitle') }}
        </h2>
        <ul class="space-y-4 mb-12">
          <li
            v-for="item in resume.additional"
            :key="item"
            class="flex gap-3 text-white-300 leading-relaxed"
          >
            <UIcon name="i-lucide-circle-check" class="text-emerald-400 mt-1 shrink-0" />
            <span>{{ item }}</span>
          </li>
        </ul>

        <div class="pt-8 border-t border-dark-700/50 text-center">
          <p class="text-white-400 mb-6">
            {{ t('about.extraNote') }}
          </p>
          <div class="flex flex-wrap justify-center gap-3">
            <a
              :href="resume.pdfUrl"
              download
              class="inline-flex items-center gap-2 h-11 px-8 rounded-md bg-rose-500 hover:bg-rose-400 text-white text-sm font-medium transition-colors"
            >
              <UIcon name="i-lucide-download" class="size-5" />
              {{ t('about.ctaPdf') }}
            </a>
            <UButton
              :href="`mailto:${resume.email}`"
              variant="outline"
              size="lg"
              class="px-8 border-dark-600 text-white-300"
            >
              {{ t('about.ctaEmail') }}
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
