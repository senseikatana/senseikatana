<script setup lang="ts">
import { site } from '~~/data/site'

const { locale, t } = useI18n()
const localePath = useLocalePath()
const { formatRange } = useDateRange()

const { data } = await useAsyncData(`home-${locale.value}`, () =>
  queryCollection('resume').where('lang', '=', locale.value).first(),
)

const { data: posts } = await useAsyncData(`home-blog-${locale.value}`, () =>
  queryCollection('blog')
    .where('published', '=', true)
    .order('date', 'DESC')
    .all(),
)

interface ResumeExperience {
  company: string
  role: string
  description: string
  start: string
  end: string | null
}

interface ResumeEducation {
  institution: string
  degree: string
  note?: string
  start: string
  end: string | null
}

interface Resume {
  name: string
  title: string
  summary: string
  location: string
  linkedin: string
  pdfUrl: string
  experience: ResumeExperience[]
  education: ResumeEducation[]
  hardSkills: string[]
  languages: { name: string; level: string }[]
}

interface BlogPost {
  id: string
  title: string
  description?: string
  date: string
  path: string
}

const resume = computed(() => data.value as Resume | null)
const featuredPosts = computed(() => (posts.value as BlogPost[] | null)?.slice(0, 6) ?? [])

/** Años transcurridos desde la experiencia más antigua. */
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

const skillIcons = ['i-lucide-package', 'i-lucide-monitor', 'i-lucide-truck', 'i-lucide-sprout']

/* ── Trayectoria: experiencia + formación + idiomas en un grid filtrable ── */
type WorkKind = 'exp' | 'edu' | 'lang'

interface WorkCard {
  id: string
  kind: WorkKind
  title: string
  subtitle: string
  description: string
  meta: string
}

const KIND_ICONS: Record<WorkKind, string> = {
  exp: 'i-lucide-briefcase',
  edu: 'i-lucide-graduation-cap',
  lang: 'i-lucide-languages',
}

const workCards = computed<WorkCard[]>(() => {
  const r = resume.value
  if (!r) return []

  const experience = r.experience.map((item, index) => ({
    id: `exp-${index}`,
    kind: 'exp' as const,
    title: item.role,
    subtitle: item.company,
    description: item.description,
    meta: formatRange({ start: item.start, end: item.end }),
  }))

  const education = r.education.map((item, index) => ({
    id: `edu-${index}`,
    kind: 'edu' as const,
    title: item.degree,
    subtitle: item.institution,
    description: item.note ?? '',
    meta: formatRange({ start: item.start, end: item.end }),
  }))

  const languages = r.languages.map((item, index) => ({
    id: `lang-${index}`,
    kind: 'lang' as const,
    title: item.name,
    subtitle: t('about.languages'),
    description: item.level,
    meta: '',
  }))

  return [...experience, ...education, ...languages]
})

const workFilter = ref<'all' | WorkKind>('all')
const workSearch = ref('')
const workVisible = ref(12)

const workFilters = computed(() => [
  { key: 'all' as const, label: t('home.filterAll') },
  { key: 'exp' as const, label: t('about.sections.experiencia') },
  { key: 'edu' as const, label: t('about.sections.formacion') },
  { key: 'lang' as const, label: t('about.languages') },
])

const filteredWork = computed(() => {
  const query = workSearch.value.trim().toLowerCase()
  return workCards.value.filter((card) => {
    if (workFilter.value !== 'all' && card.kind !== workFilter.value) return false
    if (!query) return true
    return `${card.title} ${card.subtitle} ${card.description}`.toLowerCase().includes(query)
  })
})

const visibleWork = computed(() => filteredWork.value.slice(0, workVisible.value))

function setWorkFilter(key: 'all' | WorkKind) {
  workFilter.value = key
  workVisible.value = 12
}

function onWorkSearch(event: Event) {
  workSearch.value = (event.target as HTMLInputElement).value
  workVisible.value = 12
}

function showMoreWork() {
  workVisible.value += 12
}

/* ── Contacto ── */
const contactLinks = computed(() => {
  const r = resume.value
  if (!r) return []
  return [
    { icon: 'i-simple-icons-linkedin', label: 'LinkedIn', value: 'linkedin.com/in/senseijurado', href: r.linkedin, external: true, download: false },
    { icon: 'i-simple-icons-whatsapp', label: t('contact.whatsappAction'), value: t('contact.subtitle'), href: '/contact/whatsapp', external: false, download: false },
    { icon: 'i-lucide-phone', label: t('contact.callAction'), value: t('home.phoneValue'), href: '/contact/call', external: false, download: false },
    { icon: 'i-lucide-download', label: t('contact.pdf'), value: r.pdfUrl, href: r.pdfUrl, external: false, download: true },
  ]
})

useSeoMeta({
  title: () => (resume.value ? `${resume.value.name} — ${resume.value.title}` : 'CV'),
  description: () => resume.value?.summary,
})
</script>

<template>
  <div v-if="resume">
    <!-- ── Héroe (maqueta qwen) ──────────────────────────────────────────── -->
    <section class="relative overflow-hidden pb-28 pt-32">
      <div class="q-hero-grid" />
      <div
        class="glow-accent absolute inset-0"
        style="--glow-at: 75% 30%"
      />
      <div class="scanline absolute inset-0 opacity-60" />

      <div class="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <div class="reveal">
          <p class="q-greeting mb-6">
            <span class="q-dot" />
            {{ t('home.greeting') }}
          </p>

          <h1 class="mb-4 text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.05] tracking-tight">
            {{ t('home.hello') }}
            <span class="q-gradient-text">{{ resume.name }}</span>
          </h1>

          <h2 class="mb-5 font-display text-[clamp(1.75rem,4vw,3rem)] uppercase leading-[0.95] tracking-wide">
            <span class="headline-line"><span>{{ t('home.headline.1') }}</span></span>
            <span class="headline-line"><span class="text-outline-dim">{{ t('home.headline.2') }}</span></span>
            <span class="headline-line"><span>{{ t('home.headline.3') }}<span class="text-forge-500">.</span></span></span>
          </h2>

          <p class="mb-7 max-w-xl text-lg text-white-400">
            {{ resume.title }}
          </p>

          <div class="mb-9 flex flex-wrap gap-2.5">
            <span
              v-for="tag in $tm('home.tags')"
              :key="tag"
              class="q-tag"
            >
              {{ tag }}
            </span>
          </div>

          <div class="flex flex-wrap gap-4">
            <NuxtLink
              :to="localePath('/about')"
              class="q-btn q-btn-primary"
            >
              {{ t('home.ctaCv') }}
            </NuxtLink>
            <a
              :href="resume.pdfUrl"
              download
              class="q-btn q-btn-outline"
            >
              <UIcon
                name="i-lucide-download"
                class="size-4"
              />
              {{ t('home.ctaPdf') }}
            </a>
            <NuxtLink
              :to="localePath('/contact')"
              class="q-btn q-btn-outline"
            >
              {{ t('home.ctaContact') }}
            </NuxtLink>
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

        <div
          class="reveal relative mx-auto w-full max-w-[420px]"
          style="--reveal-delay: 0.15s"
        >
          <div class="q-photo w-full">
            <div class="q-photo-inner aspect-square">
              <img
                src="/img/avatar-768.webp"
                :alt="t('home.photoAlt')"
                width="768"
                height="768"
              >
            </div>
          </div>

          <div class="q-badge q-badge-1">
            <UIcon
              name="i-lucide-package"
              class="size-6 text-forge-500"
            />
            <div>
              <div class="q-badge-label">
                {{ t('home.badgeProfile') }}
              </div>
              {{ resume.title }}
            </div>
          </div>

          <div class="q-badge q-badge-2">
            <UIcon
              name="i-lucide-circle-check"
              class="size-6 text-forge-500"
            />
            <div>
              <div class="q-badge-label">
                {{ t('resume.availability') }}
              </div>
              {{ t('home.badgeAvailable') }}
            </div>
          </div>
        </div>
      </div>

      <div class="absolute inset-x-0 bottom-0 border-t border-dark-700/60 bg-dark-950/70 py-3 backdrop-blur-sm">
        <TheMarquee :items="marquee" />
      </div>
    </section>

    <!-- ── Métricas ─────────────────────────────────────────────────────── -->
    <section class="relative overflow-hidden border-y border-dark-700/60 bg-dark-900">
      <UContainer class="py-14 lg:py-16">
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

    <!-- ── Sobre mí ─────────────────────────────────────────────────────── -->
    <section class="py-20 lg:py-24">
      <UContainer>
        <div class="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div class="reveal justify-self-center lg:justify-self-start">
            <div class="q-photo w-full max-w-sm">
              <div class="q-photo-inner aspect-4/5">
                <img
                  src="/img/avatar-768.webp"
                  :alt="t('home.photoAlt')"
                  width="768"
                  height="768"
                >
              </div>
            </div>
          </div>

          <div
            class="reveal"
            style="--reveal-delay: 0.1s"
          >
            <h2 class="q-section-title q-left q-gradient-text">
              {{ t('nav.about') }}
            </h2>

            <p class="mb-4 text-base leading-relaxed text-white-400 md:text-lg">
              {{ resume.summary }}
            </p>

            <h3 class="mb-4 mt-8 font-heading text-sm uppercase tracking-[0.2em] text-forge-500">
              {{ t('home.hardSkillsTitle') }}
            </h3>

            <p class="mb-5 text-sm leading-relaxed text-white-400">
              {{ t('home.skillsBody') }}
            </p>

            <div class="q-learning-grid">
              <div
                v-for="(skill, index) in resume.hardSkills"
                :key="skill"
                class="q-learning-item"
              >
                <span class="q-icon">
                  <UIcon :name="skillIcons[index % skillIcons.length]" />
                </span>
                {{ skill }}
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ── Blog destacado ───────────────────────────────────────────────── -->
    <section
      v-if="featuredPosts.length"
      class="border-t border-dark-700/50 py-20 lg:py-24"
    >
      <UContainer>
        <h2 class="q-section-title reveal">
          {{ t('blog.title') }}
        </h2>
        <p class="q-section-subtitle reveal">
          {{ t('blog.subtitle') }}
        </p>

        <div class="reveal-stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="post in featuredPosts"
            :key="post.id"
            :to="localePath(post.path)"
            class="q-featured-card"
          >
            <div class="q-featured-media">
              <UIcon
                name="i-lucide-file-text"
                class="size-14"
              />
            </div>
            <span class="q-featured-badge">{{ t('blog.title') }}</span>
            <div class="q-featured-overlay">
              <div class="q-cat">
                {{ new Date(post.date).toLocaleDateString(locale) }}
              </div>
              <h3>{{ post.title }}</h3>
              <p>{{ post.description || '' }}</p>
            </div>
          </NuxtLink>
        </div>
      </UContainer>
    </section>

    <!-- ── Mi trayectoria (buscador + filtros) ──────────────────────────── -->
    <section class="border-t border-dark-700/50 py-20 lg:py-24">
      <UContainer>
        <h2 class="q-section-title reveal">
          {{ t('home.workTitle') }}
        </h2>
        <p class="q-section-subtitle reveal">
          {{ t('home.workSubtitle') }}
        </p>

        <div class="reveal">
          <div class="q-search">
            <UIcon
              name="i-lucide-search"
              class="q-search-icon size-4"
            />
            <input
              type="text"
              :placeholder="t('home.searchPlaceholder')"
              :aria-label="t('home.searchPlaceholder')"
              :value="workSearch"
              @input="onWorkSearch"
            >
          </div>
        </div>

        <div class="reveal q-filters">
          <button
            v-for="f in workFilters"
            :key="f.key"
            type="button"
            class="q-filter-btn"
            :class="{ 'q-active': workFilter === f.key }"
            @click="setWorkFilter(f.key)"
          >
            {{ f.label }}
          </button>
        </div>

        <div
          v-if="filteredWork.length"
          class="reveal-stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <article
            v-for="card in visibleWork"
            :key="card.id"
            class="q-project-card"
          >
            <div class="q-thumb q-thumb-icon">
              <UIcon
                :name="KIND_ICONS[card.kind]"
                class="size-12"
              />
            </div>
            <div class="q-info">
              <div class="q-cat">
                {{ card.subtitle }}
              </div>
              <h3>{{ card.title }}</h3>
              <p
                v-if="card.description"
                class="q-desc"
              >
                {{ card.description }}
              </p>
              <div class="q-meta">
                <span>{{ card.meta }}</span>
                <NuxtLink
                  :to="localePath('/about')"
                  class="q-view-btn"
                  :aria-label="t('nav.about')"
                >
                  →
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>

        <p
          v-else
          class="py-10 text-center text-white-400"
        >
          {{ t('home.workEmpty') }}
        </p>

        <div
          v-if="filteredWork.length > workVisible"
          class="mt-12 text-center"
        >
          <button
            type="button"
            class="q-btn q-btn-outline"
            @click="showMoreWork"
          >
            {{ t('home.loadMore') }}
          </button>
        </div>
      </UContainer>
    </section>

    <!-- ── Contacto ─────────────────────────────────────────────────────── -->
    <section class="border-t border-dark-700/50 py-20 lg:py-24">
      <UContainer>
        <div class="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div class="reveal">
            <h2 class="q-section-title q-left q-gradient-text">
              {{ t('home.contactTitle') }}
            </h2>
            <p class="mb-8 max-w-xl text-white-400">
              {{ t('contact.intro') }}
            </p>

            <div class="flex flex-col gap-4">
              <a
                v-for="link in contactLinks"
                :key="link.label"
                :href="link.href"
                :target="link.external ? '_blank' : undefined"
                :rel="link.external ? 'noopener noreferrer' : undefined"
                :download="link.download ? '' : undefined"
                class="q-contact-link"
              >
                <span class="q-contact-icon">
                  <UIcon
                    :name="link.icon"
                    class="size-5"
                  />
                </span>
                <span>
                  <span class="q-contact-label block">{{ link.label }}</span>
                  <span class="q-contact-value">{{ link.value }}</span>
                </span>
              </a>
            </div>
          </div>

          <div
            class="reveal"
            style="--reveal-delay: 0.1s"
          >
            <div class="h-full rounded-3xl border border-dark-700/60 bg-dark-900/60 p-8 md:p-10">
              <h3 class="mb-3 font-display text-3xl uppercase tracking-wide">
                {{ t('home.availabilityTitle') }}
              </h3>
              <p class="mb-8 text-white-400">
                {{ t('home.availabilitySubtitle') }}
              </p>

              <div class="flex flex-col gap-4 sm:flex-row">
                <NuxtLink
                  :to="localePath('/contact')"
                  class="q-btn q-btn-primary justify-center"
                >
                  {{ t('home.ctaContact') }}
                </NuxtLink>
                <a
                  :href="resume.pdfUrl"
                  download
                  class="q-btn q-btn-outline justify-center"
                >
                  <UIcon
                    name="i-lucide-download"
                    class="size-4"
                  />
                  {{ t('home.ctaPdf') }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
