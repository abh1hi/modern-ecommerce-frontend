<template>
  <div class="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
    <div class="text-center">
      <!-- Spinner -->
      <div class="relative">
        <div class="w-12 h-12 border-4 border-primary-200 rounded-full animate-spin">
          <div class="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-primary-600 rounded-full animate-spin"></div>
        </div>
      </div>
      
      <!-- Loading text -->
      <p class="mt-4 text-sm font-medium text-primary-700">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup>
// Props
defineProps({
  message: {
    type: String,
    default: 'Loading...'
  }
})
</script>
