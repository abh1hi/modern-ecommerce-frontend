import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref([])
  const isLoading = ref(false)
  
  // Getters
  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })
  
  const subtotal = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })
  
  const tax = computed(() => {
    return subtotal.value * 0.08 // 8% tax rate
  })
  
  const shipping = computed(() => {
    return subtotal.value > 75 ? 0 : 8.99 // Free shipping over $75
  })
  
  const total = computed(() => {
    return subtotal.value + tax.value + shipping.value
  })
  
  const isEmpty = computed(() => items.value.length === 0)
  
  // Actions
  function addItem(product, selectedVariant = null, quantity = 1) {
    const existingItem = items.value.find(item => 
      item.id === product.id && 
      JSON.stringify(item.variant) === JSON.stringify(selectedVariant)
    )
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: selectedVariant?.price || product.price,
        image: selectedVariant?.image || product.images[0],
        variant: selectedVariant,
        quantity,
        addedAt: new Date().toISOString()
      })
    }
  }
  
  function removeItem(itemId, variant = null) {
    const index = items.value.findIndex(item => 
      item.id === itemId && 
      JSON.stringify(item.variant) === JSON.stringify(variant)
    )
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }
  
  function updateQuantity(itemId, variant, quantity) {
    const item = items.value.find(item => 
      item.id === itemId && 
      JSON.stringify(item.variant) === JSON.stringify(variant)
    )
    if (item) {
      if (quantity <= 0) {
        removeItem(itemId, variant)
      } else {
        item.quantity = quantity
      }
    }
  }
  
  function clearCart() {
    items.value = []
  }
  
  async function moveToWishlist(itemId, variant) {
    const item = items.value.find(item => 
      item.id === itemId && 
      JSON.stringify(item.variant) === JSON.stringify(variant)
    )
    if (item) {
      // Add to wishlist store
      const { useWishlistStore } = await import('./wishlist')
      const wishlistStore = useWishlistStore()
      wishlistStore.addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        variant: item.variant
      })
      
      // Remove from cart
      removeItem(itemId, variant)
    }
  }
  
  // Persist cart to localStorage
  function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }
  
  function loadFromStorage() {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      items.value = JSON.parse(savedCart)
    }
  }
  
  return {
    // State
    items,
    isLoading,
    // Getters
    itemCount,
    subtotal,
    tax,
    shipping,
    total,
    isEmpty,
    // Actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    moveToWishlist,
    saveToStorage,
    loadFromStorage
  }
})
