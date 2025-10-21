<template>
  <div 
    class="w-screen max-w-4xl bg-white border border-primary-100 rounded-lg shadow-lg z-50"
    @mouseenter="clearHideTimer"
    @mouseleave="$emit('hide')"
  >
    <div class="p-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Featured Section -->
        <div v-if="category.megaMenu.featured" class="lg:col-span-1">
          <h3 class="font-display font-semibold text-lg text-primary-900 mb-4">
            {{ category.megaMenu.featured.title }}
          </h3>
          <div class="space-y-4">
            <RouterLink
              v-for="item in category.megaMenu.featured.items"
              :key="item.name"
              :to="item.href"
              class="block group"
            >
              <div class="aspect-[4/3] overflow-hidden rounded-lg mb-2">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span class="text-sm font-medium text-primary-700 group-hover:text-primary-900">
                {{ item.name }}
              </span>
            </RouterLink>
          </div>
        </div>
        
        <!-- Categories -->
        <div class="lg:col-span-3">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              v-for="categoryGroup in category.megaMenu.categories"
              :key="categoryGroup.name"
            >
              <h3 class="font-display font-semibold text-lg text-primary-900 mb-4">
                {{ categoryGroup.name }}
              </h3>
              <ul class="space-y-3">
                <li v-for="item in categoryGroup.items" :key="item.name">
                  <RouterLink
                    :to="item.href"
                    class="text-primary-600 hover:text-primary-900 transition-colors duration-200"
                  >
                    {{ item.name }}
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Bottom CTA -->
      <div class="mt-8 pt-6 border-t border-primary-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-primary-600 mb-2">
              Free shipping on orders over $75
            </p>
            <RouterLink
              :to="category.href"
              class="inline-flex items-center text-sm font-medium text-primary-900 hover:text-primary-700"
            >
              View All {{ category.name }}
              <ArrowRightIcon class="ml-2 w-4 h-4" />
            </RouterLink>
          </div>
          <div class="text-right">
            <p class="text-sm text-primary-600 mb-2">
              Need help? Call us
            </p>
            <a href="tel:+1-555-123-4567" class="text-sm font-medium text-primary-900 hover:text-primary-700">
              +1 (555) 123-4567
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'

// Props
defineProps({
  category: {
    type: Object,
    required: true
  }
})

// Emits
defineEmits(['hide'])

// Methods
const clearHideTimer = () => {
  // This will be handled by the parent component
}
</script>
