import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { CartContextValue, CartLine } from '@/types/domain'
import type { ShopProviderProps } from '@/types/components/providers/shop-provider'
import { products } from '@/data/products'

const ShopContext = createContext<CartContextValue | null>(null)

function readStorage<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) as T : fallback
  } catch { return fallback }
}

export function ShopProvider({ children }: ShopProviderProps) {
  const [cart, setCart] = useState<CartLine[]>(() => readStorage('nava-cart-v1', []))
  const [wishlist, setWishlist] = useState<string[]>(() => readStorage('nava-wishlist-v1', []))
  const [compare, setCompare] = useState<string[]>(() => readStorage('nava-compare-v1', []))

  useEffect(() => { localStorage.setItem('nava-cart-v1', JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem('nava-wishlist-v1', JSON.stringify(wishlist)) }, [wishlist])
  useEffect(() => { localStorage.setItem('nava-compare-v1', JSON.stringify(compare)) }, [compare])

  const value = useMemo<CartContextValue>(() => {
    const getProduct = (productId: string) => products.find((product) => product.id === productId)
    return {
      cart,
      wishlist,
      compare,
      addToCart: (productId, quantity = 1) => setCart((current) => {
        const maxStock = getProduct(productId)?.stock ?? quantity
        const existing = current.find((line) => line.productId === productId)
        return existing ? current.map((line) => line.productId === productId ? { ...line, quantity: Math.min(maxStock, line.quantity + quantity) } : line) : [...current, { productId, quantity: Math.min(maxStock, quantity) }]
      }),
      setQuantity: (productId, quantity) => setCart((current) => quantity <= 0 ? current.filter((line) => line.productId !== productId) : current.map((line) => line.productId === productId ? { ...line, quantity: Math.min(quantity, getProduct(productId)?.stock ?? quantity) } : line)),
      removeFromCart: (productId) => setCart((current) => current.filter((line) => line.productId !== productId)),
      toggleWishlist: (productId) => setWishlist((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]),
      toggleCompare: (productId) => setCompare((current) => current.includes(productId) ? current.filter((id) => id !== productId) : current.length < 4 ? [...current, productId] : current),
      getProduct,
      cartCount: cart.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: cart.reduce((sum, line) => sum + (getProduct(line.productId)?.price ?? 0) * line.quantity, 0),
    }
  }, [cart, wishlist, compare])

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
  const context = useContext(ShopContext)
  if (!context) throw new Error('useShop must be used within ShopProvider')
  return context
}
