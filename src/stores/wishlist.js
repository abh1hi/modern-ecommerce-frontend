import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWishlistStore = defineStore('wishlist', () => {
  // State
  const items = ref([])
  
  // Getters
  const itemCount = computed(() => items.value.length)
  const isEmpty = computed(() => items.value.length === 0)
  
  // Actions
  function addItem(product, selectedVariant = null) {
    const exists = items.value.some(item => 
      item.id === product.id && 
      JSON.stringify(item.variant) === JSON.stringify(selectedVariant)
    )
    
    if (!exists) {
      items.value.push({
        id: product.id,
        name: product.name,
        price: selectedVariant?.price || product.price,
        image: selectedVariant?.image || product.images[0],
        variant: selectedVariant,
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
  
  function isInWishlist(productId, variant = null) {
    return items.value.some(item => 
      item.id === productId && 
      JSON.stringify(item.variant) === JSON.stringify(variant)
    )
  }
  
  function toggleItem(product, selectedVariant = null) {
    if (isInWishlist(product.id, selectedVariant)) {
      removeItem(product.id, selectedVariant)
    } else {
      addItem(product, selectedVariant)
    }
  }
  
  async function moveToCart(itemId, variant) {
    const item = items.value.find(item => 
      item.id === itemId && 
      JSON.stringify(item.variant) === JSON.stringify(variant)
    )
    if (item) {
      // Add to cart store
      const { useCartStore } = await import('./cart')
      const cartStore = useCartStore()
      cartStore.addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        images: [item.image]
      }, item.variant)
      
      // Remove from wishlist
      removeItem(itemId, variant)
    }
  }
  
  function clearWishlist() {
    items.value = []
  }
  
  // Persist wishlist to localStorage
  function saveToStorage() {
    localStorage.setItem('wishlist', JSON.stringify(items.value))
  }
  
  function loadFromStorage() {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      items.value = JSON.parse(savedWishlist)
    }
  }
  
  return {
    // State
    items,
    // Getters
    itemCount,
    isEmpty,
    // Actions
    addItem,
    removeItem,
    isInWishlist,
    toggleItem,
    moveToCart,
    clearWishlist,
    saveToStorage,
    loadFromStorage
  }
})
