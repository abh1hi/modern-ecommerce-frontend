import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)
  const addresses = ref([])
  const orders = ref([])
  
  // Getters
  const fullName = computed(() => {
    return user.value ? `${user.value.firstName} ${user.value.lastName}` : ''
  })
  
  const defaultAddress = computed(() => {
    return addresses.value.find(addr => addr.isDefault) || addresses.value[0] || null
  })
  
  // Actions
  async function login(credentials) {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user data
      user.value = {
        id: '1',
        email: credentials.email,
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1 (555) 123-4567',
        avatar: null,
        createdAt: '2024-01-15T10:30:00Z'
      }
      
      isAuthenticated.value = true
      
      // Load user data
      await loadUserData()
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }
  
  async function register(userData) {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      user.value = {
        id: Math.random().toString(36).substr(2, 9),
        ...userData,
        createdAt: new Date().toISOString()
      }
      
      isAuthenticated.value = true
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }
  
  function logout() {
    user.value = null
    isAuthenticated.value = false
    addresses.value = []
    orders.value = []
    
    // Clear localStorage
    localStorage.removeItem('user')
    localStorage.removeItem('cart')
    localStorage.removeItem('wishlist')
  }
  
  async function loadUserData() {
    if (!isAuthenticated.value) return
    
    // Load addresses
    addresses.value = [
      {
        id: '1',
        type: 'shipping',
        isDefault: true,
        firstName: 'John',
        lastName: 'Doe',
        company: '',
        address1: '123 Main Street',
        address2: 'Apt 4B',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'US',
        phone: '+1 (555) 123-4567'
      }
    ]
    
    // Load orders
    orders.value = [
      {
        id: 'ORD-2024-001',
        status: 'delivered',
        orderDate: '2024-01-20T14:30:00Z',
        deliveryDate: '2024-01-25T16:45:00Z',
        total: 129.99,
        items: [
          {
            id: '1',
            name: 'Minimalist Tote Bag',
            quantity: 1,
            price: 89.99,
            image: '/images/products/tote-bag.jpg'
          },
          {
            id: '2',
            name: 'Organic Cotton T-Shirt',
            quantity: 2,
            price: 20.00,
            image: '/images/products/t-shirt.jpg'
          }
        ]
      }
    ]
  }
  
  async function updateProfile(profileData) {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      user.value = { ...user.value, ...profileData }
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }
  
  async function addAddress(addressData) {
    const newAddress = {
      id: Math.random().toString(36).substr(2, 9),
      ...addressData,
      isDefault: addresses.value.length === 0
    }
    
    addresses.value.push(newAddress)
    return { success: true }
  }
  
  async function updateAddress(addressId, addressData) {
    const index = addresses.value.findIndex(addr => addr.id === addressId)
    if (index > -1) {
      addresses.value[index] = { ...addresses.value[index], ...addressData }
      return { success: true }
    }
    return { success: false, error: 'Address not found' }
  }
  
  function removeAddress(addressId) {
    const index = addresses.value.findIndex(addr => addr.id === addressId)
    if (index > -1) {
      addresses.value.splice(index, 1)
      return { success: true }
    }
    return { success: false, error: 'Address not found' }
  }
  
  // Persist user to localStorage
  function saveToStorage() {
    if (user.value) {
      localStorage.setItem('user', JSON.stringify({
        user: user.value,
        isAuthenticated: isAuthenticated.value
      }))
    }
  }
  
  function loadFromStorage() {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const data = JSON.parse(savedUser)
      user.value = data.user
      isAuthenticated.value = data.isAuthenticated
      if (isAuthenticated.value) {
        loadUserData()
      }
    }
  }
  
  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    addresses,
    orders,
    // Getters
    fullName,
    defaultAddress,
    // Actions
    login,
    register,
    logout,
    loadUserData,
    updateProfile,
    addAddress,
    updateAddress,
    removeAddress,
    saveToStorage,
    loadFromStorage
  }
})
