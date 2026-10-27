import type { CartLine } from './cart'

export interface OrderRecord {
  id: string
  createdAt: string
  total: number
  discount: number
  items: CartLine[]
  fullName: string
  mobile: string
  city: string
  address: string
  paymentMethod: 'online-demo' | 'cash-on-delivery'
}
