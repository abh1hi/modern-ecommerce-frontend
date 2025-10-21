<template>
  <!-- Toast Container -->
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="max-w-sm bg-white border border-primary-200 rounded-lg shadow-lg overflow-hidden"
        :class="{
          'border-green-200 bg-green-50': toast.type === 'success',
          'border-red-200 bg-red-50': toast.type === 'error',
          'border-yellow-200 bg-yellow-50': toast.type === 'warning',
          'border-blue-200 bg-blue-50': toast.type === 'info'
        }"
      >
        <div class="flex items-center p-4">
          <!-- Icon -->
          <div class="flex-shrink-0">
            <CheckCircleIcon v-if="toast.type === 'success'" class="w-5 h-5 text-green-600" />
            <XCircleIcon v-else-if="toast.type === 'error'" class="w-5 h-5 text-red-600" />
            <ExclamationTriangleIcon v-else-if="toast.type === 'warning'" class="w-5 h-5 text-yellow-600" />
            <InformationCircleIcon v-else class="w-5 h-5 text-blue-600" />
          </div>
          
          <!-- Content -->
          <div class="ml-3 flex-1">
            <p class="text-sm font-medium" :class="{
              'text-green-900': toast.type === 'success',
              'text-red-900': toast.type === 'error',
              'text-yellow-900': toast.type === 'warning',
              'text-blue-900': toast.type === 'info'
            }">
              {{ toast.title }}
            </p>
            <p v-if="toast.message" class="mt-1 text-sm" :class="{
              'text-green-700': toast.type === 'success',
              'text-red-700': toast.type === 'error',
              'text-yellow-700': toast.type === 'warning',
              'text-blue-700': toast.type === 'info'
            }">
              {{ toast.message }}
            </p>
          </div>
          
          <!-- Close Button -->
          <button
            @click="removeToast(toast.id)"
            class="ml-4 flex-shrink-0 p-1 rounded-lg hover:bg-white hover:bg-opacity-50 transition-colors duration-200"
          >
            <XMarkIcon class="w-4 h-4" :class="{
              'text-green-600': toast.type === 'success',
              'text-red-600': toast.type === 'error',
              'text-yellow-600': toast.type === 'warning',
              'text-blue-600': toast.type === 'info'
            }" />
          </button>
        </div>
        
        <!-- Progress bar -->
        <div 
          v-if="toast.duration"
          class="h-1 w-full bg-white bg-opacity-30"
        >
          <div 
            class="h-full transition-all duration-100 ease-linear"
            :class="{
              'bg-green-600': toast.type === 'success',
              'bg-red-600': toast.type === 'error',
              'bg-yellow-600': toast.type === 'warning',
              'bg-blue-600': toast.type === 'info'
            }"
            :style="{ width: `${(toast.remainingTime / toast.duration) * 100}%` }"
          >
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

// Reactive state
const toasts = ref([])
let toastId = 0

// Methods
const addToast = (toast) => {
  const id = ++toastId
  const duration = toast.duration || 5000
  
  const newToast = {
    id,
    type: toast.type || 'info',
    title: toast.title,
    message: toast.message,
    duration,
    remainingTime: duration
  }
  
  toasts.value.push(newToast)
  
  // Auto remove toast
  if (duration > 0) {
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, duration - elapsed)
      
      const toastIndex = toasts.value.findIndex(t => t.id === id)
      if (toastIndex > -1) {
        toasts.value[toastIndex].remainingTime = remaining
        
        if (remaining <= 0) {
          removeToast(id)
          clearInterval(timer)
        }
      } else {
        clearInterval(timer)
      }
    }, 100)
  }
}

const removeToast = (id) => {
  const index = toasts.value.findIndex(toast => toast.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

const showSuccess = (title, message = '', duration = 5000) => {
  addToast({ type: 'success', title, message, duration })
}

const showError = (title, message = '', duration = 8000) => {
  addToast({ type: 'error', title, message, duration })
}

const showWarning = (title, message = '', duration = 6000) => {
  addToast({ type: 'warning', title, message, duration })
}

const showInfo = (title, message = '', duration = 5000) => {
  addToast({ type: 'info', title, message, duration })
}

// Global toast system
const setupGlobalToast = () => {
  // Add methods to global Vue app instance if needed
  // This allows other components to trigger toasts
  if (typeof window !== 'undefined') {
    window.$toast = {
      success: showSuccess,
      error: showError,
      warning: showWarning,
      info: showInfo
    }
  }
}

// Lifecycle
onMounted(() => {
  setupGlobalToast()
})

// Expose methods for other components
defineExpose({
  addToast,
  removeToast,
  showSuccess,
  showError,
  showWarning,
  showInfo
})
</script>

<style scoped>
/* Toast transitions */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
