<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <HeroSection />
    
    <!-- Featured Categories -->
    <FeaturedCategories />
    
    <!-- Featured Products -->
    <FeaturedProducts />
    
    <!-- Newsletter Signup -->
    <NewsletterSection />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import HeroSection from '@/components/homepage/HeroSection.vue'
import FeaturedCategories from '@/components/homepage/FeaturedCategories.vue'
import FeaturedProducts from '@/components/homepage/FeaturedProducts.vue'
import NewsletterSection from '@/components/homepage/NewsletterSection.vue'

// Page title
onMounted(() => {
  document.title = 'Modern E-Commerce - Minimalist Fashion & Lifestyle'
})
</script>
