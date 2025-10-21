<template>
  <section class="py-16 lg:py-24 bg-primary-25">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-display font-bold text-primary-900 sm:text-4xl">
          Featured Products
        </h2>
        <p class="mt-4 text-lg text-primary-600 max-w-2xl mx-auto">
          Handpicked essentials that embody our commitment to quality and minimalist design
        </p>
      </div>
      
      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <ProductCard
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
          class="animate-fade-in"
        />
      </div>
      
      <!-- View All Button -->
      <div class="text-center mt-12">
        <RouterLink to="/shop" class="btn btn-primary">
          View All Products
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import ProductCard from '@/components/product/ProductCard.vue'

// Mock featured products data
const featuredProducts = [
  {
    id: 1,
    name: 'Minimalist Tote Bag',
    price: 89.99,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 124,
    images: ['/images/products/tote-bag-1.jpg', '/images/products/tote-bag-2.jpg'],
    colors: ['Black', 'Cream', 'Brown'],
    isNew: true,
    inStock: true
  },
  {
    id: 2,
    name: 'Organic Cotton T-Shirt',
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.9,
    reviewCount: 89,
    images: ['/images/products/tshirt-1.jpg', '/images/products/tshirt-2.jpg'],
    colors: ['White', 'Black', 'Grey'],
    isSale: true,
    inStock: true
  },
  {
    id: 3,
    name: 'Wool Blend Sweater',
    price: 129.99,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 67,
    images: ['/images/products/sweater-1.jpg', '/images/products/sweater-2.jpg'],
    colors: ['Cream', 'Charcoal', 'Camel'],
    inStock: true
  },
  {
    id: 4,
    name: 'Leather Ankle Boots',
    price: 199.99,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 95,
    images: ['/images/products/boots-1.jpg', '/images/products/boots-2.jpg'],
    colors: ['Black', 'Brown'],
    inStock: false
  }
]
</script>
