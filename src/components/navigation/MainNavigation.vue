<template>
  <nav 
    class="bg-white border-b border-primary-100 transition-all duration-300"
    :class="{
      'sticky top-0 z-40 shadow-nav': sticky,
      'relative': !sticky
    }"
  >
    <div class="container-custom">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <RouterLink 
            to="/" 
            class="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg p-2"
          >
            <div class="w-8 h-8 bg-primary-900 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">M</span>
            </div>
            <span class="font-display font-bold text-xl text-primary-900">Modern</span>
          </RouterLink>
        </div>
        
        <!-- Desktop Navigation Menu -->
        <div class="hidden lg:flex lg:items-center lg:space-x-8">
          <div 
            v-for="category in navigationCategories" 
            :key="category.name"
            class="relative group"
            @mouseenter="showMegaMenu = category.name"
            @mouseleave="hideMegaMenu"
          >
            <RouterLink 
              :to="category.href" 
              class="nav-link px-3 py-2 rounded-lg"
              :class="{
                'nav-link-active': $route.path.startsWith(category.href)
              }"
            >
              {{ category.name }}
            </RouterLink>
            
            <!-- Mega Menu -->
            <MegaMenu 
              v-if="category.megaMenu && showMegaMenu === category.name"
              :category="category"
              class="absolute top-full left-0 mt-1"
            />
          </div>
        </div>
        
        <!-- Search Bar -->
        <div class="hidden lg:flex lg:flex-1 lg:max-w-md lg:mx-8">
          <SearchBar />
        </div>
        
        <!-- Right Side Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search Icon (Mobile) -->
          <button 
            @click="$emit('openSearch')"
            class="lg:hidden p-2 rounded-lg hover:bg-primary-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <MagnifyingGlassIcon class="w-6 h-6 text-primary-600" />
          </button>
          
          <!-- Account -->
          <div class="relative">
            <button 
              @click="toggleAccountMenu"
              class="flex items-center space-x-2 p-2 rounded-lg hover:bg-primary-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <UserIcon class="w-6 h-6 text-primary-600" />
              <span class="hidden md:inline text-sm font-medium text-primary-700">
                {{ userStore.isAuthenticated ? userStore.fullName : 'Account' }}
              </span>
            </button>
            
            <!-- Account Dropdown -->
            <AccountDropdown 
              v-if="showAccountMenu"
              @close="showAccountMenu = false"
              class="absolute right-0 top-full mt-2"
            />
          </div>
          
          <!-- Wishlist -->
          <RouterLink 
            to="/wishlist"
            class="relative p-2 rounded-lg hover:bg-primary-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <HeartIcon class="w-6 h-6 text-primary-600" />
            <span 
              v-if="wishlistStore.itemCount > 0"
              class="absolute -top-1 -right-1 w-5 h-5 bg-accent-red text-white text-xs font-medium rounded-full flex items-center justify-center"
            >
              {{ wishlistStore.itemCount }}
            </span>
          </RouterLink>
          
          <!-- Shopping Cart -->
          <button 
            @click="$emit('openCart')"
            class="relative p-2 rounded-lg hover:bg-primary-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <ShoppingBagIcon class="w-6 h-6 text-primary-600" />
            <span 
              v-if="cartStore.itemCount > 0"
              class="absolute -top-1 -right-1 w-5 h-5 bg-accent-red text-white text-xs font-medium rounded-full flex items-center justify-center"
            >
              {{ cartStore.itemCount }}
            </span>
          </button>
          
          <!-- Mobile Menu Toggle -->
          <button 
            @click="$emit('toggleMobileMenu')"
            class="lg:hidden p-2 rounded-lg hover:bg-primary-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <Bars3Icon class="w-6 h-6 text-primary-600" />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import {
  MagnifyingGlassIcon,
  UserIcon,
  HeartIcon,
  ShoppingBagIcon,
  Bars3Icon
} from '@heroicons/vue/24/outline'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useUserStore } from '@/stores/user'

// Components
import SearchBar from '@/components/search/SearchBar.vue'
import MegaMenu from '@/components/navigation/MegaMenu.vue'
import AccountDropdown from '@/components/navigation/AccountDropdown.vue'

// Props
defineProps({
  sticky: {
    type: Boolean,
    default: false
  }
})

// Emits
defineEmits(['openSearch', 'openCart', 'toggleMobileMenu'])

// Stores
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const userStore = useUserStore()

// Reactive state
const showMegaMenu = ref(null)
const showAccountMenu = ref(false)
let megaMenuTimer = null

// Navigation data
const navigationCategories = ref([
  {
    name: 'Shop',
    href: '/shop',
    megaMenu: {
      featured: {
        title: 'Featured Collections',
        items: [
          { name: 'New Arrivals', href: '/shop/new-arrivals', image: '/images/collections/new-arrivals.jpg' },
          { name: 'Best Sellers', href: '/shop/best-sellers', image: '/images/collections/best-sellers.jpg' }
        ]
      },
      categories: [
        {
          name: 'Clothing',
          items: [
            { name: 'T-Shirts & Tops', href: '/shop/clothing/tops' },
            { name: 'Dresses', href: '/shop/clothing/dresses' },
            { name: 'Pants & Jeans', href: '/shop/clothing/pants' },
            { name: 'Outerwear', href: '/shop/clothing/outerwear' }
          ]
        },
        {
          name: 'Accessories',
          items: [
            { name: 'Bags & Purses', href: '/shop/accessories/bags' },
            { name: 'Jewelry', href: '/shop/accessories/jewelry' },
            { name: 'Scarves', href: '/shop/accessories/scarves' },
            { name: 'Belts', href: '/shop/accessories/belts' }
          ]
        },
        {
          name: 'Shoes',
          items: [
            { name: 'Sneakers', href: '/shop/shoes/sneakers' },
            { name: 'Boots', href: '/shop/shoes/boots' },
            { name: 'Heels', href: '/shop/shoes/heels' },
            { name: 'Sandals', href: '/shop/shoes/sandals' }
          ]
        }
      ]
    }
  },
  {
    name: 'Collections',
    href: '/collections'
  },
  {
    name: 'About',
    href: '/about'
  },
  {
    name: 'Contact',
    href: '/contact'
  }
])

// Methods
const hideMegaMenu = () => {
  megaMenuTimer = setTimeout(() => {
    showMegaMenu.value = null
  }, 300) // 300ms delay
}

const toggleAccountMenu = () => {
  showAccountMenu.value = !showAccountMenu.value
}

// Close menus when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.account-menu')) {
    showAccountMenu.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  if (megaMenuTimer) {
    clearTimeout(megaMenuTimer)
  }
})
</script>
