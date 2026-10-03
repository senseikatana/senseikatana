<script setup lang="ts">
import { site } from '~~/data/site'

const { t } = useI18n()
const localePath = useLocalePath()

const navigation = computed(() => [
  { label: t('nav.home'), to: localePath('/') },
  { label: t('nav.about'), to: localePath('/about') },
  { label: t('nav.blog'), to: localePath('/blog') },
  { label: t('nav.contact'), to: localePath('/contact') },
])

const socials = [
  { icon: 'i-simple-icons-linkedin', to: site.linkedin, label: 'LinkedIn' },
  { icon: 'i-simple-icons-whatsapp', to: '/contact/whatsapp', label: 'WhatsApp' },
  { icon: 'i-lucide-phone', to: '/contact/call', label: 'Teléfono' },
]

const NAV_UI = {
  link: 'q-nav-link relative font-heading text-xs uppercase tracking-[0.18em] text-white-400 transition-colors hover:text-white-50 data-[active]:text-forge-500',
  linkIcon: 'hidden',
}

/*
 * Observa los `.reveal` del primer render y de CADA navegación: `revealAll`
 * solo en onMounted dejaba invisible el contenido al cambiar de página (los
 * elementos nuevos nunca recibían `in-view`).
 */
onMounted(() => {
  revealAll()
  useNuxtApp().hook('page:finish', async () => {
    await nextTick()
    revealAll()
  })
})
</script>

<template>
  <div class="bg-forge flex min-h-screen flex-col">
    <TheGrain />

    <UHeader class="border-b border-dark-700/60 bg-dark-950/70 backdrop-blur-md">
      <template #left>
        <NuxtLink
          :to="localePath('/')"
          class="group flex items-center gap-3"
        >
          <span class="relative grid size-9 place-items-center bg-forge-500">
            <UIcon
              name="i-lucide-zap"
              class="size-4 text-on-accent"
            />
            <span class="absolute -inset-1 border border-forge-500 opacity-0 transition-opacity group-hover:opacity-100" />
          </span>
          <span class="hidden sm:block">
            <span class="q-gradient-text block font-display text-2xl leading-none tracking-wider">SJ</span>
            <span class="mt-0.5 block font-mono text-[10px] tracking-[0.3em] text-white-500">
              {{ t('brand.tagline') }}
            </span>
          </span>
        </NuxtLink>
      </template>

      <template #right>
        <UNavigationMenu
          :items="navigation"
          :ui="NAV_UI"
        />
        <USeparator
          orientation="vertical"
          class="hidden h-5 lg:block"
        />
        <ThemeSwitcher />
        <LangSwitcher />
        <UButton
          :icon="socials[0].icon"
          color="gray"
          variant="ghost"
          :to="socials[0].to"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="socials[0].label"
          class="hidden sm:inline-flex"
        />
        <UButton
          :to="localePath('/about')"
          class="q-btn q-btn-primary q-btn-sm max-sm:hidden! font-heading uppercase tracking-[0.2em]"
        >
          {{ t('nav.cta') }}
        </UButton>
      </template>

      <template #body>
        <UNavigationMenu
          :items="navigation"
          orientation="vertical"
          :ui="NAV_UI"
        />
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>

    <UFooter class="border-t border-dark-700/60 bg-dark-950">
      <UContainer class="py-14 text-center">
        <NuxtLink
          :to="localePath('/')"
          class="q-gradient-text inline-block font-display text-4xl tracking-wide"
        >
          {{ site.name }}
        </NuxtLink>

        <p class="mt-2 font-mono text-[11px] uppercase tracking-[0.3em] text-white-500">
          {{ site.location }}
        </p>

        <p class="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white-400">
          {{ t('footer.summary') }}
        </p>

        <div class="mt-7 flex justify-center gap-4">
          <UButton
            v-for="s in socials"
            :key="s.icon"
            :icon="s.icon"
            color="gray"
            variant="ghost"
            :to="s.to"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="s.label"
            class="q-footer-social"
          />
        </div>

        <div class="mt-8 flex flex-col items-center gap-3 border-t border-dark-700/60 pt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-white-500 sm:flex-row sm:justify-between">
          <span>&copy; {{ new Date().getFullYear() }} {{ site.name }}</span>
          <span>{{ site.location }}</span>
        </div>
      </UContainer>
    </UFooter>
  </div>
</template>
