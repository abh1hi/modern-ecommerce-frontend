<template>
  <div class="bg-primary-900 text-white text-sm">
    <div class="container-custom">
      <div class="flex items-center justify-between py-2">
        <!-- Left Side - Promotional Message -->
        <div class="flex items-center space-x-4">
          <span class="font-medium">
            Free shipping on orders over $75
          </span>
          <span class="hidden sm:inline text-primary-200">|</span>
          <span class="hidden sm:inline text-primary-200">
            30-day returns
          </span>
        </div>
        
        <!-- Right Side - Utility Links -->
        <div class="flex items-center space-x-4">
          <a href="#" class="hover:text-primary-200 transition-colors duration-200">
            Store Locator
          </a>
          <span class="text-primary-400">|</span>
          <a href="#" class="hover:text-primary-200 transition-colors duration-200">
            Help Center
          </a>
          <span class="text-primary-400">|</span>
          <div class="relative">
            <select 
              v-model="selectedCurrency" 
              class="bg-transparent text-white border-none cursor-pointer focus:outline-none appearance-none pr-4"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
            <ChevronDownIcon class="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'

// Reactive state
const selectedCurrency = ref('USD')
</script>
