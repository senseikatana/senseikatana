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
]

const marquee = computed(() => t('brand.marquee') as unknown as string[])

const NAV_UI = {
  link: 'relative font-heading text-xs uppercase tracking-[0.18em] text-white-400 transition-colors hover:text-white-50 data-[active]:text-forge-500',
  linkIcon: 'hidden',
}

onMounted(() => revealAll())
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
              class="size-4 text-dark-950"
            />
            <span class="absolute -inset-1 border border-forge-500 opacity-0 transition-opacity group-hover:opacity-100" />
          </span>
          <span class="hidden sm:block">
            <span class="block font-display text-2xl leading-none tracking-wider text-white-50">SJ</span>
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
          v-for="s in socials"
          :key="s.icon"
          :icon="s.icon"
          color="gray"
          variant="ghost"
          :to="s.to"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="s.label"
          class="hidden sm:inline-flex"
        />
        <UButton
          :to="localePath('/about')"
          class="hidden font-heading text-xs uppercase tracking-[0.2em]"
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

    <UFooter class="relative overflow-hidden border-t border-dark-700/60 bg-dark-950">
      <p
        class="pointer-events-none absolute inset-x-0 -bottom-4 select-none text-center font-display text-[22vw] leading-none text-outline-dim opacity-30"
        aria-hidden="true"
      >
        {{ site.name.split(' ').map(part => part[0]).join('') }}
      </p>

      <div class="relative">
        <UContainer>
          <div class="grid gap-10 py-14 md:grid-cols-12">
            <div class="md:col-span-5">
              <div class="mb-5 flex items-center gap-3">
                <span class="grid size-10 place-items-center bg-forge-500">
                  <UIcon
                    name="i-lucide-zap"
                    class="size-5 text-dark-950"
                  />
                </span>
                <span>
                  <span class="block font-display text-2xl leading-none tracking-wider text-white-50">{{ site.name }}</span>
                  <span class="mt-0.5 block font-mono text-[10px] tracking-[0.3em] text-white-500">{{ site.location }}</span>
                </span>
              </div>
              <p class="max-w-md text-sm leading-relaxed text-white-400">
                {{ t('footer.summary') }}
              </p>
              <div class="mt-6 flex gap-3">
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
                />
              </div>
            </div>

            <div class="md:col-span-3 md:col-start-7">
              <h2 class="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-forge-500">
                {{ t('footer.navTitle') }}
              </h2>
              <ul class="space-y-2 text-sm">
                <li
                  v-for="item in navigation"
                  :key="item.to"
                >
                  <NuxtLink
                    :to="item.to"
                    class="link-underline text-white-400 transition-colors hover:text-white-50"
                  >
                    {{ item.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <div class="md:col-span-4">
              <h2 class="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-forge-500">
                {{ t('footer.contactTitle') }}
              </h2>
              <div class="space-y-2.5 text-sm">
                <a
                  href="/contact/whatsapp"
                  class="flex items-center gap-3 text-white-400 transition-colors hover:text-forge-500"
                >
                  <UIcon
                    name="i-lucide-message-circle"
                    class="size-4 text-forge-500"
                  />
                  {{ t('contact.whatsappAction') }}
                </a>
                <a
                  href="/contact/call"
                  class="flex items-center gap-3 text-white-400 transition-colors hover:text-forge-500"
                >
                  <UIcon
                    name="i-lucide-phone"
                    class="size-4 text-forge-500"
                  />
                  {{ t('contact.callAction') }}
                </a>
              </div>
            </div>
          </div>

          <div class="flex flex-col justify-between gap-4 border-t border-dark-700/60 py-6 font-mono text-[11px] uppercase tracking-[0.15em] text-white-500 md:flex-row">
            <span>&copy; {{ new Date().getFullYear() }} {{ site.name }}</span>
            <span>{{ site.location }}</span>
          </div>
        </UContainer>
      </div>
    </UFooter>
  </div>
</template>
