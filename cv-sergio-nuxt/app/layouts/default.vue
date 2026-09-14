<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { profiles } from '~~/data/profiles'

const cart = useCartStore()
const resumeSlug = profiles.find(p => p.lang === 'es')?.slug ?? 'fullstack'

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Resume', to: `/es/resume/${resumeSlug}` },
  { label: 'Blog', to: '/blog' },
  { label: 'Store', to: '/store' },
  { label: 'Contact', to: '/contact' },
]

const socials = [
  { icon: 'i-simple-icons-github', to: 'https://github.com/senseikatana', label: 'GitHub' },
  { icon: 'i-simple-icons-linkedin', to: 'https://linkedin.com/in/sergioesteban', label: 'LinkedIn' },
]
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <UHeader>
      <template #title>
        <NuxtLink to="/" class="font-bold text-xl tracking-tight">
          SE
        </NuxtLink>
      </template>

      <UNavigationMenu :items="navigation" />

      <template #right>
        <UButton
          color="gray"
          variant="ghost"
          icon="i-lucide-shopping-cart"
          @click="cart.isOpen = true"
        >
          <UBadge
            v-if="cart.totalItems > 0"
            :label="cart.totalItems"
            color="primary"
            size="xs"
            class="ml-1"
          />
        </UButton>
        <UColorModeButton />
        <UButton
          v-for="s in socials"
          :key="s.icon"
          :icon="s.icon"
          color="gray"
          variant="ghost"
          :to="s.to"
          target="_blank"
          :aria-label="s.label"
        />
      </template>

      <template #body>
        <UNavigationMenu :items="navigation" orientation="vertical" />
      </template>
    </UHeader>

    <CartSlideover />

    <UMain>
      <slot />
    </UMain>

    <UFooter>
      <template #left>
        <span class="text-sm text-white-500">
          &copy; {{ new Date().getFullYear() }} Sergio Esteban
        </span>
      </template>

      <template #right>
        <div class="flex gap-2">
          <UButton
            v-for="s in socials"
            :key="s.icon"
            :icon="s.icon"
            color="gray"
            variant="ghost"
            :to="s.to"
            target="_blank"
            :aria-label="s.label"
          />
        </div>
      </template>
    </UFooter>
  </div>
</template>
