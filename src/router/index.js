import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ShopPage from '@/views/ShopPage.vue'
import ProductDetailPage from '@/views/ProductDetailPage.vue'
import CartPage from '@/views/CartPage.vue'
import CheckoutPage from '@/views/CheckoutPage.vue'
import WishlistPage from '@/views/WishlistPage.vue'
import AccountPage from '@/views/AccountPage.vue'
import OrderTrackingPage from '@/views/OrderTrackingPage.vue'
import SearchResultsPage from '@/views/SearchResultsPage.vue'
import ContactPage from '@/views/ContactPage.vue'
import AboutPage from '@/views/AboutPage.vue'
import FAQPage from '@/views/FAQPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { title: 'Home' }
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopPage,
      meta: { title: 'Shop' }
    },
    {
      path: '/shop/:category',
      name: 'shop-category',
      component: ShopPage,
      meta: { title: 'Shop' }
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetailPage,
      meta: { title: 'Product Detail' }
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage,
      meta: { title: 'Shopping Cart' }
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutPage,
      meta: { title: 'Checkout' }
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: WishlistPage,
      meta: { title: 'Wishlist' }
    },
    {
      path: '/account',
      name: 'account',
      component: AccountPage,
      meta: { title: 'My Account' }
    },
    {
      path: '/order-tracking',
      name: 'order-tracking',
      component: OrderTrackingPage,
      meta: { title: 'Order Tracking' }
    },
    {
      path: '/search',
      name: 'search-results',
      component: SearchResultsPage,
      meta: { title: 'Search Results' }
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage,
      meta: { title: 'Contact Us' }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
      meta: { title: 'About Us' }
    },
    {
      path: '/faq',
      name: 'faq',
      component: FAQPage,
      meta: { title: 'FAQ' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundPage.vue'),
      meta: { title: '404 - Page Not Found' }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Update page title based on route
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | Modern E-Commerce` : 'Modern E-Commerce'
  next()
})

export default router
