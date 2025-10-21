<template>
  <div class="py-8">
    <!-- Hero Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center py-16">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Modern Minimalist Store
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          Discover curated collections for the modern minimalist lifestyle
        </p>
        <RouterLink 
          to="/shop" 
          class="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Shop Now
        </RouterLink>
      </div>
    </div>

    <!-- Featured Products -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 class="text-3xl font-bold text-gray-900 text-center mb-12">
        Featured Products
      </h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>

    <!-- Categories -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 class="text-3xl font-bold text-gray-900 text-center mb-12">
        Shop by Category
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="relative overflow-hidden rounded-lg aspect-[4/3] bg-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
        >
          <img
            :src="category.image"
            :alt="category.name"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div class="text-center text-white">
              <h3 class="text-2xl font-bold mb-2">{{ category.name }}</h3>
              <p class="text-sm opacity-90">{{ category.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import ProductCard from '@/components/product/ProductCard.vue'
import { mockProducts, mockCategories } from '@/mocks/products.js'

// Use mock data
const featuredProducts = mockProducts.slice(0, 4)
const categories = mockCategories
</script>
