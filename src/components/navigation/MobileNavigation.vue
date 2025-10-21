<template>
  <!-- Mobile Navigation Overlay -->
  <Teleport to="body">
    <Transition name="mobile-nav">
      <div 
        v-if="isOpen"
        class="fixed inset-0 z-50 lg:hidden"
        @click="$emit('close')"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black bg-opacity-50" />
        
        <!-- Navigation Panel -->
        <div 
          class="fixed inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl"
          @click.stop
        >
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-primary-100">
            <RouterLink to="/" class="flex items-center space-x-2" @click="$emit('close')">
              <div class="w-8 h-8 bg-primary-900 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">M</span>
              </div>
              <span class="font-display font-bold text-xl text-primary-900">Modern</span>
            </RouterLink>
            <button 
              @click="$emit('close')"
              class="p-2 rounded-lg hover:bg-primary-50 transition-colors duration-200"
            >
              <XMarkIcon class="w-6 h-6 text-primary-600" />
            </button>
          </div>
          
          <!-- Search Bar -->
          <div class="px-6 py-4 border-b border-primary-100">
            <SearchBar @search="handleSearch" />
          </div>
          
          <!-- Navigation Menu -->
          <nav class="px-6 py-4 max-h-[60vh] overflow-y-auto">
            <ul class="space-y-2">
              <!-- User Account Section -->
              <li v-if="!userStore.isAuthenticated" class="pb-4 border-b border-primary-100 mb-4">
                <div class="space-y-2">
                  <RouterLink 
                    to="/account/login" 
                    class="block w-full btn btn-primary text-center"
                    @click="$emit('close')"
                  >
                    Sign In
                  </RouterLink>
                  <RouterLink 
                    to="/account/register" 
                    class="block w-full btn btn-secondary text-center"
                    @click="$emit('close')"
                  >
                    Create Account
                  </RouterLink>
                </div>
              </li>
              
              <li v-else class="pb-4 border-b border-primary-100 mb-4">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <UserIcon class="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p class="font-medium text-primary-900">{{ userStore.fullName }}</p>
                    <p class="text-sm text-primary-600">{{ userStore.user?.email }}</p>
                  </div>
                </div>
              </li>
              
              <!-- Main Navigation Links -->
              <li v-for="item in navigationItems" :key="item.name">
                <div v-if="item.children" class="space-y-2">
                  <button 
                    @click="toggleSubmenu(item.name)"
                    class="flex items-center justify-between w-full py-3 text-left font-medium text-primary-900 hover:text-primary-700 transition-colors duration-200"
                  >
                    <div class="flex items-center space-x-3">
                      <component :is="item.icon" class="w-5 h-5" />
                      <span>{{ item.name }}</span>
                    </div>
                    <ChevronRightIcon 
                      class="w-4 h-4 transition-transform duration-200"
                      :class="{ 'rotate-90': openSubmenus.includes(item.name) }"
                    />
                  </button>
                  
                  <Transition name="submenu">
                    <ul v-if="openSubmenus.includes(item.name)" class="ml-8 space-y-2">
                      <li v-for="child in item.children" :key="child.name">
                        <RouterLink 
                          :to="child.href" 
                          class="block py-2 text-primary-600 hover:text-primary-900 transition-colors duration-200"
                          @click="$emit('close')"
                        >
                          {{ child.name }}
                        </RouterLink>
                      </li>
                    </ul>
                  </Transition>
                </div>
                
                <RouterLink 
                  v-else
                  :to="item.href" 
                  class="flex items-center space-x-3 py-3 font-medium text-primary-900 hover:text-primary-700 transition-colors duration-200"
                  @click="$emit('close')"
                >
                  <component :is="item.icon" class="w-5 h-5" />
                  <span>{{ item.name }}</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
          
          <!-- Footer Links -->
          <div class="px-6 py-4 border-t border-primary-100 mt-auto">
            <div class="space-y-3">
              <RouterLink 
                to="/help" 
                class="flex items-center space-x-3 text-primary-600 hover:text-primary-900 transition-colors duration-200"
                @click="$emit('close')"
              >
                <QuestionMarkCircleIcon class="w-5 h-5" />
                <span>Help Center</span>
              </RouterLink>
              
              <RouterLink 
                to="/contact" 
                class="flex items-center space-x-3 text-primary-600 hover:text-primary-900 transition-colors duration-200"
                @click="$emit('close')"
              >
                <PhoneIcon class="w-5 h-5" />
                <span>Contact Us</span>
              </RouterLink>
              
              <button 
                v-if="userStore.isAuthenticated"
                @click="handleLogout"
                class="flex items-center space-x-3 text-primary-600 hover:text-primary-900 transition-colors duration-200"
              >
                <ArrowRightOnRectangleIcon class="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  XMarkIcon,
  UserIcon,
  ChevronRightIcon,
  HomeIcon,
  ShoppingBagIcon,
  HeartIcon,
  UserCircleIcon,
  QuestionMarkCircleIcon,
  PhoneIcon,
  ArrowRightOnRectangleIcon,
  TagIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/outline'
import { useUserStore } from '@/stores/user'
import SearchBar from '@/components/search/SearchBar.vue'

// Props
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

// Emits
defineEmits(['close'])

// Store
const userStore = useUserStore()

// Reactive state
const openSubmenus = ref([])

// Navigation items
const navigationItems = ref([
  {
    name: 'Home',
    href: '/',
    icon: HomeIcon
  },
  {
    name: 'Shop',
    href: '/shop',
    icon: ShoppingBagIcon,
    children: [
      { name: 'All Products', href: '/shop' },
      { name: 'New Arrivals', href: '/shop/new-arrivals' },
      { name: 'Best Sellers', href: '/shop/best-sellers' },
      { name: 'Sale', href: '/shop/sale' },
      { name: 'Clothing', href: '/shop/clothing' },
      { name: 'Accessories', href: '/shop/accessories' },
      { name: 'Shoes', href: '/shop/shoes' }
    ]
  },
  {
    name: 'Collections',
    href: '/collections',
    icon: TagIcon
  },
  {
    name: 'Wishlist',
    href: '/wishlist',
    icon: HeartIcon
  },
  {
    name: 'My Account',
    href: '/account',
    icon: UserCircleIcon,
    children: userStore.isAuthenticated ? [
      { name: 'Profile', href: '/account/profile' },
      { name: 'Orders', href: '/account/orders' },
      { name: 'Addresses', href: '/account/addresses' },
      { name: 'Settings', href: '/account/settings' }
    ] : []
  },
  {
    name: 'About',
    href: '/about',
    icon: InformationCircleIcon
  }
])

// Methods
const toggleSubmenu = (itemName) => {
  const index = openSubmenus.value.indexOf(itemName)
  if (index > -1) {
    openSubmenus.value.splice(index, 1)
  } else {
    openSubmenus.value.push(itemName)
  }
}

const handleSearch = (query) => {
  // Emit search event to parent or navigate to search results
  if (query.trim()) {
    // Navigate to search results
    // This would typically be handled by the router
    console.log('Searching for:', query)
  }
}

const handleLogout = () => {
  userStore.logout()
  // Close mobile menu
  $emit('close')
}
</script>

<style scoped>
/* Mobile navigation transitions */
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: opacity 0.3s ease;
}

.mobile-nav-enter-active .mobile-nav-panel,
.mobile-nav-leave-active .mobile-nav-panel {
  transition: transform 0.3s ease;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
  opacity: 0;
}

.mobile-nav-enter-from .mobile-nav-panel,
.mobile-nav-leave-to .mobile-nav-panel {
  transform: translateX(-100%);
}

/* Submenu transitions */
.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  max-height: 0;
}

.submenu-enter-to,
.submenu-leave-from {
  opacity: 1;
  max-height: 200px;
}
</style>
