<template>
  <!-- Search Modal Overlay -->
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="isOpen"
        class="fixed inset-0 z-50 overflow-hidden"
        @click="$emit('close')"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black bg-opacity-50" />
        
        <!-- Modal Content -->
        <div class="flex min-h-full items-start justify-center p-4 pt-16">
          <div 
            class="w-full max-w-2xl bg-white rounded-lg shadow-xl"
            @click.stop
          >
            <!-- Header -->
            <div class="flex items-center justify-between p-6 border-b border-primary-100">
              <h2 class="text-lg font-display font-semibold text-primary-900">Search</h2>
              <button 
                @click="$emit('close')"
                class="p-2 rounded-lg hover:bg-primary-50 transition-colors duration-200"
              >
                <XMarkIcon class="w-6 h-6 text-primary-600" />
              </button>
            </div>
            
            <!-- Search Content -->
            <div class="p-6">
              <SearchBar 
                :autofocus="true"
                @search="handleSearch"
                class="mb-6"
              />
              
              <!-- Recent Searches -->
              <div v-if="recentSearches.length > 0" class="mb-6">
                <h3 class="text-sm font-medium text-primary-700 mb-3">Recent Searches</h3>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="search in recentSearches"
                    :key="search"
                    @click="selectRecentSearch(search)"
                    class="inline-flex items-center space-x-2 px-3 py-2 bg-primary-50 text-primary-700 rounded-full hover:bg-primary-100 transition-colors duration-200"
                  >
                    <span class="text-sm">{{ search }}</span>
                    <button
                      @click.stop="removeRecentSearch(search)"
                      class="p-0.5 rounded-full hover:bg-primary-200 transition-colors duration-200"
                    >
                      <XMarkIcon class="w-3 h-3" />
                    </button>
                  </button>
                </div>
              </div>
              
              <!-- Popular Categories -->
              <div>
                <h3 class="text-sm font-medium text-primary-700 mb-3">Browse Categories</h3>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <RouterLink
                    v-for="category in popularCategories"
                    :key="category.name"
                    :to="category.href"
                    @click="$emit('close')"
                    class="group flex items-center space-x-3 p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-200"
                  >
                    <div class="flex-shrink-0">
                      <img
                        :src="category.image"
                        :alt="category.name"
                        class="w-8 h-8 object-cover rounded"
                      />
                    </div>
                    <span class="text-sm font-medium text-primary-700 group-hover:text-primary-900">
                      {{ category.name }}
                    </span>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import SearchBar from './SearchBar.vue'

// Props
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

// Emits
defineEmits(['close'])

// Router
const router = useRouter()

// Reactive state
const recentSearches = ref([
  'summer dresses',
  'minimalist bags',
  'white sneakers'
])

const popularCategories = ref([
  {
    name: 'Dresses',
    href: '/shop/clothing/dresses',
    image: '/images/categories/dresses.jpg'
  },
  {
    name: 'Bags',
    href: '/shop/accessories/bags',
    image: '/images/categories/bags.jpg'
  },
  {
    name: 'Shoes',
    href: '/shop/shoes',
    image: '/images/categories/shoes.jpg'
  },
  {
    name: 'Jewelry',
    href: '/shop/accessories/jewelry',
    image: '/images/categories/jewelry.jpg'
  },
  {
    name: 'Outerwear',
    href: '/shop/clothing/outerwear',
    image: '/images/categories/outerwear.jpg'
  },
  {
    name: 'Activewear',
    href: '/shop/clothing/activewear',
    image: '/images/categories/activewear.jpg'
  }
])

// Methods
const handleSearch = (query) => {
  if (query.trim()) {
    // Add to recent searches
    if (!recentSearches.value.includes(query)) {
      recentSearches.value.unshift(query)
      // Keep only last 5 searches
      recentSearches.value = recentSearches.value.slice(0, 5)
    }
    
    // Navigate to search results
    router.push({
      name: 'search-results',
      query: { q: query }
    })
    
    // Close modal
    $emit('close')
  }
}

const selectRecentSearch = (search) => {
  handleSearch(search)
}

const removeRecentSearch = (search) => {
  const index = recentSearches.value.indexOf(search)
  if (index > -1) {
    recentSearches.value.splice(index, 1)
  }
}
</script>

<style scoped>
/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95) translateY(-20px);
}
</style>
