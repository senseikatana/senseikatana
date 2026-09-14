<script setup lang="ts">
import { site } from '~~/data/site'

const { t } = useI18n()
const localePath = useLocalePath()

const navigation = computed(() => [
  { label: t('nav.home'), to: localePath('/') },
  { label: t('nav.about'), to: localePath('/about') },
  { label: t('nav.blog'), to: localePath('/blog') },
  { label: t('nav.store'), to: localePath('/store') },
  { label: t('nav.contact'), to: localePath('/contact') },
])

const socials = [
  { icon: 'i-simple-icons-linkedin', to: site.linkedin, label: 'LinkedIn' },
]
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <UHeader>
      <template #title>
        <NuxtLink :to="localePath('/')" class="font-bold text-xl tracking-tight">
          SJ
        </NuxtLink>
      </template>

      <UNavigationMenu :items="navigation" />

      <template #right>
        <ThemeSwitcher />
        <LangSwitcher />
        <UButton
          v-for="s in socials"
          :key="s.icon"
          :icon="s.icon"
          color="neutral"
          variant="ghost"
          :to="s.to"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="s.label"
        />
      </template>

      <template #body>
        <UNavigationMenu :items="navigation" orientation="vertical" />
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>

    <UFooter>
      <template #left>
        <span class="text-sm text-white-500">
          &copy; {{ new Date().getFullYear() }} {{ site.name }}
        </span>
      </template>

      <template #right>
        <div class="flex gap-2">
          <UButton
            v-for="s in socials"
            :key="s.icon"
            :icon="s.icon"
            color="neutral"
            variant="ghost"
            :to="s.to"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="s.label"
          />
        </div>
      </template>
    </UFooter>
  </div>
</template>
