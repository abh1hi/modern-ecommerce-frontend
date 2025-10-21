<template>
  <div class="relative w-full max-w-md">
    <div class="relative">
      <input
        v-model="query"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.enter="handleSubmit"
        @keydown.escape="clearSearch"
        @keydown.up="navigateUp"
        @keydown.down="navigateDown"
        type="text"
        placeholder="Search products..."
        class="w-full pl-10 pr-10 py-2 text-base border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
        :class="{
          'rounded-b-none border-b-0': showSuggestions && suggestions.length > 0
        }"
      />
      
      <!-- Search Icon -->
      <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
      
      <!-- Clear Button -->
      <button
        v-if="query"
        @click="clearSearch"
        class="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-primary-100 transition-colors duration-200"
      >
        <XMarkIcon class="w-4 h-4 text-primary-400" />
      </button>
    </div>
    
    <!-- Search Suggestions Dropdown -->
    <Transition name="suggestions">
      <div 
        v-if="showSuggestions && suggestions.length > 0"
        class="absolute top-full left-0 right-0 bg-white border border-primary-200 border-t-0 rounded-b-lg shadow-lg z-50 max-h-80 overflow-y-auto"
      >
        <div class="py-2">
          <!-- Popular Searches -->
          <div v-if="query.length === 0" class="px-4 py-2">
            <h4 class="text-sm font-medium text-primary-700 mb-2">Popular Searches</h4>
            <ul class="space-y-1">
              <li v-for="(search, index) in popularSearches" :key="search">
                <button
                  @click="selectSuggestion(search)"
                  class="flex items-center space-x-3 w-full px-2 py-2 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                  :class="{ 'bg-primary-50': selectedIndex === index }"
                >
                  <TrendingUpIcon class="w-4 h-4 text-primary-400" />
                  <span class="text-primary-700">{{ search }}</span>
                </button>
              </li>
            </ul>
          </div>
          
          <!-- Search Results -->
          <div v-else>
            <!-- Products -->
            <div v-if="productSuggestions.length > 0" class="px-4 py-2">
              <h4 class="text-sm font-medium text-primary-700 mb-2">Products</h4>
              <ul class="space-y-1">
                <li v-for="(product, index) in productSuggestions" :key="product.id">
                  <RouterLink
                    :to="`/product/${product.id}`"
                    @click="selectSuggestion(product.name)"
                    class="flex items-center space-x-3 w-full px-2 py-2 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                    :class="{ 'bg-primary-50': selectedIndex === index }"
                  >
                    <img
                      :src="product.image"
                      :alt="product.name"
                      class="w-8 h-8 object-cover rounded"
                    />
                    <div class="flex-1 text-left">
                      <p class="text-sm font-medium text-primary-900">{{ product.name }}</p>
                      <p class="text-xs text-primary-600">${{ product.price }}</p>
                    </div>
                  </RouterLink>
                </li>
              </ul>
            </div>
            
            <!-- Categories -->
            <div v-if="categorySuggestions.length > 0" class="px-4 py-2 border-t border-primary-100">
              <h4 class="text-sm font-medium text-primary-700 mb-2">Categories</h4>
              <ul class="space-y-1">
                <li v-for="category in categorySuggestions" :key="category">
                  <RouterLink
                    :to="`/shop/${category.toLowerCase()}`"
                    @click="selectSuggestion(category)"
                    class="flex items-center space-x-3 w-full px-2 py-2 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                  >
                    <TagIcon class="w-4 h-4 text-primary-400" />
                    <span class="text-primary-700">{{ category }}</span>
                  </RouterLink>
                </li>
              </ul>
            </div>
            
            <!-- View All Results -->
            <div class="px-4 py-2 border-t border-primary-100">
              <RouterLink
                :to="`/search?q=${encodeURIComponent(query)}`"
                @click="selectSuggestion(query)"
                class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-primary-700 hover:text-primary-900 transition-colors duration-200"
              >
                View all results for "{{ query }}"
                <ArrowRightIcon class="ml-2 w-4 h-4" />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  TrendingUpIcon,
  TagIcon,
  ArrowRightIcon
} from '@heroicons/vue/24/outline'

// Props
defineProps({
  placeholder: {
    type: String,
    default: 'Search products...'
  },
  autofocus: {
    type: Boolean,
    default: false
  }
})

// Emits
defineEmits(['search', 'focus', 'blur'])

// Router
const router = useRouter()

// Reactive state
const query = ref('')
const showSuggestions = ref(false)
const selectedIndex = ref(-1)
const isLoading = ref(false)

// Mock data - in a real app, this would come from an API
const popularSearches = ref([
  'dresses',
  'sneakers',
  'handbags',
  'jewelry',
  'winter coats'
])

const mockProducts = ref([
  { id: 1, name: 'Minimalist Tote Bag', price: 89.99, image: '/images/products/tote-bag.jpg' },
  { id: 2, name: 'Organic Cotton T-Shirt', price: 29.99, image: '/images/products/t-shirt.jpg' },
  { id: 3, name: 'Wool Blend Sweater', price: 79.99, image: '/images/products/sweater.jpg' }
])

const mockCategories = ref([
  'Clothing',
  'Accessories',
  'Shoes',
  'Bags',
  'Jewelry'
])

// Computed
const suggestions = computed(() => {
  if (query.value.length === 0) {
    return popularSearches.value
  }
  
  const combined = [
    ...productSuggestions.value,
    ...categorySuggestions.value
  ]
  
  return combined
})

const productSuggestions = computed(() => {
  if (query.value.length < 2) return []
  
  return mockProducts.value.filter(product =>
    product.name.toLowerCase().includes(query.value.toLowerCase())
  ).slice(0, 3)
})

const categorySuggestions = computed(() => {
  if (query.value.length < 2) return []
  
  return mockCategories.value.filter(category =>
    category.toLowerCase().includes(query.value.toLowerCase())
  ).slice(0, 2)
})

// Methods
const handleInput = () => {
  selectedIndex.value = -1
  showSuggestions.value = true
  
  // In a real app, you might debounce this API call
  // debouncedSearch(query.value)
}

const handleFocus = () => {
  showSuggestions.value = true
}

const handleBlur = () => {
  // Delay hiding suggestions to allow for clicks
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}

const handleSubmit = () => {
  if (selectedIndex.value >= 0) {
    const suggestion = suggestions.value[selectedIndex.value]
    selectSuggestion(typeof suggestion === 'string' ? suggestion : suggestion.name)
  } else if (query.value.trim()) {
    performSearch(query.value.trim())
  }
}

const selectSuggestion = (suggestion) => {
  query.value = suggestion
  showSuggestions.value = false
  performSearch(suggestion)
}

const performSearch = (searchQuery) => {
  if (searchQuery.trim()) {
    router.push({
      name: 'search-results',
      query: { q: searchQuery }
    })
  }
}

const clearSearch = () => {
  query.value = ''
  selectedIndex.value = -1
  showSuggestions.value = false
}

const navigateUp = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--
  }
}

const navigateDown = () => {
  if (selectedIndex.value < suggestions.value.length - 1) {
    selectedIndex.value++
  }
}

// Close suggestions when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.search-container')) {
    showSuggestions.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Search suggestions animation */
.suggestions-enter-active,
.suggestions-leave-active {
  transition: all 0.2s ease;
  transform-origin: top;
}

.suggestions-enter-from,
.suggestions-leave-to {
  opacity: 0;
  transform: scaleY(0.95) translateY(-10px);
}

.suggestions-enter-to,
.suggestions-leave-from {
  opacity: 1;
  transform: scaleY(1) translateY(0);
}
</style>
