import type { Product } from './product'

export interface CartLine {
  productId: string
  quantity: number
}

export interface CartContextValue {
  cart: CartLine[]
  wishlist: string[]
  compare: string[]
  addToCart: (productId: string, quantity?: number) => void
  setQuantity: (productId: string, quantity: number) => void
  removeFromCart: (productId: string) => void
  toggleWishlist: (productId: string) => void
  toggleCompare: (productId: string) => void
  getProduct: (productId: string) => Product | undefined
  cartCount: number
  subtotal: number
}
