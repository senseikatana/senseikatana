<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cart = useCartStore()

const checkoutLoading = ref(false)

const handleCheckout = async () => {
  checkoutLoading.value = true
  try {
    const data = await $fetch('/api/checkout', {
      method: 'POST',
      body: {
        items: cart.items.map(item => ({
          priceId: item.product.stripePriceId,
          quantity: item.quantity,
        })),
      },
    })

    if (data?.url) {
      await navigateTo(data.url, { external: true })
    }
  } catch (error) {
    console.error('Checkout error:', error)
  } finally {
    checkoutLoading.value = false
  }
}
</script>

<template>
  <USlideover v-model="cart.isOpen">
    <div class="flex flex-col h-full bg-dark-900">
      <div class="flex items-center justify-between p-4 border-b border-dark-700/50">
        <h2 class="text-xl font-bold text-white-50">Cart</h2>
        <UButton
          color="gray"
          variant="ghost"
          icon="i-lucide-x"
          class="text-white-400"
          @click="cart.isOpen = false"
        />
      </div>

      <div class="flex-1 overflow-y-auto p-4">
        <div v-if="cart.items.length === 0" class="text-center py-12 text-white-400">
          <UIcon name="i-lucide-shopping-cart" class="text-4xl mb-3 text-dark-500" />
          <p>Your cart is empty</p>
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="item in cart.items"
            :key="item.product.slug"
            class="flex gap-4 p-4 bg-dark-800/60 rounded-lg border border-dark-700/30"
          >
            <div class="flex-1">
              <h3 class="font-semibold text-white-100 text-sm">{{ item.product.name }}</h3>
              <p class="text-xs text-white-400 mt-1">
                ${{ item.product.price.toFixed(2) }} x {{ item.quantity }}
              </p>
            </div>

            <div class="flex items-center gap-2">
              <UButton
                size="xs"
                color="gray"
                variant="soft"
                icon="i-lucide-minus"
                @click="cart.updateQuantity(item.product.slug, item.quantity - 1)"
              />
              <span class="w-8 text-center text-sm text-white-200">{{ item.quantity }}</span>
              <UButton
                size="xs"
                color="gray"
                variant="soft"
                icon="i-lucide-plus"
                @click="cart.updateQuantity(item.product.slug, item.quantity + 1)"
              />
              <UButton
                size="xs"
                color="error"
                variant="ghost"
                icon="i-lucide-trash-2"
                @click="cart.removeItem(item.product.slug)"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="cart.items.length > 0" class="p-4 border-t border-dark-700/50">
        <div class="flex justify-between mb-4">
          <span class="text-lg font-semibold text-white-200">Total</span>
          <span class="text-lg font-bold text-white-50">
            ${{ cart.totalPrice.toFixed(2) }}
          </span>
        </div>

        <UButton
          block
          size="lg"
          :loading="checkoutLoading"
          @click="handleCheckout"
        >
          Proceed to checkout
        </UButton>
      </div>
    </div>
  </USlideover>
</template>
