<script setup lang="ts">
import { products, categories, externalPlatformLabel } from '~~/data/products'

const selectedCategory = ref('all')

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') return products
  return products.filter(p => p.category === selectedCategory.value)
})
</script>

<template>
  <UContainer class="py-12">
    <div class="mb-10">
      <h1 class="text-3xl font-bold text-white-50 mb-2">Store</h1>
      <p class="text-white-400">Resources, templates, and services</p>
    </div>

    <div class="flex flex-wrap gap-2 mb-10">
      <UButton
        v-for="cat in categories"
        :key="cat.id"
        :variant="selectedCategory === cat.id ? 'solid' : 'outline'"
        :color="selectedCategory === cat.id ? 'primary' : 'gray'"
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
          <NuxtLink :to="`/store/${product.slug}`" class="hover:text-sky-300 transition-colors">
            {{ product.name }}
          </NuxtLink>
        </h2>

        <p class="text-white-400 text-sm mb-4 line-clamp-2">{{ product.description }}</p>

        <div class="flex items-center justify-between">
          <span class="text-2xl font-bold text-white-100">
            ${{ product.price.toFixed(2) }}
          </span>
          <UBadge v-if="product.featured" color="warning" variant="soft">
            Featured
          </UBadge>
        </div>

        <template #footer>
          <UButton
            v-if="product.externalUrl"
            :to="product.externalUrl"
            target="_blank"
            block
            icon="i-lucide-external-link"
          >
            Ver en {{ externalPlatformLabel(product.externalPlatform) }}
          </UButton>
          <UButton v-else :to="`/store/${product.slug}`" block>
            View Details
          </UButton>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>
