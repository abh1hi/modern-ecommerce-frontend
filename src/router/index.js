import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

// Lightweight inline placeholders so missing files don't break dev server
const Placeholder = (name) => ({
  name: `${name.replace(/\s+/g, '')}Page`,
  template: `<div class=\"max-w-3xl mx-auto p-8\"><h1 class=\"text-2xl font-bold\">${name}</h1><p class=\"mt-4 text-gray-600\">This is a placeholder page using mock data. Replace it later.</p></div>`
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage, meta: { title: 'Home' } },
    { path: '/shop', name: 'shop', component: Placeholder('Shop'), meta: { title: 'Shop' } },
    { path: '/shop/:category', name: 'shop-category', component: Placeholder('Shop'), meta: { title: 'Shop' } },
    { path: '/product/:id', name: 'product-detail', component: Placeholder('Product Detail'), meta: { title: 'Product Detail' } },
    { path: '/cart', name: 'cart', component: Placeholder('Cart'), meta: { title: 'Shopping Cart' } },
    { path: '/checkout', name: 'checkout', component: Placeholder('Checkout'), meta: { title: 'Checkout' } },
    { path: '/wishlist', name: 'wishlist', component: Placeholder('Wishlist'), meta: { title: 'Wishlist' } },
    { path: '/account', name: 'account', component: Placeholder('My Account'), meta: { title: 'My Account' } },
    { path: '/order-tracking', name: 'order-tracking', component: Placeholder('Order Tracking'), meta: { title: 'Order Tracking' } },
    { path: '/search', name: 'search-results', component: Placeholder('Search Results'), meta: { title: 'Search Results' } },
    { path: '/contact', name: 'contact', component: Placeholder('Contact Us'), meta: { title: 'Contact Us' } },
    { path: '/about', name: 'about', component: Placeholder('About Us'), meta: { title: 'About Us' } },
    { path: '/faq', name: 'faq', component: Placeholder('FAQ'), meta: { title: 'FAQ' } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: Placeholder('404 - Page Not Found'), meta: { title: '404 - Page Not Found' } }
  ],
  scrollBehavior() { return { top: 0 } }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | Modern E-Commerce` : 'Modern E-Commerce'
  next()
})

export default router
