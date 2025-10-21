<template>
  <section class="py-16 lg:py-24 bg-primary-900">
    <div class="container-custom">
      <div class="max-w-2xl mx-auto text-center">
        <!-- Header -->
        <h2 class="text-3xl font-display font-bold text-white sm:text-4xl">
          Stay Updated
        </h2>
        <p class="mt-4 text-lg text-primary-200">
          Be the first to know about new arrivals, exclusive offers, and styling tips from our minimalist experts
        </p>
        
        <!-- Newsletter Form -->
        <form @submit.prevent="handleSubmit" class="mt-8">
          <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div class="flex-1">
              <label for="email" class="sr-only">Email address</label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder="Enter your email"
                class="w-full px-4 py-3 text-base border border-primary-700 bg-primary-800 text-white placeholder-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200"
                :disabled="isSubmitting"
              />
            </div>
            <button
              type="submit"
              :disabled="isSubmitting || !isValidEmail"
              class="px-6 py-3 bg-white text-primary-900 font-medium rounded-lg hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isSubmitting">Subscribe</span>
              <div v-else class="flex items-center space-x-2">
                <div class="w-4 h-4 border-2 border-primary-900 border-t-transparent rounded-full animate-spin"></div>
                <span>Subscribing...</span>
              </div>
            </button>
          </div>
        </form>
        
        <!-- Success Message -->
        <Transition name="fade">
          <div v-if="isSubscribed" class="mt-4 p-4 bg-green-800 bg-opacity-20 border border-green-600 rounded-lg">
            <div class="flex items-center justify-center space-x-2">
              <CheckCircleIcon class="w-5 h-5 text-green-400" />
              <span class="text-green-200 font-medium">Thank you for subscribing!</span>
            </div>
          </div>
        </Transition>
        
        <!-- Privacy Note -->
        <p class="mt-4 text-sm text-primary-300">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CheckCircleIcon } from '@heroicons/vue/24/outline'

// Reactive state
const email = ref('')
const isSubmitting = ref(false)
const isSubscribed = ref(false)

// Computed
const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.value)
})

// Methods
const handleSubmit = async () => {
  if (!isValidEmail.value || isSubmitting.value) return
  
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Show success message
    isSubscribed.value = true
    email.value = ''
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      isSubscribed.value = false
    }, 5000)
    
    console.log('Newsletter subscription successful')
    
  } catch (error) {
    console.error('Newsletter subscription failed:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
