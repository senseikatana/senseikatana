<script setup lang="ts">
interface ResumeExperience {
  company: string
  role: string
  start: string
  end: string | null
  description: string
  highlights: string[]
}

interface ResumeEducation {
  institution: string
  degree: string
  start: string
  end: string | null
  note?: string
}

interface Resume {
  name: string
  title: string
  summary: string
  location: string
  linkedin: string
  certificationOnRequest?: string
  pdfUrl: string
  experience: ResumeExperience[]
  education: ResumeEducation[]
  softSkills: string[]
  hardSkills: string[]
  languages: { name: string; level: string }[]
  additional: string[]
}

const { locale, t } = useI18n()

const { formatRange, duration, isCurrent } = useDateRange()

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
    <!-- ── Cabecera ─────────────────────────────────────────────────────── -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-950 to-dark-950" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.6748_0.2116_38.6/0.14)_0%,transparent_45%)]" />
      <div class="scanline absolute inset-0" />

      <UContainer class="relative py-20 lg:py-28">
        <div class="flex flex-col items-start gap-12 lg:flex-row lg:gap-16">
          <div class="reveal max-w-2xl flex-1">
            <SectionMarker :label="t('about.eyebrow')" />

            <h1 class="mb-4 font-display text-5xl leading-[0.9] md:text-7xl">
              {{ t('nav.about') }}<br>
              <span class="text-forge-500">{{ resume.name }}</span>
            </h1>

            <p class="mb-6 text-lg text-white-300 md:text-xl">
              {{ resume.title }}
            </p>

            <p class="mb-8 max-w-2xl leading-relaxed text-white-400">
              {{ t('about.intro') }}
            </p>

            <div class="mb-10 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white-400">
              <span class="flex items-center gap-1.5">
                <UIcon
                  name="i-lucide-map-pin"
                  class="text-forge-500"
                />
                {{ resume.location }}
              </span>
              <a
                href="/contact/call"
                class="flex items-center gap-1.5 transition-colors hover:text-white-50"
              >
                <UIcon
                  name="i-lucide-phone"
                  class="text-forge-500"
                />
                {{ t('contact.callAction') }}
              </a>
              <a
                href="/contact/whatsapp"
                class="flex items-center gap-1.5 transition-colors hover:text-white-50"
              >
                <UIcon
                  name="i-lucide-message-circle"
                  class="text-forge-500"
                />
                {{ t('contact.whatsappAction') }}
              </a>
              <a
                :href="resume.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1.5 transition-colors hover:text-white-50"
              >
                <UIcon
                  name="i-simple-icons-linkedin"
                  class="text-forge-500"
                />
                LinkedIn
              </a>
            </div>

            <p
              v-if="resume.certificationOnRequest"
              class="mb-8 text-sm text-white-500"
            >
              {{ resume.certificationOnRequest }}
            </p>

            <div class="flex flex-wrap gap-3">
              <a
                :href="resume.pdfUrl"
                download
                class="inline-flex h-11 items-center gap-2 bg-forge-500 px-8 text-sm font-medium text-dark-950 transition-colors hover:bg-forge-400"
              >
                <UIcon
                  name="i-lucide-download"
                  class="size-5"
                />
                {{ t('about.ctaPdf') }}
              </a>
              <UButton
                href="#perfil"
                variant="outline"
                size="lg"
                class="border-dark-600 px-8 text-white-300"
              >
                {{ t('about.ctaReadWeb') }}
              </UButton>
            </div>
          </div>

          <div class="reveal shrink-0" style="--reveal-delay: 0.2s">
            <div class="notch-corner p-2">
              <div class="size-48 md:size-56 lg:size-64">
                <ProfileAvatar
                  :alt="resume.name"
                  :size="384"
                />
              </div>
              <p class="mt-4 max-w-56 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-white-500">
                {{ t('about.caption') }}
              </p>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ── Índice de secciones ──────────────────────────────────────────── -->
    <nav
      class="sticky top-16 z-40 border-y border-dark-700/60 bg-dark-950/90 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-dark-950/75"
      :aria-label="t('about.sectionsLabel')"
    >
      <UContainer>
        <div class="scrollbar-thin flex flex-nowrap gap-2 overflow-x-auto pb-1">
          <a
            v-for="section in sections"
            :key="section.id"
            :href="`#${section.id}`"
            class="inline-flex shrink-0 items-center gap-2 rounded-lg border border-dark-700 bg-dark-900/70 px-4 py-2 text-sm text-white-300 transition-colors hover:border-forge-500 hover:text-forge-500"
          >
            <span class="font-mono text-xs text-forge-500">{{ section.label }}</span>
            <UIcon
              :name="section.icon"
              class="text-white-400"
            />
            {{ section.title }}
          </a>
        </div>
      </UContainer>
    </nav>

    <!-- ── Perfil ───────────────────────────────────────────────────────── -->
    <section
      id="perfil"
      class="scroll-mt-40 bg-dark-950 py-20"
    >
      <UContainer class="max-w-3xl">
        <SectionMarker :label="t('about.sections.perfil')" />
        <h2 class="mb-6 font-display text-4xl md:text-5xl">
          {{ t('about.perfilTitle') }}
        </h2>
        <p class="text-lg leading-relaxed text-white-300">
          {{ resume.summary }}
        </p>
      </UContainer>
    </section>

    <!-- ── Experiencia ──────────────────────────────────────────────────── -->
    <section
      id="experiencia"
      class="scroll-mt-40 bg-dark-900 py-20"
    >
      <UContainer class="max-w-3xl">
        <SectionMarker :label="t('about.sections.experiencia')" />
        <h2 class="mb-3 font-display text-4xl md:text-5xl">
          {{ t('about.experienciaTitle') }}
        </h2>
        <p class="mb-10 text-white-400">
          {{ t('about.experienciaSubtitle') }}
        </p>

        <div class="space-y-10">
          <article
            v-for="exp in resume.experience"
            :key="`${exp.company}-${exp.start}`"
            class="card-forge notch-corner relative p-6 pl-8"
          >
            <div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 class="text-xl font-semibold text-white-50">
                {{ exp.role }}
                <span
                  v-if="isCurrent(exp)"
                  class="ml-2 rounded-full border border-forge-500/40 px-2 py-0.5 align-middle font-mono text-xs text-forge-500"
                >
                  {{ t('resume.current') }}
                </span>
              </h3>
              <span class="font-mono text-sm text-white-500">
                {{ formatRange(exp) }}
                <span
                  v-if="duration(exp)"
                  class="ml-1 text-forge-500"
                >· {{ duration(exp) }}</span>
              </span>
            </div>
            <p class="mb-3 mt-2 font-heading text-sm uppercase tracking-wider text-forge-500">
              {{ exp.company }}
            </p>
            <p class="mb-4 text-sm text-white-400">
              {{ exp.description }}
            </p>
            <ul class="space-y-2">
              <li
                v-for="item in exp.highlights"
                :key="item"
                class="flex gap-2 text-sm leading-relaxed text-white-300"
              >
                <UIcon
                  name="i-lucide-check"
                  class="mt-0.5 size-4 shrink-0 text-forge-500"
                />
                <span>{{ item }}</span>
              </li>
            </ul>
          </article>
        </div>
      </UContainer>
    </section>

    <!-- ── Formación ────────────────────────────────────────────────────── -->
    <section
      id="formacion"
      class="scroll-mt-40 bg-dark-950 py-20"
    >
      <UContainer class="max-w-3xl">
        <SectionMarker :label="t('about.sections.formacion')" />
        <h2 class="mb-10 font-display text-4xl md:text-5xl">
          {{ t('about.formacionTitle') }}
        </h2>

        <div class="space-y-4">
          <div
            v-for="edu in resume.education"
            :key="`${edu.degree}-${edu.start}`"
            class="card-forge p-5"
          >
            <div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 class="font-semibold text-white-50">
                {{ edu.degree }}
              </h3>
              <span class="font-mono text-xs text-white-500">{{ formatRange(edu) }}</span>
            </div>
            <p class="mt-1 text-sm text-forge-500">
              {{ edu.institution }}
            </p>
            <p
              v-if="edu.note"
              class="mt-1 text-sm text-white-500"
            >
              {{ edu.note }}
            </p>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ── Aptitudes ────────────────────────────────────────────────────── -->
    <section
      id="skills"
      class="scroll-mt-40 bg-dark-900 py-20"
    >
      <UContainer class="max-w-3xl">
        <SectionMarker :label="t('about.sections.skills')" />
        <h2 class="mb-10 font-display text-4xl md:text-5xl">
          {{ t('about.skillsTitle') }}
        </h2>

        <div class="mb-12 grid gap-10 md:grid-cols-2">
          <div>
            <h3 class="mb-4 font-heading text-sm uppercase tracking-[0.2em] text-forge-500">
              {{ t('about.softSkills') }}
            </h3>
            <ul class="space-y-3">
              <li
                v-for="skill in resume.softSkills"
                :key="skill"
                class="flex gap-2 text-sm text-white-300"
              >
                <UIcon
                  name="i-lucide-check"
                  class="mt-0.5 size-4 shrink-0 text-forge-500"
                />
                {{ skill }}
              </li>
            </ul>
          </div>
          <div>
            <h3 class="mb-4 font-heading text-sm uppercase tracking-[0.2em] text-forge-500">
              {{ t('about.hardSkills') }}
            </h3>
            <ul class="space-y-3">
              <li
                v-for="skill in resume.hardSkills"
                :key="skill"
                class="flex gap-2 text-sm text-white-300"
              >
                <UIcon
                  name="i-lucide-check"
                  class="mt-0.5 size-4 shrink-0 text-forge-500"
                />
                {{ skill }}
              </li>
            </ul>
          </div>
        </div>

        <h3 class="mb-4 font-heading text-sm uppercase tracking-[0.2em] text-forge-500">
          {{ t('about.languages') }}
        </h3>
        <div class="flex flex-wrap gap-3">
          <div
            v-for="language in resume.languages"
            :key="language.name"
            class="card-forge px-4 py-2 text-sm"
          >
            <span class="font-medium text-white-200">{{ language.name }}</span>
            <span class="text-white-500"> · {{ language.level }}</span>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ── Extra ────────────────────────────────────────────────────────── -->
    <section
      id="extra"
      class="scroll-mt-40 bg-dark-950 py-20"
    >
      <UContainer class="max-w-3xl">
        <SectionMarker :label="t('about.sections.extra')" />
        <h2 class="mb-6 font-display text-4xl md:text-5xl">
          {{ t('about.extraTitle') }}
        </h2>
        <ul class="mb-12 space-y-4">
          <li
            v-for="item in resume.additional"
            :key="item"
            class="flex gap-3 leading-relaxed text-white-300"
          >
            <UIcon
              name="i-lucide-circle-check"
              class="mt-1 size-4 shrink-0 text-forge-500"
            />
            <span>{{ item }}</span>
          </li>
        </ul>

        <div class="bracket-frame border border-dark-700 bg-dark-900/40 p-8 text-center">
          <p class="mb-6 text-white-400">
            {{ t('about.extraNote') }}
          </p>
          <div class="flex flex-wrap justify-center gap-3">
            <a
              :href="resume.pdfUrl"
              download
              class="inline-flex h-11 items-center gap-2 bg-forge-500 px-8 text-sm font-medium text-dark-950 transition-colors hover:bg-forge-400"
            >
              <UIcon
                name="i-lucide-download"
                class="size-5"
              />
              {{ t('about.ctaPdf') }}
            </a>
            <UButton
              href="/contact/whatsapp"
              variant="outline"
              size="lg"
              class="border-dark-600 px-8 text-white-300"
            >
              {{ t('about.ctaWhatsapp') }}
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
