<template>
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-primary-100 z-30 md:hidden">
    <nav class="flex items-center justify-around py-2">
      <RouterLink
        v-for="item in navigationItems"
        :key="item.name"
        :to="item.href"
        class="flex flex-col items-center justify-center min-h-[60px] px-3 py-2 transition-colors duration-200"
        :class="{
          'text-primary-900': $route.path === item.href || ($route.path.startsWith(item.href) && item.href !== '/'),
          'text-primary-500': !($route.path === item.href || ($route.path.startsWith(item.href) && item.href !== '/'))
        }"
      >
        <div class="relative">
          <component :is="item.icon" class="w-6 h-6" />
          <span 
            v-if="item.badge && item.badge > 0"
            class="absolute -top-2 -right-2 w-5 h-5 bg-accent-red text-white text-xs font-medium rounded-full flex items-center justify-center"
          >
            {{ item.badge > 9 ? '9+' : item.badge }}
          </span>
        </div>
        <span class="text-xs font-medium mt-1">{{ item.name }}</span>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import {
  HomeIcon,
  Squares2X2Icon,
  HeartIcon,
  ShoppingBagIcon,
  UserIcon
} from '@heroicons/vue/24/outline'
import {
  HomeIcon as HomeIconSolid,
  Squares2X2Icon as Squares2X2IconSolid,
  HeartIcon as HeartIconSolid,
  ShoppingBagIcon as ShoppingBagIconSolid,
  UserIcon as UserIconSolid
} from '@heroicons/vue/24/solid'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'

// Stores
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

// Navigation items
const navigationItems = computed(() => [
  {
    name: 'Home',
    href: '/',
    icon: HomeIcon,
    activeIcon: HomeIconSolid
  },
  {
    name: 'Shop',
    href: '/shop',
    icon: Squares2X2Icon,
    activeIcon: Squares2X2IconSolid
  },
  {
    name: 'Wishlist',
    href: '/wishlist',
    icon: HeartIcon,
    activeIcon: HeartIconSolid,
    badge: wishlistStore.itemCount
  },
  {
    name: 'Cart',
    href: '/cart',
    icon: ShoppingBagIcon,
    activeIcon: ShoppingBagIconSolid,
    badge: cartStore.itemCount
  },
  {
    name: 'Account',
    href: '/account',
    icon: UserIcon,
    activeIcon: UserIconSolid
  }
])
</script>

<style scoped>
/* Add padding to body when bottom navigation is present */
:global(body) {
  padding-bottom: 80px;
}

@media (min-width: 768px) {
  :global(body) {
    padding-bottom: 0;
  }
}
</style>
