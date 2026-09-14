<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cart = useCartStore()
const route = useRoute()
const localePath = useLocalePath()
const { t } = useI18n()

onMounted(() => {
  // Solo vaciamos el carrito si venimos de un checkout real de Stripe.
  if (route.query.session_id) {
    cart.clearCart()
  }
})
</script>

<template>
  <UContainer class="py-20 text-center">
    <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-900/30 border border-emerald-800/40 flex items-center justify-center">
      <UIcon name="i-lucide-check-circle" class="text-4xl text-emerald-400" />
    </div>

    <h1 class="text-3xl font-bold text-white-50 mb-4">{{ t('success.title') }}</h1>

    <p class="text-white-400 mb-8 max-w-md mx-auto">
      {{ t('success.subtitle') }}
    </p>

    <UButton :to="localePath('/store')" size="lg">
      {{ t('success.back') }}
    </UButton>
  </UContainer>
</template>
