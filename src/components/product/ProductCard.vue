<template>
  <div class="product-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
    <!-- Product Image -->
    <div class="aspect-[4/5] overflow-hidden bg-gray-100">
      <img
        :src="product.images[0]"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>
    
    <!-- Product Info -->
    <div class="p-4">
      <!-- Name -->
      <h3 class="font-medium text-gray-900 mb-2 line-clamp-2">
        {{ product.name }}
      </h3>
      
      <!-- Price -->
      <div class="flex items-center space-x-2 mb-3">
        <span class="font-semibold text-gray-900">
          ${{ product.price.toFixed(2) }}
        </span>
        <span 
          v-if="product.originalPrice"
          class="text-sm text-gray-500 line-through"
        >
          ${{ product.originalPrice.toFixed(2) }}
        </span>
      </div>
      
      <!-- Rating -->
      <div class="flex items-center mb-3">
        <div class="flex items-center">
          <span v-for="i in 5" :key="i" class="text-sm">
            {{ i <= Math.floor(product.rating) ? '★' : '☆' }}
          </span>
        </div>
        <span class="ml-2 text-sm text-gray-600">
          ({{ product.reviewCount }})
        </span>
      </div>
      
      <!-- Add to Cart Button -->
      <button 
        class="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!product.inStock"
        @click="addToCart"
      >
        {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
      </button>
    </div>
    
    <!-- Badges -->
    <div class="absolute top-2 left-2 flex flex-col space-y-1">
      <span 
        v-if="product.isNew"
        class="bg-blue-600 text-white text-xs px-2 py-1 rounded-full"
      >
        New
      </span>
      <span 
        v-if="product.isSale"
        class="bg-red-600 text-white text-xs px-2 py-1 rounded-full"
      >
        Sale
      </span>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

// Props
defineProps({
  product: {
    type: Object,
    required: true
  }
})

// Store
const cartStore = useCartStore()

// Methods
const addToCart = () => {
  console.log('Added to cart:', product.name)
  // cartStore.addItem(product)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
