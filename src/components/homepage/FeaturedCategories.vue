<template>
  <section class="py-16 lg:py-24 bg-white">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-display font-bold text-primary-900 sm:text-4xl">
          Shop by Category
        </h2>
        <p class="mt-4 text-lg text-primary-600 max-w-2xl mx-auto">
          Explore our carefully curated collections designed for every aspect of your minimalist lifestyle
        </p>
      </div>
      
      <!-- Categories Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <RouterLink
          v-for="category in categories"
          :key="category.name"
          :to="category.href"
          class="group relative overflow-hidden rounded-lg aspect-[4/5] bg-primary-100 hover:shadow-card-hover transition-all duration-300"
        >
          <!-- Category Image -->
          <img
            :src="category.image"
            :alt="category.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          
          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
          </div>
          
          <!-- Content -->
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <h3 class="text-xl font-display font-semibold text-white mb-2">
              {{ category.name }}
            </h3>
            <p class="text-sm text-white/90 mb-3">
              {{ category.description }}
            </p>
            <div class="inline-flex items-center text-sm font-medium text-white group-hover:text-yellow-300 transition-colors duration-200">
              <span>Shop Now</span>
              <ArrowRightIcon class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'

// Categories data
const categories = [
  {
    name: 'Minimalist Clothing',
    description: 'Clean lines, quality fabrics',
    href: '/shop/clothing',
    image: '/images/categories/clothing.jpg'
  },
  {
    name: 'Essential Accessories',
    description: 'Timeless pieces that complete any look',
    href: '/shop/accessories',
    image: '/images/categories/accessories.jpg'
  },
  {
    name: 'Modern Footwear',
    description: 'Comfort meets contemporary design',
    href: '/shop/shoes',
    image: '/images/categories/shoes.jpg'
  }
]
</script>
