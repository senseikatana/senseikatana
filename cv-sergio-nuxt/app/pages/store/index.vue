<script setup lang="ts">
import { products, externalPlatformLabel } from '~~/data/products'

const { locale, t } = useI18n()
const localePath = useLocalePath()

const selectedCategory = ref('all')

const categoryItems = computed(() => [
  'all',
  'cursos',
  'templates',
  'ebooks',
  'componentes',
  'servicios',
  'segunda-mano',
].map(id => ({ id, label: t(`store.categories.${id}`) })))

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') return products
  return products.filter(p => p.category === selectedCategory.value)
})

const productPath = (slug: string) => localePath(`/store/${slug}`)
</script>

<template>
  <UContainer class="py-12">
    <div class="mb-10">
      <h1 class="text-3xl font-bold text-white-50 mb-2">{{ t('store.title') }}</h1>
      <p class="text-white-400">{{ t('store.subtitle') }}</p>
    </div>

    <div class="flex flex-wrap gap-2 mb-10">
      <UButton
        v-for="cat in categoryItems"
        :key="cat.id"
        :variant="selectedCategory === cat.id ? 'solid' : 'outline'"
        :color="selectedCategory === cat.id ? 'primary' : 'neutral'"
        size="sm"
        @click="selectedCategory = cat.id"
      >
        {{ cat.label }}
      </UButton>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <UCard
        v-for="product in filteredProducts"
        :key="product.slug"
        class="bg-dark-800/60 border-dark-700/50 hover:border-teal-700/40 transition-all duration-300 group"
      >
        <template #header>
          <div class="aspect-video bg-dark-900 rounded-t-lg flex items-center justify-center">
            <UIcon name="i-lucide-shopping-bag" class="text-4xl text-dark-600 group-hover:text-teal-600 transition-colors" />
          </div>
        </template>

        <h2 class="text-xl font-semibold mb-2 text-white-100">
          <NuxtLink :to="productPath(product.slug)" class="hover:text-sky-300 transition-colors">
            {{ product.name }}
          </NuxtLink>
        </h2>

        <p class="text-white-400 text-sm mb-4 line-clamp-2">{{ product.description }}</p>

        <div class="flex items-center justify-between">
          <span class="text-2xl font-bold text-white-100">
            {{ formatPrice(product.price, product.currency, locale) }}
          </span>
          <UBadge v-if="product.featured" color="warning" variant="soft">
            {{ t('store.featured') }}
          </UBadge>
        </div>

        <template #footer>
          <UButton
            v-if="product.externalUrl"
            :to="product.externalUrl"
            target="_blank"
            rel="noopener noreferrer"
            block
            icon="i-lucide-external-link"
          >
            {{ t('store.viewOn') }} {{ externalPlatformLabel(product.externalPlatform) }}
          </UButton>
          <UButton v-else :to="productPath(product.slug)" block>
            {{ t('store.viewDetails') }}
          </UButton>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>
