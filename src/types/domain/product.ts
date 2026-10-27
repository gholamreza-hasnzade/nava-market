import type { ProductReview } from './review'

export type ProductCategory = 'digital' | 'home' | 'fashion' | 'beauty' | 'sport'

export interface Seller {
  name: string
  rating: number
  trusted: boolean
}

export interface Product {
  id: string
  slug: string
  title: string
  category: ProductCategory
  categoryLabel: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  seller: Seller
  image?: string
  visual: string
  visualTone: string
  stock: number
  labels: string[]
  description: string
  features: string[]
  specifications?: { label: string; value: string }[]
  reviews?: ProductReview[]
  color?: string
}
