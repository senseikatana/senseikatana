import { defineStore } from 'pinia'
import type { Product } from '~~/data/products'

export interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const isOpen = ref(false)

  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  )

  function addItem(product: Product) {
    const existing = items.value.find(item => item.product.slug === product.slug)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ product, quantity: 1 })
    }
    isOpen.value = true
  }

  function removeItem(productSlug: string) {
    items.value = items.value.filter(item => item.product.slug !== productSlug)
  }

  function updateQuantity(productSlug: string, quantity: number) {
    const item = items.value.find(item => item.product.slug === productSlug)
    if (item) {
      if (quantity <= 0) {
        removeItem(productSlug)
      } else {
        item.quantity = quantity
      }
    }
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    isOpen,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }
})
