<template>
  <section class="relative bg-primary-50 overflow-hidden">
    <div class="container-custom">
      <div class="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
        <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="pt-10 sm:pt-16 lg:pt-20 xl:pt-28">
            <div class="text-center lg:text-left">
              <h1 class="text-4xl font-display font-bold tracking-tight text-primary-900 sm:text-5xl md:text-6xl">
                <span class="block">Minimalist</span>
                <span class="block text-accent-blue">Fashion</span>
                <span class="block">Redefined</span>
              </h1>
              <p class="mt-6 text-base text-primary-600 sm:text-lg md:mt-8 md:text-xl lg:mx-0 max-w-md">
                Discover our curated collection of timeless pieces designed for the modern minimalist. 
                Quality craftsmanship meets contemporary style.
              </p>
              <div class="mt-8 flex flex-col sm:flex-row gap-4 lg:justify-start justify-center">
                <RouterLink to="/shop" class="btn btn-primary">
                  Shop Collection
                </RouterLink>
                <RouterLink to="/about" class="btn btn-secondary">
                  Learn More
                </RouterLink>
              </div>
              
              <!-- Trust Indicators -->
              <div class="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-primary-600">
                <div class="flex items-center space-x-2">
                  <TruckIcon class="w-5 h-5" />
                  <span>Free Shipping</span>
                </div>
                <div class="flex items-center space-x-2">
                  <ArrowPathIcon class="w-5 h-5" />
                  <span>30-Day Returns</span>
                </div>
                <div class="flex items-center space-x-2">
                  <ShieldCheckIcon class="w-5 h-5" />
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    
    <!-- Hero Image -->
    <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <div class="aspect-hero lg:aspect-none lg:h-full w-full">
        <img
          class="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
          src="/images/hero/minimalist-fashion.jpg"
          alt="Minimalist fashion collection"
          loading="lazy"
        />
      </div>
    </div>
    
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary-50 to-white opacity-80"></div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import {
  TruckIcon,
  ArrowPathIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/outline'
</script>
