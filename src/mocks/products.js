// Mock product data for UI testing
export const mockProducts = [
  {
    id: 1,
    name: 'Minimalist Tote Bag',
    price: 89.99,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 124,
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop'],
    colors: ['Black', 'Cream', 'Brown'],
    isNew: true,
    inStock: true
  },
  {
    id: 2,
    name: 'Organic Cotton T-Shirt',
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.9,
    reviewCount: 89,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop'],
    colors: ['White', 'Black', 'Grey'],
    isSale: true,
    inStock: true
  },
  {
    id: 3,
    name: 'Wool Blend Sweater',
    price: 129.99,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 67,
    images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop'],
    colors: ['Cream', 'Charcoal', 'Camel'],
    inStock: true
  },
  {
    id: 4,
    name: 'Leather Ankle Boots',
    price: 199.99,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 95,
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop'],
    colors: ['Black', 'Brown'],
    inStock: false
  },
  {
    id: 5,
    name: 'Classic Denim Jacket',
    price: 89.99,
    originalPrice: 120.00,
    rating: 4.5,
    reviewCount: 156,
    images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop'],
    colors: ['Light Blue', 'Dark Blue'],
    isSale: true,
    inStock: true
  },
  {
    id: 6,
    name: 'Minimalist Watch',
    price: 149.99,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 203,
    images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=500&fit=crop'],
    colors: ['Silver', 'Gold', 'Black'],
    isNew: true,
    inStock: true
  }
]

export const mockCategories = [
  {
    id: 1,
    name: 'Clothing',
    slug: 'clothing',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop',
    description: 'Clean lines, quality fabrics'
  },
  {
    id: 2,
    name: 'Accessories',
    slug: 'accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop',
    description: 'Timeless pieces that complete any look'
  },
  {
    id: 3,
    name: 'Shoes',
    slug: 'shoes',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop',
    description: 'Comfort meets contemporary design'
  }
]
