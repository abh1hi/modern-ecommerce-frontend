<template>
  <div id="app" class="min-h-screen bg-white">
    <!-- Utility Bar -->
    <UtilityBar v-if="showUtilityBar" />
    
    <!-- Main Navigation -->
    <MainNavigation :sticky="isNavSticky" />
    
    <!-- Mobile Navigation -->
    <MobileNavigation v-if="isMobile" />
    
    <!-- Main Content -->
    <main class="relative">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    
    <!-- Footer -->
    <AppFooter />
    
    <!-- Mobile Bottom Navigation -->
    <BottomNavigation v-if="isMobile" />
    
    <!-- Cart Sidebar -->
    <CartSidebar />
    
    <!-- Search Modal -->
    <SearchModal />
    
    <!-- Loading Overlay -->
    <LoadingOverlay v-if="isLoading" />
    
    <!-- Notification Toast -->
    <NotificationToast />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { RouterView } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useUserStore } from '@/stores/user'

// Components
import UtilityBar from '@/components/navigation/UtilityBar.vue'
import MainNavigation from '@/components/navigation/MainNavigation.vue'
import MobileNavigation from '@/components/navigation/MobileNavigation.vue'
import BottomNavigation from '@/components/navigation/BottomNavigation.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import CartSidebar from '@/components/cart/CartSidebar.vue'
import SearchModal from '@/components/search/SearchModal.vue'
import LoadingOverlay from '@/components/ui/LoadingOverlay.vue'
import NotificationToast from '@/components/ui/NotificationToast.vue'

// Stores
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const userStore = useUserStore()

// Reactive state
const isNavSticky = ref(false)
const isMobile = ref(false)
const isLoading = ref(false)
const showUtilityBar = ref(true)
const scrollY = ref(0)

// Computed
const shouldShowUtilityBar = computed(() => {
  return showUtilityBar.value && scrollY.value < 100
})

// Methods
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

const handleScroll = () => {
  scrollY.value = window.scrollY
  isNavSticky.value = scrollY.value > 100
}

const handleResize = () => {
  checkMobile()
}

// Lifecycle
onMounted(() => {
  // Check initial state
  checkMobile()
  
  // Add event listeners
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize)
  
  // Load persisted data
  cartStore.loadFromStorage()
  wishlistStore.loadFromStorage()
  userStore.loadFromStorage()
  
  // Save data on page unload
  window.addEventListener('beforeunload', () => {
    cartStore.saveToStorage()
    wishlistStore.saveToStorage()
    userStore.saveToStorage()
  })
  
  // Auto-save data periodically
  setInterval(() => {
    cartStore.saveToStorage()
    wishlistStore.saveToStorage()
    userStore.saveToStorage()
  }, 30000) // Save every 30 seconds
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Page transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Smooth scrolling for the entire app */
#app {
  scroll-behavior: smooth;
}

/* Prevent layout shift during navigation changes */
main {
  min-height: calc(100vh - 200px);
}
</style>
