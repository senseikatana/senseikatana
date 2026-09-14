<script setup lang="ts">
import { products, externalPlatformLabel } from '~~/data/products'
import { useCartStore } from '~/stores/cart'

const route = useRoute()
const cart = useCartStore()
const { locale, t } = useI18n()
const localePath = useLocalePath()

const slug = route.params.slug as string

if (!/^[a-z0-9-]+$/.test(slug)) {
  throw createError({ statusCode: 404, message: t('store.notFound'), fatal: true })
}

const product = computed(() => products.find(p => p.slug === slug))

if (!product.value) {
  throw createError({ statusCode: 404, message: t('store.notFound'), fatal: true })
}

useSeoMeta({
  title: product.value.name,
  description: product.value.description,
})

const addToCart = () => {
  if (product.value) {
    cart.addItem(product.value)
  }
}
</script>

<template>
  <UContainer v-if="product" class="py-12">
    <div class="grid md:grid-cols-2 gap-10">
      <div class="aspect-video bg-dark-800 rounded-xl border border-dark-700/50 flex items-center justify-center">
        <UIcon name="i-lucide-shopping-bag" class="text-6xl text-dark-600" />
      </div>

      <div>
        <UBadge color="primary" variant="soft" class="mb-4">
          {{ t(`store.categories.${product.category}`) }}
        </UBadge>

        <h1 class="text-3xl font-bold text-white-50 mb-4">{{ product.name }}</h1>

        <p class="text-white-300 mb-6 leading-relaxed">{{ product.description }}</p>

        <div class="text-4xl font-bold text-white-50 mb-8">
          {{ formatPrice(product.price, product.currency, locale) }}
        </div>

        <div class="flex flex-wrap gap-3">
          <UButton
            v-if="product.externalUrl"
            size="lg"
            :to="product.externalUrl"
            target="_blank"
            rel="noopener noreferrer"
            icon="i-lucide-external-link"
          >
            {{ t('store.buyOn') }} {{ externalPlatformLabel(product.externalPlatform) }}
          </UButton>
          <UButton v-else size="lg" @click="addToCart">
            <UIcon name="i-lucide-shopping-cart" class="mr-2" />
            {{ t('store.addToCart') }}
          </UButton>

          <UButton size="lg" variant="outline" :to="localePath('/store')" class="border-dark-600 text-white-300">
            {{ t('store.back') }}
          </UButton>
        </div>
      </div>
    </div>
  </UContainer>
</template>
