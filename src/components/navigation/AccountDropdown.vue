<template>
  <Transition name="dropdown">
    <div 
      v-if="isVisible"
      class="account-menu absolute right-0 top-full mt-2 w-64 bg-white border border-primary-100 rounded-lg shadow-lg z-50"
    >
      <!-- Authenticated User Menu -->
      <div v-if="userStore.isAuthenticated" class="p-4">
        <!-- User Info -->
        <div class="flex items-center space-x-3 pb-4 border-b border-primary-100">
          <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <img 
              v-if="userStore.user?.avatar" 
              :src="userStore.user.avatar" 
              :alt="userStore.fullName"
              class="w-full h-full rounded-full object-cover"
            />
            <UserIcon v-else class="w-6 h-6 text-primary-600" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-primary-900 truncate">{{ userStore.fullName }}</p>
            <p class="text-sm text-primary-600 truncate">{{ userStore.user?.email }}</p>
          </div>
        </div>
        
        <!-- Menu Items -->
        <nav class="mt-4">
          <ul class="space-y-1">
            <li v-for="item in authenticatedMenuItems" :key="item.name">
              <RouterLink
                :to="item.href"
                class="flex items-center space-x-3 px-3 py-2 rounded-lg text-primary-700 hover:bg-primary-50 hover:text-primary-900 transition-colors duration-200"
                @click="$emit('close')"
              >
                <component :is="item.icon" class="w-5 h-5" />
                <span>{{ item.name }}</span>
                <span v-if="item.badge" class="ml-auto text-xs bg-accent-red text-white px-2 py-1 rounded-full">
                  {{ item.badge }}
                </span>
              </RouterLink>
            </li>
          </ul>
        </nav>
        
        <!-- Logout -->
        <div class="mt-4 pt-4 border-t border-primary-100">
          <button
            @click="handleLogout"
            class="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-primary-700 hover:bg-primary-50 hover:text-primary-900 transition-colors duration-200"
          >
            <ArrowRightOnRectangleIcon class="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
      
      <!-- Guest Menu -->
      <div v-else class="p-4">
        <div class="space-y-3">
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
        
        <div class="mt-4 pt-4 border-t border-primary-100">
          <nav>
            <ul class="space-y-1">
              <li v-for="item in guestMenuItems" :key="item.name">
                <RouterLink
                  :to="item.href"
                  class="flex items-center space-x-3 px-3 py-2 rounded-lg text-primary-700 hover:bg-primary-50 hover:text-primary-900 transition-colors duration-200"
                  @click="$emit('close')"
                >
                  <component :is="item.icon" class="w-5 h-5" />
                  <span>{{ item.name }}</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import {
  UserIcon,
  ShoppingBagIcon,
  HeartIcon,
  MapPinIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
  TruckIcon
} from '@heroicons/vue/24/outline'
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'

// Props
defineProps({
  isVisible: {
    type: Boolean,
    default: true
  }
})

// Emits
defineEmits(['close'])

// Stores
const userStore = useUserStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

// Menu items for authenticated users
const authenticatedMenuItems = computed(() => [
  {
    name: 'My Account',
    href: '/account',
    icon: UserIcon
  },
  {
    name: 'Order History',
    href: '/account/orders',
    icon: ShoppingBagIcon,
    badge: userStore.orders?.filter(o => o.status === 'processing').length || null
  },
  {
    name: 'Order Tracking',
    href: '/order-tracking',
    icon: TruckIcon
  },
  {
    name: 'Wishlist',
    href: '/wishlist',
    icon: HeartIcon,
    badge: wishlistStore.itemCount > 0 ? wishlistStore.itemCount : null
  },
  {
    name: 'Addresses',
    href: '/account/addresses',
    icon: MapPinIcon
  },
  {
    name: 'Settings',
    href: '/account/settings',
    icon: CogIcon
  }
])

// Menu items for guest users
const guestMenuItems = [
  {
    name: 'Order Tracking',
    href: '/order-tracking',
    icon: TruckIcon
  },
  {
    name: 'Help Center',
    href: '/help',
    icon: QuestionMarkCircleIcon
  }
]

// Methods
const handleLogout = () => {
  userStore.logout()
  // Close dropdown
  $emit('close')
}
</script>

<style scoped>
/* Dropdown transitions */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
  transform-origin: top right;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}
</style>
