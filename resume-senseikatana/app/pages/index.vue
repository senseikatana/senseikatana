<script setup lang="ts">
import { site } from '~~/data/site'

const { locale, t } = useI18n()
const localePath = useLocalePath()

const { data } = await useAsyncData(`home-${locale.value}`, () =>
  queryCollection('resume').where('lang', '=', locale.value).first(),
)

interface Resume {
  name: string
  title: string
  summary: string
  linkedin: string
  pdfUrl: string
  hardSkills: string[]
  experience: { start: string }[]
  languages: { name: string }[]
}

const resume = computed(() => data.value as Resume | null)

/** Años Transcurridos desde la experiencia más antigua. */
const yearsOfExperience = computed(() => {
  const starts = resume.value?.experience.map(item => Number(item.start)) ?? []
  if (starts.length === 0) return 0
  return new Date().getFullYear() - Math.min(...starts)
})

/** Métricas reales derivadas del CV — nada de cifras inventadas. */
const stats = computed(() => [
  { value: yearsOfExperience.value, label: t('home.stats.years'), accent: true },
  { value: resume.value?.experience.length ?? 0, label: t('home.stats.roles') },
  { value: resume.value?.hardSkills.length ?? 0, label: t('home.stats.hardSkills') },
  { value: resume.value?.languages.length ?? 0, label: t('home.stats.languages') },
])

const socials = [
  { icon: 'i-simple-icons-linkedin', to: site.linkedin, label: 'LinkedIn' },
]

const marquee = computed(() => t('brand.marquee') as unknown as string[])

useSeoMeta({
  title: () => (resume.value ? `${resume.value.name} — ${resume.value.title}` : 'CV'),
  description: () => resume.value?.summary,
})
</script>

<template>
  <div v-if="resume">
    <!-- ── Hero ─────────────────────────────────────────────────────────── -->
    <section class="relative flex min-h-[88vh] flex-col justify-end overflow-hidden pb-20 pt-32">
      <div class="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-950 to-dark-950" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_55%,oklch(0.6748_0.2116_38.6/0.18)_0%,transparent_55%)]" />
      <div class="scanline absolute inset-0" />

      <UContainer class="relative">
        <div class="reveal max-w-5xl" style="--reveal-delay: 0.05s">
          <SectionMarker :label="t('home.marker')" />

          <h1 class="mb-8 font-display text-[14vw] leading-[0.85] md:text-[10vw] lg:text-[7.5rem]">
            <span class="headline-line"><span>{{ t('home.headline.1') }}</span></span>
            <span class="headline-line"><span class="text-outline-dim">{{ t('home.headline.2') }}</span></span>
            <span class="headline-line"><span>{{ t('home.headline.3') }}<span class="text-forge-500">.</span></span></span>
          </h1>

          <p class="max-w-xl text-base leading-relaxed text-white-400 md:text-lg">
            {{ resume.summary }}
          </p>

          <div class="mt-8 flex flex-wrap gap-2">
            <span
              v-for="tag in $tm('home.tags')"
              :key="tag"
              class="rounded-full border border-dark-600 bg-dark-900/60 px-3 py-1.5 font-mono text-xs text-forge-500"
            >
              {{ tag }}
            </span>
          </div>

          <div class="mt-10 flex flex-wrap gap-3">
            <UButton
              :to="localePath('/about')"
              size="lg"
              class="pulse-cta px-8 font-display text-lg tracking-wider"
            >
              {{ t('home.ctaCv') }}
            </UButton>
            <a
              :href="resume.pdfUrl"
              download
              class="inline-flex h-11 items-center gap-2 rounded-md border border-dark-600 px-8 text-sm font-medium text-white-300 transition-colors hover:border-forge-500 hover:text-forge-500"
            >
              <UIcon
                name="i-lucide-download"
                class="size-5"
              />
              {{ t('home.ctaPdf') }}
            </a>
            <UButton
              :to="localePath('/contact')"
              variant="outline"
              size="lg"
              class="border-dark-600 px-8 text-white-300"
            >
              {{ t('home.ctaContact') }}
            </UButton>
          </div>

          <div class="mt-8 flex gap-3">
            <UButton
              v-for="s in socials"
              :key="s.icon"
              :icon="s.icon"
              color="gray"
              variant="ghost"
              size="sm"
              :to="s.to"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="s.label"
              class="text-white-400 hover:text-forge-500"
            />
          </div>
        </div>
      </UContainer>

      <div class="absolute inset-x-0 bottom-0 border-t border-dark-700/60 bg-dark-950/70 py-3 backdrop-blur-sm">
        <TheMarquee :items="marquee" />
      </div>
    </section>

    <!-- ── Métricas ─────────────────────────────────────────────────────── -->
    <section class="relative overflow-hidden border-y border-dark-700/60 bg-dark-950">
      <UContainer class="py-16 lg:py-20">
        <div class="reveal-stagger grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          <StatCell
            v-for="stat in stats"
            :key="stat.label"
            :value="stat.value"
            :label="stat.label"
            :accent="stat.accent"
          />
        </div>
      </UContainer>
    </section>

    <!-- ─── Aptitudes ───────────────────────────────────────────────────── -->
    <section class="relative py-24 lg:py-32">
      <UContainer>
        <div class="reveal grid gap-8 lg:grid-cols-12">
          <div class="lg:col-span-5">
            <SectionMarker :label="t('home.skillsMarker')" />
            <h2 class="font-display text-5xl leading-[0.9] md:text-6xl lg:text-7xl">
              {{ t('home.skillsTitle') }}<br>
              <span class="text-forge-500">{{ t('home.skillsHighlight') }}</span>
            </h2>
          </div>
          <div class="flex flex-col justify-end lg:col-span-6 lg:col-start-7">
            <p class="text-lg leading-relaxed text-white-400">
              {{ t('home.skillsBody') }}
            </p>
          </div>
        </div>

        <div class="reveal-stagger mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div
            v-for="skill in resume.hardSkills"
            :key="skill"
            class="card-forge notch-corner p-5 text-center"
          >
            <span class="text-sm font-medium text-white-200">{{ skill }}</span>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ── Disponibilidad ───────────────────────────────────────────────── -->
    <section class="border-t border-dark-700/60 bg-dark-950 py-24">
      <UContainer>
        <div class="reveal mx-auto max-w-2xl text-center">
          <h2 class="mb-4 font-display text-4xl md:text-5xl">
            {{ t('home.availabilityTitle') }}
          </h2>
          <p class="mb-8 text-white-400">
            {{ t('home.availabilitySubtitle') }}
          </p>
          <div class="flex flex-wrap justify-center gap-3">
            <UButton
              :to="localePath('/contact')"
              size="lg"
              class="px-8"
            >
              {{ t('home.ctaContact') }}
            </UButton>
            <UButton
              :to="localePath('/about')"
              variant="outline"
              size="lg"
              class="border-dark-600 px-8 text-white-300"
            >
              {{ t('home.ctaCv') }}
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
